const esbuild = require('esbuild');
const fs = require('fs');
const path = require('path');

// Node.js built-in modules that should be externalized
const nodeBuiltins = [
    'assert', 'async_hooks', 'buffer', 'child_process', 'cluster',
    'console', 'constants', 'crypto', 'dgram', 'dns', 'domain',
    'events', 'fs', 'http', 'http2', 'https', 'inspector', 'module',
    'net', 'os', 'path', 'perf_hooks', 'process', 'punycode',
    'querystring', 'readline', 'repl', 'stream', 'string_decoder',
    'sys', 'timers', 'tls', 'trace_events', 'tty', 'url', 'util',
    'v8', 'vm', 'worker_threads', 'zlib'
];

// Native modules that must be externalized (loaded at runtime)
const nativeModules = [
    'better-sqlite3',
];

const isProduction = process.env.NODE_ENV === 'production';
const workerBuildDir = path.join(__dirname, 'dist', 'workers');
const legacyWorkerBuildDir = path.join(
    __dirname,
    '../../dist/apps/electron-backend/workers'
);

function ensureDirExists(dirPath) {
    fs.mkdirSync(dirPath, { recursive: true });
}

function copyWorkerArtifacts(primaryOutPath, outputPaths) {
    const mapOutPath = `${primaryOutPath}.map`;

    for (const outputPath of outputPaths) {
        ensureDirExists(path.dirname(outputPath));
        fs.copyFileSync(primaryOutPath, outputPath);

        if (fs.existsSync(mapOutPath)) {
            fs.copyFileSync(mapOutPath, `${outputPath}.map`);
        }
    }
}

async function buildWorker() {
    try {
        const workers = [
            {
                label: 'EPG parser worker',
                entry: path.join(
                    __dirname,
                    'src/app/workers/epg-parser.worker.ts'
                ),
                filename: 'epg-parser.worker.js',
            },
            {
                label: 'database worker',
                entry: path.join(
                    __dirname,
                    'src/app/workers/database.worker.ts'
                ),
                filename: 'database.worker.js',
            },
            {
                label: 'playlist refresh worker',
                entry: path.join(
                    __dirname,
                    'src/app/workers/playlist-refresh.worker.ts'
                ),
                filename: 'playlist-refresh.worker.js',
            },
        ];

        for (const worker of workers) {
            console.log(
                `Building ${worker.label} with esbuild (${isProduction ? 'production' : 'development'})...`
            );

            const primaryOutfile = path.join(workerBuildDir, worker.filename);
            const outputPaths = [
                primaryOutfile,
                path.join(legacyWorkerBuildDir, worker.filename),
            ];

            await esbuild.build({
                entryPoints: [worker.entry],
                bundle: true,
                platform: 'node',
                target: 'node18',
                format: 'cjs',
                outfile: primaryOutfile,
                external: [
                    ...nodeBuiltins.map((m) => `node:${m}`),
                    ...nodeBuiltins,
                    ...nativeModules,
                ],
                sourcemap: !isProduction,
                minify: isProduction,
                alias: {
                    'shared-interfaces': path.join(
                        __dirname,
                        '../../libs/shared/interfaces/src/index.ts'
                    ),
                    'm3u-utils': path.join(
                        __dirname,
                        '../../libs/shared/m3u-utils/src/index.ts'
                    ),
                    'database': path.join(
                        __dirname,
                        '../../libs/shared/database/src/index.ts'
                    ),
                    'database-schema': path.join(
                        __dirname,
                        '../../libs/shared/database/src/lib/schema.ts'
                    ),
                    'database-path-utils': path.join(
                        __dirname,
                        '../../libs/shared/database/src/lib/path-utils.ts'
                    ),
                },
            });

            copyWorkerArtifacts(primaryOutfile, outputPaths);
        }

        console.log('✅ Workers built successfully!');
    } catch (error) {
        console.error('❌ Worker build failed:', error);
        process.exit(1);
    }
}

buildWorker();
