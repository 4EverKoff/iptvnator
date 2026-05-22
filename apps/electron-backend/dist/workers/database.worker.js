var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc2) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc2 = __getOwnPropDesc(from, key)) || desc2.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/entity.cjs
var require_entity = __commonJS({
  "node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/entity.cjs"(exports2, module2) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc2) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc2 = __getOwnPropDesc2(from, key)) || desc2.enumerable });
      }
      return to;
    };
    var __toCommonJS = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var entity_exports = {};
    __export2(entity_exports, {
      entityKind: () => entityKind2,
      hasOwnEntityKind: () => hasOwnEntityKind2,
      is: () => is2
    });
    module2.exports = __toCommonJS(entity_exports);
    var entityKind2 = Symbol.for("drizzle:entityKind");
    var hasOwnEntityKind2 = Symbol.for("drizzle:hasOwnEntityKind");
    function is2(value, type) {
      if (!value || typeof value !== "object") {
        return false;
      }
      if (value instanceof type) {
        return true;
      }
      if (!Object.prototype.hasOwnProperty.call(type, entityKind2)) {
        throw new Error(
          `Class "${type.name ?? "<unknown>"}" doesn't look like a Drizzle entity. If this is incorrect and the class is provided by Drizzle, please report this as a bug.`
        );
      }
      let cls = Object.getPrototypeOf(value).constructor;
      if (cls) {
        while (cls) {
          if (entityKind2 in cls && cls[entityKind2] === type[entityKind2]) {
            return true;
          }
          cls = Object.getPrototypeOf(cls);
        }
      }
      return false;
    }
  }
});

// node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/logger.cjs
var require_logger = __commonJS({
  "node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/logger.cjs"(exports2, module2) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc2) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc2 = __getOwnPropDesc2(from, key)) || desc2.enumerable });
      }
      return to;
    };
    var __toCommonJS = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var logger_exports = {};
    __export2(logger_exports, {
      ConsoleLogWriter: () => ConsoleLogWriter,
      DefaultLogger: () => DefaultLogger,
      NoopLogger: () => NoopLogger
    });
    module2.exports = __toCommonJS(logger_exports);
    var import_entity22 = require_entity();
    var ConsoleLogWriter = class {
      static [import_entity22.entityKind] = "ConsoleLogWriter";
      write(message) {
        console.log(message);
      }
    };
    var DefaultLogger = class {
      static [import_entity22.entityKind] = "DefaultLogger";
      writer;
      constructor(config) {
        this.writer = config?.writer ?? new ConsoleLogWriter();
      }
      logQuery(query, params) {
        const stringifiedParams = params.map((p) => {
          try {
            return JSON.stringify(p);
          } catch {
            return String(p);
          }
        });
        const paramsStr = stringifiedParams.length ? ` -- params: [${stringifiedParams.join(", ")}]` : "";
        this.writer.write(`Query: ${query}${paramsStr}`);
      }
    };
    var NoopLogger = class {
      static [import_entity22.entityKind] = "NoopLogger";
      logQuery() {
      }
    };
  }
});

// node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/table.utils.cjs
var require_table_utils = __commonJS({
  "node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/table.utils.cjs"(exports2, module2) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc2) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc2 = __getOwnPropDesc2(from, key)) || desc2.enumerable });
      }
      return to;
    };
    var __toCommonJS = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var table_utils_exports = {};
    __export2(table_utils_exports, {
      TableName: () => TableName2
    });
    module2.exports = __toCommonJS(table_utils_exports);
    var TableName2 = Symbol.for("drizzle:Name");
  }
});

// node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/table.cjs
var require_table = __commonJS({
  "node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/table.cjs"(exports2, module2) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc2) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc2 = __getOwnPropDesc2(from, key)) || desc2.enumerable });
      }
      return to;
    };
    var __toCommonJS = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var table_exports = {};
    __export2(table_exports, {
      BaseName: () => BaseName2,
      Columns: () => Columns2,
      ExtraConfigBuilder: () => ExtraConfigBuilder2,
      ExtraConfigColumns: () => ExtraConfigColumns2,
      IsAlias: () => IsAlias2,
      OriginalName: () => OriginalName2,
      Schema: () => Schema2,
      Table: () => Table2,
      getTableName: () => getTableName,
      getTableUniqueName: () => getTableUniqueName,
      isTable: () => isTable
    });
    module2.exports = __toCommonJS(table_exports);
    var import_entity22 = require_entity();
    var import_table_utils6 = require_table_utils();
    var Schema2 = Symbol.for("drizzle:Schema");
    var Columns2 = Symbol.for("drizzle:Columns");
    var ExtraConfigColumns2 = Symbol.for("drizzle:ExtraConfigColumns");
    var OriginalName2 = Symbol.for("drizzle:OriginalName");
    var BaseName2 = Symbol.for("drizzle:BaseName");
    var IsAlias2 = Symbol.for("drizzle:IsAlias");
    var ExtraConfigBuilder2 = Symbol.for("drizzle:ExtraConfigBuilder");
    var IsDrizzleTable2 = Symbol.for("drizzle:IsDrizzleTable");
    var Table2 = class {
      static [import_entity22.entityKind] = "Table";
      /** @internal */
      static Symbol = {
        Name: import_table_utils6.TableName,
        Schema: Schema2,
        OriginalName: OriginalName2,
        Columns: Columns2,
        ExtraConfigColumns: ExtraConfigColumns2,
        BaseName: BaseName2,
        IsAlias: IsAlias2,
        ExtraConfigBuilder: ExtraConfigBuilder2
      };
      /**
       * @internal
       * Can be changed if the table is aliased.
       */
      [import_table_utils6.TableName];
      /**
       * @internal
       * Used to store the original name of the table, before any aliasing.
       */
      [OriginalName2];
      /** @internal */
      [Schema2];
      /** @internal */
      [Columns2];
      /** @internal */
      [ExtraConfigColumns2];
      /**
       *  @internal
       * Used to store the table name before the transformation via the `tableCreator` functions.
       */
      [BaseName2];
      /** @internal */
      [IsAlias2] = false;
      /** @internal */
      [IsDrizzleTable2] = true;
      /** @internal */
      [ExtraConfigBuilder2] = void 0;
      constructor(name, schema, baseName) {
        this[import_table_utils6.TableName] = this[OriginalName2] = name;
        this[Schema2] = schema;
        this[BaseName2] = baseName;
      }
    };
    function isTable(table) {
      return typeof table === "object" && table !== null && IsDrizzleTable2 in table;
    }
    function getTableName(table) {
      return table[import_table_utils6.TableName];
    }
    function getTableUniqueName(table) {
      return `${table[Schema2] ?? "public"}.${table[import_table_utils6.TableName]}`;
    }
  }
});

// node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/column.cjs
var require_column = __commonJS({
  "node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/column.cjs"(exports2, module2) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc2) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc2 = __getOwnPropDesc2(from, key)) || desc2.enumerable });
      }
      return to;
    };
    var __toCommonJS = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var column_exports = {};
    __export2(column_exports, {
      Column: () => Column2
    });
    module2.exports = __toCommonJS(column_exports);
    var import_entity22 = require_entity();
    var Column2 = class {
      constructor(table, config) {
        this.table = table;
        this.config = config;
        this.name = config.name;
        this.keyAsName = config.keyAsName;
        this.notNull = config.notNull;
        this.default = config.default;
        this.defaultFn = config.defaultFn;
        this.onUpdateFn = config.onUpdateFn;
        this.hasDefault = config.hasDefault;
        this.primary = config.primaryKey;
        this.isUnique = config.isUnique;
        this.uniqueName = config.uniqueName;
        this.uniqueType = config.uniqueType;
        this.dataType = config.dataType;
        this.columnType = config.columnType;
        this.generated = config.generated;
        this.generatedIdentity = config.generatedIdentity;
      }
      static [import_entity22.entityKind] = "Column";
      name;
      keyAsName;
      primary;
      notNull;
      default;
      defaultFn;
      onUpdateFn;
      hasDefault;
      isUnique;
      uniqueName;
      uniqueType;
      dataType;
      columnType;
      enumValues = void 0;
      generated = void 0;
      generatedIdentity = void 0;
      config;
      mapFromDriverValue(value) {
        return value;
      }
      mapToDriverValue(value) {
        return value;
      }
      // ** @internal */
      shouldDisableInsert() {
        return this.config.generated !== void 0 && this.config.generated.type !== "byDefault";
      }
    };
  }
});

// node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/column-builder.cjs
var require_column_builder = __commonJS({
  "node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/column-builder.cjs"(exports2, module2) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc2) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc2 = __getOwnPropDesc2(from, key)) || desc2.enumerable });
      }
      return to;
    };
    var __toCommonJS = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var column_builder_exports = {};
    __export2(column_builder_exports, {
      ColumnBuilder: () => ColumnBuilder2
    });
    module2.exports = __toCommonJS(column_builder_exports);
    var import_entity22 = require_entity();
    var ColumnBuilder2 = class {
      static [import_entity22.entityKind] = "ColumnBuilder";
      config;
      constructor(name, dataType, columnType) {
        this.config = {
          name,
          keyAsName: name === "",
          notNull: false,
          default: void 0,
          hasDefault: false,
          primaryKey: false,
          isUnique: false,
          uniqueName: void 0,
          uniqueType: void 0,
          dataType,
          columnType,
          generated: void 0
        };
      }
      /**
       * Changes the data type of the column. Commonly used with `json` columns. Also, useful for branded types.
       *
       * @example
       * ```ts
       * const users = pgTable('users', {
       * 	id: integer('id').$type<UserId>().primaryKey(),
       * 	details: json('details').$type<UserDetails>().notNull(),
       * });
       * ```
       */
      $type() {
        return this;
      }
      /**
       * Adds a `not null` clause to the column definition.
       *
       * Affects the `select` model of the table - columns *without* `not null` will be nullable on select.
       */
      notNull() {
        this.config.notNull = true;
        return this;
      }
      /**
       * Adds a `default <value>` clause to the column definition.
       *
       * Affects the `insert` model of the table - columns *with* `default` are optional on insert.
       *
       * If you need to set a dynamic default value, use {@link $defaultFn} instead.
       */
      default(value) {
        this.config.default = value;
        this.config.hasDefault = true;
        return this;
      }
      /**
       * Adds a dynamic default value to the column.
       * The function will be called when the row is inserted, and the returned value will be used as the column value.
       *
       * **Note:** This value does not affect the `drizzle-kit` behavior, it is only used at runtime in `drizzle-orm`.
       */
      $defaultFn(fn) {
        this.config.defaultFn = fn;
        this.config.hasDefault = true;
        return this;
      }
      /**
       * Alias for {@link $defaultFn}.
       */
      $default = this.$defaultFn;
      /**
       * Adds a dynamic update value to the column.
       * The function will be called when the row is updated, and the returned value will be used as the column value if none is provided.
       * If no `default` (or `$defaultFn`) value is provided, the function will be called when the row is inserted as well, and the returned value will be used as the column value.
       *
       * **Note:** This value does not affect the `drizzle-kit` behavior, it is only used at runtime in `drizzle-orm`.
       */
      $onUpdateFn(fn) {
        this.config.onUpdateFn = fn;
        this.config.hasDefault = true;
        return this;
      }
      /**
       * Alias for {@link $onUpdateFn}.
       */
      $onUpdate = this.$onUpdateFn;
      /**
       * Adds a `primary key` clause to the column definition. This implicitly makes the column `not null`.
       *
       * In SQLite, `integer primary key` implicitly makes the column auto-incrementing.
       */
      primaryKey() {
        this.config.primaryKey = true;
        this.config.notNull = true;
        return this;
      }
      /** @internal Sets the name of the column to the key within the table definition if a name was not given. */
      setName(name) {
        if (this.config.name !== "") return;
        this.config.name = name;
      }
    };
  }
});

// node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/pg-core/foreign-keys.cjs
var require_foreign_keys = __commonJS({
  "node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/pg-core/foreign-keys.cjs"(exports2, module2) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc2) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc2 = __getOwnPropDesc2(from, key)) || desc2.enumerable });
      }
      return to;
    };
    var __toCommonJS = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var foreign_keys_exports = {};
    __export2(foreign_keys_exports, {
      ForeignKey: () => ForeignKey3,
      ForeignKeyBuilder: () => ForeignKeyBuilder3,
      foreignKey: () => foreignKey
    });
    module2.exports = __toCommonJS(foreign_keys_exports);
    var import_entity22 = require_entity();
    var import_table_utils6 = require_table_utils();
    var ForeignKeyBuilder3 = class {
      static [import_entity22.entityKind] = "PgForeignKeyBuilder";
      /** @internal */
      reference;
      /** @internal */
      _onUpdate = "no action";
      /** @internal */
      _onDelete = "no action";
      constructor(config, actions) {
        this.reference = () => {
          const { name, columns, foreignColumns } = config();
          return { name, columns, foreignTable: foreignColumns[0].table, foreignColumns };
        };
        if (actions) {
          this._onUpdate = actions.onUpdate;
          this._onDelete = actions.onDelete;
        }
      }
      onUpdate(action) {
        this._onUpdate = action === void 0 ? "no action" : action;
        return this;
      }
      onDelete(action) {
        this._onDelete = action === void 0 ? "no action" : action;
        return this;
      }
      /** @internal */
      build(table) {
        return new ForeignKey3(table, this);
      }
    };
    var ForeignKey3 = class {
      constructor(table, builder) {
        this.table = table;
        this.reference = builder.reference;
        this.onUpdate = builder._onUpdate;
        this.onDelete = builder._onDelete;
      }
      static [import_entity22.entityKind] = "PgForeignKey";
      reference;
      onUpdate;
      onDelete;
      getName() {
        const { name, columns, foreignColumns } = this.reference();
        const columnNames = columns.map((column) => column.name);
        const foreignColumnNames = foreignColumns.map((column) => column.name);
        const chunks = [
          this.table[import_table_utils6.TableName],
          ...columnNames,
          foreignColumns[0].table[import_table_utils6.TableName],
          ...foreignColumnNames
        ];
        return name ?? `${chunks.join("_")}_fk`;
      }
    };
    function foreignKey(config) {
      function mappedConfig() {
        const { name, columns, foreignColumns } = config;
        return {
          name,
          columns,
          foreignColumns
        };
      }
      return new ForeignKeyBuilder3(mappedConfig);
    }
  }
});

// node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/tracing-utils.cjs
var require_tracing_utils = __commonJS({
  "node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/tracing-utils.cjs"(exports2, module2) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc2) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc2 = __getOwnPropDesc2(from, key)) || desc2.enumerable });
      }
      return to;
    };
    var __toCommonJS = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var tracing_utils_exports = {};
    __export2(tracing_utils_exports, {
      iife: () => iife2
    });
    module2.exports = __toCommonJS(tracing_utils_exports);
    function iife2(fn, ...args) {
      return fn(...args);
    }
  }
});

// node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/pg-core/unique-constraint.cjs
var require_unique_constraint = __commonJS({
  "node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/pg-core/unique-constraint.cjs"(exports2, module2) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc2) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc2 = __getOwnPropDesc2(from, key)) || desc2.enumerable });
      }
      return to;
    };
    var __toCommonJS = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var unique_constraint_exports = {};
    __export2(unique_constraint_exports, {
      UniqueConstraint: () => UniqueConstraint3,
      UniqueConstraintBuilder: () => UniqueConstraintBuilder3,
      UniqueOnConstraintBuilder: () => UniqueOnConstraintBuilder3,
      unique: () => unique,
      uniqueKeyName: () => uniqueKeyName3
    });
    module2.exports = __toCommonJS(unique_constraint_exports);
    var import_entity22 = require_entity();
    var import_table_utils6 = require_table_utils();
    function unique(name) {
      return new UniqueOnConstraintBuilder3(name);
    }
    function uniqueKeyName3(table, columns) {
      return `${table[import_table_utils6.TableName]}_${columns.join("_")}_unique`;
    }
    var UniqueConstraintBuilder3 = class {
      constructor(columns, name) {
        this.name = name;
        this.columns = columns;
      }
      static [import_entity22.entityKind] = "PgUniqueConstraintBuilder";
      /** @internal */
      columns;
      /** @internal */
      nullsNotDistinctConfig = false;
      nullsNotDistinct() {
        this.nullsNotDistinctConfig = true;
        return this;
      }
      /** @internal */
      build(table) {
        return new UniqueConstraint3(table, this.columns, this.nullsNotDistinctConfig, this.name);
      }
    };
    var UniqueOnConstraintBuilder3 = class {
      static [import_entity22.entityKind] = "PgUniqueOnConstraintBuilder";
      /** @internal */
      name;
      constructor(name) {
        this.name = name;
      }
      on(...columns) {
        return new UniqueConstraintBuilder3(columns, this.name);
      }
    };
    var UniqueConstraint3 = class {
      constructor(table, columns, nullsNotDistinct, name) {
        this.table = table;
        this.columns = columns;
        this.name = name ?? uniqueKeyName3(this.table, this.columns.map((column) => column.name));
        this.nullsNotDistinct = nullsNotDistinct;
      }
      static [import_entity22.entityKind] = "PgUniqueConstraint";
      columns;
      name;
      nullsNotDistinct = false;
      getName() {
        return this.name;
      }
    };
  }
});

// node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/pg-core/utils/array.cjs
var require_array = __commonJS({
  "node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/pg-core/utils/array.cjs"(exports2, module2) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc2) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc2 = __getOwnPropDesc2(from, key)) || desc2.enumerable });
      }
      return to;
    };
    var __toCommonJS = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var array_exports = {};
    __export2(array_exports, {
      makePgArray: () => makePgArray2,
      parsePgArray: () => parsePgArray2,
      parsePgNestedArray: () => parsePgNestedArray2
    });
    module2.exports = __toCommonJS(array_exports);
    function parsePgArrayValue2(arrayString, startFrom, inQuotes) {
      for (let i = startFrom; i < arrayString.length; i++) {
        const char = arrayString[i];
        if (char === "\\") {
          i++;
          continue;
        }
        if (char === '"') {
          return [arrayString.slice(startFrom, i).replace(/\\/g, ""), i + 1];
        }
        if (inQuotes) {
          continue;
        }
        if (char === "," || char === "}") {
          return [arrayString.slice(startFrom, i).replace(/\\/g, ""), i];
        }
      }
      return [arrayString.slice(startFrom).replace(/\\/g, ""), arrayString.length];
    }
    function parsePgNestedArray2(arrayString, startFrom = 0) {
      const result = [];
      let i = startFrom;
      let lastCharIsComma = false;
      while (i < arrayString.length) {
        const char = arrayString[i];
        if (char === ",") {
          if (lastCharIsComma || i === startFrom) {
            result.push("");
          }
          lastCharIsComma = true;
          i++;
          continue;
        }
        lastCharIsComma = false;
        if (char === "\\") {
          i += 2;
          continue;
        }
        if (char === '"') {
          const [value2, startFrom2] = parsePgArrayValue2(arrayString, i + 1, true);
          result.push(value2);
          i = startFrom2;
          continue;
        }
        if (char === "}") {
          return [result, i + 1];
        }
        if (char === "{") {
          const [value2, startFrom2] = parsePgNestedArray2(arrayString, i + 1);
          result.push(value2);
          i = startFrom2;
          continue;
        }
        const [value, newStartFrom] = parsePgArrayValue2(arrayString, i, false);
        result.push(value);
        i = newStartFrom;
      }
      return [result, i];
    }
    function parsePgArray2(arrayString) {
      const [result] = parsePgNestedArray2(arrayString, 1);
      return result;
    }
    function makePgArray2(array) {
      return `{${array.map((item) => {
        if (Array.isArray(item)) {
          return makePgArray2(item);
        }
        if (typeof item === "string") {
          return `"${item.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
        }
        return `${item}`;
      }).join(",")}}`;
    }
  }
});

// node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/pg-core/columns/common.cjs
var require_common = __commonJS({
  "node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/pg-core/columns/common.cjs"(exports2, module2) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc2) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc2 = __getOwnPropDesc2(from, key)) || desc2.enumerable });
      }
      return to;
    };
    var __toCommonJS = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var common_exports = {};
    __export2(common_exports, {
      ExtraConfigColumn: () => ExtraConfigColumn2,
      IndexedColumn: () => IndexedColumn2,
      PgArray: () => PgArray2,
      PgArrayBuilder: () => PgArrayBuilder2,
      PgColumn: () => PgColumn2,
      PgColumnBuilder: () => PgColumnBuilder2
    });
    module2.exports = __toCommonJS(common_exports);
    var import_column_builder3 = require_column_builder();
    var import_column5 = require_column();
    var import_entity22 = require_entity();
    var import_foreign_keys3 = require_foreign_keys();
    var import_tracing_utils3 = require_tracing_utils();
    var import_unique_constraint3 = require_unique_constraint();
    var import_array2 = require_array();
    var PgColumnBuilder2 = class extends import_column_builder3.ColumnBuilder {
      foreignKeyConfigs = [];
      static [import_entity22.entityKind] = "PgColumnBuilder";
      array(size) {
        return new PgArrayBuilder2(this.config.name, this, size);
      }
      references(ref, actions = {}) {
        this.foreignKeyConfigs.push({ ref, actions });
        return this;
      }
      unique(name, config) {
        this.config.isUnique = true;
        this.config.uniqueName = name;
        this.config.uniqueType = config?.nulls;
        return this;
      }
      generatedAlwaysAs(as) {
        this.config.generated = {
          as,
          type: "always",
          mode: "stored"
        };
        return this;
      }
      /** @internal */
      buildForeignKeys(column, table) {
        return this.foreignKeyConfigs.map(({ ref, actions }) => {
          return (0, import_tracing_utils3.iife)(
            (ref2, actions2) => {
              const builder = new import_foreign_keys3.ForeignKeyBuilder(() => {
                const foreignColumn = ref2();
                return { columns: [column], foreignColumns: [foreignColumn] };
              });
              if (actions2.onUpdate) {
                builder.onUpdate(actions2.onUpdate);
              }
              if (actions2.onDelete) {
                builder.onDelete(actions2.onDelete);
              }
              return builder.build(table);
            },
            ref,
            actions
          );
        });
      }
      /** @internal */
      buildExtraConfigColumn(table) {
        return new ExtraConfigColumn2(table, this.config);
      }
    };
    var PgColumn2 = class extends import_column5.Column {
      constructor(table, config) {
        if (!config.uniqueName) {
          config.uniqueName = (0, import_unique_constraint3.uniqueKeyName)(table, [config.name]);
        }
        super(table, config);
        this.table = table;
      }
      static [import_entity22.entityKind] = "PgColumn";
    };
    var ExtraConfigColumn2 = class extends PgColumn2 {
      static [import_entity22.entityKind] = "ExtraConfigColumn";
      getSQLType() {
        return this.getSQLType();
      }
      indexConfig = {
        order: this.config.order ?? "asc",
        nulls: this.config.nulls ?? "last",
        opClass: this.config.opClass
      };
      defaultConfig = {
        order: "asc",
        nulls: "last",
        opClass: void 0
      };
      asc() {
        this.indexConfig.order = "asc";
        return this;
      }
      desc() {
        this.indexConfig.order = "desc";
        return this;
      }
      nullsFirst() {
        this.indexConfig.nulls = "first";
        return this;
      }
      nullsLast() {
        this.indexConfig.nulls = "last";
        return this;
      }
      /**
       * ### PostgreSQL documentation quote
       *
       * > An operator class with optional parameters can be specified for each column of an index.
       * The operator class identifies the operators to be used by the index for that column.
       * For example, a B-tree index on four-byte integers would use the int4_ops class;
       * this operator class includes comparison functions for four-byte integers.
       * In practice the default operator class for the column's data type is usually sufficient.
       * The main point of having operator classes is that for some data types, there could be more than one meaningful ordering.
       * For example, we might want to sort a complex-number data type either by absolute value or by real part.
       * We could do this by defining two operator classes for the data type and then selecting the proper class when creating an index.
       * More information about operator classes check:
       *
       * ### Useful links
       * https://www.postgresql.org/docs/current/sql-createindex.html
       *
       * https://www.postgresql.org/docs/current/indexes-opclass.html
       *
       * https://www.postgresql.org/docs/current/xindex.html
       *
       * ### Additional types
       * If you have the `pg_vector` extension installed in your database, you can use the
       * `vector_l2_ops`, `vector_ip_ops`, `vector_cosine_ops`, `vector_l1_ops`, `bit_hamming_ops`, `bit_jaccard_ops`, `halfvec_l2_ops`, `sparsevec_l2_ops` options, which are predefined types.
       *
       * **You can always specify any string you want in the operator class, in case Drizzle doesn't have it natively in its types**
       *
       * @param opClass
       * @returns
       */
      op(opClass) {
        this.indexConfig.opClass = opClass;
        return this;
      }
    };
    var IndexedColumn2 = class {
      static [import_entity22.entityKind] = "IndexedColumn";
      constructor(name, keyAsName, type, indexConfig) {
        this.name = name;
        this.keyAsName = keyAsName;
        this.type = type;
        this.indexConfig = indexConfig;
      }
      name;
      keyAsName;
      type;
      indexConfig;
    };
    var PgArrayBuilder2 = class extends PgColumnBuilder2 {
      static [import_entity22.entityKind] = "PgArrayBuilder";
      constructor(name, baseBuilder, size) {
        super(name, "array", "PgArray");
        this.config.baseBuilder = baseBuilder;
        this.config.size = size;
      }
      /** @internal */
      build(table) {
        const baseColumn = this.config.baseBuilder.build(table);
        return new PgArray2(
          table,
          this.config,
          baseColumn
        );
      }
    };
    var PgArray2 = class _PgArray extends PgColumn2 {
      constructor(table, config, baseColumn, range) {
        super(table, config);
        this.baseColumn = baseColumn;
        this.range = range;
        this.size = config.size;
      }
      size;
      static [import_entity22.entityKind] = "PgArray";
      getSQLType() {
        return `${this.baseColumn.getSQLType()}[${typeof this.size === "number" ? this.size : ""}]`;
      }
      mapFromDriverValue(value) {
        if (typeof value === "string") {
          value = (0, import_array2.parsePgArray)(value);
        }
        return value.map((v) => this.baseColumn.mapFromDriverValue(v));
      }
      mapToDriverValue(value, isNestedArray = false) {
        const a = value.map(
          (v) => v === null ? null : (0, import_entity22.is)(this.baseColumn, _PgArray) ? this.baseColumn.mapToDriverValue(v, true) : this.baseColumn.mapToDriverValue(v)
        );
        if (isNestedArray) return a;
        return (0, import_array2.makePgArray)(a);
      }
    };
  }
});

// node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/pg-core/columns/enum.cjs
var require_enum = __commonJS({
  "node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/pg-core/columns/enum.cjs"(exports2, module2) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc2) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc2 = __getOwnPropDesc2(from, key)) || desc2.enumerable });
      }
      return to;
    };
    var __toCommonJS = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var enum_exports = {};
    __export2(enum_exports, {
      PgEnumColumn: () => PgEnumColumn2,
      PgEnumColumnBuilder: () => PgEnumColumnBuilder2,
      PgEnumObjectColumn: () => PgEnumObjectColumn2,
      PgEnumObjectColumnBuilder: () => PgEnumObjectColumnBuilder2,
      isPgEnum: () => isPgEnum2,
      pgEnum: () => pgEnum,
      pgEnumObjectWithSchema: () => pgEnumObjectWithSchema,
      pgEnumWithSchema: () => pgEnumWithSchema
    });
    module2.exports = __toCommonJS(enum_exports);
    var import_entity22 = require_entity();
    var import_common8 = require_common();
    var PgEnumObjectColumnBuilder2 = class extends import_common8.PgColumnBuilder {
      static [import_entity22.entityKind] = "PgEnumObjectColumnBuilder";
      constructor(name, enumInstance) {
        super(name, "string", "PgEnumObjectColumn");
        this.config.enum = enumInstance;
      }
      /** @internal */
      build(table) {
        return new PgEnumObjectColumn2(
          table,
          this.config
        );
      }
    };
    var PgEnumObjectColumn2 = class extends import_common8.PgColumn {
      static [import_entity22.entityKind] = "PgEnumObjectColumn";
      enum;
      enumValues = this.config.enum.enumValues;
      constructor(table, config) {
        super(table, config);
        this.enum = config.enum;
      }
      getSQLType() {
        return this.enum.enumName;
      }
    };
    var isPgEnumSym2 = Symbol.for("drizzle:isPgEnum");
    function isPgEnum2(obj) {
      return !!obj && typeof obj === "function" && isPgEnumSym2 in obj && obj[isPgEnumSym2] === true;
    }
    var PgEnumColumnBuilder2 = class extends import_common8.PgColumnBuilder {
      static [import_entity22.entityKind] = "PgEnumColumnBuilder";
      constructor(name, enumInstance) {
        super(name, "string", "PgEnumColumn");
        this.config.enum = enumInstance;
      }
      /** @internal */
      build(table) {
        return new PgEnumColumn2(
          table,
          this.config
        );
      }
    };
    var PgEnumColumn2 = class extends import_common8.PgColumn {
      static [import_entity22.entityKind] = "PgEnumColumn";
      enum = this.config.enum;
      enumValues = this.config.enum.enumValues;
      constructor(table, config) {
        super(table, config);
        this.enum = config.enum;
      }
      getSQLType() {
        return this.enum.enumName;
      }
    };
    function pgEnum(enumName, input) {
      return Array.isArray(input) ? pgEnumWithSchema(enumName, [...input], void 0) : pgEnumObjectWithSchema(enumName, input, void 0);
    }
    function pgEnumWithSchema(enumName, values, schema) {
      const enumInstance = Object.assign(
        (name) => new PgEnumColumnBuilder2(name ?? "", enumInstance),
        {
          enumName,
          enumValues: values,
          schema,
          [isPgEnumSym2]: true
        }
      );
      return enumInstance;
    }
    function pgEnumObjectWithSchema(enumName, values, schema) {
      const enumInstance = Object.assign(
        (name) => new PgEnumObjectColumnBuilder2(name ?? "", enumInstance),
        {
          enumName,
          enumValues: Object.values(values),
          schema,
          [isPgEnumSym2]: true
        }
      );
      return enumInstance;
    }
  }
});

// node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/subquery.cjs
var require_subquery = __commonJS({
  "node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/subquery.cjs"(exports2, module2) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc2) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc2 = __getOwnPropDesc2(from, key)) || desc2.enumerable });
      }
      return to;
    };
    var __toCommonJS = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var subquery_exports = {};
    __export2(subquery_exports, {
      Subquery: () => Subquery2,
      WithSubquery: () => WithSubquery2
    });
    module2.exports = __toCommonJS(subquery_exports);
    var import_entity22 = require_entity();
    var Subquery2 = class {
      static [import_entity22.entityKind] = "Subquery";
      constructor(sql2, fields, alias, isWith = false, usedTables = []) {
        this._ = {
          brand: "Subquery",
          sql: sql2,
          selectedFields: fields,
          alias,
          isWith,
          usedTables
        };
      }
      // getSQL(): SQL<unknown> {
      // 	return new SQL([this]);
      // }
    };
    var WithSubquery2 = class extends Subquery2 {
      static [import_entity22.entityKind] = "WithSubquery";
    };
  }
});

// node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/version.cjs
var require_version = __commonJS({
  "node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/version.cjs"(exports2, module2) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc2) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc2 = __getOwnPropDesc2(from, key)) || desc2.enumerable });
      }
      return to;
    };
    var __toCommonJS = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var version_exports = {};
    __export2(version_exports, {
      compatibilityVersion: () => compatibilityVersion,
      npmVersion: () => version2
    });
    module2.exports = __toCommonJS(version_exports);
    var version2 = "0.45.2";
    var compatibilityVersion = 10;
  }
});

// node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/tracing.cjs
var require_tracing = __commonJS({
  "node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/tracing.cjs"(exports2, module2) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc2) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc2 = __getOwnPropDesc2(from, key)) || desc2.enumerable });
      }
      return to;
    };
    var __toCommonJS = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var tracing_exports = {};
    __export2(tracing_exports, {
      tracer: () => tracer2
    });
    module2.exports = __toCommonJS(tracing_exports);
    var import_tracing_utils3 = require_tracing_utils();
    var import_version2 = require_version();
    var otel2;
    var rawTracer2;
    var tracer2 = {
      startActiveSpan(name, fn) {
        if (!otel2) {
          return fn();
        }
        if (!rawTracer2) {
          rawTracer2 = otel2.trace.getTracer("drizzle-orm", import_version2.npmVersion);
        }
        return (0, import_tracing_utils3.iife)(
          (otel22, rawTracer22) => rawTracer22.startActiveSpan(
            name,
            (span) => {
              try {
                return fn(span);
              } catch (e) {
                span.setStatus({
                  code: otel22.SpanStatusCode.ERROR,
                  message: e instanceof Error ? e.message : "Unknown error"
                  // eslint-disable-line no-instanceof/no-instanceof
                });
                throw e;
              } finally {
                span.end();
              }
            }
          ),
          otel2,
          rawTracer2
        );
      }
    };
  }
});

// node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/view-common.cjs
var require_view_common = __commonJS({
  "node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/view-common.cjs"(exports2, module2) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc2) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc2 = __getOwnPropDesc2(from, key)) || desc2.enumerable });
      }
      return to;
    };
    var __toCommonJS = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var view_common_exports = {};
    __export2(view_common_exports, {
      ViewBaseConfig: () => ViewBaseConfig2
    });
    module2.exports = __toCommonJS(view_common_exports);
    var ViewBaseConfig2 = Symbol.for("drizzle:ViewBaseConfig");
  }
});

// node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/sql/sql.cjs
var require_sql = __commonJS({
  "node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/sql/sql.cjs"(exports2, module2) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name2 in all)
        __defProp2(target, name2, { get: all[name2], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc2) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc2 = __getOwnPropDesc2(from, key)) || desc2.enumerable });
      }
      return to;
    };
    var __toCommonJS = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var sql_exports = {};
    __export2(sql_exports, {
      FakePrimitiveParam: () => FakePrimitiveParam2,
      Name: () => Name2,
      Param: () => Param2,
      Placeholder: () => Placeholder2,
      SQL: () => SQL2,
      StringChunk: () => StringChunk2,
      View: () => View2,
      fillPlaceholders: () => fillPlaceholders,
      getViewName: () => getViewName,
      isDriverValueEncoder: () => isDriverValueEncoder2,
      isSQLWrapper: () => isSQLWrapper2,
      isView: () => isView,
      name: () => name,
      noopDecoder: () => noopDecoder2,
      noopEncoder: () => noopEncoder2,
      noopMapper: () => noopMapper2,
      param: () => param,
      placeholder: () => placeholder,
      sql: () => sql2
    });
    module2.exports = __toCommonJS(sql_exports);
    var import_entity22 = require_entity();
    var import_enum2 = require_enum();
    var import_subquery2 = require_subquery();
    var import_tracing2 = require_tracing();
    var import_view_common2 = require_view_common();
    var import_column5 = require_column();
    var import_table4 = require_table();
    var FakePrimitiveParam2 = class {
      static [import_entity22.entityKind] = "FakePrimitiveParam";
    };
    function isSQLWrapper2(value) {
      return value !== null && value !== void 0 && typeof value.getSQL === "function";
    }
    function mergeQueries2(queries) {
      const result = { sql: "", params: [] };
      for (const query of queries) {
        result.sql += query.sql;
        result.params.push(...query.params);
        if (query.typings?.length) {
          if (!result.typings) {
            result.typings = [];
          }
          result.typings.push(...query.typings);
        }
      }
      return result;
    }
    var StringChunk2 = class {
      static [import_entity22.entityKind] = "StringChunk";
      value;
      constructor(value) {
        this.value = Array.isArray(value) ? value : [value];
      }
      getSQL() {
        return new SQL2([this]);
      }
    };
    var SQL2 = class _SQL {
      constructor(queryChunks) {
        this.queryChunks = queryChunks;
        for (const chunk of queryChunks) {
          if ((0, import_entity22.is)(chunk, import_table4.Table)) {
            const schemaName = chunk[import_table4.Table.Symbol.Schema];
            this.usedTables.push(
              schemaName === void 0 ? chunk[import_table4.Table.Symbol.Name] : schemaName + "." + chunk[import_table4.Table.Symbol.Name]
            );
          }
        }
      }
      static [import_entity22.entityKind] = "SQL";
      /** @internal */
      decoder = noopDecoder2;
      shouldInlineParams = false;
      /** @internal */
      usedTables = [];
      append(query) {
        this.queryChunks.push(...query.queryChunks);
        return this;
      }
      toQuery(config) {
        return import_tracing2.tracer.startActiveSpan("drizzle.buildSQL", (span) => {
          const query = this.buildQueryFromSourceParams(this.queryChunks, config);
          span?.setAttributes({
            "drizzle.query.text": query.sql,
            "drizzle.query.params": JSON.stringify(query.params)
          });
          return query;
        });
      }
      buildQueryFromSourceParams(chunks, _config) {
        const config = Object.assign({}, _config, {
          inlineParams: _config.inlineParams || this.shouldInlineParams,
          paramStartIndex: _config.paramStartIndex || { value: 0 }
        });
        const {
          casing,
          escapeName,
          escapeParam,
          prepareTyping,
          inlineParams,
          paramStartIndex
        } = config;
        return mergeQueries2(chunks.map((chunk) => {
          if ((0, import_entity22.is)(chunk, StringChunk2)) {
            return { sql: chunk.value.join(""), params: [] };
          }
          if ((0, import_entity22.is)(chunk, Name2)) {
            return { sql: escapeName(chunk.value), params: [] };
          }
          if (chunk === void 0) {
            return { sql: "", params: [] };
          }
          if (Array.isArray(chunk)) {
            const result = [new StringChunk2("(")];
            for (const [i, p] of chunk.entries()) {
              result.push(p);
              if (i < chunk.length - 1) {
                result.push(new StringChunk2(", "));
              }
            }
            result.push(new StringChunk2(")"));
            return this.buildQueryFromSourceParams(result, config);
          }
          if ((0, import_entity22.is)(chunk, _SQL)) {
            return this.buildQueryFromSourceParams(chunk.queryChunks, {
              ...config,
              inlineParams: inlineParams || chunk.shouldInlineParams
            });
          }
          if ((0, import_entity22.is)(chunk, import_table4.Table)) {
            const schemaName = chunk[import_table4.Table.Symbol.Schema];
            const tableName = chunk[import_table4.Table.Symbol.Name];
            return {
              sql: schemaName === void 0 || chunk[import_table4.IsAlias] ? escapeName(tableName) : escapeName(schemaName) + "." + escapeName(tableName),
              params: []
            };
          }
          if ((0, import_entity22.is)(chunk, import_column5.Column)) {
            const columnName = casing.getColumnCasing(chunk);
            if (_config.invokeSource === "indexes") {
              return { sql: escapeName(columnName), params: [] };
            }
            const schemaName = chunk.table[import_table4.Table.Symbol.Schema];
            return {
              sql: chunk.table[import_table4.IsAlias] || schemaName === void 0 ? escapeName(chunk.table[import_table4.Table.Symbol.Name]) + "." + escapeName(columnName) : escapeName(schemaName) + "." + escapeName(chunk.table[import_table4.Table.Symbol.Name]) + "." + escapeName(columnName),
              params: []
            };
          }
          if ((0, import_entity22.is)(chunk, View2)) {
            const schemaName = chunk[import_view_common2.ViewBaseConfig].schema;
            const viewName = chunk[import_view_common2.ViewBaseConfig].name;
            return {
              sql: schemaName === void 0 || chunk[import_view_common2.ViewBaseConfig].isAlias ? escapeName(viewName) : escapeName(schemaName) + "." + escapeName(viewName),
              params: []
            };
          }
          if ((0, import_entity22.is)(chunk, Param2)) {
            if ((0, import_entity22.is)(chunk.value, Placeholder2)) {
              return { sql: escapeParam(paramStartIndex.value++, chunk), params: [chunk], typings: ["none"] };
            }
            const mappedValue = chunk.value === null ? null : chunk.encoder.mapToDriverValue(chunk.value);
            if ((0, import_entity22.is)(mappedValue, _SQL)) {
              return this.buildQueryFromSourceParams([mappedValue], config);
            }
            if (inlineParams) {
              return { sql: this.mapInlineParam(mappedValue, config), params: [] };
            }
            let typings = ["none"];
            if (prepareTyping) {
              typings = [prepareTyping(chunk.encoder)];
            }
            return { sql: escapeParam(paramStartIndex.value++, mappedValue), params: [mappedValue], typings };
          }
          if ((0, import_entity22.is)(chunk, Placeholder2)) {
            return { sql: escapeParam(paramStartIndex.value++, chunk), params: [chunk], typings: ["none"] };
          }
          if ((0, import_entity22.is)(chunk, _SQL.Aliased) && chunk.fieldAlias !== void 0) {
            return { sql: escapeName(chunk.fieldAlias), params: [] };
          }
          if ((0, import_entity22.is)(chunk, import_subquery2.Subquery)) {
            if (chunk._.isWith) {
              return { sql: escapeName(chunk._.alias), params: [] };
            }
            return this.buildQueryFromSourceParams([
              new StringChunk2("("),
              chunk._.sql,
              new StringChunk2(") "),
              new Name2(chunk._.alias)
            ], config);
          }
          if ((0, import_enum2.isPgEnum)(chunk)) {
            if (chunk.schema) {
              return { sql: escapeName(chunk.schema) + "." + escapeName(chunk.enumName), params: [] };
            }
            return { sql: escapeName(chunk.enumName), params: [] };
          }
          if (isSQLWrapper2(chunk)) {
            if (chunk.shouldOmitSQLParens?.()) {
              return this.buildQueryFromSourceParams([chunk.getSQL()], config);
            }
            return this.buildQueryFromSourceParams([
              new StringChunk2("("),
              chunk.getSQL(),
              new StringChunk2(")")
            ], config);
          }
          if (inlineParams) {
            return { sql: this.mapInlineParam(chunk, config), params: [] };
          }
          return { sql: escapeParam(paramStartIndex.value++, chunk), params: [chunk], typings: ["none"] };
        }));
      }
      mapInlineParam(chunk, { escapeString }) {
        if (chunk === null) {
          return "null";
        }
        if (typeof chunk === "number" || typeof chunk === "boolean") {
          return chunk.toString();
        }
        if (typeof chunk === "string") {
          return escapeString(chunk);
        }
        if (typeof chunk === "object") {
          const mappedValueAsString = chunk.toString();
          if (mappedValueAsString === "[object Object]") {
            return escapeString(JSON.stringify(chunk));
          }
          return escapeString(mappedValueAsString);
        }
        throw new Error("Unexpected param value: " + chunk);
      }
      getSQL() {
        return this;
      }
      as(alias) {
        if (alias === void 0) {
          return this;
        }
        return new _SQL.Aliased(this, alias);
      }
      mapWith(decoder) {
        this.decoder = typeof decoder === "function" ? { mapFromDriverValue: decoder } : decoder;
        return this;
      }
      inlineParams() {
        this.shouldInlineParams = true;
        return this;
      }
      /**
       * This method is used to conditionally include a part of the query.
       *
       * @param condition - Condition to check
       * @returns itself if the condition is `true`, otherwise `undefined`
       */
      if(condition) {
        return condition ? this : void 0;
      }
    };
    var Name2 = class {
      constructor(value) {
        this.value = value;
      }
      static [import_entity22.entityKind] = "Name";
      brand;
      getSQL() {
        return new SQL2([this]);
      }
    };
    function name(value) {
      return new Name2(value);
    }
    function isDriverValueEncoder2(value) {
      return typeof value === "object" && value !== null && "mapToDriverValue" in value && typeof value.mapToDriverValue === "function";
    }
    var noopDecoder2 = {
      mapFromDriverValue: (value) => value
    };
    var noopEncoder2 = {
      mapToDriverValue: (value) => value
    };
    var noopMapper2 = {
      ...noopDecoder2,
      ...noopEncoder2
    };
    var Param2 = class {
      /**
       * @param value - Parameter value
       * @param encoder - Encoder to convert the value to a driver parameter
       */
      constructor(value, encoder = noopEncoder2) {
        this.value = value;
        this.encoder = encoder;
      }
      static [import_entity22.entityKind] = "Param";
      brand;
      getSQL() {
        return new SQL2([this]);
      }
    };
    function param(value, encoder) {
      return new Param2(value, encoder);
    }
    function sql2(strings, ...params) {
      const queryChunks = [];
      if (params.length > 0 || strings.length > 0 && strings[0] !== "") {
        queryChunks.push(new StringChunk2(strings[0]));
      }
      for (const [paramIndex, param2] of params.entries()) {
        queryChunks.push(param2, new StringChunk2(strings[paramIndex + 1]));
      }
      return new SQL2(queryChunks);
    }
    ((sql22) => {
      function empty() {
        return new SQL2([]);
      }
      sql22.empty = empty;
      function fromList(list) {
        return new SQL2(list);
      }
      sql22.fromList = fromList;
      function raw(str) {
        return new SQL2([new StringChunk2(str)]);
      }
      sql22.raw = raw;
      function join3(chunks, separator) {
        const result = [];
        for (const [i, chunk] of chunks.entries()) {
          if (i > 0 && separator !== void 0) {
            result.push(separator);
          }
          result.push(chunk);
        }
        return new SQL2(result);
      }
      sql22.join = join3;
      function identifier(value) {
        return new Name2(value);
      }
      sql22.identifier = identifier;
      function placeholder2(name2) {
        return new Placeholder2(name2);
      }
      sql22.placeholder = placeholder2;
      function param2(value, encoder) {
        return new Param2(value, encoder);
      }
      sql22.param = param2;
    })(sql2 || (sql2 = {}));
    ((SQL22) => {
      class Aliased {
        constructor(sql22, fieldAlias) {
          this.sql = sql22;
          this.fieldAlias = fieldAlias;
        }
        static [import_entity22.entityKind] = "SQL.Aliased";
        /** @internal */
        isSelectionField = false;
        getSQL() {
          return this.sql;
        }
        /** @internal */
        clone() {
          return new Aliased(this.sql, this.fieldAlias);
        }
      }
      SQL22.Aliased = Aliased;
    })(SQL2 || (SQL2 = {}));
    var Placeholder2 = class {
      constructor(name2) {
        this.name = name2;
      }
      static [import_entity22.entityKind] = "Placeholder";
      getSQL() {
        return new SQL2([this]);
      }
    };
    function placeholder(name2) {
      return new Placeholder2(name2);
    }
    function fillPlaceholders(params, values) {
      return params.map((p) => {
        if ((0, import_entity22.is)(p, Placeholder2)) {
          if (!(p.name in values)) {
            throw new Error(`No value for placeholder "${p.name}" was provided`);
          }
          return values[p.name];
        }
        if ((0, import_entity22.is)(p, Param2) && (0, import_entity22.is)(p.value, Placeholder2)) {
          if (!(p.value.name in values)) {
            throw new Error(`No value for placeholder "${p.value.name}" was provided`);
          }
          return p.encoder.mapToDriverValue(values[p.value.name]);
        }
        return p;
      });
    }
    var IsDrizzleView2 = Symbol.for("drizzle:IsDrizzleView");
    var View2 = class {
      static [import_entity22.entityKind] = "View";
      /** @internal */
      [import_view_common2.ViewBaseConfig];
      /** @internal */
      [IsDrizzleView2] = true;
      constructor({ name: name2, schema, selectedFields, query }) {
        this[import_view_common2.ViewBaseConfig] = {
          name: name2,
          originalName: name2,
          schema,
          selectedFields,
          query,
          isExisting: !query,
          isAlias: false
        };
      }
      getSQL() {
        return new SQL2([this]);
      }
    };
    function isView(view) {
      return typeof view === "object" && view !== null && IsDrizzleView2 in view;
    }
    function getViewName(view) {
      return view[import_view_common2.ViewBaseConfig].name;
    }
    import_column5.Column.prototype.getSQL = function() {
      return new SQL2([this]);
    };
    import_table4.Table.prototype.getSQL = function() {
      return new SQL2([this]);
    };
    import_subquery2.Subquery.prototype.getSQL = function() {
      return new SQL2([this]);
    };
  }
});

// node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/utils.cjs
var require_utils = __commonJS({
  "node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/utils.cjs"(exports2, module2) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc2) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc2 = __getOwnPropDesc2(from, key)) || desc2.enumerable });
      }
      return to;
    };
    var __toCommonJS = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var utils_exports = {};
    __export2(utils_exports, {
      applyMixins: () => applyMixins,
      getColumnNameAndConfig: () => getColumnNameAndConfig2,
      getTableColumns: () => getTableColumns,
      getTableLikeName: () => getTableLikeName,
      getViewSelectedFields: () => getViewSelectedFields,
      haveSameKeys: () => haveSameKeys,
      isConfig: () => isConfig,
      mapResultRow: () => mapResultRow,
      mapUpdateSet: () => mapUpdateSet,
      orderSelectedFields: () => orderSelectedFields,
      textDecoder: () => textDecoder2
    });
    module2.exports = __toCommonJS(utils_exports);
    var import_column5 = require_column();
    var import_entity22 = require_entity();
    var import_sql4 = require_sql();
    var import_subquery2 = require_subquery();
    var import_table4 = require_table();
    var import_view_common2 = require_view_common();
    function mapResultRow(columns, row, joinsNotNullableMap) {
      const nullifyMap = {};
      const result = columns.reduce(
        (result2, { path: path2, field }, columnIndex) => {
          let decoder;
          if ((0, import_entity22.is)(field, import_column5.Column)) {
            decoder = field;
          } else if ((0, import_entity22.is)(field, import_sql4.SQL)) {
            decoder = field.decoder;
          } else if ((0, import_entity22.is)(field, import_subquery2.Subquery)) {
            decoder = field._.sql.decoder;
          } else {
            decoder = field.sql.decoder;
          }
          let node = result2;
          for (const [pathChunkIndex, pathChunk] of path2.entries()) {
            if (pathChunkIndex < path2.length - 1) {
              if (!(pathChunk in node)) {
                node[pathChunk] = {};
              }
              node = node[pathChunk];
            } else {
              const rawValue = row[columnIndex];
              const value = node[pathChunk] = rawValue === null ? null : decoder.mapFromDriverValue(rawValue);
              if (joinsNotNullableMap && (0, import_entity22.is)(field, import_column5.Column) && path2.length === 2) {
                const objectName = path2[0];
                if (!(objectName in nullifyMap)) {
                  nullifyMap[objectName] = value === null ? (0, import_table4.getTableName)(field.table) : false;
                } else if (typeof nullifyMap[objectName] === "string" && nullifyMap[objectName] !== (0, import_table4.getTableName)(field.table)) {
                  nullifyMap[objectName] = false;
                }
              }
            }
          }
          return result2;
        },
        {}
      );
      if (joinsNotNullableMap && Object.keys(nullifyMap).length > 0) {
        for (const [objectName, tableName] of Object.entries(nullifyMap)) {
          if (typeof tableName === "string" && !joinsNotNullableMap[tableName]) {
            result[objectName] = null;
          }
        }
      }
      return result;
    }
    function orderSelectedFields(fields, pathPrefix) {
      return Object.entries(fields).reduce((result, [name, field]) => {
        if (typeof name !== "string") {
          return result;
        }
        const newPath = pathPrefix ? [...pathPrefix, name] : [name];
        if ((0, import_entity22.is)(field, import_column5.Column) || (0, import_entity22.is)(field, import_sql4.SQL) || (0, import_entity22.is)(field, import_sql4.SQL.Aliased) || (0, import_entity22.is)(field, import_subquery2.Subquery)) {
          result.push({ path: newPath, field });
        } else if ((0, import_entity22.is)(field, import_table4.Table)) {
          result.push(...orderSelectedFields(field[import_table4.Table.Symbol.Columns], newPath));
        } else {
          result.push(...orderSelectedFields(field, newPath));
        }
        return result;
      }, []);
    }
    function haveSameKeys(left, right) {
      const leftKeys = Object.keys(left);
      const rightKeys = Object.keys(right);
      if (leftKeys.length !== rightKeys.length) {
        return false;
      }
      for (const [index2, key] of leftKeys.entries()) {
        if (key !== rightKeys[index2]) {
          return false;
        }
      }
      return true;
    }
    function mapUpdateSet(table, values) {
      const entries = Object.entries(values).filter(([, value]) => value !== void 0).map(([key, value]) => {
        if ((0, import_entity22.is)(value, import_sql4.SQL) || (0, import_entity22.is)(value, import_column5.Column)) {
          return [key, value];
        } else {
          return [key, new import_sql4.Param(value, table[import_table4.Table.Symbol.Columns][key])];
        }
      });
      if (entries.length === 0) {
        throw new Error("No values to set");
      }
      return Object.fromEntries(entries);
    }
    function applyMixins(baseClass, extendedClasses) {
      for (const extendedClass of extendedClasses) {
        for (const name of Object.getOwnPropertyNames(extendedClass.prototype)) {
          if (name === "constructor") continue;
          Object.defineProperty(
            baseClass.prototype,
            name,
            Object.getOwnPropertyDescriptor(extendedClass.prototype, name) || /* @__PURE__ */ Object.create(null)
          );
        }
      }
    }
    function getTableColumns(table) {
      return table[import_table4.Table.Symbol.Columns];
    }
    function getViewSelectedFields(view) {
      return view[import_view_common2.ViewBaseConfig].selectedFields;
    }
    function getTableLikeName(table) {
      return (0, import_entity22.is)(table, import_subquery2.Subquery) ? table._.alias : (0, import_entity22.is)(table, import_sql4.View) ? table[import_view_common2.ViewBaseConfig].name : (0, import_entity22.is)(table, import_sql4.SQL) ? void 0 : table[import_table4.Table.Symbol.IsAlias] ? table[import_table4.Table.Symbol.Name] : table[import_table4.Table.Symbol.BaseName];
    }
    function getColumnNameAndConfig2(a, b) {
      return {
        name: typeof a === "string" && a.length > 0 ? a : "",
        config: typeof a === "object" ? a : b
      };
    }
    function isConfig(data) {
      if (typeof data !== "object" || data === null) return false;
      if (data.constructor.name !== "Object") return false;
      if ("logger" in data) {
        const type = typeof data["logger"];
        if (type !== "boolean" && (type !== "object" || typeof data["logger"]["logQuery"] !== "function") && type !== "undefined") return false;
        return true;
      }
      if ("schema" in data) {
        const type = typeof data["schema"];
        if (type !== "object" && type !== "undefined") return false;
        return true;
      }
      if ("casing" in data) {
        const type = typeof data["casing"];
        if (type !== "string" && type !== "undefined") return false;
        return true;
      }
      if ("mode" in data) {
        if (data["mode"] !== "default" || data["mode"] !== "planetscale" || data["mode"] !== void 0) return false;
        return true;
      }
      if ("connection" in data) {
        const type = typeof data["connection"];
        if (type !== "string" && type !== "object" && type !== "undefined") return false;
        return true;
      }
      if ("client" in data) {
        const type = typeof data["client"];
        if (type !== "object" && type !== "function" && type !== "undefined") return false;
        return true;
      }
      if (Object.keys(data).length === 0) return true;
      return false;
    }
    var textDecoder2 = typeof TextDecoder === "undefined" ? null : new TextDecoder();
  }
});

// node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/pg-core/columns/int.common.cjs
var require_int_common = __commonJS({
  "node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/pg-core/columns/int.common.cjs"(exports2, module2) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc2) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc2 = __getOwnPropDesc2(from, key)) || desc2.enumerable });
      }
      return to;
    };
    var __toCommonJS = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var int_common_exports = {};
    __export2(int_common_exports, {
      PgIntColumnBaseBuilder: () => PgIntColumnBaseBuilder
    });
    module2.exports = __toCommonJS(int_common_exports);
    var import_entity22 = require_entity();
    var import_common8 = require_common();
    var PgIntColumnBaseBuilder = class extends import_common8.PgColumnBuilder {
      static [import_entity22.entityKind] = "PgIntColumnBaseBuilder";
      generatedAlwaysAsIdentity(sequence) {
        if (sequence) {
          const { name, ...options } = sequence;
          this.config.generatedIdentity = {
            type: "always",
            sequenceName: name,
            sequenceOptions: options
          };
        } else {
          this.config.generatedIdentity = {
            type: "always"
          };
        }
        this.config.hasDefault = true;
        this.config.notNull = true;
        return this;
      }
      generatedByDefaultAsIdentity(sequence) {
        if (sequence) {
          const { name, ...options } = sequence;
          this.config.generatedIdentity = {
            type: "byDefault",
            sequenceName: name,
            sequenceOptions: options
          };
        } else {
          this.config.generatedIdentity = {
            type: "byDefault"
          };
        }
        this.config.hasDefault = true;
        this.config.notNull = true;
        return this;
      }
    };
  }
});

// node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/pg-core/columns/bigint.cjs
var require_bigint = __commonJS({
  "node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/pg-core/columns/bigint.cjs"(exports2, module2) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc2) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc2 = __getOwnPropDesc2(from, key)) || desc2.enumerable });
      }
      return to;
    };
    var __toCommonJS = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var bigint_exports = {};
    __export2(bigint_exports, {
      PgBigInt53: () => PgBigInt53,
      PgBigInt53Builder: () => PgBigInt53Builder,
      PgBigInt64: () => PgBigInt64,
      PgBigInt64Builder: () => PgBigInt64Builder,
      bigint: () => bigint
    });
    module2.exports = __toCommonJS(bigint_exports);
    var import_entity22 = require_entity();
    var import_utils6 = require_utils();
    var import_common8 = require_common();
    var import_int_common = require_int_common();
    var PgBigInt53Builder = class extends import_int_common.PgIntColumnBaseBuilder {
      static [import_entity22.entityKind] = "PgBigInt53Builder";
      constructor(name) {
        super(name, "number", "PgBigInt53");
      }
      /** @internal */
      build(table) {
        return new PgBigInt53(table, this.config);
      }
    };
    var PgBigInt53 = class extends import_common8.PgColumn {
      static [import_entity22.entityKind] = "PgBigInt53";
      getSQLType() {
        return "bigint";
      }
      mapFromDriverValue(value) {
        if (typeof value === "number") {
          return value;
        }
        return Number(value);
      }
    };
    var PgBigInt64Builder = class extends import_int_common.PgIntColumnBaseBuilder {
      static [import_entity22.entityKind] = "PgBigInt64Builder";
      constructor(name) {
        super(name, "bigint", "PgBigInt64");
      }
      /** @internal */
      build(table) {
        return new PgBigInt64(
          table,
          this.config
        );
      }
    };
    var PgBigInt64 = class extends import_common8.PgColumn {
      static [import_entity22.entityKind] = "PgBigInt64";
      getSQLType() {
        return "bigint";
      }
      // eslint-disable-next-line unicorn/prefer-native-coercion-functions
      mapFromDriverValue(value) {
        return BigInt(value);
      }
    };
    function bigint(a, b) {
      const { name, config } = (0, import_utils6.getColumnNameAndConfig)(a, b);
      if (config.mode === "number") {
        return new PgBigInt53Builder(name);
      }
      return new PgBigInt64Builder(name);
    }
  }
});

// node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/pg-core/columns/bigserial.cjs
var require_bigserial = __commonJS({
  "node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/pg-core/columns/bigserial.cjs"(exports2, module2) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc2) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc2 = __getOwnPropDesc2(from, key)) || desc2.enumerable });
      }
      return to;
    };
    var __toCommonJS = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var bigserial_exports = {};
    __export2(bigserial_exports, {
      PgBigSerial53: () => PgBigSerial53,
      PgBigSerial53Builder: () => PgBigSerial53Builder,
      PgBigSerial64: () => PgBigSerial64,
      PgBigSerial64Builder: () => PgBigSerial64Builder,
      bigserial: () => bigserial
    });
    module2.exports = __toCommonJS(bigserial_exports);
    var import_entity22 = require_entity();
    var import_utils6 = require_utils();
    var import_common8 = require_common();
    var PgBigSerial53Builder = class extends import_common8.PgColumnBuilder {
      static [import_entity22.entityKind] = "PgBigSerial53Builder";
      constructor(name) {
        super(name, "number", "PgBigSerial53");
        this.config.hasDefault = true;
        this.config.notNull = true;
      }
      /** @internal */
      build(table) {
        return new PgBigSerial53(
          table,
          this.config
        );
      }
    };
    var PgBigSerial53 = class extends import_common8.PgColumn {
      static [import_entity22.entityKind] = "PgBigSerial53";
      getSQLType() {
        return "bigserial";
      }
      mapFromDriverValue(value) {
        if (typeof value === "number") {
          return value;
        }
        return Number(value);
      }
    };
    var PgBigSerial64Builder = class extends import_common8.PgColumnBuilder {
      static [import_entity22.entityKind] = "PgBigSerial64Builder";
      constructor(name) {
        super(name, "bigint", "PgBigSerial64");
        this.config.hasDefault = true;
      }
      /** @internal */
      build(table) {
        return new PgBigSerial64(
          table,
          this.config
        );
      }
    };
    var PgBigSerial64 = class extends import_common8.PgColumn {
      static [import_entity22.entityKind] = "PgBigSerial64";
      getSQLType() {
        return "bigserial";
      }
      // eslint-disable-next-line unicorn/prefer-native-coercion-functions
      mapFromDriverValue(value) {
        return BigInt(value);
      }
    };
    function bigserial(a, b) {
      const { name, config } = (0, import_utils6.getColumnNameAndConfig)(a, b);
      if (config.mode === "number") {
        return new PgBigSerial53Builder(name);
      }
      return new PgBigSerial64Builder(name);
    }
  }
});

// node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/pg-core/columns/boolean.cjs
var require_boolean = __commonJS({
  "node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/pg-core/columns/boolean.cjs"(exports2, module2) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc2) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc2 = __getOwnPropDesc2(from, key)) || desc2.enumerable });
      }
      return to;
    };
    var __toCommonJS = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var boolean_exports = {};
    __export2(boolean_exports, {
      PgBoolean: () => PgBoolean,
      PgBooleanBuilder: () => PgBooleanBuilder,
      boolean: () => boolean
    });
    module2.exports = __toCommonJS(boolean_exports);
    var import_entity22 = require_entity();
    var import_common8 = require_common();
    var PgBooleanBuilder = class extends import_common8.PgColumnBuilder {
      static [import_entity22.entityKind] = "PgBooleanBuilder";
      constructor(name) {
        super(name, "boolean", "PgBoolean");
      }
      /** @internal */
      build(table) {
        return new PgBoolean(table, this.config);
      }
    };
    var PgBoolean = class extends import_common8.PgColumn {
      static [import_entity22.entityKind] = "PgBoolean";
      getSQLType() {
        return "boolean";
      }
    };
    function boolean(name) {
      return new PgBooleanBuilder(name ?? "");
    }
  }
});

// node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/pg-core/columns/char.cjs
var require_char = __commonJS({
  "node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/pg-core/columns/char.cjs"(exports2, module2) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc2) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc2 = __getOwnPropDesc2(from, key)) || desc2.enumerable });
      }
      return to;
    };
    var __toCommonJS = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var char_exports = {};
    __export2(char_exports, {
      PgChar: () => PgChar,
      PgCharBuilder: () => PgCharBuilder,
      char: () => char
    });
    module2.exports = __toCommonJS(char_exports);
    var import_entity22 = require_entity();
    var import_utils6 = require_utils();
    var import_common8 = require_common();
    var PgCharBuilder = class extends import_common8.PgColumnBuilder {
      static [import_entity22.entityKind] = "PgCharBuilder";
      constructor(name, config) {
        super(name, "string", "PgChar");
        this.config.length = config.length;
        this.config.enumValues = config.enum;
      }
      /** @internal */
      build(table) {
        return new PgChar(
          table,
          this.config
        );
      }
    };
    var PgChar = class extends import_common8.PgColumn {
      static [import_entity22.entityKind] = "PgChar";
      length = this.config.length;
      enumValues = this.config.enumValues;
      getSQLType() {
        return this.length === void 0 ? `char` : `char(${this.length})`;
      }
    };
    function char(a, b = {}) {
      const { name, config } = (0, import_utils6.getColumnNameAndConfig)(a, b);
      return new PgCharBuilder(name, config);
    }
  }
});

// node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/pg-core/columns/cidr.cjs
var require_cidr = __commonJS({
  "node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/pg-core/columns/cidr.cjs"(exports2, module2) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc2) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc2 = __getOwnPropDesc2(from, key)) || desc2.enumerable });
      }
      return to;
    };
    var __toCommonJS = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var cidr_exports = {};
    __export2(cidr_exports, {
      PgCidr: () => PgCidr,
      PgCidrBuilder: () => PgCidrBuilder,
      cidr: () => cidr
    });
    module2.exports = __toCommonJS(cidr_exports);
    var import_entity22 = require_entity();
    var import_common8 = require_common();
    var PgCidrBuilder = class extends import_common8.PgColumnBuilder {
      static [import_entity22.entityKind] = "PgCidrBuilder";
      constructor(name) {
        super(name, "string", "PgCidr");
      }
      /** @internal */
      build(table) {
        return new PgCidr(table, this.config);
      }
    };
    var PgCidr = class extends import_common8.PgColumn {
      static [import_entity22.entityKind] = "PgCidr";
      getSQLType() {
        return "cidr";
      }
    };
    function cidr(name) {
      return new PgCidrBuilder(name ?? "");
    }
  }
});

// node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/pg-core/columns/custom.cjs
var require_custom = __commonJS({
  "node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/pg-core/columns/custom.cjs"(exports2, module2) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc2) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc2 = __getOwnPropDesc2(from, key)) || desc2.enumerable });
      }
      return to;
    };
    var __toCommonJS = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var custom_exports = {};
    __export2(custom_exports, {
      PgCustomColumn: () => PgCustomColumn,
      PgCustomColumnBuilder: () => PgCustomColumnBuilder,
      customType: () => customType2
    });
    module2.exports = __toCommonJS(custom_exports);
    var import_entity22 = require_entity();
    var import_utils6 = require_utils();
    var import_common8 = require_common();
    var PgCustomColumnBuilder = class extends import_common8.PgColumnBuilder {
      static [import_entity22.entityKind] = "PgCustomColumnBuilder";
      constructor(name, fieldConfig, customTypeParams) {
        super(name, "custom", "PgCustomColumn");
        this.config.fieldConfig = fieldConfig;
        this.config.customTypeParams = customTypeParams;
      }
      /** @internal */
      build(table) {
        return new PgCustomColumn(
          table,
          this.config
        );
      }
    };
    var PgCustomColumn = class extends import_common8.PgColumn {
      static [import_entity22.entityKind] = "PgCustomColumn";
      sqlName;
      mapTo;
      mapFrom;
      constructor(table, config) {
        super(table, config);
        this.sqlName = config.customTypeParams.dataType(config.fieldConfig);
        this.mapTo = config.customTypeParams.toDriver;
        this.mapFrom = config.customTypeParams.fromDriver;
      }
      getSQLType() {
        return this.sqlName;
      }
      mapFromDriverValue(value) {
        return typeof this.mapFrom === "function" ? this.mapFrom(value) : value;
      }
      mapToDriverValue(value) {
        return typeof this.mapTo === "function" ? this.mapTo(value) : value;
      }
    };
    function customType2(customTypeParams) {
      return (a, b) => {
        const { name, config } = (0, import_utils6.getColumnNameAndConfig)(a, b);
        return new PgCustomColumnBuilder(name, config, customTypeParams);
      };
    }
  }
});

// node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/pg-core/columns/date.common.cjs
var require_date_common = __commonJS({
  "node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/pg-core/columns/date.common.cjs"(exports2, module2) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc2) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc2 = __getOwnPropDesc2(from, key)) || desc2.enumerable });
      }
      return to;
    };
    var __toCommonJS = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var date_common_exports = {};
    __export2(date_common_exports, {
      PgDateColumnBaseBuilder: () => PgDateColumnBaseBuilder
    });
    module2.exports = __toCommonJS(date_common_exports);
    var import_entity22 = require_entity();
    var import_sql4 = require_sql();
    var import_common8 = require_common();
    var PgDateColumnBaseBuilder = class extends import_common8.PgColumnBuilder {
      static [import_entity22.entityKind] = "PgDateColumnBaseBuilder";
      defaultNow() {
        return this.default(import_sql4.sql`now()`);
      }
    };
  }
});

// node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/pg-core/columns/date.cjs
var require_date = __commonJS({
  "node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/pg-core/columns/date.cjs"(exports2, module2) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc2) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc2 = __getOwnPropDesc2(from, key)) || desc2.enumerable });
      }
      return to;
    };
    var __toCommonJS = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var date_exports = {};
    __export2(date_exports, {
      PgDate: () => PgDate,
      PgDateBuilder: () => PgDateBuilder,
      PgDateString: () => PgDateString,
      PgDateStringBuilder: () => PgDateStringBuilder,
      date: () => date
    });
    module2.exports = __toCommonJS(date_exports);
    var import_entity22 = require_entity();
    var import_utils6 = require_utils();
    var import_common8 = require_common();
    var import_date_common = require_date_common();
    var PgDateBuilder = class extends import_date_common.PgDateColumnBaseBuilder {
      static [import_entity22.entityKind] = "PgDateBuilder";
      constructor(name) {
        super(name, "date", "PgDate");
      }
      /** @internal */
      build(table) {
        return new PgDate(table, this.config);
      }
    };
    var PgDate = class extends import_common8.PgColumn {
      static [import_entity22.entityKind] = "PgDate";
      getSQLType() {
        return "date";
      }
      mapFromDriverValue(value) {
        if (typeof value === "string") return new Date(value);
        return value;
      }
      mapToDriverValue(value) {
        return value.toISOString();
      }
    };
    var PgDateStringBuilder = class extends import_date_common.PgDateColumnBaseBuilder {
      static [import_entity22.entityKind] = "PgDateStringBuilder";
      constructor(name) {
        super(name, "string", "PgDateString");
      }
      /** @internal */
      build(table) {
        return new PgDateString(
          table,
          this.config
        );
      }
    };
    var PgDateString = class extends import_common8.PgColumn {
      static [import_entity22.entityKind] = "PgDateString";
      getSQLType() {
        return "date";
      }
      mapFromDriverValue(value) {
        if (typeof value === "string") return value;
        return value.toISOString().slice(0, -14);
      }
    };
    function date(a, b) {
      const { name, config } = (0, import_utils6.getColumnNameAndConfig)(a, b);
      if (config?.mode === "date") {
        return new PgDateBuilder(name);
      }
      return new PgDateStringBuilder(name);
    }
  }
});

// node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/pg-core/columns/double-precision.cjs
var require_double_precision = __commonJS({
  "node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/pg-core/columns/double-precision.cjs"(exports2, module2) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc2) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc2 = __getOwnPropDesc2(from, key)) || desc2.enumerable });
      }
      return to;
    };
    var __toCommonJS = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var double_precision_exports = {};
    __export2(double_precision_exports, {
      PgDoublePrecision: () => PgDoublePrecision,
      PgDoublePrecisionBuilder: () => PgDoublePrecisionBuilder,
      doublePrecision: () => doublePrecision
    });
    module2.exports = __toCommonJS(double_precision_exports);
    var import_entity22 = require_entity();
    var import_common8 = require_common();
    var PgDoublePrecisionBuilder = class extends import_common8.PgColumnBuilder {
      static [import_entity22.entityKind] = "PgDoublePrecisionBuilder";
      constructor(name) {
        super(name, "number", "PgDoublePrecision");
      }
      /** @internal */
      build(table) {
        return new PgDoublePrecision(
          table,
          this.config
        );
      }
    };
    var PgDoublePrecision = class extends import_common8.PgColumn {
      static [import_entity22.entityKind] = "PgDoublePrecision";
      getSQLType() {
        return "double precision";
      }
      mapFromDriverValue(value) {
        if (typeof value === "string") {
          return Number.parseFloat(value);
        }
        return value;
      }
    };
    function doublePrecision(name) {
      return new PgDoublePrecisionBuilder(name ?? "");
    }
  }
});

// node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/pg-core/columns/inet.cjs
var require_inet = __commonJS({
  "node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/pg-core/columns/inet.cjs"(exports2, module2) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc2) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc2 = __getOwnPropDesc2(from, key)) || desc2.enumerable });
      }
      return to;
    };
    var __toCommonJS = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var inet_exports = {};
    __export2(inet_exports, {
      PgInet: () => PgInet,
      PgInetBuilder: () => PgInetBuilder,
      inet: () => inet
    });
    module2.exports = __toCommonJS(inet_exports);
    var import_entity22 = require_entity();
    var import_common8 = require_common();
    var PgInetBuilder = class extends import_common8.PgColumnBuilder {
      static [import_entity22.entityKind] = "PgInetBuilder";
      constructor(name) {
        super(name, "string", "PgInet");
      }
      /** @internal */
      build(table) {
        return new PgInet(table, this.config);
      }
    };
    var PgInet = class extends import_common8.PgColumn {
      static [import_entity22.entityKind] = "PgInet";
      getSQLType() {
        return "inet";
      }
    };
    function inet(name) {
      return new PgInetBuilder(name ?? "");
    }
  }
});

// node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/pg-core/columns/integer.cjs
var require_integer = __commonJS({
  "node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/pg-core/columns/integer.cjs"(exports2, module2) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc2) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc2 = __getOwnPropDesc2(from, key)) || desc2.enumerable });
      }
      return to;
    };
    var __toCommonJS = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var integer_exports = {};
    __export2(integer_exports, {
      PgInteger: () => PgInteger,
      PgIntegerBuilder: () => PgIntegerBuilder,
      integer: () => integer2
    });
    module2.exports = __toCommonJS(integer_exports);
    var import_entity22 = require_entity();
    var import_common8 = require_common();
    var import_int_common = require_int_common();
    var PgIntegerBuilder = class extends import_int_common.PgIntColumnBaseBuilder {
      static [import_entity22.entityKind] = "PgIntegerBuilder";
      constructor(name) {
        super(name, "number", "PgInteger");
      }
      /** @internal */
      build(table) {
        return new PgInteger(table, this.config);
      }
    };
    var PgInteger = class extends import_common8.PgColumn {
      static [import_entity22.entityKind] = "PgInteger";
      getSQLType() {
        return "integer";
      }
      mapFromDriverValue(value) {
        if (typeof value === "string") {
          return Number.parseInt(value);
        }
        return value;
      }
    };
    function integer2(name) {
      return new PgIntegerBuilder(name ?? "");
    }
  }
});

// node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/pg-core/columns/interval.cjs
var require_interval = __commonJS({
  "node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/pg-core/columns/interval.cjs"(exports2, module2) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc2) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc2 = __getOwnPropDesc2(from, key)) || desc2.enumerable });
      }
      return to;
    };
    var __toCommonJS = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var interval_exports = {};
    __export2(interval_exports, {
      PgInterval: () => PgInterval,
      PgIntervalBuilder: () => PgIntervalBuilder,
      interval: () => interval
    });
    module2.exports = __toCommonJS(interval_exports);
    var import_entity22 = require_entity();
    var import_utils6 = require_utils();
    var import_common8 = require_common();
    var PgIntervalBuilder = class extends import_common8.PgColumnBuilder {
      static [import_entity22.entityKind] = "PgIntervalBuilder";
      constructor(name, intervalConfig) {
        super(name, "string", "PgInterval");
        this.config.intervalConfig = intervalConfig;
      }
      /** @internal */
      build(table) {
        return new PgInterval(table, this.config);
      }
    };
    var PgInterval = class extends import_common8.PgColumn {
      static [import_entity22.entityKind] = "PgInterval";
      fields = this.config.intervalConfig.fields;
      precision = this.config.intervalConfig.precision;
      getSQLType() {
        const fields = this.fields ? ` ${this.fields}` : "";
        const precision = this.precision ? `(${this.precision})` : "";
        return `interval${fields}${precision}`;
      }
    };
    function interval(a, b = {}) {
      const { name, config } = (0, import_utils6.getColumnNameAndConfig)(a, b);
      return new PgIntervalBuilder(name, config);
    }
  }
});

// node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/pg-core/columns/json.cjs
var require_json = __commonJS({
  "node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/pg-core/columns/json.cjs"(exports2, module2) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc2) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc2 = __getOwnPropDesc2(from, key)) || desc2.enumerable });
      }
      return to;
    };
    var __toCommonJS = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var json_exports = {};
    __export2(json_exports, {
      PgJson: () => PgJson,
      PgJsonBuilder: () => PgJsonBuilder,
      json: () => json
    });
    module2.exports = __toCommonJS(json_exports);
    var import_entity22 = require_entity();
    var import_common8 = require_common();
    var PgJsonBuilder = class extends import_common8.PgColumnBuilder {
      static [import_entity22.entityKind] = "PgJsonBuilder";
      constructor(name) {
        super(name, "json", "PgJson");
      }
      /** @internal */
      build(table) {
        return new PgJson(table, this.config);
      }
    };
    var PgJson = class extends import_common8.PgColumn {
      static [import_entity22.entityKind] = "PgJson";
      constructor(table, config) {
        super(table, config);
      }
      getSQLType() {
        return "json";
      }
      mapToDriverValue(value) {
        return JSON.stringify(value);
      }
      mapFromDriverValue(value) {
        if (typeof value === "string") {
          try {
            return JSON.parse(value);
          } catch {
            return value;
          }
        }
        return value;
      }
    };
    function json(name) {
      return new PgJsonBuilder(name ?? "");
    }
  }
});

// node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/pg-core/columns/jsonb.cjs
var require_jsonb = __commonJS({
  "node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/pg-core/columns/jsonb.cjs"(exports2, module2) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc2) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc2 = __getOwnPropDesc2(from, key)) || desc2.enumerable });
      }
      return to;
    };
    var __toCommonJS = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var jsonb_exports = {};
    __export2(jsonb_exports, {
      PgJsonb: () => PgJsonb,
      PgJsonbBuilder: () => PgJsonbBuilder,
      jsonb: () => jsonb
    });
    module2.exports = __toCommonJS(jsonb_exports);
    var import_entity22 = require_entity();
    var import_common8 = require_common();
    var PgJsonbBuilder = class extends import_common8.PgColumnBuilder {
      static [import_entity22.entityKind] = "PgJsonbBuilder";
      constructor(name) {
        super(name, "json", "PgJsonb");
      }
      /** @internal */
      build(table) {
        return new PgJsonb(table, this.config);
      }
    };
    var PgJsonb = class extends import_common8.PgColumn {
      static [import_entity22.entityKind] = "PgJsonb";
      constructor(table, config) {
        super(table, config);
      }
      getSQLType() {
        return "jsonb";
      }
      mapToDriverValue(value) {
        return JSON.stringify(value);
      }
      mapFromDriverValue(value) {
        if (typeof value === "string") {
          try {
            return JSON.parse(value);
          } catch {
            return value;
          }
        }
        return value;
      }
    };
    function jsonb(name) {
      return new PgJsonbBuilder(name ?? "");
    }
  }
});

// node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/pg-core/columns/line.cjs
var require_line = __commonJS({
  "node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/pg-core/columns/line.cjs"(exports2, module2) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc2) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc2 = __getOwnPropDesc2(from, key)) || desc2.enumerable });
      }
      return to;
    };
    var __toCommonJS = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var line_exports = {};
    __export2(line_exports, {
      PgLineABC: () => PgLineABC,
      PgLineABCBuilder: () => PgLineABCBuilder,
      PgLineBuilder: () => PgLineBuilder,
      PgLineTuple: () => PgLineTuple,
      line: () => line
    });
    module2.exports = __toCommonJS(line_exports);
    var import_entity22 = require_entity();
    var import_utils6 = require_utils();
    var import_common8 = require_common();
    var PgLineBuilder = class extends import_common8.PgColumnBuilder {
      static [import_entity22.entityKind] = "PgLineBuilder";
      constructor(name) {
        super(name, "array", "PgLine");
      }
      /** @internal */
      build(table) {
        return new PgLineTuple(
          table,
          this.config
        );
      }
    };
    var PgLineTuple = class extends import_common8.PgColumn {
      static [import_entity22.entityKind] = "PgLine";
      getSQLType() {
        return "line";
      }
      mapFromDriverValue(value) {
        const [a, b, c] = value.slice(1, -1).split(",");
        return [Number.parseFloat(a), Number.parseFloat(b), Number.parseFloat(c)];
      }
      mapToDriverValue(value) {
        return `{${value[0]},${value[1]},${value[2]}}`;
      }
    };
    var PgLineABCBuilder = class extends import_common8.PgColumnBuilder {
      static [import_entity22.entityKind] = "PgLineABCBuilder";
      constructor(name) {
        super(name, "json", "PgLineABC");
      }
      /** @internal */
      build(table) {
        return new PgLineABC(
          table,
          this.config
        );
      }
    };
    var PgLineABC = class extends import_common8.PgColumn {
      static [import_entity22.entityKind] = "PgLineABC";
      getSQLType() {
        return "line";
      }
      mapFromDriverValue(value) {
        const [a, b, c] = value.slice(1, -1).split(",");
        return { a: Number.parseFloat(a), b: Number.parseFloat(b), c: Number.parseFloat(c) };
      }
      mapToDriverValue(value) {
        return `{${value.a},${value.b},${value.c}}`;
      }
    };
    function line(a, b) {
      const { name, config } = (0, import_utils6.getColumnNameAndConfig)(a, b);
      if (!config?.mode || config.mode === "tuple") {
        return new PgLineBuilder(name);
      }
      return new PgLineABCBuilder(name);
    }
  }
});

// node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/pg-core/columns/macaddr.cjs
var require_macaddr = __commonJS({
  "node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/pg-core/columns/macaddr.cjs"(exports2, module2) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc2) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc2 = __getOwnPropDesc2(from, key)) || desc2.enumerable });
      }
      return to;
    };
    var __toCommonJS = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var macaddr_exports = {};
    __export2(macaddr_exports, {
      PgMacaddr: () => PgMacaddr,
      PgMacaddrBuilder: () => PgMacaddrBuilder,
      macaddr: () => macaddr
    });
    module2.exports = __toCommonJS(macaddr_exports);
    var import_entity22 = require_entity();
    var import_common8 = require_common();
    var PgMacaddrBuilder = class extends import_common8.PgColumnBuilder {
      static [import_entity22.entityKind] = "PgMacaddrBuilder";
      constructor(name) {
        super(name, "string", "PgMacaddr");
      }
      /** @internal */
      build(table) {
        return new PgMacaddr(table, this.config);
      }
    };
    var PgMacaddr = class extends import_common8.PgColumn {
      static [import_entity22.entityKind] = "PgMacaddr";
      getSQLType() {
        return "macaddr";
      }
    };
    function macaddr(name) {
      return new PgMacaddrBuilder(name ?? "");
    }
  }
});

// node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/pg-core/columns/macaddr8.cjs
var require_macaddr8 = __commonJS({
  "node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/pg-core/columns/macaddr8.cjs"(exports2, module2) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc2) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc2 = __getOwnPropDesc2(from, key)) || desc2.enumerable });
      }
      return to;
    };
    var __toCommonJS = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var macaddr8_exports = {};
    __export2(macaddr8_exports, {
      PgMacaddr8: () => PgMacaddr8,
      PgMacaddr8Builder: () => PgMacaddr8Builder,
      macaddr8: () => macaddr8
    });
    module2.exports = __toCommonJS(macaddr8_exports);
    var import_entity22 = require_entity();
    var import_common8 = require_common();
    var PgMacaddr8Builder = class extends import_common8.PgColumnBuilder {
      static [import_entity22.entityKind] = "PgMacaddr8Builder";
      constructor(name) {
        super(name, "string", "PgMacaddr8");
      }
      /** @internal */
      build(table) {
        return new PgMacaddr8(table, this.config);
      }
    };
    var PgMacaddr8 = class extends import_common8.PgColumn {
      static [import_entity22.entityKind] = "PgMacaddr8";
      getSQLType() {
        return "macaddr8";
      }
    };
    function macaddr8(name) {
      return new PgMacaddr8Builder(name ?? "");
    }
  }
});

// node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/pg-core/columns/numeric.cjs
var require_numeric = __commonJS({
  "node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/pg-core/columns/numeric.cjs"(exports2, module2) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc2) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc2 = __getOwnPropDesc2(from, key)) || desc2.enumerable });
      }
      return to;
    };
    var __toCommonJS = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var numeric_exports = {};
    __export2(numeric_exports, {
      PgNumeric: () => PgNumeric,
      PgNumericBigInt: () => PgNumericBigInt,
      PgNumericBigIntBuilder: () => PgNumericBigIntBuilder,
      PgNumericBuilder: () => PgNumericBuilder,
      PgNumericNumber: () => PgNumericNumber,
      PgNumericNumberBuilder: () => PgNumericNumberBuilder,
      decimal: () => decimal,
      numeric: () => numeric2
    });
    module2.exports = __toCommonJS(numeric_exports);
    var import_entity22 = require_entity();
    var import_utils6 = require_utils();
    var import_common8 = require_common();
    var PgNumericBuilder = class extends import_common8.PgColumnBuilder {
      static [import_entity22.entityKind] = "PgNumericBuilder";
      constructor(name, precision, scale) {
        super(name, "string", "PgNumeric");
        this.config.precision = precision;
        this.config.scale = scale;
      }
      /** @internal */
      build(table) {
        return new PgNumeric(table, this.config);
      }
    };
    var PgNumeric = class extends import_common8.PgColumn {
      static [import_entity22.entityKind] = "PgNumeric";
      precision;
      scale;
      constructor(table, config) {
        super(table, config);
        this.precision = config.precision;
        this.scale = config.scale;
      }
      mapFromDriverValue(value) {
        if (typeof value === "string") return value;
        return String(value);
      }
      getSQLType() {
        if (this.precision !== void 0 && this.scale !== void 0) {
          return `numeric(${this.precision}, ${this.scale})`;
        } else if (this.precision === void 0) {
          return "numeric";
        } else {
          return `numeric(${this.precision})`;
        }
      }
    };
    var PgNumericNumberBuilder = class extends import_common8.PgColumnBuilder {
      static [import_entity22.entityKind] = "PgNumericNumberBuilder";
      constructor(name, precision, scale) {
        super(name, "number", "PgNumericNumber");
        this.config.precision = precision;
        this.config.scale = scale;
      }
      /** @internal */
      build(table) {
        return new PgNumericNumber(
          table,
          this.config
        );
      }
    };
    var PgNumericNumber = class extends import_common8.PgColumn {
      static [import_entity22.entityKind] = "PgNumericNumber";
      precision;
      scale;
      constructor(table, config) {
        super(table, config);
        this.precision = config.precision;
        this.scale = config.scale;
      }
      mapFromDriverValue(value) {
        if (typeof value === "number") return value;
        return Number(value);
      }
      mapToDriverValue = String;
      getSQLType() {
        if (this.precision !== void 0 && this.scale !== void 0) {
          return `numeric(${this.precision}, ${this.scale})`;
        } else if (this.precision === void 0) {
          return "numeric";
        } else {
          return `numeric(${this.precision})`;
        }
      }
    };
    var PgNumericBigIntBuilder = class extends import_common8.PgColumnBuilder {
      static [import_entity22.entityKind] = "PgNumericBigIntBuilder";
      constructor(name, precision, scale) {
        super(name, "bigint", "PgNumericBigInt");
        this.config.precision = precision;
        this.config.scale = scale;
      }
      /** @internal */
      build(table) {
        return new PgNumericBigInt(
          table,
          this.config
        );
      }
    };
    var PgNumericBigInt = class extends import_common8.PgColumn {
      static [import_entity22.entityKind] = "PgNumericBigInt";
      precision;
      scale;
      constructor(table, config) {
        super(table, config);
        this.precision = config.precision;
        this.scale = config.scale;
      }
      mapFromDriverValue = BigInt;
      mapToDriverValue = String;
      getSQLType() {
        if (this.precision !== void 0 && this.scale !== void 0) {
          return `numeric(${this.precision}, ${this.scale})`;
        } else if (this.precision === void 0) {
          return "numeric";
        } else {
          return `numeric(${this.precision})`;
        }
      }
    };
    function numeric2(a, b) {
      const { name, config } = (0, import_utils6.getColumnNameAndConfig)(a, b);
      const mode = config?.mode;
      return mode === "number" ? new PgNumericNumberBuilder(name, config?.precision, config?.scale) : mode === "bigint" ? new PgNumericBigIntBuilder(name, config?.precision, config?.scale) : new PgNumericBuilder(name, config?.precision, config?.scale);
    }
    var decimal = numeric2;
  }
});

// node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/pg-core/columns/point.cjs
var require_point = __commonJS({
  "node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/pg-core/columns/point.cjs"(exports2, module2) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc2) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc2 = __getOwnPropDesc2(from, key)) || desc2.enumerable });
      }
      return to;
    };
    var __toCommonJS = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var point_exports = {};
    __export2(point_exports, {
      PgPointObject: () => PgPointObject,
      PgPointObjectBuilder: () => PgPointObjectBuilder,
      PgPointTuple: () => PgPointTuple,
      PgPointTupleBuilder: () => PgPointTupleBuilder,
      point: () => point
    });
    module2.exports = __toCommonJS(point_exports);
    var import_entity22 = require_entity();
    var import_utils6 = require_utils();
    var import_common8 = require_common();
    var PgPointTupleBuilder = class extends import_common8.PgColumnBuilder {
      static [import_entity22.entityKind] = "PgPointTupleBuilder";
      constructor(name) {
        super(name, "array", "PgPointTuple");
      }
      /** @internal */
      build(table) {
        return new PgPointTuple(
          table,
          this.config
        );
      }
    };
    var PgPointTuple = class extends import_common8.PgColumn {
      static [import_entity22.entityKind] = "PgPointTuple";
      getSQLType() {
        return "point";
      }
      mapFromDriverValue(value) {
        if (typeof value === "string") {
          const [x, y] = value.slice(1, -1).split(",");
          return [Number.parseFloat(x), Number.parseFloat(y)];
        }
        return [value.x, value.y];
      }
      mapToDriverValue(value) {
        return `(${value[0]},${value[1]})`;
      }
    };
    var PgPointObjectBuilder = class extends import_common8.PgColumnBuilder {
      static [import_entity22.entityKind] = "PgPointObjectBuilder";
      constructor(name) {
        super(name, "json", "PgPointObject");
      }
      /** @internal */
      build(table) {
        return new PgPointObject(
          table,
          this.config
        );
      }
    };
    var PgPointObject = class extends import_common8.PgColumn {
      static [import_entity22.entityKind] = "PgPointObject";
      getSQLType() {
        return "point";
      }
      mapFromDriverValue(value) {
        if (typeof value === "string") {
          const [x, y] = value.slice(1, -1).split(",");
          return { x: Number.parseFloat(x), y: Number.parseFloat(y) };
        }
        return value;
      }
      mapToDriverValue(value) {
        return `(${value.x},${value.y})`;
      }
    };
    function point(a, b) {
      const { name, config } = (0, import_utils6.getColumnNameAndConfig)(a, b);
      if (!config?.mode || config.mode === "tuple") {
        return new PgPointTupleBuilder(name);
      }
      return new PgPointObjectBuilder(name);
    }
  }
});

// node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/pg-core/columns/postgis_extension/utils.cjs
var require_utils2 = __commonJS({
  "node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/pg-core/columns/postgis_extension/utils.cjs"(exports2, module2) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc2) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc2 = __getOwnPropDesc2(from, key)) || desc2.enumerable });
      }
      return to;
    };
    var __toCommonJS = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var utils_exports = {};
    __export2(utils_exports, {
      parseEWKB: () => parseEWKB
    });
    module2.exports = __toCommonJS(utils_exports);
    function hexToBytes(hex) {
      const bytes = [];
      for (let c = 0; c < hex.length; c += 2) {
        bytes.push(Number.parseInt(hex.slice(c, c + 2), 16));
      }
      return new Uint8Array(bytes);
    }
    function bytesToFloat64(bytes, offset) {
      const buffer = new ArrayBuffer(8);
      const view = new DataView(buffer);
      for (let i = 0; i < 8; i++) {
        view.setUint8(i, bytes[offset + i]);
      }
      return view.getFloat64(0, true);
    }
    function parseEWKB(hex) {
      const bytes = hexToBytes(hex);
      let offset = 0;
      const byteOrder = bytes[offset];
      offset += 1;
      const view = new DataView(bytes.buffer);
      const geomType = view.getUint32(offset, byteOrder === 1);
      offset += 4;
      let _srid;
      if (geomType & 536870912) {
        _srid = view.getUint32(offset, byteOrder === 1);
        offset += 4;
      }
      if ((geomType & 65535) === 1) {
        const x = bytesToFloat64(bytes, offset);
        offset += 8;
        const y = bytesToFloat64(bytes, offset);
        offset += 8;
        return [x, y];
      }
      throw new Error("Unsupported geometry type");
    }
  }
});

// node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/pg-core/columns/postgis_extension/geometry.cjs
var require_geometry = __commonJS({
  "node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/pg-core/columns/postgis_extension/geometry.cjs"(exports2, module2) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc2) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc2 = __getOwnPropDesc2(from, key)) || desc2.enumerable });
      }
      return to;
    };
    var __toCommonJS = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var geometry_exports = {};
    __export2(geometry_exports, {
      PgGeometry: () => PgGeometry,
      PgGeometryBuilder: () => PgGeometryBuilder,
      PgGeometryObject: () => PgGeometryObject,
      PgGeometryObjectBuilder: () => PgGeometryObjectBuilder,
      geometry: () => geometry
    });
    module2.exports = __toCommonJS(geometry_exports);
    var import_entity22 = require_entity();
    var import_utils6 = require_utils();
    var import_common8 = require_common();
    var import_utils22 = require_utils2();
    var PgGeometryBuilder = class extends import_common8.PgColumnBuilder {
      static [import_entity22.entityKind] = "PgGeometryBuilder";
      constructor(name) {
        super(name, "array", "PgGeometry");
      }
      /** @internal */
      build(table) {
        return new PgGeometry(
          table,
          this.config
        );
      }
    };
    var PgGeometry = class extends import_common8.PgColumn {
      static [import_entity22.entityKind] = "PgGeometry";
      getSQLType() {
        return "geometry(point)";
      }
      mapFromDriverValue(value) {
        return (0, import_utils22.parseEWKB)(value);
      }
      mapToDriverValue(value) {
        return `point(${value[0]} ${value[1]})`;
      }
    };
    var PgGeometryObjectBuilder = class extends import_common8.PgColumnBuilder {
      static [import_entity22.entityKind] = "PgGeometryObjectBuilder";
      constructor(name) {
        super(name, "json", "PgGeometryObject");
      }
      /** @internal */
      build(table) {
        return new PgGeometryObject(
          table,
          this.config
        );
      }
    };
    var PgGeometryObject = class extends import_common8.PgColumn {
      static [import_entity22.entityKind] = "PgGeometryObject";
      getSQLType() {
        return "geometry(point)";
      }
      mapFromDriverValue(value) {
        const parsed = (0, import_utils22.parseEWKB)(value);
        return { x: parsed[0], y: parsed[1] };
      }
      mapToDriverValue(value) {
        return `point(${value.x} ${value.y})`;
      }
    };
    function geometry(a, b) {
      const { name, config } = (0, import_utils6.getColumnNameAndConfig)(a, b);
      if (!config?.mode || config.mode === "tuple") {
        return new PgGeometryBuilder(name);
      }
      return new PgGeometryObjectBuilder(name);
    }
  }
});

// node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/pg-core/columns/real.cjs
var require_real = __commonJS({
  "node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/pg-core/columns/real.cjs"(exports2, module2) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc2) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc2 = __getOwnPropDesc2(from, key)) || desc2.enumerable });
      }
      return to;
    };
    var __toCommonJS = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var real_exports = {};
    __export2(real_exports, {
      PgReal: () => PgReal,
      PgRealBuilder: () => PgRealBuilder,
      real: () => real2
    });
    module2.exports = __toCommonJS(real_exports);
    var import_entity22 = require_entity();
    var import_common8 = require_common();
    var PgRealBuilder = class extends import_common8.PgColumnBuilder {
      static [import_entity22.entityKind] = "PgRealBuilder";
      constructor(name, length) {
        super(name, "number", "PgReal");
        this.config.length = length;
      }
      /** @internal */
      build(table) {
        return new PgReal(table, this.config);
      }
    };
    var PgReal = class extends import_common8.PgColumn {
      static [import_entity22.entityKind] = "PgReal";
      constructor(table, config) {
        super(table, config);
      }
      getSQLType() {
        return "real";
      }
      mapFromDriverValue = (value) => {
        if (typeof value === "string") {
          return Number.parseFloat(value);
        }
        return value;
      };
    };
    function real2(name) {
      return new PgRealBuilder(name ?? "");
    }
  }
});

// node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/pg-core/columns/serial.cjs
var require_serial = __commonJS({
  "node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/pg-core/columns/serial.cjs"(exports2, module2) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc2) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc2 = __getOwnPropDesc2(from, key)) || desc2.enumerable });
      }
      return to;
    };
    var __toCommonJS = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var serial_exports = {};
    __export2(serial_exports, {
      PgSerial: () => PgSerial,
      PgSerialBuilder: () => PgSerialBuilder,
      serial: () => serial
    });
    module2.exports = __toCommonJS(serial_exports);
    var import_entity22 = require_entity();
    var import_common8 = require_common();
    var PgSerialBuilder = class extends import_common8.PgColumnBuilder {
      static [import_entity22.entityKind] = "PgSerialBuilder";
      constructor(name) {
        super(name, "number", "PgSerial");
        this.config.hasDefault = true;
        this.config.notNull = true;
      }
      /** @internal */
      build(table) {
        return new PgSerial(table, this.config);
      }
    };
    var PgSerial = class extends import_common8.PgColumn {
      static [import_entity22.entityKind] = "PgSerial";
      getSQLType() {
        return "serial";
      }
    };
    function serial(name) {
      return new PgSerialBuilder(name ?? "");
    }
  }
});

// node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/pg-core/columns/smallint.cjs
var require_smallint = __commonJS({
  "node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/pg-core/columns/smallint.cjs"(exports2, module2) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc2) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc2 = __getOwnPropDesc2(from, key)) || desc2.enumerable });
      }
      return to;
    };
    var __toCommonJS = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var smallint_exports = {};
    __export2(smallint_exports, {
      PgSmallInt: () => PgSmallInt,
      PgSmallIntBuilder: () => PgSmallIntBuilder,
      smallint: () => smallint
    });
    module2.exports = __toCommonJS(smallint_exports);
    var import_entity22 = require_entity();
    var import_common8 = require_common();
    var import_int_common = require_int_common();
    var PgSmallIntBuilder = class extends import_int_common.PgIntColumnBaseBuilder {
      static [import_entity22.entityKind] = "PgSmallIntBuilder";
      constructor(name) {
        super(name, "number", "PgSmallInt");
      }
      /** @internal */
      build(table) {
        return new PgSmallInt(table, this.config);
      }
    };
    var PgSmallInt = class extends import_common8.PgColumn {
      static [import_entity22.entityKind] = "PgSmallInt";
      getSQLType() {
        return "smallint";
      }
      mapFromDriverValue = (value) => {
        if (typeof value === "string") {
          return Number(value);
        }
        return value;
      };
    };
    function smallint(name) {
      return new PgSmallIntBuilder(name ?? "");
    }
  }
});

// node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/pg-core/columns/smallserial.cjs
var require_smallserial = __commonJS({
  "node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/pg-core/columns/smallserial.cjs"(exports2, module2) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc2) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc2 = __getOwnPropDesc2(from, key)) || desc2.enumerable });
      }
      return to;
    };
    var __toCommonJS = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var smallserial_exports = {};
    __export2(smallserial_exports, {
      PgSmallSerial: () => PgSmallSerial,
      PgSmallSerialBuilder: () => PgSmallSerialBuilder,
      smallserial: () => smallserial
    });
    module2.exports = __toCommonJS(smallserial_exports);
    var import_entity22 = require_entity();
    var import_common8 = require_common();
    var PgSmallSerialBuilder = class extends import_common8.PgColumnBuilder {
      static [import_entity22.entityKind] = "PgSmallSerialBuilder";
      constructor(name) {
        super(name, "number", "PgSmallSerial");
        this.config.hasDefault = true;
        this.config.notNull = true;
      }
      /** @internal */
      build(table) {
        return new PgSmallSerial(
          table,
          this.config
        );
      }
    };
    var PgSmallSerial = class extends import_common8.PgColumn {
      static [import_entity22.entityKind] = "PgSmallSerial";
      getSQLType() {
        return "smallserial";
      }
    };
    function smallserial(name) {
      return new PgSmallSerialBuilder(name ?? "");
    }
  }
});

// node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/pg-core/columns/text.cjs
var require_text = __commonJS({
  "node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/pg-core/columns/text.cjs"(exports2, module2) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc2) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc2 = __getOwnPropDesc2(from, key)) || desc2.enumerable });
      }
      return to;
    };
    var __toCommonJS = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var text_exports = {};
    __export2(text_exports, {
      PgText: () => PgText,
      PgTextBuilder: () => PgTextBuilder,
      text: () => text2
    });
    module2.exports = __toCommonJS(text_exports);
    var import_entity22 = require_entity();
    var import_utils6 = require_utils();
    var import_common8 = require_common();
    var PgTextBuilder = class extends import_common8.PgColumnBuilder {
      static [import_entity22.entityKind] = "PgTextBuilder";
      constructor(name, config) {
        super(name, "string", "PgText");
        this.config.enumValues = config.enum;
      }
      /** @internal */
      build(table) {
        return new PgText(table, this.config);
      }
    };
    var PgText = class extends import_common8.PgColumn {
      static [import_entity22.entityKind] = "PgText";
      enumValues = this.config.enumValues;
      getSQLType() {
        return "text";
      }
    };
    function text2(a, b = {}) {
      const { name, config } = (0, import_utils6.getColumnNameAndConfig)(a, b);
      return new PgTextBuilder(name, config);
    }
  }
});

// node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/pg-core/columns/time.cjs
var require_time = __commonJS({
  "node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/pg-core/columns/time.cjs"(exports2, module2) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc2) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc2 = __getOwnPropDesc2(from, key)) || desc2.enumerable });
      }
      return to;
    };
    var __toCommonJS = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var time_exports = {};
    __export2(time_exports, {
      PgTime: () => PgTime,
      PgTimeBuilder: () => PgTimeBuilder,
      time: () => time
    });
    module2.exports = __toCommonJS(time_exports);
    var import_entity22 = require_entity();
    var import_utils6 = require_utils();
    var import_common8 = require_common();
    var import_date_common = require_date_common();
    var PgTimeBuilder = class extends import_date_common.PgDateColumnBaseBuilder {
      constructor(name, withTimezone, precision) {
        super(name, "string", "PgTime");
        this.withTimezone = withTimezone;
        this.precision = precision;
        this.config.withTimezone = withTimezone;
        this.config.precision = precision;
      }
      static [import_entity22.entityKind] = "PgTimeBuilder";
      /** @internal */
      build(table) {
        return new PgTime(table, this.config);
      }
    };
    var PgTime = class extends import_common8.PgColumn {
      static [import_entity22.entityKind] = "PgTime";
      withTimezone;
      precision;
      constructor(table, config) {
        super(table, config);
        this.withTimezone = config.withTimezone;
        this.precision = config.precision;
      }
      getSQLType() {
        const precision = this.precision === void 0 ? "" : `(${this.precision})`;
        return `time${precision}${this.withTimezone ? " with time zone" : ""}`;
      }
    };
    function time(a, b = {}) {
      const { name, config } = (0, import_utils6.getColumnNameAndConfig)(a, b);
      return new PgTimeBuilder(name, config.withTimezone ?? false, config.precision);
    }
  }
});

// node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/pg-core/columns/timestamp.cjs
var require_timestamp = __commonJS({
  "node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/pg-core/columns/timestamp.cjs"(exports2, module2) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc2) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc2 = __getOwnPropDesc2(from, key)) || desc2.enumerable });
      }
      return to;
    };
    var __toCommonJS = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var timestamp_exports = {};
    __export2(timestamp_exports, {
      PgTimestamp: () => PgTimestamp,
      PgTimestampBuilder: () => PgTimestampBuilder,
      PgTimestampString: () => PgTimestampString,
      PgTimestampStringBuilder: () => PgTimestampStringBuilder,
      timestamp: () => timestamp
    });
    module2.exports = __toCommonJS(timestamp_exports);
    var import_entity22 = require_entity();
    var import_utils6 = require_utils();
    var import_common8 = require_common();
    var import_date_common = require_date_common();
    var PgTimestampBuilder = class extends import_date_common.PgDateColumnBaseBuilder {
      static [import_entity22.entityKind] = "PgTimestampBuilder";
      constructor(name, withTimezone, precision) {
        super(name, "date", "PgTimestamp");
        this.config.withTimezone = withTimezone;
        this.config.precision = precision;
      }
      /** @internal */
      build(table) {
        return new PgTimestamp(table, this.config);
      }
    };
    var PgTimestamp = class extends import_common8.PgColumn {
      static [import_entity22.entityKind] = "PgTimestamp";
      withTimezone;
      precision;
      constructor(table, config) {
        super(table, config);
        this.withTimezone = config.withTimezone;
        this.precision = config.precision;
      }
      getSQLType() {
        const precision = this.precision === void 0 ? "" : ` (${this.precision})`;
        return `timestamp${precision}${this.withTimezone ? " with time zone" : ""}`;
      }
      mapFromDriverValue(value) {
        if (typeof value === "string") return new Date(this.withTimezone ? value : value + "+0000");
        return value;
      }
      mapToDriverValue = (value) => {
        return value.toISOString();
      };
    };
    var PgTimestampStringBuilder = class extends import_date_common.PgDateColumnBaseBuilder {
      static [import_entity22.entityKind] = "PgTimestampStringBuilder";
      constructor(name, withTimezone, precision) {
        super(name, "string", "PgTimestampString");
        this.config.withTimezone = withTimezone;
        this.config.precision = precision;
      }
      /** @internal */
      build(table) {
        return new PgTimestampString(
          table,
          this.config
        );
      }
    };
    var PgTimestampString = class extends import_common8.PgColumn {
      static [import_entity22.entityKind] = "PgTimestampString";
      withTimezone;
      precision;
      constructor(table, config) {
        super(table, config);
        this.withTimezone = config.withTimezone;
        this.precision = config.precision;
      }
      getSQLType() {
        const precision = this.precision === void 0 ? "" : `(${this.precision})`;
        return `timestamp${precision}${this.withTimezone ? " with time zone" : ""}`;
      }
      mapFromDriverValue(value) {
        if (typeof value === "string") return value;
        const shortened = value.toISOString().slice(0, -1).replace("T", " ");
        if (this.withTimezone) {
          const offset = value.getTimezoneOffset();
          const sign = offset <= 0 ? "+" : "-";
          return `${shortened}${sign}${Math.floor(Math.abs(offset) / 60).toString().padStart(2, "0")}`;
        }
        return shortened;
      }
    };
    function timestamp(a, b = {}) {
      const { name, config } = (0, import_utils6.getColumnNameAndConfig)(a, b);
      if (config?.mode === "string") {
        return new PgTimestampStringBuilder(name, config.withTimezone ?? false, config.precision);
      }
      return new PgTimestampBuilder(name, config?.withTimezone ?? false, config?.precision);
    }
  }
});

// node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/pg-core/columns/uuid.cjs
var require_uuid = __commonJS({
  "node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/pg-core/columns/uuid.cjs"(exports2, module2) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc2) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc2 = __getOwnPropDesc2(from, key)) || desc2.enumerable });
      }
      return to;
    };
    var __toCommonJS = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var uuid_exports = {};
    __export2(uuid_exports, {
      PgUUID: () => PgUUID,
      PgUUIDBuilder: () => PgUUIDBuilder,
      uuid: () => uuid
    });
    module2.exports = __toCommonJS(uuid_exports);
    var import_entity22 = require_entity();
    var import_sql4 = require_sql();
    var import_common8 = require_common();
    var PgUUIDBuilder = class extends import_common8.PgColumnBuilder {
      static [import_entity22.entityKind] = "PgUUIDBuilder";
      constructor(name) {
        super(name, "string", "PgUUID");
      }
      /**
       * Adds `default gen_random_uuid()` to the column definition.
       */
      defaultRandom() {
        return this.default(import_sql4.sql`gen_random_uuid()`);
      }
      /** @internal */
      build(table) {
        return new PgUUID(table, this.config);
      }
    };
    var PgUUID = class extends import_common8.PgColumn {
      static [import_entity22.entityKind] = "PgUUID";
      getSQLType() {
        return "uuid";
      }
    };
    function uuid(name) {
      return new PgUUIDBuilder(name ?? "");
    }
  }
});

// node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/pg-core/columns/varchar.cjs
var require_varchar = __commonJS({
  "node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/pg-core/columns/varchar.cjs"(exports2, module2) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc2) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc2 = __getOwnPropDesc2(from, key)) || desc2.enumerable });
      }
      return to;
    };
    var __toCommonJS = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var varchar_exports = {};
    __export2(varchar_exports, {
      PgVarchar: () => PgVarchar,
      PgVarcharBuilder: () => PgVarcharBuilder,
      varchar: () => varchar
    });
    module2.exports = __toCommonJS(varchar_exports);
    var import_entity22 = require_entity();
    var import_utils6 = require_utils();
    var import_common8 = require_common();
    var PgVarcharBuilder = class extends import_common8.PgColumnBuilder {
      static [import_entity22.entityKind] = "PgVarcharBuilder";
      constructor(name, config) {
        super(name, "string", "PgVarchar");
        this.config.length = config.length;
        this.config.enumValues = config.enum;
      }
      /** @internal */
      build(table) {
        return new PgVarchar(
          table,
          this.config
        );
      }
    };
    var PgVarchar = class extends import_common8.PgColumn {
      static [import_entity22.entityKind] = "PgVarchar";
      length = this.config.length;
      enumValues = this.config.enumValues;
      getSQLType() {
        return this.length === void 0 ? `varchar` : `varchar(${this.length})`;
      }
    };
    function varchar(a, b = {}) {
      const { name, config } = (0, import_utils6.getColumnNameAndConfig)(a, b);
      return new PgVarcharBuilder(name, config);
    }
  }
});

// node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/pg-core/columns/vector_extension/bit.cjs
var require_bit = __commonJS({
  "node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/pg-core/columns/vector_extension/bit.cjs"(exports2, module2) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc2) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc2 = __getOwnPropDesc2(from, key)) || desc2.enumerable });
      }
      return to;
    };
    var __toCommonJS = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var bit_exports = {};
    __export2(bit_exports, {
      PgBinaryVector: () => PgBinaryVector,
      PgBinaryVectorBuilder: () => PgBinaryVectorBuilder,
      bit: () => bit
    });
    module2.exports = __toCommonJS(bit_exports);
    var import_entity22 = require_entity();
    var import_utils6 = require_utils();
    var import_common8 = require_common();
    var PgBinaryVectorBuilder = class extends import_common8.PgColumnBuilder {
      static [import_entity22.entityKind] = "PgBinaryVectorBuilder";
      constructor(name, config) {
        super(name, "string", "PgBinaryVector");
        this.config.dimensions = config.dimensions;
      }
      /** @internal */
      build(table) {
        return new PgBinaryVector(
          table,
          this.config
        );
      }
    };
    var PgBinaryVector = class extends import_common8.PgColumn {
      static [import_entity22.entityKind] = "PgBinaryVector";
      dimensions = this.config.dimensions;
      getSQLType() {
        return `bit(${this.dimensions})`;
      }
    };
    function bit(a, b) {
      const { name, config } = (0, import_utils6.getColumnNameAndConfig)(a, b);
      return new PgBinaryVectorBuilder(name, config);
    }
  }
});

// node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/pg-core/columns/vector_extension/halfvec.cjs
var require_halfvec = __commonJS({
  "node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/pg-core/columns/vector_extension/halfvec.cjs"(exports2, module2) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc2) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc2 = __getOwnPropDesc2(from, key)) || desc2.enumerable });
      }
      return to;
    };
    var __toCommonJS = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var halfvec_exports = {};
    __export2(halfvec_exports, {
      PgHalfVector: () => PgHalfVector,
      PgHalfVectorBuilder: () => PgHalfVectorBuilder,
      halfvec: () => halfvec
    });
    module2.exports = __toCommonJS(halfvec_exports);
    var import_entity22 = require_entity();
    var import_utils6 = require_utils();
    var import_common8 = require_common();
    var PgHalfVectorBuilder = class extends import_common8.PgColumnBuilder {
      static [import_entity22.entityKind] = "PgHalfVectorBuilder";
      constructor(name, config) {
        super(name, "array", "PgHalfVector");
        this.config.dimensions = config.dimensions;
      }
      /** @internal */
      build(table) {
        return new PgHalfVector(
          table,
          this.config
        );
      }
    };
    var PgHalfVector = class extends import_common8.PgColumn {
      static [import_entity22.entityKind] = "PgHalfVector";
      dimensions = this.config.dimensions;
      getSQLType() {
        return `halfvec(${this.dimensions})`;
      }
      mapToDriverValue(value) {
        return JSON.stringify(value);
      }
      mapFromDriverValue(value) {
        return value.slice(1, -1).split(",").map((v) => Number.parseFloat(v));
      }
    };
    function halfvec(a, b) {
      const { name, config } = (0, import_utils6.getColumnNameAndConfig)(a, b);
      return new PgHalfVectorBuilder(name, config);
    }
  }
});

// node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/pg-core/columns/vector_extension/sparsevec.cjs
var require_sparsevec = __commonJS({
  "node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/pg-core/columns/vector_extension/sparsevec.cjs"(exports2, module2) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc2) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc2 = __getOwnPropDesc2(from, key)) || desc2.enumerable });
      }
      return to;
    };
    var __toCommonJS = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var sparsevec_exports = {};
    __export2(sparsevec_exports, {
      PgSparseVector: () => PgSparseVector,
      PgSparseVectorBuilder: () => PgSparseVectorBuilder,
      sparsevec: () => sparsevec
    });
    module2.exports = __toCommonJS(sparsevec_exports);
    var import_entity22 = require_entity();
    var import_utils6 = require_utils();
    var import_common8 = require_common();
    var PgSparseVectorBuilder = class extends import_common8.PgColumnBuilder {
      static [import_entity22.entityKind] = "PgSparseVectorBuilder";
      constructor(name, config) {
        super(name, "string", "PgSparseVector");
        this.config.dimensions = config.dimensions;
      }
      /** @internal */
      build(table) {
        return new PgSparseVector(
          table,
          this.config
        );
      }
    };
    var PgSparseVector = class extends import_common8.PgColumn {
      static [import_entity22.entityKind] = "PgSparseVector";
      dimensions = this.config.dimensions;
      getSQLType() {
        return `sparsevec(${this.dimensions})`;
      }
    };
    function sparsevec(a, b) {
      const { name, config } = (0, import_utils6.getColumnNameAndConfig)(a, b);
      return new PgSparseVectorBuilder(name, config);
    }
  }
});

// node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/pg-core/columns/vector_extension/vector.cjs
var require_vector = __commonJS({
  "node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/pg-core/columns/vector_extension/vector.cjs"(exports2, module2) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc2) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc2 = __getOwnPropDesc2(from, key)) || desc2.enumerable });
      }
      return to;
    };
    var __toCommonJS = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var vector_exports = {};
    __export2(vector_exports, {
      PgVector: () => PgVector,
      PgVectorBuilder: () => PgVectorBuilder,
      vector: () => vector
    });
    module2.exports = __toCommonJS(vector_exports);
    var import_entity22 = require_entity();
    var import_utils6 = require_utils();
    var import_common8 = require_common();
    var PgVectorBuilder = class extends import_common8.PgColumnBuilder {
      static [import_entity22.entityKind] = "PgVectorBuilder";
      constructor(name, config) {
        super(name, "array", "PgVector");
        this.config.dimensions = config.dimensions;
      }
      /** @internal */
      build(table) {
        return new PgVector(
          table,
          this.config
        );
      }
    };
    var PgVector = class extends import_common8.PgColumn {
      static [import_entity22.entityKind] = "PgVector";
      dimensions = this.config.dimensions;
      getSQLType() {
        return `vector(${this.dimensions})`;
      }
      mapToDriverValue(value) {
        return JSON.stringify(value);
      }
      mapFromDriverValue(value) {
        return value.slice(1, -1).split(",").map((v) => Number.parseFloat(v));
      }
    };
    function vector(a, b) {
      const { name, config } = (0, import_utils6.getColumnNameAndConfig)(a, b);
      return new PgVectorBuilder(name, config);
    }
  }
});

// node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/pg-core/columns/all.cjs
var require_all = __commonJS({
  "node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/pg-core/columns/all.cjs"(exports2, module2) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc2) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc2 = __getOwnPropDesc2(from, key)) || desc2.enumerable });
      }
      return to;
    };
    var __toCommonJS = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var all_exports = {};
    __export2(all_exports, {
      getPgColumnBuilders: () => getPgColumnBuilders
    });
    module2.exports = __toCommonJS(all_exports);
    var import_bigint = require_bigint();
    var import_bigserial = require_bigserial();
    var import_boolean = require_boolean();
    var import_char = require_char();
    var import_cidr = require_cidr();
    var import_custom2 = require_custom();
    var import_date = require_date();
    var import_double_precision = require_double_precision();
    var import_inet = require_inet();
    var import_integer2 = require_integer();
    var import_interval = require_interval();
    var import_json = require_json();
    var import_jsonb = require_jsonb();
    var import_line = require_line();
    var import_macaddr = require_macaddr();
    var import_macaddr8 = require_macaddr8();
    var import_numeric2 = require_numeric();
    var import_point = require_point();
    var import_geometry = require_geometry();
    var import_real2 = require_real();
    var import_serial = require_serial();
    var import_smallint = require_smallint();
    var import_smallserial = require_smallserial();
    var import_text2 = require_text();
    var import_time = require_time();
    var import_timestamp = require_timestamp();
    var import_uuid = require_uuid();
    var import_varchar = require_varchar();
    var import_bit = require_bit();
    var import_halfvec = require_halfvec();
    var import_sparsevec = require_sparsevec();
    var import_vector = require_vector();
    function getPgColumnBuilders() {
      return {
        bigint: import_bigint.bigint,
        bigserial: import_bigserial.bigserial,
        boolean: import_boolean.boolean,
        char: import_char.char,
        cidr: import_cidr.cidr,
        customType: import_custom2.customType,
        date: import_date.date,
        doublePrecision: import_double_precision.doublePrecision,
        inet: import_inet.inet,
        integer: import_integer2.integer,
        interval: import_interval.interval,
        json: import_json.json,
        jsonb: import_jsonb.jsonb,
        line: import_line.line,
        macaddr: import_macaddr.macaddr,
        macaddr8: import_macaddr8.macaddr8,
        numeric: import_numeric2.numeric,
        point: import_point.point,
        geometry: import_geometry.geometry,
        real: import_real2.real,
        serial: import_serial.serial,
        smallint: import_smallint.smallint,
        smallserial: import_smallserial.smallserial,
        text: import_text2.text,
        time: import_time.time,
        timestamp: import_timestamp.timestamp,
        uuid: import_uuid.uuid,
        varchar: import_varchar.varchar,
        bit: import_bit.bit,
        halfvec: import_halfvec.halfvec,
        sparsevec: import_sparsevec.sparsevec,
        vector: import_vector.vector
      };
    }
  }
});

// node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/pg-core/table.cjs
var require_table2 = __commonJS({
  "node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/pg-core/table.cjs"(exports2, module2) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc2) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc2 = __getOwnPropDesc2(from, key)) || desc2.enumerable });
      }
      return to;
    };
    var __toCommonJS = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var table_exports = {};
    __export2(table_exports, {
      EnableRLS: () => EnableRLS,
      InlineForeignKeys: () => InlineForeignKeys2,
      PgTable: () => PgTable,
      pgTable: () => pgTable,
      pgTableCreator: () => pgTableCreator,
      pgTableWithSchema: () => pgTableWithSchema
    });
    module2.exports = __toCommonJS(table_exports);
    var import_entity22 = require_entity();
    var import_table4 = require_table();
    var import_all2 = require_all();
    var InlineForeignKeys2 = Symbol.for("drizzle:PgInlineForeignKeys");
    var EnableRLS = Symbol.for("drizzle:EnableRLS");
    var PgTable = class extends import_table4.Table {
      static [import_entity22.entityKind] = "PgTable";
      /** @internal */
      static Symbol = Object.assign({}, import_table4.Table.Symbol, {
        InlineForeignKeys: InlineForeignKeys2,
        EnableRLS
      });
      /**@internal */
      [InlineForeignKeys2] = [];
      /** @internal */
      [EnableRLS] = false;
      /** @internal */
      [import_table4.Table.Symbol.ExtraConfigBuilder] = void 0;
      /** @internal */
      [import_table4.Table.Symbol.ExtraConfigColumns] = {};
    };
    function pgTableWithSchema(name, columns, extraConfig, schema, baseName = name) {
      const rawTable = new PgTable(name, schema, baseName);
      const parsedColumns = typeof columns === "function" ? columns((0, import_all2.getPgColumnBuilders)()) : columns;
      const builtColumns = Object.fromEntries(
        Object.entries(parsedColumns).map(([name2, colBuilderBase]) => {
          const colBuilder = colBuilderBase;
          colBuilder.setName(name2);
          const column = colBuilder.build(rawTable);
          rawTable[InlineForeignKeys2].push(...colBuilder.buildForeignKeys(column, rawTable));
          return [name2, column];
        })
      );
      const builtColumnsForExtraConfig = Object.fromEntries(
        Object.entries(parsedColumns).map(([name2, colBuilderBase]) => {
          const colBuilder = colBuilderBase;
          colBuilder.setName(name2);
          const column = colBuilder.buildExtraConfigColumn(rawTable);
          return [name2, column];
        })
      );
      const table = Object.assign(rawTable, builtColumns);
      table[import_table4.Table.Symbol.Columns] = builtColumns;
      table[import_table4.Table.Symbol.ExtraConfigColumns] = builtColumnsForExtraConfig;
      if (extraConfig) {
        table[PgTable.Symbol.ExtraConfigBuilder] = extraConfig;
      }
      return Object.assign(table, {
        enableRLS: () => {
          table[PgTable.Symbol.EnableRLS] = true;
          return table;
        }
      });
    }
    var pgTable = (name, columns, extraConfig) => {
      return pgTableWithSchema(name, columns, extraConfig, void 0);
    };
    function pgTableCreator(customizeTableName) {
      return (name, columns, extraConfig) => {
        return pgTableWithSchema(customizeTableName(name), columns, extraConfig, void 0, name);
      };
    }
  }
});

// node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/pg-core/primary-keys.cjs
var require_primary_keys = __commonJS({
  "node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/pg-core/primary-keys.cjs"(exports2, module2) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc2) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc2 = __getOwnPropDesc2(from, key)) || desc2.enumerable });
      }
      return to;
    };
    var __toCommonJS = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var primary_keys_exports = {};
    __export2(primary_keys_exports, {
      PrimaryKey: () => PrimaryKey,
      PrimaryKeyBuilder: () => PrimaryKeyBuilder,
      primaryKey: () => primaryKey
    });
    module2.exports = __toCommonJS(primary_keys_exports);
    var import_entity22 = require_entity();
    var import_table4 = require_table2();
    function primaryKey(...config) {
      if (config[0].columns) {
        return new PrimaryKeyBuilder(config[0].columns, config[0].name);
      }
      return new PrimaryKeyBuilder(config);
    }
    var PrimaryKeyBuilder = class {
      static [import_entity22.entityKind] = "PgPrimaryKeyBuilder";
      /** @internal */
      columns;
      /** @internal */
      name;
      constructor(columns, name) {
        this.columns = columns;
        this.name = name;
      }
      /** @internal */
      build(table) {
        return new PrimaryKey(table, this.columns, this.name);
      }
    };
    var PrimaryKey = class {
      constructor(table, columns, name) {
        this.table = table;
        this.columns = columns;
        this.name = name;
      }
      static [import_entity22.entityKind] = "PgPrimaryKey";
      columns;
      name;
      getName() {
        return this.name ?? `${this.table[import_table4.PgTable.Symbol.Name]}_${this.columns.map((column) => column.name).join("_")}_pk`;
      }
    };
  }
});

// node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/sql/expressions/conditions.cjs
var require_conditions = __commonJS({
  "node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/sql/expressions/conditions.cjs"(exports2, module2) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc2) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc2 = __getOwnPropDesc2(from, key)) || desc2.enumerable });
      }
      return to;
    };
    var __toCommonJS = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var conditions_exports = {};
    __export2(conditions_exports, {
      and: () => and2,
      arrayContained: () => arrayContained,
      arrayContains: () => arrayContains,
      arrayOverlaps: () => arrayOverlaps,
      between: () => between,
      bindIfParam: () => bindIfParam2,
      eq: () => eq2,
      exists: () => exists,
      gt: () => gt,
      gte: () => gte,
      ilike: () => ilike,
      inArray: () => inArray3,
      isNotNull: () => isNotNull,
      isNull: () => isNull,
      like: () => like,
      lt: () => lt,
      lte: () => lte,
      ne: () => ne,
      not: () => not,
      notBetween: () => notBetween,
      notExists: () => notExists,
      notIlike: () => notIlike,
      notInArray: () => notInArray,
      notLike: () => notLike,
      or: () => or2
    });
    module2.exports = __toCommonJS(conditions_exports);
    var import_column5 = require_column();
    var import_entity22 = require_entity();
    var import_table4 = require_table();
    var import_sql4 = require_sql();
    function bindIfParam2(value, column) {
      if ((0, import_sql4.isDriverValueEncoder)(column) && !(0, import_sql4.isSQLWrapper)(value) && !(0, import_entity22.is)(value, import_sql4.Param) && !(0, import_entity22.is)(value, import_sql4.Placeholder) && !(0, import_entity22.is)(value, import_column5.Column) && !(0, import_entity22.is)(value, import_table4.Table) && !(0, import_entity22.is)(value, import_sql4.View)) {
        return new import_sql4.Param(value, column);
      }
      return value;
    }
    var eq2 = (left, right) => {
      return import_sql4.sql`${left} = ${bindIfParam2(right, left)}`;
    };
    var ne = (left, right) => {
      return import_sql4.sql`${left} <> ${bindIfParam2(right, left)}`;
    };
    function and2(...unfilteredConditions) {
      const conditions = unfilteredConditions.filter(
        (c) => c !== void 0
      );
      if (conditions.length === 0) {
        return void 0;
      }
      if (conditions.length === 1) {
        return new import_sql4.SQL(conditions);
      }
      return new import_sql4.SQL([
        new import_sql4.StringChunk("("),
        import_sql4.sql.join(conditions, new import_sql4.StringChunk(" and ")),
        new import_sql4.StringChunk(")")
      ]);
    }
    function or2(...unfilteredConditions) {
      const conditions = unfilteredConditions.filter(
        (c) => c !== void 0
      );
      if (conditions.length === 0) {
        return void 0;
      }
      if (conditions.length === 1) {
        return new import_sql4.SQL(conditions);
      }
      return new import_sql4.SQL([
        new import_sql4.StringChunk("("),
        import_sql4.sql.join(conditions, new import_sql4.StringChunk(" or ")),
        new import_sql4.StringChunk(")")
      ]);
    }
    function not(condition) {
      return import_sql4.sql`not ${condition}`;
    }
    var gt = (left, right) => {
      return import_sql4.sql`${left} > ${bindIfParam2(right, left)}`;
    };
    var gte = (left, right) => {
      return import_sql4.sql`${left} >= ${bindIfParam2(right, left)}`;
    };
    var lt = (left, right) => {
      return import_sql4.sql`${left} < ${bindIfParam2(right, left)}`;
    };
    var lte = (left, right) => {
      return import_sql4.sql`${left} <= ${bindIfParam2(right, left)}`;
    };
    function inArray3(column, values) {
      if (Array.isArray(values)) {
        if (values.length === 0) {
          return import_sql4.sql`false`;
        }
        return import_sql4.sql`${column} in ${values.map((v) => bindIfParam2(v, column))}`;
      }
      return import_sql4.sql`${column} in ${bindIfParam2(values, column)}`;
    }
    function notInArray(column, values) {
      if (Array.isArray(values)) {
        if (values.length === 0) {
          return import_sql4.sql`true`;
        }
        return import_sql4.sql`${column} not in ${values.map((v) => bindIfParam2(v, column))}`;
      }
      return import_sql4.sql`${column} not in ${bindIfParam2(values, column)}`;
    }
    function isNull(value) {
      return import_sql4.sql`${value} is null`;
    }
    function isNotNull(value) {
      return import_sql4.sql`${value} is not null`;
    }
    function exists(subquery) {
      return import_sql4.sql`exists ${subquery}`;
    }
    function notExists(subquery) {
      return import_sql4.sql`not exists ${subquery}`;
    }
    function between(column, min, max) {
      return import_sql4.sql`${column} between ${bindIfParam2(min, column)} and ${bindIfParam2(
        max,
        column
      )}`;
    }
    function notBetween(column, min, max) {
      return import_sql4.sql`${column} not between ${bindIfParam2(
        min,
        column
      )} and ${bindIfParam2(max, column)}`;
    }
    function like(column, value) {
      return import_sql4.sql`${column} like ${value}`;
    }
    function notLike(column, value) {
      return import_sql4.sql`${column} not like ${value}`;
    }
    function ilike(column, value) {
      return import_sql4.sql`${column} ilike ${value}`;
    }
    function notIlike(column, value) {
      return import_sql4.sql`${column} not ilike ${value}`;
    }
    function arrayContains(column, values) {
      if (Array.isArray(values)) {
        if (values.length === 0) {
          throw new Error("arrayContains requires at least one value");
        }
        const array = import_sql4.sql`${bindIfParam2(values, column)}`;
        return import_sql4.sql`${column} @> ${array}`;
      }
      return import_sql4.sql`${column} @> ${bindIfParam2(values, column)}`;
    }
    function arrayContained(column, values) {
      if (Array.isArray(values)) {
        if (values.length === 0) {
          throw new Error("arrayContained requires at least one value");
        }
        const array = import_sql4.sql`${bindIfParam2(values, column)}`;
        return import_sql4.sql`${column} <@ ${array}`;
      }
      return import_sql4.sql`${column} <@ ${bindIfParam2(values, column)}`;
    }
    function arrayOverlaps(column, values) {
      if (Array.isArray(values)) {
        if (values.length === 0) {
          throw new Error("arrayOverlaps requires at least one value");
        }
        const array = import_sql4.sql`${bindIfParam2(values, column)}`;
        return import_sql4.sql`${column} && ${array}`;
      }
      return import_sql4.sql`${column} && ${bindIfParam2(values, column)}`;
    }
  }
});

// node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/sql/expressions/select.cjs
var require_select = __commonJS({
  "node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/sql/expressions/select.cjs"(exports2, module2) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc22) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc22 = __getOwnPropDesc2(from, key)) || desc22.enumerable });
      }
      return to;
    };
    var __toCommonJS = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var select_exports = {};
    __export2(select_exports, {
      asc: () => asc2,
      desc: () => desc2
    });
    module2.exports = __toCommonJS(select_exports);
    var import_sql4 = require_sql();
    function asc2(column) {
      return import_sql4.sql`${column} asc`;
    }
    function desc2(column) {
      return import_sql4.sql`${column} desc`;
    }
  }
});

// node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/sql/expressions/index.cjs
var require_expressions = __commonJS({
  "node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/sql/expressions/index.cjs"(exports2, module2) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __copyProps2 = (to, from, except, desc2) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc2 = __getOwnPropDesc2(from, key)) || desc2.enumerable });
      }
      return to;
    };
    var __reExport = (target, mod, secondTarget) => (__copyProps2(target, mod, "default"), secondTarget && __copyProps2(secondTarget, mod, "default"));
    var __toCommonJS = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var expressions_exports = {};
    module2.exports = __toCommonJS(expressions_exports);
    __reExport(expressions_exports, require_conditions(), module2.exports);
    __reExport(expressions_exports, require_select(), module2.exports);
  }
});

// node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/relations.cjs
var require_relations = __commonJS({
  "node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/relations.cjs"(exports2, module2) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc2) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc2 = __getOwnPropDesc2(from, key)) || desc2.enumerable });
      }
      return to;
    };
    var __toCommonJS = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var relations_exports = {};
    __export2(relations_exports, {
      Many: () => Many,
      One: () => One,
      Relation: () => Relation,
      Relations: () => Relations,
      createMany: () => createMany,
      createOne: () => createOne,
      createTableRelationsHelpers: () => createTableRelationsHelpers,
      extractTablesRelationalConfig: () => extractTablesRelationalConfig,
      getOperators: () => getOperators,
      getOrderByOperators: () => getOrderByOperators,
      mapRelationalRow: () => mapRelationalRow,
      normalizeRelation: () => normalizeRelation,
      relations: () => relations
    });
    module2.exports = __toCommonJS(relations_exports);
    var import_table4 = require_table();
    var import_column5 = require_column();
    var import_entity22 = require_entity();
    var import_primary_keys = require_primary_keys();
    var import_expressions = require_expressions();
    var import_sql4 = require_sql();
    var Relation = class {
      constructor(sourceTable, referencedTable, relationName) {
        this.sourceTable = sourceTable;
        this.referencedTable = referencedTable;
        this.relationName = relationName;
        this.referencedTableName = referencedTable[import_table4.Table.Symbol.Name];
      }
      static [import_entity22.entityKind] = "Relation";
      referencedTableName;
      fieldName;
    };
    var Relations = class {
      constructor(table, config) {
        this.table = table;
        this.config = config;
      }
      static [import_entity22.entityKind] = "Relations";
    };
    var One = class _One extends Relation {
      constructor(sourceTable, referencedTable, config, isNullable) {
        super(sourceTable, referencedTable, config?.relationName);
        this.config = config;
        this.isNullable = isNullable;
      }
      static [import_entity22.entityKind] = "One";
      withFieldName(fieldName) {
        const relation = new _One(
          this.sourceTable,
          this.referencedTable,
          this.config,
          this.isNullable
        );
        relation.fieldName = fieldName;
        return relation;
      }
    };
    var Many = class _Many extends Relation {
      constructor(sourceTable, referencedTable, config) {
        super(sourceTable, referencedTable, config?.relationName);
        this.config = config;
      }
      static [import_entity22.entityKind] = "Many";
      withFieldName(fieldName) {
        const relation = new _Many(
          this.sourceTable,
          this.referencedTable,
          this.config
        );
        relation.fieldName = fieldName;
        return relation;
      }
    };
    function getOperators() {
      return {
        and: import_expressions.and,
        between: import_expressions.between,
        eq: import_expressions.eq,
        exists: import_expressions.exists,
        gt: import_expressions.gt,
        gte: import_expressions.gte,
        ilike: import_expressions.ilike,
        inArray: import_expressions.inArray,
        isNull: import_expressions.isNull,
        isNotNull: import_expressions.isNotNull,
        like: import_expressions.like,
        lt: import_expressions.lt,
        lte: import_expressions.lte,
        ne: import_expressions.ne,
        not: import_expressions.not,
        notBetween: import_expressions.notBetween,
        notExists: import_expressions.notExists,
        notLike: import_expressions.notLike,
        notIlike: import_expressions.notIlike,
        notInArray: import_expressions.notInArray,
        or: import_expressions.or,
        sql: import_sql4.sql
      };
    }
    function getOrderByOperators() {
      return {
        sql: import_sql4.sql,
        asc: import_expressions.asc,
        desc: import_expressions.desc
      };
    }
    function extractTablesRelationalConfig(schema, configHelpers) {
      if (Object.keys(schema).length === 1 && "default" in schema && !(0, import_entity22.is)(schema["default"], import_table4.Table)) {
        schema = schema["default"];
      }
      const tableNamesMap = {};
      const relationsBuffer = {};
      const tablesConfig = {};
      for (const [key, value] of Object.entries(schema)) {
        if ((0, import_entity22.is)(value, import_table4.Table)) {
          const dbName = (0, import_table4.getTableUniqueName)(value);
          const bufferedRelations = relationsBuffer[dbName];
          tableNamesMap[dbName] = key;
          tablesConfig[key] = {
            tsName: key,
            dbName: value[import_table4.Table.Symbol.Name],
            schema: value[import_table4.Table.Symbol.Schema],
            columns: value[import_table4.Table.Symbol.Columns],
            relations: bufferedRelations?.relations ?? {},
            primaryKey: bufferedRelations?.primaryKey ?? []
          };
          for (const column of Object.values(
            value[import_table4.Table.Symbol.Columns]
          )) {
            if (column.primary) {
              tablesConfig[key].primaryKey.push(column);
            }
          }
          const extraConfig = value[import_table4.Table.Symbol.ExtraConfigBuilder]?.(value[import_table4.Table.Symbol.ExtraConfigColumns]);
          if (extraConfig) {
            for (const configEntry of Object.values(extraConfig)) {
              if ((0, import_entity22.is)(configEntry, import_primary_keys.PrimaryKeyBuilder)) {
                tablesConfig[key].primaryKey.push(...configEntry.columns);
              }
            }
          }
        } else if ((0, import_entity22.is)(value, Relations)) {
          const dbName = (0, import_table4.getTableUniqueName)(value.table);
          const tableName = tableNamesMap[dbName];
          const relations2 = value.config(
            configHelpers(value.table)
          );
          let primaryKey;
          for (const [relationName, relation] of Object.entries(relations2)) {
            if (tableName) {
              const tableConfig = tablesConfig[tableName];
              tableConfig.relations[relationName] = relation;
              if (primaryKey) {
                tableConfig.primaryKey.push(...primaryKey);
              }
            } else {
              if (!(dbName in relationsBuffer)) {
                relationsBuffer[dbName] = {
                  relations: {},
                  primaryKey
                };
              }
              relationsBuffer[dbName].relations[relationName] = relation;
            }
          }
        }
      }
      return { tables: tablesConfig, tableNamesMap };
    }
    function relations(table, relations2) {
      return new Relations(
        table,
        (helpers) => Object.fromEntries(
          Object.entries(relations2(helpers)).map(([key, value]) => [
            key,
            value.withFieldName(key)
          ])
        )
      );
    }
    function createOne(sourceTable) {
      return function one(table, config) {
        return new One(
          sourceTable,
          table,
          config,
          config?.fields.reduce((res, f) => res && f.notNull, true) ?? false
        );
      };
    }
    function createMany(sourceTable) {
      return function many(referencedTable, config) {
        return new Many(sourceTable, referencedTable, config);
      };
    }
    function normalizeRelation(schema, tableNamesMap, relation) {
      if ((0, import_entity22.is)(relation, One) && relation.config) {
        return {
          fields: relation.config.fields,
          references: relation.config.references
        };
      }
      const referencedTableTsName = tableNamesMap[(0, import_table4.getTableUniqueName)(relation.referencedTable)];
      if (!referencedTableTsName) {
        throw new Error(
          `Table "${relation.referencedTable[import_table4.Table.Symbol.Name]}" not found in schema`
        );
      }
      const referencedTableConfig = schema[referencedTableTsName];
      if (!referencedTableConfig) {
        throw new Error(`Table "${referencedTableTsName}" not found in schema`);
      }
      const sourceTable = relation.sourceTable;
      const sourceTableTsName = tableNamesMap[(0, import_table4.getTableUniqueName)(sourceTable)];
      if (!sourceTableTsName) {
        throw new Error(
          `Table "${sourceTable[import_table4.Table.Symbol.Name]}" not found in schema`
        );
      }
      const reverseRelations = [];
      for (const referencedTableRelation of Object.values(
        referencedTableConfig.relations
      )) {
        if (relation.relationName && relation !== referencedTableRelation && referencedTableRelation.relationName === relation.relationName || !relation.relationName && referencedTableRelation.referencedTable === relation.sourceTable) {
          reverseRelations.push(referencedTableRelation);
        }
      }
      if (reverseRelations.length > 1) {
        throw relation.relationName ? new Error(
          `There are multiple relations with name "${relation.relationName}" in table "${referencedTableTsName}"`
        ) : new Error(
          `There are multiple relations between "${referencedTableTsName}" and "${relation.sourceTable[import_table4.Table.Symbol.Name]}". Please specify relation name`
        );
      }
      if (reverseRelations[0] && (0, import_entity22.is)(reverseRelations[0], One) && reverseRelations[0].config) {
        return {
          fields: reverseRelations[0].config.references,
          references: reverseRelations[0].config.fields
        };
      }
      throw new Error(
        `There is not enough information to infer relation "${sourceTableTsName}.${relation.fieldName}"`
      );
    }
    function createTableRelationsHelpers(sourceTable) {
      return {
        one: createOne(sourceTable),
        many: createMany(sourceTable)
      };
    }
    function mapRelationalRow(tablesConfig, tableConfig, row, buildQueryResultSelection, mapColumnValue = (value) => value) {
      const result = {};
      for (const [
        selectionItemIndex,
        selectionItem
      ] of buildQueryResultSelection.entries()) {
        if (selectionItem.isJson) {
          const relation = tableConfig.relations[selectionItem.tsKey];
          const rawSubRows = row[selectionItemIndex];
          const subRows = typeof rawSubRows === "string" ? JSON.parse(rawSubRows) : rawSubRows;
          result[selectionItem.tsKey] = (0, import_entity22.is)(relation, One) ? subRows && mapRelationalRow(
            tablesConfig,
            tablesConfig[selectionItem.relationTableTsKey],
            subRows,
            selectionItem.selection,
            mapColumnValue
          ) : subRows.map(
            (subRow) => mapRelationalRow(
              tablesConfig,
              tablesConfig[selectionItem.relationTableTsKey],
              subRow,
              selectionItem.selection,
              mapColumnValue
            )
          );
        } else {
          const value = mapColumnValue(row[selectionItemIndex]);
          const field = selectionItem.field;
          let decoder;
          if ((0, import_entity22.is)(field, import_column5.Column)) {
            decoder = field;
          } else if ((0, import_entity22.is)(field, import_sql4.SQL)) {
            decoder = field.decoder;
          } else {
            decoder = field.sql.decoder;
          }
          result[selectionItem.tsKey] = value === null ? null : decoder.mapFromDriverValue(value);
        }
      }
      return result;
    }
  }
});

// node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/alias.cjs
var require_alias = __commonJS({
  "node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/alias.cjs"(exports2, module2) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc2) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc2 = __getOwnPropDesc2(from, key)) || desc2.enumerable });
      }
      return to;
    };
    var __toCommonJS = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var alias_exports = {};
    __export2(alias_exports, {
      ColumnAliasProxyHandler: () => ColumnAliasProxyHandler,
      RelationTableAliasProxyHandler: () => RelationTableAliasProxyHandler,
      TableAliasProxyHandler: () => TableAliasProxyHandler,
      aliasedRelation: () => aliasedRelation,
      aliasedTable: () => aliasedTable,
      aliasedTableColumn: () => aliasedTableColumn,
      mapColumnsInAliasedSQLToAlias: () => mapColumnsInAliasedSQLToAlias,
      mapColumnsInSQLToAlias: () => mapColumnsInSQLToAlias
    });
    module2.exports = __toCommonJS(alias_exports);
    var import_column5 = require_column();
    var import_entity22 = require_entity();
    var import_sql4 = require_sql();
    var import_table4 = require_table();
    var import_view_common2 = require_view_common();
    var ColumnAliasProxyHandler = class {
      constructor(table) {
        this.table = table;
      }
      static [import_entity22.entityKind] = "ColumnAliasProxyHandler";
      get(columnObj, prop) {
        if (prop === "table") {
          return this.table;
        }
        return columnObj[prop];
      }
    };
    var TableAliasProxyHandler = class {
      constructor(alias, replaceOriginalName) {
        this.alias = alias;
        this.replaceOriginalName = replaceOriginalName;
      }
      static [import_entity22.entityKind] = "TableAliasProxyHandler";
      get(target, prop) {
        if (prop === import_table4.Table.Symbol.IsAlias) {
          return true;
        }
        if (prop === import_table4.Table.Symbol.Name) {
          return this.alias;
        }
        if (this.replaceOriginalName && prop === import_table4.Table.Symbol.OriginalName) {
          return this.alias;
        }
        if (prop === import_view_common2.ViewBaseConfig) {
          return {
            ...target[import_view_common2.ViewBaseConfig],
            name: this.alias,
            isAlias: true
          };
        }
        if (prop === import_table4.Table.Symbol.Columns) {
          const columns = target[import_table4.Table.Symbol.Columns];
          if (!columns) {
            return columns;
          }
          const proxiedColumns = {};
          Object.keys(columns).map((key) => {
            proxiedColumns[key] = new Proxy(
              columns[key],
              new ColumnAliasProxyHandler(new Proxy(target, this))
            );
          });
          return proxiedColumns;
        }
        const value = target[prop];
        if ((0, import_entity22.is)(value, import_column5.Column)) {
          return new Proxy(value, new ColumnAliasProxyHandler(new Proxy(target, this)));
        }
        return value;
      }
    };
    var RelationTableAliasProxyHandler = class {
      constructor(alias) {
        this.alias = alias;
      }
      static [import_entity22.entityKind] = "RelationTableAliasProxyHandler";
      get(target, prop) {
        if (prop === "sourceTable") {
          return aliasedTable(target.sourceTable, this.alias);
        }
        return target[prop];
      }
    };
    function aliasedTable(table, tableAlias) {
      return new Proxy(table, new TableAliasProxyHandler(tableAlias, false));
    }
    function aliasedRelation(relation, tableAlias) {
      return new Proxy(relation, new RelationTableAliasProxyHandler(tableAlias));
    }
    function aliasedTableColumn(column, tableAlias) {
      return new Proxy(
        column,
        new ColumnAliasProxyHandler(new Proxy(column.table, new TableAliasProxyHandler(tableAlias, false)))
      );
    }
    function mapColumnsInAliasedSQLToAlias(query, alias) {
      return new import_sql4.SQL.Aliased(mapColumnsInSQLToAlias(query.sql, alias), query.fieldAlias);
    }
    function mapColumnsInSQLToAlias(query, alias) {
      return import_sql4.sql.join(query.queryChunks.map((c) => {
        if ((0, import_entity22.is)(c, import_column5.Column)) {
          return aliasedTableColumn(c, alias);
        }
        if ((0, import_entity22.is)(c, import_sql4.SQL)) {
          return mapColumnsInSQLToAlias(c, alias);
        }
        if ((0, import_entity22.is)(c, import_sql4.SQL.Aliased)) {
          return mapColumnsInAliasedSQLToAlias(c, alias);
        }
        return c;
      }));
    }
  }
});

// node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/selection-proxy.cjs
var require_selection_proxy = __commonJS({
  "node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/selection-proxy.cjs"(exports2, module2) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc2) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc2 = __getOwnPropDesc2(from, key)) || desc2.enumerable });
      }
      return to;
    };
    var __toCommonJS = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var selection_proxy_exports = {};
    __export2(selection_proxy_exports, {
      SelectionProxyHandler: () => SelectionProxyHandler
    });
    module2.exports = __toCommonJS(selection_proxy_exports);
    var import_alias = require_alias();
    var import_column5 = require_column();
    var import_entity22 = require_entity();
    var import_sql4 = require_sql();
    var import_subquery2 = require_subquery();
    var import_view_common2 = require_view_common();
    var SelectionProxyHandler = class _SelectionProxyHandler {
      static [import_entity22.entityKind] = "SelectionProxyHandler";
      config;
      constructor(config) {
        this.config = { ...config };
      }
      get(subquery, prop) {
        if (prop === "_") {
          return {
            ...subquery["_"],
            selectedFields: new Proxy(
              subquery._.selectedFields,
              this
            )
          };
        }
        if (prop === import_view_common2.ViewBaseConfig) {
          return {
            ...subquery[import_view_common2.ViewBaseConfig],
            selectedFields: new Proxy(
              subquery[import_view_common2.ViewBaseConfig].selectedFields,
              this
            )
          };
        }
        if (typeof prop === "symbol") {
          return subquery[prop];
        }
        const columns = (0, import_entity22.is)(subquery, import_subquery2.Subquery) ? subquery._.selectedFields : (0, import_entity22.is)(subquery, import_sql4.View) ? subquery[import_view_common2.ViewBaseConfig].selectedFields : subquery;
        const value = columns[prop];
        if ((0, import_entity22.is)(value, import_sql4.SQL.Aliased)) {
          if (this.config.sqlAliasedBehavior === "sql" && !value.isSelectionField) {
            return value.sql;
          }
          const newValue = value.clone();
          newValue.isSelectionField = true;
          return newValue;
        }
        if ((0, import_entity22.is)(value, import_sql4.SQL)) {
          if (this.config.sqlBehavior === "sql") {
            return value;
          }
          throw new Error(
            `You tried to reference "${prop}" field from a subquery, which is a raw SQL field, but it doesn't have an alias declared. Please add an alias to the field using ".as('alias')" method.`
          );
        }
        if ((0, import_entity22.is)(value, import_column5.Column)) {
          if (this.config.alias) {
            return new Proxy(
              value,
              new import_alias.ColumnAliasProxyHandler(
                new Proxy(
                  value.table,
                  new import_alias.TableAliasProxyHandler(this.config.alias, this.config.replaceOriginalName ?? false)
                )
              )
            );
          }
          return value;
        }
        if (typeof value !== "object" || value === null) {
          return value;
        }
        return new Proxy(value, new _SelectionProxyHandler(this.config));
      }
    };
  }
});

// node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/query-promise.cjs
var require_query_promise = __commonJS({
  "node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/query-promise.cjs"(exports2, module2) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc2) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc2 = __getOwnPropDesc2(from, key)) || desc2.enumerable });
      }
      return to;
    };
    var __toCommonJS = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var query_promise_exports = {};
    __export2(query_promise_exports, {
      QueryPromise: () => QueryPromise
    });
    module2.exports = __toCommonJS(query_promise_exports);
    var import_entity22 = require_entity();
    var QueryPromise = class {
      static [import_entity22.entityKind] = "QueryPromise";
      [Symbol.toStringTag] = "QueryPromise";
      catch(onRejected) {
        return this.then(void 0, onRejected);
      }
      finally(onFinally) {
        return this.then(
          (value) => {
            onFinally?.();
            return value;
          },
          (reason) => {
            onFinally?.();
            throw reason;
          }
        );
      }
      then(onFulfilled, onRejected) {
        return this.execute().then(onFulfilled, onRejected);
      }
    };
  }
});

// node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/sqlite-core/foreign-keys.cjs
var require_foreign_keys2 = __commonJS({
  "node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/sqlite-core/foreign-keys.cjs"(exports2, module2) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc2) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc2 = __getOwnPropDesc2(from, key)) || desc2.enumerable });
      }
      return to;
    };
    var __toCommonJS = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var foreign_keys_exports = {};
    __export2(foreign_keys_exports, {
      ForeignKey: () => ForeignKey3,
      ForeignKeyBuilder: () => ForeignKeyBuilder3,
      foreignKey: () => foreignKey
    });
    module2.exports = __toCommonJS(foreign_keys_exports);
    var import_entity22 = require_entity();
    var import_table_utils6 = require_table_utils();
    var ForeignKeyBuilder3 = class {
      static [import_entity22.entityKind] = "SQLiteForeignKeyBuilder";
      /** @internal */
      reference;
      /** @internal */
      _onUpdate;
      /** @internal */
      _onDelete;
      constructor(config, actions) {
        this.reference = () => {
          const { name, columns, foreignColumns } = config();
          return { name, columns, foreignTable: foreignColumns[0].table, foreignColumns };
        };
        if (actions) {
          this._onUpdate = actions.onUpdate;
          this._onDelete = actions.onDelete;
        }
      }
      onUpdate(action) {
        this._onUpdate = action;
        return this;
      }
      onDelete(action) {
        this._onDelete = action;
        return this;
      }
      /** @internal */
      build(table) {
        return new ForeignKey3(table, this);
      }
    };
    var ForeignKey3 = class {
      constructor(table, builder) {
        this.table = table;
        this.reference = builder.reference;
        this.onUpdate = builder._onUpdate;
        this.onDelete = builder._onDelete;
      }
      static [import_entity22.entityKind] = "SQLiteForeignKey";
      reference;
      onUpdate;
      onDelete;
      getName() {
        const { name, columns, foreignColumns } = this.reference();
        const columnNames = columns.map((column) => column.name);
        const foreignColumnNames = foreignColumns.map((column) => column.name);
        const chunks = [
          this.table[import_table_utils6.TableName],
          ...columnNames,
          foreignColumns[0].table[import_table_utils6.TableName],
          ...foreignColumnNames
        ];
        return name ?? `${chunks.join("_")}_fk`;
      }
    };
    function foreignKey(config) {
      function mappedConfig() {
        if (typeof config === "function") {
          const { name, columns, foreignColumns } = config();
          return {
            name,
            columns,
            foreignColumns
          };
        }
        return config;
      }
      return new ForeignKeyBuilder3(mappedConfig);
    }
  }
});

// node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/sqlite-core/unique-constraint.cjs
var require_unique_constraint2 = __commonJS({
  "node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/sqlite-core/unique-constraint.cjs"(exports2, module2) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc2) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc2 = __getOwnPropDesc2(from, key)) || desc2.enumerable });
      }
      return to;
    };
    var __toCommonJS = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var unique_constraint_exports = {};
    __export2(unique_constraint_exports, {
      UniqueConstraint: () => UniqueConstraint3,
      UniqueConstraintBuilder: () => UniqueConstraintBuilder3,
      UniqueOnConstraintBuilder: () => UniqueOnConstraintBuilder3,
      unique: () => unique,
      uniqueKeyName: () => uniqueKeyName3
    });
    module2.exports = __toCommonJS(unique_constraint_exports);
    var import_entity22 = require_entity();
    var import_table_utils6 = require_table_utils();
    function uniqueKeyName3(table, columns) {
      return `${table[import_table_utils6.TableName]}_${columns.join("_")}_unique`;
    }
    function unique(name) {
      return new UniqueOnConstraintBuilder3(name);
    }
    var UniqueConstraintBuilder3 = class {
      constructor(columns, name) {
        this.name = name;
        this.columns = columns;
      }
      static [import_entity22.entityKind] = "SQLiteUniqueConstraintBuilder";
      /** @internal */
      columns;
      /** @internal */
      build(table) {
        return new UniqueConstraint3(table, this.columns, this.name);
      }
    };
    var UniqueOnConstraintBuilder3 = class {
      static [import_entity22.entityKind] = "SQLiteUniqueOnConstraintBuilder";
      /** @internal */
      name;
      constructor(name) {
        this.name = name;
      }
      on(...columns) {
        return new UniqueConstraintBuilder3(columns, this.name);
      }
    };
    var UniqueConstraint3 = class {
      constructor(table, columns, name) {
        this.table = table;
        this.columns = columns;
        this.name = name ?? uniqueKeyName3(this.table, this.columns.map((column) => column.name));
      }
      static [import_entity22.entityKind] = "SQLiteUniqueConstraint";
      columns;
      name;
      getName() {
        return this.name;
      }
    };
  }
});

// node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/sqlite-core/columns/common.cjs
var require_common2 = __commonJS({
  "node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/sqlite-core/columns/common.cjs"(exports2, module2) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc2) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc2 = __getOwnPropDesc2(from, key)) || desc2.enumerable });
      }
      return to;
    };
    var __toCommonJS = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var common_exports = {};
    __export2(common_exports, {
      SQLiteColumn: () => SQLiteColumn2,
      SQLiteColumnBuilder: () => SQLiteColumnBuilder2
    });
    module2.exports = __toCommonJS(common_exports);
    var import_column_builder3 = require_column_builder();
    var import_column5 = require_column();
    var import_entity22 = require_entity();
    var import_foreign_keys3 = require_foreign_keys2();
    var import_unique_constraint3 = require_unique_constraint2();
    var SQLiteColumnBuilder2 = class extends import_column_builder3.ColumnBuilder {
      static [import_entity22.entityKind] = "SQLiteColumnBuilder";
      foreignKeyConfigs = [];
      references(ref, actions = {}) {
        this.foreignKeyConfigs.push({ ref, actions });
        return this;
      }
      unique(name) {
        this.config.isUnique = true;
        this.config.uniqueName = name;
        return this;
      }
      generatedAlwaysAs(as, config) {
        this.config.generated = {
          as,
          type: "always",
          mode: config?.mode ?? "virtual"
        };
        return this;
      }
      /** @internal */
      buildForeignKeys(column, table) {
        return this.foreignKeyConfigs.map(({ ref, actions }) => {
          return ((ref2, actions2) => {
            const builder = new import_foreign_keys3.ForeignKeyBuilder(() => {
              const foreignColumn = ref2();
              return { columns: [column], foreignColumns: [foreignColumn] };
            });
            if (actions2.onUpdate) {
              builder.onUpdate(actions2.onUpdate);
            }
            if (actions2.onDelete) {
              builder.onDelete(actions2.onDelete);
            }
            return builder.build(table);
          })(ref, actions);
        });
      }
    };
    var SQLiteColumn2 = class extends import_column5.Column {
      constructor(table, config) {
        if (!config.uniqueName) {
          config.uniqueName = (0, import_unique_constraint3.uniqueKeyName)(table, [config.name]);
        }
        super(table, config);
        this.table = table;
      }
      static [import_entity22.entityKind] = "SQLiteColumn";
    };
  }
});

// node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/sqlite-core/columns/blob.cjs
var require_blob = __commonJS({
  "node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/sqlite-core/columns/blob.cjs"(exports2, module2) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc2) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc2 = __getOwnPropDesc2(from, key)) || desc2.enumerable });
      }
      return to;
    };
    var __toCommonJS = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var blob_exports = {};
    __export2(blob_exports, {
      SQLiteBigInt: () => SQLiteBigInt2,
      SQLiteBigIntBuilder: () => SQLiteBigIntBuilder2,
      SQLiteBlobBuffer: () => SQLiteBlobBuffer2,
      SQLiteBlobBufferBuilder: () => SQLiteBlobBufferBuilder2,
      SQLiteBlobJson: () => SQLiteBlobJson2,
      SQLiteBlobJsonBuilder: () => SQLiteBlobJsonBuilder2,
      blob: () => blob2
    });
    module2.exports = __toCommonJS(blob_exports);
    var import_entity22 = require_entity();
    var import_utils6 = require_utils();
    var import_common8 = require_common2();
    var SQLiteBigIntBuilder2 = class extends import_common8.SQLiteColumnBuilder {
      static [import_entity22.entityKind] = "SQLiteBigIntBuilder";
      constructor(name) {
        super(name, "bigint", "SQLiteBigInt");
      }
      /** @internal */
      build(table) {
        return new SQLiteBigInt2(table, this.config);
      }
    };
    var SQLiteBigInt2 = class extends import_common8.SQLiteColumn {
      static [import_entity22.entityKind] = "SQLiteBigInt";
      getSQLType() {
        return "blob";
      }
      mapFromDriverValue(value) {
        if (typeof Buffer !== "undefined" && Buffer.from) {
          const buf = Buffer.isBuffer(value) ? value : value instanceof ArrayBuffer ? Buffer.from(value) : value.buffer ? Buffer.from(value.buffer, value.byteOffset, value.byteLength) : Buffer.from(value);
          return BigInt(buf.toString("utf8"));
        }
        return BigInt(import_utils6.textDecoder.decode(value));
      }
      mapToDriverValue(value) {
        return Buffer.from(value.toString());
      }
    };
    var SQLiteBlobJsonBuilder2 = class extends import_common8.SQLiteColumnBuilder {
      static [import_entity22.entityKind] = "SQLiteBlobJsonBuilder";
      constructor(name) {
        super(name, "json", "SQLiteBlobJson");
      }
      /** @internal */
      build(table) {
        return new SQLiteBlobJson2(
          table,
          this.config
        );
      }
    };
    var SQLiteBlobJson2 = class extends import_common8.SQLiteColumn {
      static [import_entity22.entityKind] = "SQLiteBlobJson";
      getSQLType() {
        return "blob";
      }
      mapFromDriverValue(value) {
        if (typeof Buffer !== "undefined" && Buffer.from) {
          const buf = Buffer.isBuffer(value) ? value : value instanceof ArrayBuffer ? Buffer.from(value) : value.buffer ? Buffer.from(value.buffer, value.byteOffset, value.byteLength) : Buffer.from(value);
          return JSON.parse(buf.toString("utf8"));
        }
        return JSON.parse(import_utils6.textDecoder.decode(value));
      }
      mapToDriverValue(value) {
        return Buffer.from(JSON.stringify(value));
      }
    };
    var SQLiteBlobBufferBuilder2 = class extends import_common8.SQLiteColumnBuilder {
      static [import_entity22.entityKind] = "SQLiteBlobBufferBuilder";
      constructor(name) {
        super(name, "buffer", "SQLiteBlobBuffer");
      }
      /** @internal */
      build(table) {
        return new SQLiteBlobBuffer2(table, this.config);
      }
    };
    var SQLiteBlobBuffer2 = class extends import_common8.SQLiteColumn {
      static [import_entity22.entityKind] = "SQLiteBlobBuffer";
      mapFromDriverValue(value) {
        if (Buffer.isBuffer(value)) {
          return value;
        }
        return Buffer.from(value);
      }
      getSQLType() {
        return "blob";
      }
    };
    function blob2(a, b) {
      const { name, config } = (0, import_utils6.getColumnNameAndConfig)(a, b);
      if (config?.mode === "json") {
        return new SQLiteBlobJsonBuilder2(name);
      }
      if (config?.mode === "bigint") {
        return new SQLiteBigIntBuilder2(name);
      }
      return new SQLiteBlobBufferBuilder2(name);
    }
  }
});

// node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/sqlite-core/columns/custom.cjs
var require_custom2 = __commonJS({
  "node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/sqlite-core/columns/custom.cjs"(exports2, module2) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc2) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc2 = __getOwnPropDesc2(from, key)) || desc2.enumerable });
      }
      return to;
    };
    var __toCommonJS = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var custom_exports = {};
    __export2(custom_exports, {
      SQLiteCustomColumn: () => SQLiteCustomColumn2,
      SQLiteCustomColumnBuilder: () => SQLiteCustomColumnBuilder2,
      customType: () => customType2
    });
    module2.exports = __toCommonJS(custom_exports);
    var import_entity22 = require_entity();
    var import_utils6 = require_utils();
    var import_common8 = require_common2();
    var SQLiteCustomColumnBuilder2 = class extends import_common8.SQLiteColumnBuilder {
      static [import_entity22.entityKind] = "SQLiteCustomColumnBuilder";
      constructor(name, fieldConfig, customTypeParams) {
        super(name, "custom", "SQLiteCustomColumn");
        this.config.fieldConfig = fieldConfig;
        this.config.customTypeParams = customTypeParams;
      }
      /** @internal */
      build(table) {
        return new SQLiteCustomColumn2(
          table,
          this.config
        );
      }
    };
    var SQLiteCustomColumn2 = class extends import_common8.SQLiteColumn {
      static [import_entity22.entityKind] = "SQLiteCustomColumn";
      sqlName;
      mapTo;
      mapFrom;
      constructor(table, config) {
        super(table, config);
        this.sqlName = config.customTypeParams.dataType(config.fieldConfig);
        this.mapTo = config.customTypeParams.toDriver;
        this.mapFrom = config.customTypeParams.fromDriver;
      }
      getSQLType() {
        return this.sqlName;
      }
      mapFromDriverValue(value) {
        return typeof this.mapFrom === "function" ? this.mapFrom(value) : value;
      }
      mapToDriverValue(value) {
        return typeof this.mapTo === "function" ? this.mapTo(value) : value;
      }
    };
    function customType2(customTypeParams) {
      return (a, b) => {
        const { name, config } = (0, import_utils6.getColumnNameAndConfig)(a, b);
        return new SQLiteCustomColumnBuilder2(
          name,
          config,
          customTypeParams
        );
      };
    }
  }
});

// node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/sqlite-core/columns/integer.cjs
var require_integer2 = __commonJS({
  "node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/sqlite-core/columns/integer.cjs"(exports2, module2) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc2) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc2 = __getOwnPropDesc2(from, key)) || desc2.enumerable });
      }
      return to;
    };
    var __toCommonJS = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var integer_exports = {};
    __export2(integer_exports, {
      SQLiteBaseInteger: () => SQLiteBaseInteger2,
      SQLiteBaseIntegerBuilder: () => SQLiteBaseIntegerBuilder2,
      SQLiteBoolean: () => SQLiteBoolean2,
      SQLiteBooleanBuilder: () => SQLiteBooleanBuilder2,
      SQLiteInteger: () => SQLiteInteger2,
      SQLiteIntegerBuilder: () => SQLiteIntegerBuilder2,
      SQLiteTimestamp: () => SQLiteTimestamp2,
      SQLiteTimestampBuilder: () => SQLiteTimestampBuilder2,
      int: () => int,
      integer: () => integer2
    });
    module2.exports = __toCommonJS(integer_exports);
    var import_entity22 = require_entity();
    var import_sql4 = require_sql();
    var import_utils6 = require_utils();
    var import_common8 = require_common2();
    var SQLiteBaseIntegerBuilder2 = class extends import_common8.SQLiteColumnBuilder {
      static [import_entity22.entityKind] = "SQLiteBaseIntegerBuilder";
      constructor(name, dataType, columnType) {
        super(name, dataType, columnType);
        this.config.autoIncrement = false;
      }
      primaryKey(config) {
        if (config?.autoIncrement) {
          this.config.autoIncrement = true;
        }
        this.config.hasDefault = true;
        return super.primaryKey();
      }
    };
    var SQLiteBaseInteger2 = class extends import_common8.SQLiteColumn {
      static [import_entity22.entityKind] = "SQLiteBaseInteger";
      autoIncrement = this.config.autoIncrement;
      getSQLType() {
        return "integer";
      }
    };
    var SQLiteIntegerBuilder2 = class extends SQLiteBaseIntegerBuilder2 {
      static [import_entity22.entityKind] = "SQLiteIntegerBuilder";
      constructor(name) {
        super(name, "number", "SQLiteInteger");
      }
      build(table) {
        return new SQLiteInteger2(
          table,
          this.config
        );
      }
    };
    var SQLiteInteger2 = class extends SQLiteBaseInteger2 {
      static [import_entity22.entityKind] = "SQLiteInteger";
    };
    var SQLiteTimestampBuilder2 = class extends SQLiteBaseIntegerBuilder2 {
      static [import_entity22.entityKind] = "SQLiteTimestampBuilder";
      constructor(name, mode) {
        super(name, "date", "SQLiteTimestamp");
        this.config.mode = mode;
      }
      /**
       * @deprecated Use `default()` with your own expression instead.
       *
       * Adds `DEFAULT (cast((julianday('now') - 2440587.5)*86400000 as integer))` to the column, which is the current epoch timestamp in milliseconds.
       */
      defaultNow() {
        return this.default(import_sql4.sql`(cast((julianday('now') - 2440587.5)*86400000 as integer))`);
      }
      build(table) {
        return new SQLiteTimestamp2(
          table,
          this.config
        );
      }
    };
    var SQLiteTimestamp2 = class extends SQLiteBaseInteger2 {
      static [import_entity22.entityKind] = "SQLiteTimestamp";
      mode = this.config.mode;
      mapFromDriverValue(value) {
        if (this.config.mode === "timestamp") {
          return new Date(value * 1e3);
        }
        return new Date(value);
      }
      mapToDriverValue(value) {
        const unix = value.getTime();
        if (this.config.mode === "timestamp") {
          return Math.floor(unix / 1e3);
        }
        return unix;
      }
    };
    var SQLiteBooleanBuilder2 = class extends SQLiteBaseIntegerBuilder2 {
      static [import_entity22.entityKind] = "SQLiteBooleanBuilder";
      constructor(name, mode) {
        super(name, "boolean", "SQLiteBoolean");
        this.config.mode = mode;
      }
      build(table) {
        return new SQLiteBoolean2(
          table,
          this.config
        );
      }
    };
    var SQLiteBoolean2 = class extends SQLiteBaseInteger2 {
      static [import_entity22.entityKind] = "SQLiteBoolean";
      mode = this.config.mode;
      mapFromDriverValue(value) {
        return Number(value) === 1;
      }
      mapToDriverValue(value) {
        return value ? 1 : 0;
      }
    };
    function integer2(a, b) {
      const { name, config } = (0, import_utils6.getColumnNameAndConfig)(a, b);
      if (config?.mode === "timestamp" || config?.mode === "timestamp_ms") {
        return new SQLiteTimestampBuilder2(name, config.mode);
      }
      if (config?.mode === "boolean") {
        return new SQLiteBooleanBuilder2(name, config.mode);
      }
      return new SQLiteIntegerBuilder2(name);
    }
    var int = integer2;
  }
});

// node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/sqlite-core/columns/numeric.cjs
var require_numeric2 = __commonJS({
  "node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/sqlite-core/columns/numeric.cjs"(exports2, module2) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc2) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc2 = __getOwnPropDesc2(from, key)) || desc2.enumerable });
      }
      return to;
    };
    var __toCommonJS = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var numeric_exports = {};
    __export2(numeric_exports, {
      SQLiteNumeric: () => SQLiteNumeric2,
      SQLiteNumericBigInt: () => SQLiteNumericBigInt2,
      SQLiteNumericBigIntBuilder: () => SQLiteNumericBigIntBuilder2,
      SQLiteNumericBuilder: () => SQLiteNumericBuilder2,
      SQLiteNumericNumber: () => SQLiteNumericNumber2,
      SQLiteNumericNumberBuilder: () => SQLiteNumericNumberBuilder2,
      numeric: () => numeric2
    });
    module2.exports = __toCommonJS(numeric_exports);
    var import_entity22 = require_entity();
    var import_utils6 = require_utils();
    var import_common8 = require_common2();
    var SQLiteNumericBuilder2 = class extends import_common8.SQLiteColumnBuilder {
      static [import_entity22.entityKind] = "SQLiteNumericBuilder";
      constructor(name) {
        super(name, "string", "SQLiteNumeric");
      }
      /** @internal */
      build(table) {
        return new SQLiteNumeric2(
          table,
          this.config
        );
      }
    };
    var SQLiteNumeric2 = class extends import_common8.SQLiteColumn {
      static [import_entity22.entityKind] = "SQLiteNumeric";
      mapFromDriverValue(value) {
        if (typeof value === "string") return value;
        return String(value);
      }
      getSQLType() {
        return "numeric";
      }
    };
    var SQLiteNumericNumberBuilder2 = class extends import_common8.SQLiteColumnBuilder {
      static [import_entity22.entityKind] = "SQLiteNumericNumberBuilder";
      constructor(name) {
        super(name, "number", "SQLiteNumericNumber");
      }
      /** @internal */
      build(table) {
        return new SQLiteNumericNumber2(
          table,
          this.config
        );
      }
    };
    var SQLiteNumericNumber2 = class extends import_common8.SQLiteColumn {
      static [import_entity22.entityKind] = "SQLiteNumericNumber";
      mapFromDriverValue(value) {
        if (typeof value === "number") return value;
        return Number(value);
      }
      mapToDriverValue = String;
      getSQLType() {
        return "numeric";
      }
    };
    var SQLiteNumericBigIntBuilder2 = class extends import_common8.SQLiteColumnBuilder {
      static [import_entity22.entityKind] = "SQLiteNumericBigIntBuilder";
      constructor(name) {
        super(name, "bigint", "SQLiteNumericBigInt");
      }
      /** @internal */
      build(table) {
        return new SQLiteNumericBigInt2(
          table,
          this.config
        );
      }
    };
    var SQLiteNumericBigInt2 = class extends import_common8.SQLiteColumn {
      static [import_entity22.entityKind] = "SQLiteNumericBigInt";
      mapFromDriverValue = BigInt;
      mapToDriverValue = String;
      getSQLType() {
        return "numeric";
      }
    };
    function numeric2(a, b) {
      const { name, config } = (0, import_utils6.getColumnNameAndConfig)(a, b);
      const mode = config?.mode;
      return mode === "number" ? new SQLiteNumericNumberBuilder2(name) : mode === "bigint" ? new SQLiteNumericBigIntBuilder2(name) : new SQLiteNumericBuilder2(name);
    }
  }
});

// node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/sqlite-core/columns/real.cjs
var require_real2 = __commonJS({
  "node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/sqlite-core/columns/real.cjs"(exports2, module2) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc2) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc2 = __getOwnPropDesc2(from, key)) || desc2.enumerable });
      }
      return to;
    };
    var __toCommonJS = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var real_exports = {};
    __export2(real_exports, {
      SQLiteReal: () => SQLiteReal2,
      SQLiteRealBuilder: () => SQLiteRealBuilder2,
      real: () => real2
    });
    module2.exports = __toCommonJS(real_exports);
    var import_entity22 = require_entity();
    var import_common8 = require_common2();
    var SQLiteRealBuilder2 = class extends import_common8.SQLiteColumnBuilder {
      static [import_entity22.entityKind] = "SQLiteRealBuilder";
      constructor(name) {
        super(name, "number", "SQLiteReal");
      }
      /** @internal */
      build(table) {
        return new SQLiteReal2(table, this.config);
      }
    };
    var SQLiteReal2 = class extends import_common8.SQLiteColumn {
      static [import_entity22.entityKind] = "SQLiteReal";
      getSQLType() {
        return "real";
      }
    };
    function real2(name) {
      return new SQLiteRealBuilder2(name ?? "");
    }
  }
});

// node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/sqlite-core/columns/text.cjs
var require_text2 = __commonJS({
  "node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/sqlite-core/columns/text.cjs"(exports2, module2) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc2) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc2 = __getOwnPropDesc2(from, key)) || desc2.enumerable });
      }
      return to;
    };
    var __toCommonJS = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var text_exports = {};
    __export2(text_exports, {
      SQLiteText: () => SQLiteText2,
      SQLiteTextBuilder: () => SQLiteTextBuilder2,
      SQLiteTextJson: () => SQLiteTextJson2,
      SQLiteTextJsonBuilder: () => SQLiteTextJsonBuilder2,
      text: () => text2
    });
    module2.exports = __toCommonJS(text_exports);
    var import_entity22 = require_entity();
    var import_utils6 = require_utils();
    var import_common8 = require_common2();
    var SQLiteTextBuilder2 = class extends import_common8.SQLiteColumnBuilder {
      static [import_entity22.entityKind] = "SQLiteTextBuilder";
      constructor(name, config) {
        super(name, "string", "SQLiteText");
        this.config.enumValues = config.enum;
        this.config.length = config.length;
      }
      /** @internal */
      build(table) {
        return new SQLiteText2(
          table,
          this.config
        );
      }
    };
    var SQLiteText2 = class extends import_common8.SQLiteColumn {
      static [import_entity22.entityKind] = "SQLiteText";
      enumValues = this.config.enumValues;
      length = this.config.length;
      constructor(table, config) {
        super(table, config);
      }
      getSQLType() {
        return `text${this.config.length ? `(${this.config.length})` : ""}`;
      }
    };
    var SQLiteTextJsonBuilder2 = class extends import_common8.SQLiteColumnBuilder {
      static [import_entity22.entityKind] = "SQLiteTextJsonBuilder";
      constructor(name) {
        super(name, "json", "SQLiteTextJson");
      }
      /** @internal */
      build(table) {
        return new SQLiteTextJson2(
          table,
          this.config
        );
      }
    };
    var SQLiteTextJson2 = class extends import_common8.SQLiteColumn {
      static [import_entity22.entityKind] = "SQLiteTextJson";
      getSQLType() {
        return "text";
      }
      mapFromDriverValue(value) {
        return JSON.parse(value);
      }
      mapToDriverValue(value) {
        return JSON.stringify(value);
      }
    };
    function text2(a, b = {}) {
      const { name, config } = (0, import_utils6.getColumnNameAndConfig)(a, b);
      if (config.mode === "json") {
        return new SQLiteTextJsonBuilder2(name);
      }
      return new SQLiteTextBuilder2(name, config);
    }
  }
});

// node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/sqlite-core/columns/all.cjs
var require_all2 = __commonJS({
  "node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/sqlite-core/columns/all.cjs"(exports2, module2) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc2) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc2 = __getOwnPropDesc2(from, key)) || desc2.enumerable });
      }
      return to;
    };
    var __toCommonJS = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var all_exports = {};
    __export2(all_exports, {
      getSQLiteColumnBuilders: () => getSQLiteColumnBuilders2
    });
    module2.exports = __toCommonJS(all_exports);
    var import_blob2 = require_blob();
    var import_custom2 = require_custom2();
    var import_integer2 = require_integer2();
    var import_numeric2 = require_numeric2();
    var import_real2 = require_real2();
    var import_text2 = require_text2();
    function getSQLiteColumnBuilders2() {
      return {
        blob: import_blob2.blob,
        customType: import_custom2.customType,
        integer: import_integer2.integer,
        numeric: import_numeric2.numeric,
        real: import_real2.real,
        text: import_text2.text
      };
    }
  }
});

// node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/sqlite-core/table.cjs
var require_table3 = __commonJS({
  "node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/sqlite-core/table.cjs"(exports2, module2) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc2) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc2 = __getOwnPropDesc2(from, key)) || desc2.enumerable });
      }
      return to;
    };
    var __toCommonJS = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var table_exports = {};
    __export2(table_exports, {
      InlineForeignKeys: () => InlineForeignKeys2,
      SQLiteTable: () => SQLiteTable2,
      sqliteTable: () => sqliteTable2,
      sqliteTableCreator: () => sqliteTableCreator
    });
    module2.exports = __toCommonJS(table_exports);
    var import_entity22 = require_entity();
    var import_table4 = require_table();
    var import_all2 = require_all2();
    var InlineForeignKeys2 = Symbol.for("drizzle:SQLiteInlineForeignKeys");
    var SQLiteTable2 = class extends import_table4.Table {
      static [import_entity22.entityKind] = "SQLiteTable";
      /** @internal */
      static Symbol = Object.assign({}, import_table4.Table.Symbol, {
        InlineForeignKeys: InlineForeignKeys2
      });
      /** @internal */
      [import_table4.Table.Symbol.Columns];
      /** @internal */
      [InlineForeignKeys2] = [];
      /** @internal */
      [import_table4.Table.Symbol.ExtraConfigBuilder] = void 0;
    };
    function sqliteTableBase2(name, columns, extraConfig, schema, baseName = name) {
      const rawTable = new SQLiteTable2(name, schema, baseName);
      const parsedColumns = typeof columns === "function" ? columns((0, import_all2.getSQLiteColumnBuilders)()) : columns;
      const builtColumns = Object.fromEntries(
        Object.entries(parsedColumns).map(([name2, colBuilderBase]) => {
          const colBuilder = colBuilderBase;
          colBuilder.setName(name2);
          const column = colBuilder.build(rawTable);
          rawTable[InlineForeignKeys2].push(...colBuilder.buildForeignKeys(column, rawTable));
          return [name2, column];
        })
      );
      const table = Object.assign(rawTable, builtColumns);
      table[import_table4.Table.Symbol.Columns] = builtColumns;
      table[import_table4.Table.Symbol.ExtraConfigColumns] = builtColumns;
      if (extraConfig) {
        table[SQLiteTable2.Symbol.ExtraConfigBuilder] = extraConfig;
      }
      return table;
    }
    var sqliteTable2 = (name, columns, extraConfig) => {
      return sqliteTableBase2(name, columns, extraConfig);
    };
    function sqliteTableCreator(customizeTableName) {
      return (name, columns, extraConfig) => {
        return sqliteTableBase2(customizeTableName(name), columns, extraConfig, void 0, name);
      };
    }
  }
});

// node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/sqlite-core/checks.cjs
var require_checks = __commonJS({
  "node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/sqlite-core/checks.cjs"(exports2, module2) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc2) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc2 = __getOwnPropDesc2(from, key)) || desc2.enumerable });
      }
      return to;
    };
    var __toCommonJS = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var checks_exports = {};
    __export2(checks_exports, {
      Check: () => Check,
      CheckBuilder: () => CheckBuilder,
      check: () => check
    });
    module2.exports = __toCommonJS(checks_exports);
    var import_entity22 = require_entity();
    var CheckBuilder = class {
      constructor(name, value) {
        this.name = name;
        this.value = value;
      }
      static [import_entity22.entityKind] = "SQLiteCheckBuilder";
      brand;
      build(table) {
        return new Check(table, this);
      }
    };
    var Check = class {
      constructor(table, builder) {
        this.table = table;
        this.name = builder.name;
        this.value = builder.value;
      }
      static [import_entity22.entityKind] = "SQLiteCheck";
      name;
      value;
    };
    function check(name, value) {
      return new CheckBuilder(name, value);
    }
  }
});

// node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/sqlite-core/indexes.cjs
var require_indexes = __commonJS({
  "node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/sqlite-core/indexes.cjs"(exports2, module2) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc2) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc2 = __getOwnPropDesc2(from, key)) || desc2.enumerable });
      }
      return to;
    };
    var __toCommonJS = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var indexes_exports = {};
    __export2(indexes_exports, {
      Index: () => Index2,
      IndexBuilder: () => IndexBuilder2,
      IndexBuilderOn: () => IndexBuilderOn2,
      index: () => index2,
      uniqueIndex: () => uniqueIndex2
    });
    module2.exports = __toCommonJS(indexes_exports);
    var import_entity22 = require_entity();
    var IndexBuilderOn2 = class {
      constructor(name, unique) {
        this.name = name;
        this.unique = unique;
      }
      static [import_entity22.entityKind] = "SQLiteIndexBuilderOn";
      on(...columns) {
        return new IndexBuilder2(this.name, columns, this.unique);
      }
    };
    var IndexBuilder2 = class {
      static [import_entity22.entityKind] = "SQLiteIndexBuilder";
      /** @internal */
      config;
      constructor(name, columns, unique) {
        this.config = {
          name,
          columns,
          unique,
          where: void 0
        };
      }
      /**
       * Condition for partial index.
       */
      where(condition) {
        this.config.where = condition;
        return this;
      }
      /** @internal */
      build(table) {
        return new Index2(this.config, table);
      }
    };
    var Index2 = class {
      static [import_entity22.entityKind] = "SQLiteIndex";
      config;
      constructor(config, table) {
        this.config = { ...config, table };
      }
    };
    function index2(name) {
      return new IndexBuilderOn2(name, false);
    }
    function uniqueIndex2(name) {
      return new IndexBuilderOn2(name, true);
    }
  }
});

// node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/sqlite-core/primary-keys.cjs
var require_primary_keys2 = __commonJS({
  "node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/sqlite-core/primary-keys.cjs"(exports2, module2) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc2) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc2 = __getOwnPropDesc2(from, key)) || desc2.enumerable });
      }
      return to;
    };
    var __toCommonJS = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var primary_keys_exports = {};
    __export2(primary_keys_exports, {
      PrimaryKey: () => PrimaryKey,
      PrimaryKeyBuilder: () => PrimaryKeyBuilder,
      primaryKey: () => primaryKey
    });
    module2.exports = __toCommonJS(primary_keys_exports);
    var import_entity22 = require_entity();
    var import_table4 = require_table3();
    function primaryKey(...config) {
      if (config[0].columns) {
        return new PrimaryKeyBuilder(config[0].columns, config[0].name);
      }
      return new PrimaryKeyBuilder(config);
    }
    var PrimaryKeyBuilder = class {
      static [import_entity22.entityKind] = "SQLitePrimaryKeyBuilder";
      /** @internal */
      columns;
      /** @internal */
      name;
      constructor(columns, name) {
        this.columns = columns;
        this.name = name;
      }
      /** @internal */
      build(table) {
        return new PrimaryKey(table, this.columns, this.name);
      }
    };
    var PrimaryKey = class {
      constructor(table, columns, name) {
        this.table = table;
        this.columns = columns;
        this.name = name;
      }
      static [import_entity22.entityKind] = "SQLitePrimaryKey";
      columns;
      name;
      getName() {
        return this.name ?? `${this.table[import_table4.SQLiteTable.Symbol.Name]}_${this.columns.map((column) => column.name).join("_")}_pk`;
      }
    };
  }
});

// node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/sqlite-core/utils.cjs
var require_utils3 = __commonJS({
  "node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/sqlite-core/utils.cjs"(exports2, module2) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc2) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc2 = __getOwnPropDesc2(from, key)) || desc2.enumerable });
      }
      return to;
    };
    var __toCommonJS = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var utils_exports = {};
    __export2(utils_exports, {
      extractUsedTable: () => extractUsedTable,
      getTableConfig: () => getTableConfig,
      getViewConfig: () => getViewConfig
    });
    module2.exports = __toCommonJS(utils_exports);
    var import_entity22 = require_entity();
    var import_sql4 = require_sql();
    var import_subquery2 = require_subquery();
    var import_table4 = require_table();
    var import_view_common2 = require_view_common();
    var import_checks = require_checks();
    var import_foreign_keys3 = require_foreign_keys2();
    var import_indexes = require_indexes();
    var import_primary_keys = require_primary_keys2();
    var import_table22 = require_table3();
    var import_unique_constraint3 = require_unique_constraint2();
    function getTableConfig(table) {
      const columns = Object.values(table[import_table22.SQLiteTable.Symbol.Columns]);
      const indexes = [];
      const checks = [];
      const primaryKeys = [];
      const uniqueConstraints = [];
      const foreignKeys = Object.values(table[import_table22.SQLiteTable.Symbol.InlineForeignKeys]);
      const name = table[import_table4.Table.Symbol.Name];
      const extraConfigBuilder = table[import_table22.SQLiteTable.Symbol.ExtraConfigBuilder];
      if (extraConfigBuilder !== void 0) {
        const extraConfig = extraConfigBuilder(table[import_table22.SQLiteTable.Symbol.Columns]);
        const extraValues = Array.isArray(extraConfig) ? extraConfig.flat(1) : Object.values(extraConfig);
        for (const builder of Object.values(extraValues)) {
          if ((0, import_entity22.is)(builder, import_indexes.IndexBuilder)) {
            indexes.push(builder.build(table));
          } else if ((0, import_entity22.is)(builder, import_checks.CheckBuilder)) {
            checks.push(builder.build(table));
          } else if ((0, import_entity22.is)(builder, import_unique_constraint3.UniqueConstraintBuilder)) {
            uniqueConstraints.push(builder.build(table));
          } else if ((0, import_entity22.is)(builder, import_primary_keys.PrimaryKeyBuilder)) {
            primaryKeys.push(builder.build(table));
          } else if ((0, import_entity22.is)(builder, import_foreign_keys3.ForeignKeyBuilder)) {
            foreignKeys.push(builder.build(table));
          }
        }
      }
      return {
        columns,
        indexes,
        foreignKeys,
        checks,
        primaryKeys,
        uniqueConstraints,
        name
      };
    }
    function extractUsedTable(table) {
      if ((0, import_entity22.is)(table, import_table22.SQLiteTable)) {
        return [`${table[import_table4.Table.Symbol.BaseName]}`];
      }
      if ((0, import_entity22.is)(table, import_subquery2.Subquery)) {
        return table._.usedTables ?? [];
      }
      if ((0, import_entity22.is)(table, import_sql4.SQL)) {
        return table.usedTables ?? [];
      }
      return [];
    }
    function getViewConfig(view) {
      return {
        ...view[import_view_common2.ViewBaseConfig]
        // ...view[SQLiteViewConfig],
      };
    }
  }
});

// node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/sqlite-core/query-builders/delete.cjs
var require_delete = __commonJS({
  "node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/sqlite-core/query-builders/delete.cjs"(exports2, module2) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc2) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc2 = __getOwnPropDesc2(from, key)) || desc2.enumerable });
      }
      return to;
    };
    var __toCommonJS = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var delete_exports = {};
    __export2(delete_exports, {
      SQLiteDeleteBase: () => SQLiteDeleteBase
    });
    module2.exports = __toCommonJS(delete_exports);
    var import_entity22 = require_entity();
    var import_query_promise = require_query_promise();
    var import_selection_proxy = require_selection_proxy();
    var import_table4 = require_table3();
    var import_table22 = require_table();
    var import_utils6 = require_utils();
    var import_utils22 = require_utils3();
    var SQLiteDeleteBase = class extends import_query_promise.QueryPromise {
      constructor(table, session, dialect, withList) {
        super();
        this.table = table;
        this.session = session;
        this.dialect = dialect;
        this.config = { table, withList };
      }
      static [import_entity22.entityKind] = "SQLiteDelete";
      /** @internal */
      config;
      /**
       * Adds a `where` clause to the query.
       *
       * Calling this method will delete only those rows that fulfill a specified condition.
       *
       * See docs: {@link https://orm.drizzle.team/docs/delete}
       *
       * @param where the `where` clause.
       *
       * @example
       * You can use conditional operators and `sql function` to filter the rows to be deleted.
       *
       * ```ts
       * // Delete all cars with green color
       * db.delete(cars).where(eq(cars.color, 'green'));
       * // or
       * db.delete(cars).where(sql`${cars.color} = 'green'`)
       * ```
       *
       * You can logically combine conditional operators with `and()` and `or()` operators:
       *
       * ```ts
       * // Delete all BMW cars with a green color
       * db.delete(cars).where(and(eq(cars.color, 'green'), eq(cars.brand, 'BMW')));
       *
       * // Delete all cars with the green or blue color
       * db.delete(cars).where(or(eq(cars.color, 'green'), eq(cars.color, 'blue')));
       * ```
       */
      where(where) {
        this.config.where = where;
        return this;
      }
      orderBy(...columns) {
        if (typeof columns[0] === "function") {
          const orderBy = columns[0](
            new Proxy(
              this.config.table[import_table22.Table.Symbol.Columns],
              new import_selection_proxy.SelectionProxyHandler({ sqlAliasedBehavior: "alias", sqlBehavior: "sql" })
            )
          );
          const orderByArray = Array.isArray(orderBy) ? orderBy : [orderBy];
          this.config.orderBy = orderByArray;
        } else {
          const orderByArray = columns;
          this.config.orderBy = orderByArray;
        }
        return this;
      }
      limit(limit) {
        this.config.limit = limit;
        return this;
      }
      returning(fields = this.table[import_table4.SQLiteTable.Symbol.Columns]) {
        this.config.returning = (0, import_utils6.orderSelectedFields)(fields);
        return this;
      }
      /** @internal */
      getSQL() {
        return this.dialect.buildDeleteQuery(this.config);
      }
      toSQL() {
        const { typings: _typings, ...rest } = this.dialect.sqlToQuery(this.getSQL());
        return rest;
      }
      /** @internal */
      _prepare(isOneTimeQuery = true) {
        return this.session[isOneTimeQuery ? "prepareOneTimeQuery" : "prepareQuery"](
          this.dialect.sqlToQuery(this.getSQL()),
          this.config.returning,
          this.config.returning ? "all" : "run",
          true,
          void 0,
          {
            type: "delete",
            tables: (0, import_utils22.extractUsedTable)(this.config.table)
          }
        );
      }
      prepare() {
        return this._prepare(false);
      }
      run = (placeholderValues) => {
        return this._prepare().run(placeholderValues);
      };
      all = (placeholderValues) => {
        return this._prepare().all(placeholderValues);
      };
      get = (placeholderValues) => {
        return this._prepare().get(placeholderValues);
      };
      values = (placeholderValues) => {
        return this._prepare().values(placeholderValues);
      };
      async execute(placeholderValues) {
        return this._prepare().execute(placeholderValues);
      }
      $dynamic() {
        return this;
      }
    };
  }
});

// node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/casing.cjs
var require_casing = __commonJS({
  "node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/casing.cjs"(exports2, module2) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc2) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc2 = __getOwnPropDesc2(from, key)) || desc2.enumerable });
      }
      return to;
    };
    var __toCommonJS = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var casing_exports = {};
    __export2(casing_exports, {
      CasingCache: () => CasingCache,
      toCamelCase: () => toCamelCase,
      toSnakeCase: () => toSnakeCase
    });
    module2.exports = __toCommonJS(casing_exports);
    var import_entity22 = require_entity();
    var import_table4 = require_table();
    function toSnakeCase(input) {
      const words = input.replace(/['\u2019]/g, "").match(/[\da-z]+|[A-Z]+(?![a-z])|[A-Z][\da-z]+/g) ?? [];
      return words.map((word) => word.toLowerCase()).join("_");
    }
    function toCamelCase(input) {
      const words = input.replace(/['\u2019]/g, "").match(/[\da-z]+|[A-Z]+(?![a-z])|[A-Z][\da-z]+/g) ?? [];
      return words.reduce((acc, word, i) => {
        const formattedWord = i === 0 ? word.toLowerCase() : `${word[0].toUpperCase()}${word.slice(1)}`;
        return acc + formattedWord;
      }, "");
    }
    function noopCase(input) {
      return input;
    }
    var CasingCache = class {
      static [import_entity22.entityKind] = "CasingCache";
      /** @internal */
      cache = {};
      cachedTables = {};
      convert;
      constructor(casing) {
        this.convert = casing === "snake_case" ? toSnakeCase : casing === "camelCase" ? toCamelCase : noopCase;
      }
      getColumnCasing(column) {
        if (!column.keyAsName) return column.name;
        const schema = column.table[import_table4.Table.Symbol.Schema] ?? "public";
        const tableName = column.table[import_table4.Table.Symbol.OriginalName];
        const key = `${schema}.${tableName}.${column.name}`;
        if (!this.cache[key]) {
          this.cacheTable(column.table);
        }
        return this.cache[key];
      }
      cacheTable(table) {
        const schema = table[import_table4.Table.Symbol.Schema] ?? "public";
        const tableName = table[import_table4.Table.Symbol.OriginalName];
        const tableKey = `${schema}.${tableName}`;
        if (!this.cachedTables[tableKey]) {
          for (const column of Object.values(table[import_table4.Table.Symbol.Columns])) {
            const columnKey = `${tableKey}.${column.name}`;
            this.cache[columnKey] = this.convert(column.name);
          }
          this.cachedTables[tableKey] = true;
        }
      }
      clearCache() {
        this.cache = {};
        this.cachedTables = {};
      }
    };
  }
});

// node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/errors.cjs
var require_errors = __commonJS({
  "node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/errors.cjs"(exports2, module2) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc2) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc2 = __getOwnPropDesc2(from, key)) || desc2.enumerable });
      }
      return to;
    };
    var __toCommonJS = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var errors_exports = {};
    __export2(errors_exports, {
      DrizzleError: () => DrizzleError,
      DrizzleQueryError: () => DrizzleQueryError,
      TransactionRollbackError: () => TransactionRollbackError
    });
    module2.exports = __toCommonJS(errors_exports);
    var import_entity22 = require_entity();
    var DrizzleError = class extends Error {
      static [import_entity22.entityKind] = "DrizzleError";
      constructor({ message, cause }) {
        super(message);
        this.name = "DrizzleError";
        this.cause = cause;
      }
    };
    var DrizzleQueryError = class _DrizzleQueryError extends Error {
      constructor(query, params, cause) {
        super(`Failed query: ${query}
params: ${params}`);
        this.query = query;
        this.params = params;
        this.cause = cause;
        Error.captureStackTrace(this, _DrizzleQueryError);
        if (cause) this.cause = cause;
      }
    };
    var TransactionRollbackError = class extends DrizzleError {
      static [import_entity22.entityKind] = "TransactionRollbackError";
      constructor() {
        super({ message: "Rollback" });
      }
    };
  }
});

// node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/sql/functions/aggregate.cjs
var require_aggregate = __commonJS({
  "node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/sql/functions/aggregate.cjs"(exports2, module2) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc2) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc2 = __getOwnPropDesc2(from, key)) || desc2.enumerable });
      }
      return to;
    };
    var __toCommonJS = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var aggregate_exports = {};
    __export2(aggregate_exports, {
      avg: () => avg,
      avgDistinct: () => avgDistinct,
      count: () => count,
      countDistinct: () => countDistinct,
      max: () => max,
      min: () => min,
      sum: () => sum,
      sumDistinct: () => sumDistinct
    });
    module2.exports = __toCommonJS(aggregate_exports);
    var import_column5 = require_column();
    var import_entity22 = require_entity();
    var import_sql4 = require_sql();
    function count(expression) {
      return import_sql4.sql`count(${expression || import_sql4.sql.raw("*")})`.mapWith(Number);
    }
    function countDistinct(expression) {
      return import_sql4.sql`count(distinct ${expression})`.mapWith(Number);
    }
    function avg(expression) {
      return import_sql4.sql`avg(${expression})`.mapWith(String);
    }
    function avgDistinct(expression) {
      return import_sql4.sql`avg(distinct ${expression})`.mapWith(String);
    }
    function sum(expression) {
      return import_sql4.sql`sum(${expression})`.mapWith(String);
    }
    function sumDistinct(expression) {
      return import_sql4.sql`sum(distinct ${expression})`.mapWith(String);
    }
    function max(expression) {
      return import_sql4.sql`max(${expression})`.mapWith((0, import_entity22.is)(expression, import_column5.Column) ? expression : String);
    }
    function min(expression) {
      return import_sql4.sql`min(${expression})`.mapWith((0, import_entity22.is)(expression, import_column5.Column) ? expression : String);
    }
  }
});

// node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/sql/functions/vector.cjs
var require_vector2 = __commonJS({
  "node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/sql/functions/vector.cjs"(exports2, module2) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc2) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc2 = __getOwnPropDesc2(from, key)) || desc2.enumerable });
      }
      return to;
    };
    var __toCommonJS = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var vector_exports = {};
    __export2(vector_exports, {
      cosineDistance: () => cosineDistance,
      hammingDistance: () => hammingDistance,
      innerProduct: () => innerProduct,
      jaccardDistance: () => jaccardDistance,
      l1Distance: () => l1Distance,
      l2Distance: () => l2Distance
    });
    module2.exports = __toCommonJS(vector_exports);
    var import_sql4 = require_sql();
    function toSql(value) {
      return JSON.stringify(value);
    }
    function l2Distance(column, value) {
      if (Array.isArray(value)) {
        return import_sql4.sql`${column} <-> ${toSql(value)}`;
      }
      return import_sql4.sql`${column} <-> ${value}`;
    }
    function l1Distance(column, value) {
      if (Array.isArray(value)) {
        return import_sql4.sql`${column} <+> ${toSql(value)}`;
      }
      return import_sql4.sql`${column} <+> ${value}`;
    }
    function innerProduct(column, value) {
      if (Array.isArray(value)) {
        return import_sql4.sql`${column} <#> ${toSql(value)}`;
      }
      return import_sql4.sql`${column} <#> ${value}`;
    }
    function cosineDistance(column, value) {
      if (Array.isArray(value)) {
        return import_sql4.sql`${column} <=> ${toSql(value)}`;
      }
      return import_sql4.sql`${column} <=> ${value}`;
    }
    function hammingDistance(column, value) {
      if (Array.isArray(value)) {
        return import_sql4.sql`${column} <~> ${toSql(value)}`;
      }
      return import_sql4.sql`${column} <~> ${value}`;
    }
    function jaccardDistance(column, value) {
      if (Array.isArray(value)) {
        return import_sql4.sql`${column} <%> ${toSql(value)}`;
      }
      return import_sql4.sql`${column} <%> ${value}`;
    }
  }
});

// node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/sql/functions/index.cjs
var require_functions = __commonJS({
  "node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/sql/functions/index.cjs"(exports2, module2) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __copyProps2 = (to, from, except, desc2) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc2 = __getOwnPropDesc2(from, key)) || desc2.enumerable });
      }
      return to;
    };
    var __reExport = (target, mod, secondTarget) => (__copyProps2(target, mod, "default"), secondTarget && __copyProps2(secondTarget, mod, "default"));
    var __toCommonJS = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var functions_exports = {};
    module2.exports = __toCommonJS(functions_exports);
    __reExport(functions_exports, require_aggregate(), module2.exports);
    __reExport(functions_exports, require_vector2(), module2.exports);
  }
});

// node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/sql/index.cjs
var require_sql2 = __commonJS({
  "node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/sql/index.cjs"(exports2, module2) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __copyProps2 = (to, from, except, desc2) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc2 = __getOwnPropDesc2(from, key)) || desc2.enumerable });
      }
      return to;
    };
    var __reExport = (target, mod, secondTarget) => (__copyProps2(target, mod, "default"), secondTarget && __copyProps2(secondTarget, mod, "default"));
    var __toCommonJS = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var sql_exports = {};
    module2.exports = __toCommonJS(sql_exports);
    __reExport(sql_exports, require_expressions(), module2.exports);
    __reExport(sql_exports, require_functions(), module2.exports);
    __reExport(sql_exports, require_sql(), module2.exports);
  }
});

// node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/sqlite-core/columns/index.cjs
var require_columns = __commonJS({
  "node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/sqlite-core/columns/index.cjs"(exports2, module2) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __copyProps2 = (to, from, except, desc2) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc2 = __getOwnPropDesc2(from, key)) || desc2.enumerable });
      }
      return to;
    };
    var __reExport = (target, mod, secondTarget) => (__copyProps2(target, mod, "default"), secondTarget && __copyProps2(secondTarget, mod, "default"));
    var __toCommonJS = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var columns_exports = {};
    module2.exports = __toCommonJS(columns_exports);
    __reExport(columns_exports, require_blob(), module2.exports);
    __reExport(columns_exports, require_common2(), module2.exports);
    __reExport(columns_exports, require_custom2(), module2.exports);
    __reExport(columns_exports, require_integer2(), module2.exports);
    __reExport(columns_exports, require_numeric2(), module2.exports);
    __reExport(columns_exports, require_real2(), module2.exports);
    __reExport(columns_exports, require_text2(), module2.exports);
  }
});

// node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/sqlite-core/view-base.cjs
var require_view_base = __commonJS({
  "node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/sqlite-core/view-base.cjs"(exports2, module2) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc2) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc2 = __getOwnPropDesc2(from, key)) || desc2.enumerable });
      }
      return to;
    };
    var __toCommonJS = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var view_base_exports = {};
    __export2(view_base_exports, {
      SQLiteViewBase: () => SQLiteViewBase
    });
    module2.exports = __toCommonJS(view_base_exports);
    var import_entity22 = require_entity();
    var import_sql4 = require_sql();
    var SQLiteViewBase = class extends import_sql4.View {
      static [import_entity22.entityKind] = "SQLiteViewBase";
    };
  }
});

// node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/sqlite-core/dialect.cjs
var require_dialect = __commonJS({
  "node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/sqlite-core/dialect.cjs"(exports2, module2) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc2) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc2 = __getOwnPropDesc2(from, key)) || desc2.enumerable });
      }
      return to;
    };
    var __toCommonJS = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var dialect_exports = {};
    __export2(dialect_exports, {
      SQLiteAsyncDialect: () => SQLiteAsyncDialect,
      SQLiteDialect: () => SQLiteDialect,
      SQLiteSyncDialect: () => SQLiteSyncDialect
    });
    module2.exports = __toCommonJS(dialect_exports);
    var import_alias = require_alias();
    var import_casing = require_casing();
    var import_column5 = require_column();
    var import_entity22 = require_entity();
    var import_errors = require_errors();
    var import_relations = require_relations();
    var import_sql4 = require_sql2();
    var import_sql22 = require_sql();
    var import_columns = require_columns();
    var import_table4 = require_table3();
    var import_subquery2 = require_subquery();
    var import_table22 = require_table();
    var import_utils6 = require_utils();
    var import_view_common2 = require_view_common();
    var import_view_base = require_view_base();
    var SQLiteDialect = class {
      static [import_entity22.entityKind] = "SQLiteDialect";
      /** @internal */
      casing;
      constructor(config) {
        this.casing = new import_casing.CasingCache(config?.casing);
      }
      escapeName(name) {
        return `"${name.replace(/"/g, '""')}"`;
      }
      escapeParam(_num) {
        return "?";
      }
      escapeString(str) {
        return `'${str.replace(/'/g, "''")}'`;
      }
      buildWithCTE(queries) {
        if (!queries?.length) return void 0;
        const withSqlChunks = [import_sql22.sql`with `];
        for (const [i, w] of queries.entries()) {
          withSqlChunks.push(import_sql22.sql`${import_sql22.sql.identifier(w._.alias)} as (${w._.sql})`);
          if (i < queries.length - 1) {
            withSqlChunks.push(import_sql22.sql`, `);
          }
        }
        withSqlChunks.push(import_sql22.sql` `);
        return import_sql22.sql.join(withSqlChunks);
      }
      buildDeleteQuery({
        table,
        where,
        returning,
        withList,
        limit,
        orderBy
      }) {
        const withSql = this.buildWithCTE(withList);
        const returningSql = returning ? import_sql22.sql` returning ${this.buildSelection(returning, { isSingleTable: true })}` : void 0;
        const whereSql = where ? import_sql22.sql` where ${where}` : void 0;
        const orderBySql = this.buildOrderBy(orderBy);
        const limitSql = this.buildLimit(limit);
        return import_sql22.sql`${withSql}delete from ${table}${whereSql}${returningSql}${orderBySql}${limitSql}`;
      }
      buildUpdateSet(table, set) {
        const tableColumns = table[import_table22.Table.Symbol.Columns];
        const columnNames = Object.keys(tableColumns).filter(
          (colName) => set[colName] !== void 0 || tableColumns[colName]?.onUpdateFn !== void 0
        );
        const setSize = columnNames.length;
        return import_sql22.sql.join(
          columnNames.flatMap((colName, i) => {
            const col = tableColumns[colName];
            const onUpdateFnResult = col.onUpdateFn?.();
            const value = set[colName] ?? ((0, import_entity22.is)(onUpdateFnResult, import_sql22.SQL) ? onUpdateFnResult : import_sql22.sql.param(onUpdateFnResult, col));
            const res = import_sql22.sql`${import_sql22.sql.identifier(this.casing.getColumnCasing(col))} = ${value}`;
            if (i < setSize - 1) {
              return [res, import_sql22.sql.raw(", ")];
            }
            return [res];
          })
        );
      }
      buildUpdateQuery({
        table,
        set,
        where,
        returning,
        withList,
        joins,
        from,
        limit,
        orderBy
      }) {
        const withSql = this.buildWithCTE(withList);
        const setSql = this.buildUpdateSet(table, set);
        const fromSql = from && import_sql22.sql.join([import_sql22.sql.raw(" from "), this.buildFromTable(from)]);
        const joinsSql = this.buildJoins(joins);
        const returningSql = returning ? import_sql22.sql` returning ${this.buildSelection(returning, { isSingleTable: true })}` : void 0;
        const whereSql = where ? import_sql22.sql` where ${where}` : void 0;
        const orderBySql = this.buildOrderBy(orderBy);
        const limitSql = this.buildLimit(limit);
        return import_sql22.sql`${withSql}update ${table} set ${setSql}${fromSql}${joinsSql}${whereSql}${returningSql}${orderBySql}${limitSql}`;
      }
      /**
       * Builds selection SQL with provided fields/expressions
       *
       * Examples:
       *
       * `select <selection> from`
       *
       * `insert ... returning <selection>`
       *
       * If `isSingleTable` is true, then columns won't be prefixed with table name
       */
      buildSelection(fields, { isSingleTable = false } = {}) {
        const columnsLen = fields.length;
        const chunks = fields.flatMap(({ field }, i) => {
          const chunk = [];
          if ((0, import_entity22.is)(field, import_sql22.SQL.Aliased) && field.isSelectionField) {
            chunk.push(import_sql22.sql.identifier(field.fieldAlias));
          } else if ((0, import_entity22.is)(field, import_sql22.SQL.Aliased) || (0, import_entity22.is)(field, import_sql22.SQL)) {
            const query = (0, import_entity22.is)(field, import_sql22.SQL.Aliased) ? field.sql : field;
            if (isSingleTable) {
              chunk.push(
                new import_sql22.SQL(
                  query.queryChunks.map((c) => {
                    if ((0, import_entity22.is)(c, import_column5.Column)) {
                      return import_sql22.sql.identifier(this.casing.getColumnCasing(c));
                    }
                    return c;
                  })
                )
              );
            } else {
              chunk.push(query);
            }
            if ((0, import_entity22.is)(field, import_sql22.SQL.Aliased)) {
              chunk.push(import_sql22.sql` as ${import_sql22.sql.identifier(field.fieldAlias)}`);
            }
          } else if ((0, import_entity22.is)(field, import_column5.Column)) {
            const tableName = field.table[import_table22.Table.Symbol.Name];
            if (field.columnType === "SQLiteNumericBigInt") {
              if (isSingleTable) {
                chunk.push(
                  import_sql22.sql`cast(${import_sql22.sql.identifier(this.casing.getColumnCasing(field))} as text)`
                );
              } else {
                chunk.push(
                  import_sql22.sql`cast(${import_sql22.sql.identifier(tableName)}.${import_sql22.sql.identifier(this.casing.getColumnCasing(field))} as text)`
                );
              }
            } else {
              if (isSingleTable) {
                chunk.push(import_sql22.sql.identifier(this.casing.getColumnCasing(field)));
              } else {
                chunk.push(
                  import_sql22.sql`${import_sql22.sql.identifier(tableName)}.${import_sql22.sql.identifier(this.casing.getColumnCasing(field))}`
                );
              }
            }
          } else if ((0, import_entity22.is)(field, import_subquery2.Subquery)) {
            const entries = Object.entries(field._.selectedFields);
            if (entries.length === 1) {
              const entry = entries[0][1];
              const fieldDecoder = (0, import_entity22.is)(entry, import_sql22.SQL) ? entry.decoder : (0, import_entity22.is)(entry, import_column5.Column) ? { mapFromDriverValue: (v) => entry.mapFromDriverValue(v) } : entry.sql.decoder;
              if (fieldDecoder) field._.sql.decoder = fieldDecoder;
            }
            chunk.push(field);
          }
          if (i < columnsLen - 1) {
            chunk.push(import_sql22.sql`, `);
          }
          return chunk;
        });
        return import_sql22.sql.join(chunks);
      }
      buildJoins(joins) {
        if (!joins || joins.length === 0) {
          return void 0;
        }
        const joinsArray = [];
        if (joins) {
          for (const [index2, joinMeta] of joins.entries()) {
            if (index2 === 0) {
              joinsArray.push(import_sql22.sql` `);
            }
            const table = joinMeta.table;
            const onSql = joinMeta.on ? import_sql22.sql` on ${joinMeta.on}` : void 0;
            if ((0, import_entity22.is)(table, import_table4.SQLiteTable)) {
              const tableName = table[import_table4.SQLiteTable.Symbol.Name];
              const tableSchema = table[import_table4.SQLiteTable.Symbol.Schema];
              const origTableName = table[import_table4.SQLiteTable.Symbol.OriginalName];
              const alias = tableName === origTableName ? void 0 : joinMeta.alias;
              joinsArray.push(
                import_sql22.sql`${import_sql22.sql.raw(joinMeta.joinType)} join ${tableSchema ? import_sql22.sql`${import_sql22.sql.identifier(tableSchema)}.` : void 0}${import_sql22.sql.identifier(
                  origTableName
                )}${alias && import_sql22.sql` ${import_sql22.sql.identifier(alias)}`}${onSql}`
              );
            } else {
              joinsArray.push(
                import_sql22.sql`${import_sql22.sql.raw(joinMeta.joinType)} join ${table}${onSql}`
              );
            }
            if (index2 < joins.length - 1) {
              joinsArray.push(import_sql22.sql` `);
            }
          }
        }
        return import_sql22.sql.join(joinsArray);
      }
      buildLimit(limit) {
        return typeof limit === "object" || typeof limit === "number" && limit >= 0 ? import_sql22.sql` limit ${limit}` : void 0;
      }
      buildOrderBy(orderBy) {
        const orderByList = [];
        if (orderBy) {
          for (const [index2, orderByValue] of orderBy.entries()) {
            orderByList.push(orderByValue);
            if (index2 < orderBy.length - 1) {
              orderByList.push(import_sql22.sql`, `);
            }
          }
        }
        return orderByList.length > 0 ? import_sql22.sql` order by ${import_sql22.sql.join(orderByList)}` : void 0;
      }
      buildFromTable(table) {
        if ((0, import_entity22.is)(table, import_table22.Table) && table[import_table22.Table.Symbol.IsAlias]) {
          return import_sql22.sql`${import_sql22.sql`${import_sql22.sql.identifier(table[import_table22.Table.Symbol.Schema] ?? "")}.`.if(table[import_table22.Table.Symbol.Schema])}${import_sql22.sql.identifier(
            table[import_table22.Table.Symbol.OriginalName]
          )} ${import_sql22.sql.identifier(table[import_table22.Table.Symbol.Name])}`;
        }
        return table;
      }
      buildSelectQuery({
        withList,
        fields,
        fieldsFlat,
        where,
        having,
        table,
        joins,
        orderBy,
        groupBy,
        limit,
        offset,
        distinct,
        setOperators
      }) {
        const fieldsList = fieldsFlat ?? (0, import_utils6.orderSelectedFields)(fields);
        for (const f of fieldsList) {
          if ((0, import_entity22.is)(f.field, import_column5.Column) && (0, import_table22.getTableName)(f.field.table) !== ((0, import_entity22.is)(table, import_subquery2.Subquery) ? table._.alias : (0, import_entity22.is)(table, import_view_base.SQLiteViewBase) ? table[import_view_common2.ViewBaseConfig].name : (0, import_entity22.is)(table, import_sql22.SQL) ? void 0 : (0, import_table22.getTableName)(table)) && !((table2) => joins?.some(
            ({ alias }) => alias === (table2[import_table22.Table.Symbol.IsAlias] ? (0, import_table22.getTableName)(table2) : table2[import_table22.Table.Symbol.BaseName])
          ))(f.field.table)) {
            const tableName = (0, import_table22.getTableName)(f.field.table);
            throw new Error(
              `Your "${f.path.join(
                "->"
              )}" field references a column "${tableName}"."${f.field.name}", but the table "${tableName}" is not part of the query! Did you forget to join it?`
            );
          }
        }
        const isSingleTable = !joins || joins.length === 0;
        const withSql = this.buildWithCTE(withList);
        const distinctSql = distinct ? import_sql22.sql` distinct` : void 0;
        const selection = this.buildSelection(fieldsList, { isSingleTable });
        const tableSql = this.buildFromTable(table);
        const joinsSql = this.buildJoins(joins);
        const whereSql = where ? import_sql22.sql` where ${where}` : void 0;
        const havingSql = having ? import_sql22.sql` having ${having}` : void 0;
        const groupByList = [];
        if (groupBy) {
          for (const [index2, groupByValue] of groupBy.entries()) {
            groupByList.push(groupByValue);
            if (index2 < groupBy.length - 1) {
              groupByList.push(import_sql22.sql`, `);
            }
          }
        }
        const groupBySql = groupByList.length > 0 ? import_sql22.sql` group by ${import_sql22.sql.join(groupByList)}` : void 0;
        const orderBySql = this.buildOrderBy(orderBy);
        const limitSql = this.buildLimit(limit);
        const offsetSql = offset ? import_sql22.sql` offset ${offset}` : void 0;
        const finalQuery = import_sql22.sql`${withSql}select${distinctSql} ${selection} from ${tableSql}${joinsSql}${whereSql}${groupBySql}${havingSql}${orderBySql}${limitSql}${offsetSql}`;
        if (setOperators.length > 0) {
          return this.buildSetOperations(finalQuery, setOperators);
        }
        return finalQuery;
      }
      buildSetOperations(leftSelect, setOperators) {
        const [setOperator, ...rest] = setOperators;
        if (!setOperator) {
          throw new Error("Cannot pass undefined values to any set operator");
        }
        if (rest.length === 0) {
          return this.buildSetOperationQuery({ leftSelect, setOperator });
        }
        return this.buildSetOperations(
          this.buildSetOperationQuery({ leftSelect, setOperator }),
          rest
        );
      }
      buildSetOperationQuery({
        leftSelect,
        setOperator: { type, isAll, rightSelect, limit, orderBy, offset }
      }) {
        const leftChunk = import_sql22.sql`${leftSelect.getSQL()} `;
        const rightChunk = import_sql22.sql`${rightSelect.getSQL()}`;
        let orderBySql;
        if (orderBy && orderBy.length > 0) {
          const orderByValues = [];
          for (const singleOrderBy of orderBy) {
            if ((0, import_entity22.is)(singleOrderBy, import_columns.SQLiteColumn)) {
              orderByValues.push(import_sql22.sql.identifier(singleOrderBy.name));
            } else if ((0, import_entity22.is)(singleOrderBy, import_sql22.SQL)) {
              for (let i = 0; i < singleOrderBy.queryChunks.length; i++) {
                const chunk = singleOrderBy.queryChunks[i];
                if ((0, import_entity22.is)(chunk, import_columns.SQLiteColumn)) {
                  singleOrderBy.queryChunks[i] = import_sql22.sql.identifier(
                    this.casing.getColumnCasing(chunk)
                  );
                }
              }
              orderByValues.push(import_sql22.sql`${singleOrderBy}`);
            } else {
              orderByValues.push(import_sql22.sql`${singleOrderBy}`);
            }
          }
          orderBySql = import_sql22.sql` order by ${import_sql22.sql.join(orderByValues, import_sql22.sql`, `)}`;
        }
        const limitSql = typeof limit === "object" || typeof limit === "number" && limit >= 0 ? import_sql22.sql` limit ${limit}` : void 0;
        const operatorChunk = import_sql22.sql.raw(`${type} ${isAll ? "all " : ""}`);
        const offsetSql = offset ? import_sql22.sql` offset ${offset}` : void 0;
        return import_sql22.sql`${leftChunk}${operatorChunk}${rightChunk}${orderBySql}${limitSql}${offsetSql}`;
      }
      buildInsertQuery({
        table,
        values: valuesOrSelect,
        onConflict,
        returning,
        withList,
        select
      }) {
        const valuesSqlList = [];
        const columns = table[import_table22.Table.Symbol.Columns];
        const colEntries = Object.entries(columns).filter(
          ([_, col]) => !col.shouldDisableInsert()
        );
        const insertOrder = colEntries.map(([, column]) => import_sql22.sql.identifier(this.casing.getColumnCasing(column)));
        if (select) {
          const select2 = valuesOrSelect;
          if ((0, import_entity22.is)(select2, import_sql22.SQL)) {
            valuesSqlList.push(select2);
          } else {
            valuesSqlList.push(select2.getSQL());
          }
        } else {
          const values = valuesOrSelect;
          valuesSqlList.push(import_sql22.sql.raw("values "));
          for (const [valueIndex, value] of values.entries()) {
            const valueList = [];
            for (const [fieldName, col] of colEntries) {
              const colValue = value[fieldName];
              if (colValue === void 0 || (0, import_entity22.is)(colValue, import_sql22.Param) && colValue.value === void 0) {
                let defaultValue;
                if (col.default !== null && col.default !== void 0) {
                  defaultValue = (0, import_entity22.is)(col.default, import_sql22.SQL) ? col.default : import_sql22.sql.param(col.default, col);
                } else if (col.defaultFn !== void 0) {
                  const defaultFnResult = col.defaultFn();
                  defaultValue = (0, import_entity22.is)(defaultFnResult, import_sql22.SQL) ? defaultFnResult : import_sql22.sql.param(defaultFnResult, col);
                } else if (!col.default && col.onUpdateFn !== void 0) {
                  const onUpdateFnResult = col.onUpdateFn();
                  defaultValue = (0, import_entity22.is)(onUpdateFnResult, import_sql22.SQL) ? onUpdateFnResult : import_sql22.sql.param(onUpdateFnResult, col);
                } else {
                  defaultValue = import_sql22.sql`null`;
                }
                valueList.push(defaultValue);
              } else {
                valueList.push(colValue);
              }
            }
            valuesSqlList.push(valueList);
            if (valueIndex < values.length - 1) {
              valuesSqlList.push(import_sql22.sql`, `);
            }
          }
        }
        const withSql = this.buildWithCTE(withList);
        const valuesSql = import_sql22.sql.join(valuesSqlList);
        const returningSql = returning ? import_sql22.sql` returning ${this.buildSelection(returning, { isSingleTable: true })}` : void 0;
        const onConflictSql = onConflict?.length ? import_sql22.sql.join(onConflict) : void 0;
        return import_sql22.sql`${withSql}insert into ${table} ${insertOrder} ${valuesSql}${onConflictSql}${returningSql}`;
      }
      sqlToQuery(sql2, invokeSource) {
        return sql2.toQuery({
          casing: this.casing,
          escapeName: this.escapeName,
          escapeParam: this.escapeParam,
          escapeString: this.escapeString,
          invokeSource
        });
      }
      buildRelationalQuery({
        fullSchema,
        schema,
        tableNamesMap,
        table,
        tableConfig,
        queryConfig: config,
        tableAlias,
        nestedQueryRelation,
        joinOn
      }) {
        let selection = [];
        let limit, offset, orderBy = [], where;
        const joins = [];
        if (config === true) {
          const selectionEntries = Object.entries(tableConfig.columns);
          selection = selectionEntries.map(([key, value]) => ({
            dbKey: value.name,
            tsKey: key,
            field: (0, import_alias.aliasedTableColumn)(value, tableAlias),
            relationTableTsKey: void 0,
            isJson: false,
            selection: []
          }));
        } else {
          const aliasedColumns = Object.fromEntries(
            Object.entries(tableConfig.columns).map(([key, value]) => [
              key,
              (0, import_alias.aliasedTableColumn)(value, tableAlias)
            ])
          );
          if (config.where) {
            const whereSql = typeof config.where === "function" ? config.where(aliasedColumns, (0, import_relations.getOperators)()) : config.where;
            where = whereSql && (0, import_alias.mapColumnsInSQLToAlias)(whereSql, tableAlias);
          }
          const fieldsSelection = [];
          let selectedColumns = [];
          if (config.columns) {
            let isIncludeMode = false;
            for (const [field, value] of Object.entries(config.columns)) {
              if (value === void 0) {
                continue;
              }
              if (field in tableConfig.columns) {
                if (!isIncludeMode && value === true) {
                  isIncludeMode = true;
                }
                selectedColumns.push(field);
              }
            }
            if (selectedColumns.length > 0) {
              selectedColumns = isIncludeMode ? selectedColumns.filter((c) => config.columns?.[c] === true) : Object.keys(tableConfig.columns).filter(
                (key) => !selectedColumns.includes(key)
              );
            }
          } else {
            selectedColumns = Object.keys(tableConfig.columns);
          }
          for (const field of selectedColumns) {
            const column = tableConfig.columns[field];
            fieldsSelection.push({ tsKey: field, value: column });
          }
          let selectedRelations = [];
          if (config.with) {
            selectedRelations = Object.entries(config.with).filter(
              (entry) => !!entry[1]
            ).map(([tsKey, queryConfig]) => ({
              tsKey,
              queryConfig,
              relation: tableConfig.relations[tsKey]
            }));
          }
          let extras;
          if (config.extras) {
            extras = typeof config.extras === "function" ? config.extras(aliasedColumns, { sql: import_sql22.sql }) : config.extras;
            for (const [tsKey, value] of Object.entries(extras)) {
              fieldsSelection.push({
                tsKey,
                value: (0, import_alias.mapColumnsInAliasedSQLToAlias)(value, tableAlias)
              });
            }
          }
          for (const { tsKey, value } of fieldsSelection) {
            selection.push({
              dbKey: (0, import_entity22.is)(value, import_sql22.SQL.Aliased) ? value.fieldAlias : tableConfig.columns[tsKey].name,
              tsKey,
              field: (0, import_entity22.is)(value, import_column5.Column) ? (0, import_alias.aliasedTableColumn)(value, tableAlias) : value,
              relationTableTsKey: void 0,
              isJson: false,
              selection: []
            });
          }
          let orderByOrig = typeof config.orderBy === "function" ? config.orderBy(aliasedColumns, (0, import_relations.getOrderByOperators)()) : config.orderBy ?? [];
          if (!Array.isArray(orderByOrig)) {
            orderByOrig = [orderByOrig];
          }
          orderBy = orderByOrig.map((orderByValue) => {
            if ((0, import_entity22.is)(orderByValue, import_column5.Column)) {
              return (0, import_alias.aliasedTableColumn)(orderByValue, tableAlias);
            }
            return (0, import_alias.mapColumnsInSQLToAlias)(orderByValue, tableAlias);
          });
          limit = config.limit;
          offset = config.offset;
          for (const {
            tsKey: selectedRelationTsKey,
            queryConfig: selectedRelationConfigValue,
            relation
          } of selectedRelations) {
            const normalizedRelation = (0, import_relations.normalizeRelation)(
              schema,
              tableNamesMap,
              relation
            );
            const relationTableName = (0, import_table22.getTableUniqueName)(relation.referencedTable);
            const relationTableTsName = tableNamesMap[relationTableName];
            const relationTableAlias = `${tableAlias}_${selectedRelationTsKey}`;
            const joinOn2 = (0, import_sql4.and)(
              ...normalizedRelation.fields.map(
                (field2, i) => (0, import_sql4.eq)(
                  (0, import_alias.aliasedTableColumn)(
                    normalizedRelation.references[i],
                    relationTableAlias
                  ),
                  (0, import_alias.aliasedTableColumn)(field2, tableAlias)
                )
              )
            );
            const builtRelation = this.buildRelationalQuery({
              fullSchema,
              schema,
              tableNamesMap,
              table: fullSchema[relationTableTsName],
              tableConfig: schema[relationTableTsName],
              queryConfig: (0, import_entity22.is)(relation, import_relations.One) ? selectedRelationConfigValue === true ? { limit: 1 } : { ...selectedRelationConfigValue, limit: 1 } : selectedRelationConfigValue,
              tableAlias: relationTableAlias,
              joinOn: joinOn2,
              nestedQueryRelation: relation
            });
            const field = import_sql22.sql`(${builtRelation.sql})`.as(selectedRelationTsKey);
            selection.push({
              dbKey: selectedRelationTsKey,
              tsKey: selectedRelationTsKey,
              field,
              relationTableTsKey: relationTableTsName,
              isJson: true,
              selection: builtRelation.selection
            });
          }
        }
        if (selection.length === 0) {
          throw new import_errors.DrizzleError({
            message: `No fields selected for table "${tableConfig.tsName}" ("${tableAlias}"). You need to have at least one item in "columns", "with" or "extras". If you need to select all columns, omit the "columns" key or set it to undefined.`
          });
        }
        let result;
        where = (0, import_sql4.and)(joinOn, where);
        if (nestedQueryRelation) {
          let field = import_sql22.sql`json_array(${import_sql22.sql.join(
            selection.map(
              ({ field: field2 }) => (0, import_entity22.is)(field2, import_columns.SQLiteColumn) ? import_sql22.sql.identifier(this.casing.getColumnCasing(field2)) : (0, import_entity22.is)(field2, import_sql22.SQL.Aliased) ? field2.sql : field2
            ),
            import_sql22.sql`, `
          )})`;
          if ((0, import_entity22.is)(nestedQueryRelation, import_relations.Many)) {
            field = import_sql22.sql`coalesce(json_group_array(${field}), json_array())`;
          }
          const nestedSelection = [
            {
              dbKey: "data",
              tsKey: "data",
              field: field.as("data"),
              isJson: true,
              relationTableTsKey: tableConfig.tsName,
              selection
            }
          ];
          const needsSubquery = limit !== void 0 || offset !== void 0 || orderBy.length > 0;
          if (needsSubquery) {
            result = this.buildSelectQuery({
              table: (0, import_alias.aliasedTable)(table, tableAlias),
              fields: {},
              fieldsFlat: [
                {
                  path: [],
                  field: import_sql22.sql.raw("*")
                }
              ],
              where,
              limit,
              offset,
              orderBy,
              setOperators: []
            });
            where = void 0;
            limit = void 0;
            offset = void 0;
            orderBy = void 0;
          } else {
            result = (0, import_alias.aliasedTable)(table, tableAlias);
          }
          result = this.buildSelectQuery({
            table: (0, import_entity22.is)(result, import_table4.SQLiteTable) ? result : new import_subquery2.Subquery(result, {}, tableAlias),
            fields: {},
            fieldsFlat: nestedSelection.map(({ field: field2 }) => ({
              path: [],
              field: (0, import_entity22.is)(field2, import_column5.Column) ? (0, import_alias.aliasedTableColumn)(field2, tableAlias) : field2
            })),
            joins,
            where,
            limit,
            offset,
            orderBy,
            setOperators: []
          });
        } else {
          result = this.buildSelectQuery({
            table: (0, import_alias.aliasedTable)(table, tableAlias),
            fields: {},
            fieldsFlat: selection.map(({ field }) => ({
              path: [],
              field: (0, import_entity22.is)(field, import_column5.Column) ? (0, import_alias.aliasedTableColumn)(field, tableAlias) : field
            })),
            joins,
            where,
            limit,
            offset,
            orderBy,
            setOperators: []
          });
        }
        return {
          tableTsKey: tableConfig.tsName,
          sql: result,
          selection
        };
      }
    };
    var SQLiteSyncDialect = class extends SQLiteDialect {
      static [import_entity22.entityKind] = "SQLiteSyncDialect";
      migrate(migrations, session, config) {
        const migrationsTable = config === void 0 ? "__drizzle_migrations" : typeof config === "string" ? "__drizzle_migrations" : config.migrationsTable ?? "__drizzle_migrations";
        const migrationTableCreate = import_sql22.sql`
			CREATE TABLE IF NOT EXISTS ${import_sql22.sql.identifier(migrationsTable)} (
				id SERIAL PRIMARY KEY,
				hash text NOT NULL,
				created_at numeric
			)
		`;
        session.run(migrationTableCreate);
        const dbMigrations = session.values(
          import_sql22.sql`SELECT id, hash, created_at FROM ${import_sql22.sql.identifier(migrationsTable)} ORDER BY created_at DESC LIMIT 1`
        );
        const lastDbMigration = dbMigrations[0] ?? void 0;
        session.run(import_sql22.sql`BEGIN`);
        try {
          for (const migration of migrations) {
            if (!lastDbMigration || Number(lastDbMigration[2]) < migration.folderMillis) {
              for (const stmt of migration.sql) {
                session.run(import_sql22.sql.raw(stmt));
              }
              session.run(
                import_sql22.sql`INSERT INTO ${import_sql22.sql.identifier(
                  migrationsTable
                )} ("hash", "created_at") VALUES(${migration.hash}, ${migration.folderMillis})`
              );
            }
          }
          session.run(import_sql22.sql`COMMIT`);
        } catch (e) {
          session.run(import_sql22.sql`ROLLBACK`);
          throw e;
        }
      }
    };
    var SQLiteAsyncDialect = class extends SQLiteDialect {
      static [import_entity22.entityKind] = "SQLiteAsyncDialect";
      async migrate(migrations, session, config) {
        const migrationsTable = config === void 0 ? "__drizzle_migrations" : typeof config === "string" ? "__drizzle_migrations" : config.migrationsTable ?? "__drizzle_migrations";
        const migrationTableCreate = import_sql22.sql`
			CREATE TABLE IF NOT EXISTS ${import_sql22.sql.identifier(migrationsTable)} (
				id SERIAL PRIMARY KEY,
				hash text NOT NULL,
				created_at numeric
			)
		`;
        await session.run(migrationTableCreate);
        const dbMigrations = await session.values(
          import_sql22.sql`SELECT id, hash, created_at FROM ${import_sql22.sql.identifier(migrationsTable)} ORDER BY created_at DESC LIMIT 1`
        );
        const lastDbMigration = dbMigrations[0] ?? void 0;
        await session.transaction(async (tx) => {
          for (const migration of migrations) {
            if (!lastDbMigration || Number(lastDbMigration[2]) < migration.folderMillis) {
              for (const stmt of migration.sql) {
                await tx.run(import_sql22.sql.raw(stmt));
              }
              await tx.run(
                import_sql22.sql`INSERT INTO ${import_sql22.sql.identifier(
                  migrationsTable
                )} ("hash", "created_at") VALUES(${migration.hash}, ${migration.folderMillis})`
              );
            }
          }
        });
      }
    };
  }
});

// node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/query-builders/query-builder.cjs
var require_query_builder = __commonJS({
  "node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/query-builders/query-builder.cjs"(exports2, module2) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc2) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc2 = __getOwnPropDesc2(from, key)) || desc2.enumerable });
      }
      return to;
    };
    var __toCommonJS = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var query_builder_exports = {};
    __export2(query_builder_exports, {
      TypedQueryBuilder: () => TypedQueryBuilder
    });
    module2.exports = __toCommonJS(query_builder_exports);
    var import_entity22 = require_entity();
    var TypedQueryBuilder = class {
      static [import_entity22.entityKind] = "TypedQueryBuilder";
      /** @internal */
      getSelectedFields() {
        return this._.selectedFields;
      }
    };
  }
});

// node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/sqlite-core/query-builders/select.cjs
var require_select2 = __commonJS({
  "node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/sqlite-core/query-builders/select.cjs"(exports2, module2) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except2, desc2) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except2)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc2 = __getOwnPropDesc2(from, key)) || desc2.enumerable });
      }
      return to;
    };
    var __toCommonJS = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var select_exports = {};
    __export2(select_exports, {
      SQLiteSelectBase: () => SQLiteSelectBase,
      SQLiteSelectBuilder: () => SQLiteSelectBuilder,
      SQLiteSelectQueryBuilderBase: () => SQLiteSelectQueryBuilderBase,
      except: () => except,
      intersect: () => intersect,
      union: () => union,
      unionAll: () => unionAll
    });
    module2.exports = __toCommonJS(select_exports);
    var import_entity22 = require_entity();
    var import_query_builder = require_query_builder();
    var import_query_promise = require_query_promise();
    var import_selection_proxy = require_selection_proxy();
    var import_sql4 = require_sql();
    var import_subquery2 = require_subquery();
    var import_table4 = require_table();
    var import_utils6 = require_utils();
    var import_view_common2 = require_view_common();
    var import_utils22 = require_utils3();
    var import_view_base = require_view_base();
    var SQLiteSelectBuilder = class {
      static [import_entity22.entityKind] = "SQLiteSelectBuilder";
      fields;
      session;
      dialect;
      withList;
      distinct;
      constructor(config) {
        this.fields = config.fields;
        this.session = config.session;
        this.dialect = config.dialect;
        this.withList = config.withList;
        this.distinct = config.distinct;
      }
      from(source) {
        const isPartialSelect = !!this.fields;
        let fields;
        if (this.fields) {
          fields = this.fields;
        } else if ((0, import_entity22.is)(source, import_subquery2.Subquery)) {
          fields = Object.fromEntries(
            Object.keys(source._.selectedFields).map((key) => [key, source[key]])
          );
        } else if ((0, import_entity22.is)(source, import_view_base.SQLiteViewBase)) {
          fields = source[import_view_common2.ViewBaseConfig].selectedFields;
        } else if ((0, import_entity22.is)(source, import_sql4.SQL)) {
          fields = {};
        } else {
          fields = (0, import_utils6.getTableColumns)(source);
        }
        return new SQLiteSelectBase({
          table: source,
          fields,
          isPartialSelect,
          session: this.session,
          dialect: this.dialect,
          withList: this.withList,
          distinct: this.distinct
        });
      }
    };
    var SQLiteSelectQueryBuilderBase = class extends import_query_builder.TypedQueryBuilder {
      static [import_entity22.entityKind] = "SQLiteSelectQueryBuilder";
      _;
      /** @internal */
      config;
      joinsNotNullableMap;
      tableName;
      isPartialSelect;
      session;
      dialect;
      cacheConfig = void 0;
      usedTables = /* @__PURE__ */ new Set();
      constructor({ table, fields, isPartialSelect, session, dialect, withList, distinct }) {
        super();
        this.config = {
          withList,
          table,
          fields: { ...fields },
          distinct,
          setOperators: []
        };
        this.isPartialSelect = isPartialSelect;
        this.session = session;
        this.dialect = dialect;
        this._ = {
          selectedFields: fields,
          config: this.config
        };
        this.tableName = (0, import_utils6.getTableLikeName)(table);
        this.joinsNotNullableMap = typeof this.tableName === "string" ? { [this.tableName]: true } : {};
        for (const item of (0, import_utils22.extractUsedTable)(table)) this.usedTables.add(item);
      }
      /** @internal */
      getUsedTables() {
        return [...this.usedTables];
      }
      createJoin(joinType) {
        return (table, on) => {
          const baseTableName = this.tableName;
          const tableName = (0, import_utils6.getTableLikeName)(table);
          for (const item of (0, import_utils22.extractUsedTable)(table)) this.usedTables.add(item);
          if (typeof tableName === "string" && this.config.joins?.some((join3) => join3.alias === tableName)) {
            throw new Error(`Alias "${tableName}" is already used in this query`);
          }
          if (!this.isPartialSelect) {
            if (Object.keys(this.joinsNotNullableMap).length === 1 && typeof baseTableName === "string") {
              this.config.fields = {
                [baseTableName]: this.config.fields
              };
            }
            if (typeof tableName === "string" && !(0, import_entity22.is)(table, import_sql4.SQL)) {
              const selection = (0, import_entity22.is)(table, import_subquery2.Subquery) ? table._.selectedFields : (0, import_entity22.is)(table, import_sql4.View) ? table[import_view_common2.ViewBaseConfig].selectedFields : table[import_table4.Table.Symbol.Columns];
              this.config.fields[tableName] = selection;
            }
          }
          if (typeof on === "function") {
            on = on(
              new Proxy(
                this.config.fields,
                new import_selection_proxy.SelectionProxyHandler({ sqlAliasedBehavior: "sql", sqlBehavior: "sql" })
              )
            );
          }
          if (!this.config.joins) {
            this.config.joins = [];
          }
          this.config.joins.push({ on, table, joinType, alias: tableName });
          if (typeof tableName === "string") {
            switch (joinType) {
              case "left": {
                this.joinsNotNullableMap[tableName] = false;
                break;
              }
              case "right": {
                this.joinsNotNullableMap = Object.fromEntries(
                  Object.entries(this.joinsNotNullableMap).map(([key]) => [key, false])
                );
                this.joinsNotNullableMap[tableName] = true;
                break;
              }
              case "cross":
              case "inner": {
                this.joinsNotNullableMap[tableName] = true;
                break;
              }
              case "full": {
                this.joinsNotNullableMap = Object.fromEntries(
                  Object.entries(this.joinsNotNullableMap).map(([key]) => [key, false])
                );
                this.joinsNotNullableMap[tableName] = false;
                break;
              }
            }
          }
          return this;
        };
      }
      /**
       * Executes a `left join` operation by adding another table to the current query.
       *
       * Calling this method associates each row of the table with the corresponding row from the joined table, if a match is found. If no matching row exists, it sets all columns of the joined table to null.
       *
       * See docs: {@link https://orm.drizzle.team/docs/joins#left-join}
       *
       * @param table the table to join.
       * @param on the `on` clause.
       *
       * @example
       *
       * ```ts
       * // Select all users and their pets
       * const usersWithPets: { user: User; pets: Pet | null; }[] = await db.select()
       *   .from(users)
       *   .leftJoin(pets, eq(users.id, pets.ownerId))
       *
       * // Select userId and petId
       * const usersIdsAndPetIds: { userId: number; petId: number | null; }[] = await db.select({
       *   userId: users.id,
       *   petId: pets.id,
       * })
       *   .from(users)
       *   .leftJoin(pets, eq(users.id, pets.ownerId))
       * ```
       */
      leftJoin = this.createJoin("left");
      /**
       * Executes a `right join` operation by adding another table to the current query.
       *
       * Calling this method associates each row of the joined table with the corresponding row from the main table, if a match is found. If no matching row exists, it sets all columns of the main table to null.
       *
       * See docs: {@link https://orm.drizzle.team/docs/joins#right-join}
       *
       * @param table the table to join.
       * @param on the `on` clause.
       *
       * @example
       *
       * ```ts
       * // Select all users and their pets
       * const usersWithPets: { user: User | null; pets: Pet; }[] = await db.select()
       *   .from(users)
       *   .rightJoin(pets, eq(users.id, pets.ownerId))
       *
       * // Select userId and petId
       * const usersIdsAndPetIds: { userId: number | null; petId: number; }[] = await db.select({
       *   userId: users.id,
       *   petId: pets.id,
       * })
       *   .from(users)
       *   .rightJoin(pets, eq(users.id, pets.ownerId))
       * ```
       */
      rightJoin = this.createJoin("right");
      /**
       * Executes an `inner join` operation, creating a new table by combining rows from two tables that have matching values.
       *
       * Calling this method retrieves rows that have corresponding entries in both joined tables. Rows without matching entries in either table are excluded, resulting in a table that includes only matching pairs.
       *
       * See docs: {@link https://orm.drizzle.team/docs/joins#inner-join}
       *
       * @param table the table to join.
       * @param on the `on` clause.
       *
       * @example
       *
       * ```ts
       * // Select all users and their pets
       * const usersWithPets: { user: User; pets: Pet; }[] = await db.select()
       *   .from(users)
       *   .innerJoin(pets, eq(users.id, pets.ownerId))
       *
       * // Select userId and petId
       * const usersIdsAndPetIds: { userId: number; petId: number; }[] = await db.select({
       *   userId: users.id,
       *   petId: pets.id,
       * })
       *   .from(users)
       *   .innerJoin(pets, eq(users.id, pets.ownerId))
       * ```
       */
      innerJoin = this.createJoin("inner");
      /**
       * Executes a `full join` operation by combining rows from two tables into a new table.
       *
       * Calling this method retrieves all rows from both main and joined tables, merging rows with matching values and filling in `null` for non-matching columns.
       *
       * See docs: {@link https://orm.drizzle.team/docs/joins#full-join}
       *
       * @param table the table to join.
       * @param on the `on` clause.
       *
       * @example
       *
       * ```ts
       * // Select all users and their pets
       * const usersWithPets: { user: User | null; pets: Pet | null; }[] = await db.select()
       *   .from(users)
       *   .fullJoin(pets, eq(users.id, pets.ownerId))
       *
       * // Select userId and petId
       * const usersIdsAndPetIds: { userId: number | null; petId: number | null; }[] = await db.select({
       *   userId: users.id,
       *   petId: pets.id,
       * })
       *   .from(users)
       *   .fullJoin(pets, eq(users.id, pets.ownerId))
       * ```
       */
      fullJoin = this.createJoin("full");
      /**
       * Executes a `cross join` operation by combining rows from two tables into a new table.
       *
       * Calling this method retrieves all rows from both main and joined tables, merging all rows from each table.
       *
       * See docs: {@link https://orm.drizzle.team/docs/joins#cross-join}
       *
       * @param table the table to join.
       *
       * @example
       *
       * ```ts
       * // Select all users, each user with every pet
       * const usersWithPets: { user: User; pets: Pet; }[] = await db.select()
       *   .from(users)
       *   .crossJoin(pets)
       *
       * // Select userId and petId
       * const usersIdsAndPetIds: { userId: number; petId: number; }[] = await db.select({
       *   userId: users.id,
       *   petId: pets.id,
       * })
       *   .from(users)
       *   .crossJoin(pets)
       * ```
       */
      crossJoin = this.createJoin("cross");
      createSetOperator(type, isAll) {
        return (rightSelection) => {
          const rightSelect = typeof rightSelection === "function" ? rightSelection(getSQLiteSetOperators()) : rightSelection;
          if (!(0, import_utils6.haveSameKeys)(this.getSelectedFields(), rightSelect.getSelectedFields())) {
            throw new Error(
              "Set operator error (union / intersect / except): selected fields are not the same or are in a different order"
            );
          }
          this.config.setOperators.push({ type, isAll, rightSelect });
          return this;
        };
      }
      /**
       * Adds `union` set operator to the query.
       *
       * Calling this method will combine the result sets of the `select` statements and remove any duplicate rows that appear across them.
       *
       * See docs: {@link https://orm.drizzle.team/docs/set-operations#union}
       *
       * @example
       *
       * ```ts
       * // Select all unique names from customers and users tables
       * await db.select({ name: users.name })
       *   .from(users)
       *   .union(
       *     db.select({ name: customers.name }).from(customers)
       *   );
       * // or
       * import { union } from 'drizzle-orm/sqlite-core'
       *
       * await union(
       *   db.select({ name: users.name }).from(users),
       *   db.select({ name: customers.name }).from(customers)
       * );
       * ```
       */
      union = this.createSetOperator("union", false);
      /**
       * Adds `union all` set operator to the query.
       *
       * Calling this method will combine the result-set of the `select` statements and keep all duplicate rows that appear across them.
       *
       * See docs: {@link https://orm.drizzle.team/docs/set-operations#union-all}
       *
       * @example
       *
       * ```ts
       * // Select all transaction ids from both online and in-store sales
       * await db.select({ transaction: onlineSales.transactionId })
       *   .from(onlineSales)
       *   .unionAll(
       *     db.select({ transaction: inStoreSales.transactionId }).from(inStoreSales)
       *   );
       * // or
       * import { unionAll } from 'drizzle-orm/sqlite-core'
       *
       * await unionAll(
       *   db.select({ transaction: onlineSales.transactionId }).from(onlineSales),
       *   db.select({ transaction: inStoreSales.transactionId }).from(inStoreSales)
       * );
       * ```
       */
      unionAll = this.createSetOperator("union", true);
      /**
       * Adds `intersect` set operator to the query.
       *
       * Calling this method will retain only the rows that are present in both result sets and eliminate duplicates.
       *
       * See docs: {@link https://orm.drizzle.team/docs/set-operations#intersect}
       *
       * @example
       *
       * ```ts
       * // Select course names that are offered in both departments A and B
       * await db.select({ courseName: depA.courseName })
       *   .from(depA)
       *   .intersect(
       *     db.select({ courseName: depB.courseName }).from(depB)
       *   );
       * // or
       * import { intersect } from 'drizzle-orm/sqlite-core'
       *
       * await intersect(
       *   db.select({ courseName: depA.courseName }).from(depA),
       *   db.select({ courseName: depB.courseName }).from(depB)
       * );
       * ```
       */
      intersect = this.createSetOperator("intersect", false);
      /**
       * Adds `except` set operator to the query.
       *
       * Calling this method will retrieve all unique rows from the left query, except for the rows that are present in the result set of the right query.
       *
       * See docs: {@link https://orm.drizzle.team/docs/set-operations#except}
       *
       * @example
       *
       * ```ts
       * // Select all courses offered in department A but not in department B
       * await db.select({ courseName: depA.courseName })
       *   .from(depA)
       *   .except(
       *     db.select({ courseName: depB.courseName }).from(depB)
       *   );
       * // or
       * import { except } from 'drizzle-orm/sqlite-core'
       *
       * await except(
       *   db.select({ courseName: depA.courseName }).from(depA),
       *   db.select({ courseName: depB.courseName }).from(depB)
       * );
       * ```
       */
      except = this.createSetOperator("except", false);
      /** @internal */
      addSetOperators(setOperators) {
        this.config.setOperators.push(...setOperators);
        return this;
      }
      /**
       * Adds a `where` clause to the query.
       *
       * Calling this method will select only those rows that fulfill a specified condition.
       *
       * See docs: {@link https://orm.drizzle.team/docs/select#filtering}
       *
       * @param where the `where` clause.
       *
       * @example
       * You can use conditional operators and `sql function` to filter the rows to be selected.
       *
       * ```ts
       * // Select all cars with green color
       * await db.select().from(cars).where(eq(cars.color, 'green'));
       * // or
       * await db.select().from(cars).where(sql`${cars.color} = 'green'`)
       * ```
       *
       * You can logically combine conditional operators with `and()` and `or()` operators:
       *
       * ```ts
       * // Select all BMW cars with a green color
       * await db.select().from(cars).where(and(eq(cars.color, 'green'), eq(cars.brand, 'BMW')));
       *
       * // Select all cars with the green or blue color
       * await db.select().from(cars).where(or(eq(cars.color, 'green'), eq(cars.color, 'blue')));
       * ```
       */
      where(where) {
        if (typeof where === "function") {
          where = where(
            new Proxy(
              this.config.fields,
              new import_selection_proxy.SelectionProxyHandler({ sqlAliasedBehavior: "sql", sqlBehavior: "sql" })
            )
          );
        }
        this.config.where = where;
        return this;
      }
      /**
       * Adds a `having` clause to the query.
       *
       * Calling this method will select only those rows that fulfill a specified condition. It is typically used with aggregate functions to filter the aggregated data based on a specified condition.
       *
       * See docs: {@link https://orm.drizzle.team/docs/select#aggregations}
       *
       * @param having the `having` clause.
       *
       * @example
       *
       * ```ts
       * // Select all brands with more than one car
       * await db.select({
       * 	brand: cars.brand,
       * 	count: sql<number>`cast(count(${cars.id}) as int)`,
       * })
       *   .from(cars)
       *   .groupBy(cars.brand)
       *   .having(({ count }) => gt(count, 1));
       * ```
       */
      having(having) {
        if (typeof having === "function") {
          having = having(
            new Proxy(
              this.config.fields,
              new import_selection_proxy.SelectionProxyHandler({ sqlAliasedBehavior: "sql", sqlBehavior: "sql" })
            )
          );
        }
        this.config.having = having;
        return this;
      }
      groupBy(...columns) {
        if (typeof columns[0] === "function") {
          const groupBy = columns[0](
            new Proxy(
              this.config.fields,
              new import_selection_proxy.SelectionProxyHandler({ sqlAliasedBehavior: "alias", sqlBehavior: "sql" })
            )
          );
          this.config.groupBy = Array.isArray(groupBy) ? groupBy : [groupBy];
        } else {
          this.config.groupBy = columns;
        }
        return this;
      }
      orderBy(...columns) {
        if (typeof columns[0] === "function") {
          const orderBy = columns[0](
            new Proxy(
              this.config.fields,
              new import_selection_proxy.SelectionProxyHandler({ sqlAliasedBehavior: "alias", sqlBehavior: "sql" })
            )
          );
          const orderByArray = Array.isArray(orderBy) ? orderBy : [orderBy];
          if (this.config.setOperators.length > 0) {
            this.config.setOperators.at(-1).orderBy = orderByArray;
          } else {
            this.config.orderBy = orderByArray;
          }
        } else {
          const orderByArray = columns;
          if (this.config.setOperators.length > 0) {
            this.config.setOperators.at(-1).orderBy = orderByArray;
          } else {
            this.config.orderBy = orderByArray;
          }
        }
        return this;
      }
      /**
       * Adds a `limit` clause to the query.
       *
       * Calling this method will set the maximum number of rows that will be returned by this query.
       *
       * See docs: {@link https://orm.drizzle.team/docs/select#limit--offset}
       *
       * @param limit the `limit` clause.
       *
       * @example
       *
       * ```ts
       * // Get the first 10 people from this query.
       * await db.select().from(people).limit(10);
       * ```
       */
      limit(limit) {
        if (this.config.setOperators.length > 0) {
          this.config.setOperators.at(-1).limit = limit;
        } else {
          this.config.limit = limit;
        }
        return this;
      }
      /**
       * Adds an `offset` clause to the query.
       *
       * Calling this method will skip a number of rows when returning results from this query.
       *
       * See docs: {@link https://orm.drizzle.team/docs/select#limit--offset}
       *
       * @param offset the `offset` clause.
       *
       * @example
       *
       * ```ts
       * // Get the 10th-20th people from this query.
       * await db.select().from(people).offset(10).limit(10);
       * ```
       */
      offset(offset) {
        if (this.config.setOperators.length > 0) {
          this.config.setOperators.at(-1).offset = offset;
        } else {
          this.config.offset = offset;
        }
        return this;
      }
      /** @internal */
      getSQL() {
        return this.dialect.buildSelectQuery(this.config);
      }
      toSQL() {
        const { typings: _typings, ...rest } = this.dialect.sqlToQuery(this.getSQL());
        return rest;
      }
      as(alias) {
        const usedTables = [];
        usedTables.push(...(0, import_utils22.extractUsedTable)(this.config.table));
        if (this.config.joins) {
          for (const it of this.config.joins) usedTables.push(...(0, import_utils22.extractUsedTable)(it.table));
        }
        return new Proxy(
          new import_subquery2.Subquery(this.getSQL(), this.config.fields, alias, false, [...new Set(usedTables)]),
          new import_selection_proxy.SelectionProxyHandler({ alias, sqlAliasedBehavior: "alias", sqlBehavior: "error" })
        );
      }
      /** @internal */
      getSelectedFields() {
        return new Proxy(
          this.config.fields,
          new import_selection_proxy.SelectionProxyHandler({ alias: this.tableName, sqlAliasedBehavior: "alias", sqlBehavior: "error" })
        );
      }
      $dynamic() {
        return this;
      }
    };
    var SQLiteSelectBase = class extends SQLiteSelectQueryBuilderBase {
      static [import_entity22.entityKind] = "SQLiteSelect";
      /** @internal */
      _prepare(isOneTimeQuery = true) {
        if (!this.session) {
          throw new Error("Cannot execute a query on a query builder. Please use a database instance instead.");
        }
        const fieldsList = (0, import_utils6.orderSelectedFields)(this.config.fields);
        const query = this.session[isOneTimeQuery ? "prepareOneTimeQuery" : "prepareQuery"](
          this.dialect.sqlToQuery(this.getSQL()),
          fieldsList,
          "all",
          true,
          void 0,
          {
            type: "select",
            tables: [...this.usedTables]
          },
          this.cacheConfig
        );
        query.joinsNotNullableMap = this.joinsNotNullableMap;
        return query;
      }
      $withCache(config) {
        this.cacheConfig = config === void 0 ? { config: {}, enable: true, autoInvalidate: true } : config === false ? { enable: false } : { enable: true, autoInvalidate: true, ...config };
        return this;
      }
      prepare() {
        return this._prepare(false);
      }
      run = (placeholderValues) => {
        return this._prepare().run(placeholderValues);
      };
      all = (placeholderValues) => {
        return this._prepare().all(placeholderValues);
      };
      get = (placeholderValues) => {
        return this._prepare().get(placeholderValues);
      };
      values = (placeholderValues) => {
        return this._prepare().values(placeholderValues);
      };
      async execute() {
        return this.all();
      }
    };
    (0, import_utils6.applyMixins)(SQLiteSelectBase, [import_query_promise.QueryPromise]);
    function createSetOperator(type, isAll) {
      return (leftSelect, rightSelect, ...restSelects) => {
        const setOperators = [rightSelect, ...restSelects].map((select) => ({
          type,
          isAll,
          rightSelect: select
        }));
        for (const setOperator of setOperators) {
          if (!(0, import_utils6.haveSameKeys)(leftSelect.getSelectedFields(), setOperator.rightSelect.getSelectedFields())) {
            throw new Error(
              "Set operator error (union / intersect / except): selected fields are not the same or are in a different order"
            );
          }
        }
        return leftSelect.addSetOperators(setOperators);
      };
    }
    var getSQLiteSetOperators = () => ({
      union,
      unionAll,
      intersect,
      except
    });
    var union = createSetOperator("union", false);
    var unionAll = createSetOperator("union", true);
    var intersect = createSetOperator("intersect", false);
    var except = createSetOperator("except", false);
  }
});

// node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/sqlite-core/query-builders/query-builder.cjs
var require_query_builder2 = __commonJS({
  "node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/sqlite-core/query-builders/query-builder.cjs"(exports2, module2) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc2) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc2 = __getOwnPropDesc2(from, key)) || desc2.enumerable });
      }
      return to;
    };
    var __toCommonJS = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var query_builder_exports = {};
    __export2(query_builder_exports, {
      QueryBuilder: () => QueryBuilder
    });
    module2.exports = __toCommonJS(query_builder_exports);
    var import_entity22 = require_entity();
    var import_selection_proxy = require_selection_proxy();
    var import_dialect = require_dialect();
    var import_subquery2 = require_subquery();
    var import_select = require_select2();
    var QueryBuilder = class {
      static [import_entity22.entityKind] = "SQLiteQueryBuilder";
      dialect;
      dialectConfig;
      constructor(dialect) {
        this.dialect = (0, import_entity22.is)(dialect, import_dialect.SQLiteDialect) ? dialect : void 0;
        this.dialectConfig = (0, import_entity22.is)(dialect, import_dialect.SQLiteDialect) ? void 0 : dialect;
      }
      $with = (alias, selection) => {
        const queryBuilder = this;
        const as = (qb) => {
          if (typeof qb === "function") {
            qb = qb(queryBuilder);
          }
          return new Proxy(
            new import_subquery2.WithSubquery(
              qb.getSQL(),
              selection ?? ("getSelectedFields" in qb ? qb.getSelectedFields() ?? {} : {}),
              alias,
              true
            ),
            new import_selection_proxy.SelectionProxyHandler({ alias, sqlAliasedBehavior: "alias", sqlBehavior: "error" })
          );
        };
        return { as };
      };
      with(...queries) {
        const self = this;
        function select(fields) {
          return new import_select.SQLiteSelectBuilder({
            fields: fields ?? void 0,
            session: void 0,
            dialect: self.getDialect(),
            withList: queries
          });
        }
        function selectDistinct(fields) {
          return new import_select.SQLiteSelectBuilder({
            fields: fields ?? void 0,
            session: void 0,
            dialect: self.getDialect(),
            withList: queries,
            distinct: true
          });
        }
        return { select, selectDistinct };
      }
      select(fields) {
        return new import_select.SQLiteSelectBuilder({ fields: fields ?? void 0, session: void 0, dialect: this.getDialect() });
      }
      selectDistinct(fields) {
        return new import_select.SQLiteSelectBuilder({
          fields: fields ?? void 0,
          session: void 0,
          dialect: this.getDialect(),
          distinct: true
        });
      }
      // Lazy load dialect to avoid circular dependency
      getDialect() {
        if (!this.dialect) {
          this.dialect = new import_dialect.SQLiteSyncDialect(this.dialectConfig);
        }
        return this.dialect;
      }
    };
  }
});

// node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/sqlite-core/query-builders/insert.cjs
var require_insert = __commonJS({
  "node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/sqlite-core/query-builders/insert.cjs"(exports2, module2) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc2) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc2 = __getOwnPropDesc2(from, key)) || desc2.enumerable });
      }
      return to;
    };
    var __toCommonJS = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var insert_exports = {};
    __export2(insert_exports, {
      SQLiteInsertBase: () => SQLiteInsertBase,
      SQLiteInsertBuilder: () => SQLiteInsertBuilder
    });
    module2.exports = __toCommonJS(insert_exports);
    var import_entity22 = require_entity();
    var import_query_promise = require_query_promise();
    var import_sql4 = require_sql();
    var import_table4 = require_table3();
    var import_table22 = require_table();
    var import_utils6 = require_utils();
    var import_utils22 = require_utils3();
    var import_query_builder = require_query_builder2();
    var SQLiteInsertBuilder = class {
      constructor(table, session, dialect, withList) {
        this.table = table;
        this.session = session;
        this.dialect = dialect;
        this.withList = withList;
      }
      static [import_entity22.entityKind] = "SQLiteInsertBuilder";
      values(values) {
        values = Array.isArray(values) ? values : [values];
        if (values.length === 0) {
          throw new Error("values() must be called with at least one value");
        }
        const mappedValues = values.map((entry) => {
          const result = {};
          const cols = this.table[import_table22.Table.Symbol.Columns];
          for (const colKey of Object.keys(entry)) {
            const colValue = entry[colKey];
            result[colKey] = (0, import_entity22.is)(colValue, import_sql4.SQL) ? colValue : new import_sql4.Param(colValue, cols[colKey]);
          }
          return result;
        });
        return new SQLiteInsertBase(this.table, mappedValues, this.session, this.dialect, this.withList);
      }
      select(selectQuery) {
        const select = typeof selectQuery === "function" ? selectQuery(new import_query_builder.QueryBuilder()) : selectQuery;
        if (!(0, import_entity22.is)(select, import_sql4.SQL) && !(0, import_utils6.haveSameKeys)(this.table[import_table22.Columns], select._.selectedFields)) {
          throw new Error(
            "Insert select error: selected fields are not the same or are in a different order compared to the table definition"
          );
        }
        return new SQLiteInsertBase(this.table, select, this.session, this.dialect, this.withList, true);
      }
    };
    var SQLiteInsertBase = class extends import_query_promise.QueryPromise {
      constructor(table, values, session, dialect, withList, select) {
        super();
        this.session = session;
        this.dialect = dialect;
        this.config = { table, values, withList, select };
      }
      static [import_entity22.entityKind] = "SQLiteInsert";
      /** @internal */
      config;
      returning(fields = this.config.table[import_table4.SQLiteTable.Symbol.Columns]) {
        this.config.returning = (0, import_utils6.orderSelectedFields)(fields);
        return this;
      }
      /**
       * Adds an `on conflict do nothing` clause to the query.
       *
       * Calling this method simply avoids inserting a row as its alternative action.
       *
       * See docs: {@link https://orm.drizzle.team/docs/insert#on-conflict-do-nothing}
       *
       * @param config The `target` and `where` clauses.
       *
       * @example
       * ```ts
       * // Insert one row and cancel the insert if there's a conflict
       * await db.insert(cars)
       *   .values({ id: 1, brand: 'BMW' })
       *   .onConflictDoNothing();
       *
       * // Explicitly specify conflict target
       * await db.insert(cars)
       *   .values({ id: 1, brand: 'BMW' })
       *   .onConflictDoNothing({ target: cars.id });
       * ```
       */
      onConflictDoNothing(config = {}) {
        if (!this.config.onConflict) this.config.onConflict = [];
        if (config.target === void 0) {
          this.config.onConflict.push(import_sql4.sql` on conflict do nothing`);
        } else {
          const targetSql = Array.isArray(config.target) ? import_sql4.sql`${config.target}` : import_sql4.sql`${[config.target]}`;
          const whereSql = config.where ? import_sql4.sql` where ${config.where}` : import_sql4.sql``;
          this.config.onConflict.push(import_sql4.sql` on conflict ${targetSql} do nothing${whereSql}`);
        }
        return this;
      }
      /**
       * Adds an `on conflict do update` clause to the query.
       *
       * Calling this method will update the existing row that conflicts with the row proposed for insertion as its alternative action.
       *
       * See docs: {@link https://orm.drizzle.team/docs/insert#upserts-and-conflicts}
       *
       * @param config The `target`, `set` and `where` clauses.
       *
       * @example
       * ```ts
       * // Update the row if there's a conflict
       * await db.insert(cars)
       *   .values({ id: 1, brand: 'BMW' })
       *   .onConflictDoUpdate({
       *     target: cars.id,
       *     set: { brand: 'Porsche' }
       *   });
       *
       * // Upsert with 'where' clause
       * await db.insert(cars)
       *   .values({ id: 1, brand: 'BMW' })
       *   .onConflictDoUpdate({
       *     target: cars.id,
       *     set: { brand: 'newBMW' },
       *     where: sql`${cars.createdAt} > '2023-01-01'::date`,
       *   });
       * ```
       */
      onConflictDoUpdate(config) {
        if (config.where && (config.targetWhere || config.setWhere)) {
          throw new Error(
            'You cannot use both "where" and "targetWhere"/"setWhere" at the same time - "where" is deprecated, use "targetWhere" or "setWhere" instead.'
          );
        }
        if (!this.config.onConflict) this.config.onConflict = [];
        const whereSql = config.where ? import_sql4.sql` where ${config.where}` : void 0;
        const targetWhereSql = config.targetWhere ? import_sql4.sql` where ${config.targetWhere}` : void 0;
        const setWhereSql = config.setWhere ? import_sql4.sql` where ${config.setWhere}` : void 0;
        const targetSql = Array.isArray(config.target) ? import_sql4.sql`${config.target}` : import_sql4.sql`${[config.target]}`;
        const setSql = this.dialect.buildUpdateSet(this.config.table, (0, import_utils6.mapUpdateSet)(this.config.table, config.set));
        this.config.onConflict.push(
          import_sql4.sql` on conflict ${targetSql}${targetWhereSql} do update set ${setSql}${whereSql}${setWhereSql}`
        );
        return this;
      }
      /** @internal */
      getSQL() {
        return this.dialect.buildInsertQuery(this.config);
      }
      toSQL() {
        const { typings: _typings, ...rest } = this.dialect.sqlToQuery(this.getSQL());
        return rest;
      }
      /** @internal */
      _prepare(isOneTimeQuery = true) {
        return this.session[isOneTimeQuery ? "prepareOneTimeQuery" : "prepareQuery"](
          this.dialect.sqlToQuery(this.getSQL()),
          this.config.returning,
          this.config.returning ? "all" : "run",
          true,
          void 0,
          {
            type: "insert",
            tables: (0, import_utils22.extractUsedTable)(this.config.table)
          }
        );
      }
      prepare() {
        return this._prepare(false);
      }
      run = (placeholderValues) => {
        return this._prepare().run(placeholderValues);
      };
      all = (placeholderValues) => {
        return this._prepare().all(placeholderValues);
      };
      get = (placeholderValues) => {
        return this._prepare().get(placeholderValues);
      };
      values = (placeholderValues) => {
        return this._prepare().values(placeholderValues);
      };
      async execute() {
        return this.config.returning ? this.all() : this.run();
      }
      $dynamic() {
        return this;
      }
    };
  }
});

// node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/sqlite-core/query-builders/select.types.cjs
var require_select_types = __commonJS({
  "node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/sqlite-core/query-builders/select.types.cjs"(exports2, module2) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __copyProps2 = (to, from, except, desc2) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc2 = __getOwnPropDesc2(from, key)) || desc2.enumerable });
      }
      return to;
    };
    var __toCommonJS = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var select_types_exports = {};
    module2.exports = __toCommonJS(select_types_exports);
  }
});

// node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/sqlite-core/query-builders/update.cjs
var require_update = __commonJS({
  "node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/sqlite-core/query-builders/update.cjs"(exports2, module2) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc2) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc2 = __getOwnPropDesc2(from, key)) || desc2.enumerable });
      }
      return to;
    };
    var __toCommonJS = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var update_exports = {};
    __export2(update_exports, {
      SQLiteUpdateBase: () => SQLiteUpdateBase,
      SQLiteUpdateBuilder: () => SQLiteUpdateBuilder
    });
    module2.exports = __toCommonJS(update_exports);
    var import_entity22 = require_entity();
    var import_query_promise = require_query_promise();
    var import_selection_proxy = require_selection_proxy();
    var import_table4 = require_table3();
    var import_subquery2 = require_subquery();
    var import_table22 = require_table();
    var import_utils6 = require_utils();
    var import_view_common2 = require_view_common();
    var import_utils22 = require_utils3();
    var import_view_base = require_view_base();
    var SQLiteUpdateBuilder = class {
      constructor(table, session, dialect, withList) {
        this.table = table;
        this.session = session;
        this.dialect = dialect;
        this.withList = withList;
      }
      static [import_entity22.entityKind] = "SQLiteUpdateBuilder";
      set(values) {
        return new SQLiteUpdateBase(
          this.table,
          (0, import_utils6.mapUpdateSet)(this.table, values),
          this.session,
          this.dialect,
          this.withList
        );
      }
    };
    var SQLiteUpdateBase = class extends import_query_promise.QueryPromise {
      constructor(table, set, session, dialect, withList) {
        super();
        this.session = session;
        this.dialect = dialect;
        this.config = { set, table, withList, joins: [] };
      }
      static [import_entity22.entityKind] = "SQLiteUpdate";
      /** @internal */
      config;
      from(source) {
        this.config.from = source;
        return this;
      }
      createJoin(joinType) {
        return (table, on) => {
          const tableName = (0, import_utils6.getTableLikeName)(table);
          if (typeof tableName === "string" && this.config.joins.some((join3) => join3.alias === tableName)) {
            throw new Error(`Alias "${tableName}" is already used in this query`);
          }
          if (typeof on === "function") {
            const from = this.config.from ? (0, import_entity22.is)(table, import_table4.SQLiteTable) ? table[import_table22.Table.Symbol.Columns] : (0, import_entity22.is)(table, import_subquery2.Subquery) ? table._.selectedFields : (0, import_entity22.is)(table, import_view_base.SQLiteViewBase) ? table[import_view_common2.ViewBaseConfig].selectedFields : void 0 : void 0;
            on = on(
              new Proxy(
                this.config.table[import_table22.Table.Symbol.Columns],
                new import_selection_proxy.SelectionProxyHandler({ sqlAliasedBehavior: "sql", sqlBehavior: "sql" })
              ),
              from && new Proxy(
                from,
                new import_selection_proxy.SelectionProxyHandler({ sqlAliasedBehavior: "sql", sqlBehavior: "sql" })
              )
            );
          }
          this.config.joins.push({ on, table, joinType, alias: tableName });
          return this;
        };
      }
      leftJoin = this.createJoin("left");
      rightJoin = this.createJoin("right");
      innerJoin = this.createJoin("inner");
      fullJoin = this.createJoin("full");
      /**
       * Adds a 'where' clause to the query.
       *
       * Calling this method will update only those rows that fulfill a specified condition.
       *
       * See docs: {@link https://orm.drizzle.team/docs/update}
       *
       * @param where the 'where' clause.
       *
       * @example
       * You can use conditional operators and `sql function` to filter the rows to be updated.
       *
       * ```ts
       * // Update all cars with green color
       * db.update(cars).set({ color: 'red' })
       *   .where(eq(cars.color, 'green'));
       * // or
       * db.update(cars).set({ color: 'red' })
       *   .where(sql`${cars.color} = 'green'`)
       * ```
       *
       * You can logically combine conditional operators with `and()` and `or()` operators:
       *
       * ```ts
       * // Update all BMW cars with a green color
       * db.update(cars).set({ color: 'red' })
       *   .where(and(eq(cars.color, 'green'), eq(cars.brand, 'BMW')));
       *
       * // Update all cars with the green or blue color
       * db.update(cars).set({ color: 'red' })
       *   .where(or(eq(cars.color, 'green'), eq(cars.color, 'blue')));
       * ```
       */
      where(where) {
        this.config.where = where;
        return this;
      }
      orderBy(...columns) {
        if (typeof columns[0] === "function") {
          const orderBy = columns[0](
            new Proxy(
              this.config.table[import_table22.Table.Symbol.Columns],
              new import_selection_proxy.SelectionProxyHandler({ sqlAliasedBehavior: "alias", sqlBehavior: "sql" })
            )
          );
          const orderByArray = Array.isArray(orderBy) ? orderBy : [orderBy];
          this.config.orderBy = orderByArray;
        } else {
          const orderByArray = columns;
          this.config.orderBy = orderByArray;
        }
        return this;
      }
      limit(limit) {
        this.config.limit = limit;
        return this;
      }
      returning(fields = this.config.table[import_table4.SQLiteTable.Symbol.Columns]) {
        this.config.returning = (0, import_utils6.orderSelectedFields)(fields);
        return this;
      }
      /** @internal */
      getSQL() {
        return this.dialect.buildUpdateQuery(this.config);
      }
      toSQL() {
        const { typings: _typings, ...rest } = this.dialect.sqlToQuery(this.getSQL());
        return rest;
      }
      /** @internal */
      _prepare(isOneTimeQuery = true) {
        return this.session[isOneTimeQuery ? "prepareOneTimeQuery" : "prepareQuery"](
          this.dialect.sqlToQuery(this.getSQL()),
          this.config.returning,
          this.config.returning ? "all" : "run",
          true,
          void 0,
          {
            type: "insert",
            tables: (0, import_utils22.extractUsedTable)(this.config.table)
          }
        );
      }
      prepare() {
        return this._prepare(false);
      }
      run = (placeholderValues) => {
        return this._prepare().run(placeholderValues);
      };
      all = (placeholderValues) => {
        return this._prepare().all(placeholderValues);
      };
      get = (placeholderValues) => {
        return this._prepare().get(placeholderValues);
      };
      values = (placeholderValues) => {
        return this._prepare().values(placeholderValues);
      };
      async execute() {
        return this.config.returning ? this.all() : this.run();
      }
      $dynamic() {
        return this;
      }
    };
  }
});

// node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/sqlite-core/query-builders/index.cjs
var require_query_builders = __commonJS({
  "node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/sqlite-core/query-builders/index.cjs"(exports2, module2) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __copyProps2 = (to, from, except, desc2) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc2 = __getOwnPropDesc2(from, key)) || desc2.enumerable });
      }
      return to;
    };
    var __reExport = (target, mod, secondTarget) => (__copyProps2(target, mod, "default"), secondTarget && __copyProps2(secondTarget, mod, "default"));
    var __toCommonJS = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var query_builders_exports = {};
    module2.exports = __toCommonJS(query_builders_exports);
    __reExport(query_builders_exports, require_delete(), module2.exports);
    __reExport(query_builders_exports, require_insert(), module2.exports);
    __reExport(query_builders_exports, require_query_builder2(), module2.exports);
    __reExport(query_builders_exports, require_select2(), module2.exports);
    __reExport(query_builders_exports, require_select_types(), module2.exports);
    __reExport(query_builders_exports, require_update(), module2.exports);
  }
});

// node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/sqlite-core/query-builders/count.cjs
var require_count = __commonJS({
  "node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/sqlite-core/query-builders/count.cjs"(exports2, module2) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc2) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc2 = __getOwnPropDesc2(from, key)) || desc2.enumerable });
      }
      return to;
    };
    var __toCommonJS = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var count_exports = {};
    __export2(count_exports, {
      SQLiteCountBuilder: () => SQLiteCountBuilder
    });
    module2.exports = __toCommonJS(count_exports);
    var import_entity22 = require_entity();
    var import_sql4 = require_sql();
    var SQLiteCountBuilder = class _SQLiteCountBuilder extends import_sql4.SQL {
      constructor(params) {
        super(_SQLiteCountBuilder.buildEmbeddedCount(params.source, params.filters).queryChunks);
        this.params = params;
        this.session = params.session;
        this.sql = _SQLiteCountBuilder.buildCount(
          params.source,
          params.filters
        );
      }
      sql;
      static [import_entity22.entityKind] = "SQLiteCountBuilderAsync";
      [Symbol.toStringTag] = "SQLiteCountBuilderAsync";
      session;
      static buildEmbeddedCount(source, filters) {
        return import_sql4.sql`(select count(*) from ${source}${import_sql4.sql.raw(" where ").if(filters)}${filters})`;
      }
      static buildCount(source, filters) {
        return import_sql4.sql`select count(*) from ${source}${import_sql4.sql.raw(" where ").if(filters)}${filters}`;
      }
      then(onfulfilled, onrejected) {
        return Promise.resolve(this.session.count(this.sql)).then(
          onfulfilled,
          onrejected
        );
      }
      catch(onRejected) {
        return this.then(void 0, onRejected);
      }
      finally(onFinally) {
        return this.then(
          (value) => {
            onFinally?.();
            return value;
          },
          (reason) => {
            onFinally?.();
            throw reason;
          }
        );
      }
    };
  }
});

// node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/sqlite-core/query-builders/query.cjs
var require_query = __commonJS({
  "node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/sqlite-core/query-builders/query.cjs"(exports2, module2) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc2) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc2 = __getOwnPropDesc2(from, key)) || desc2.enumerable });
      }
      return to;
    };
    var __toCommonJS = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var query_exports = {};
    __export2(query_exports, {
      RelationalQueryBuilder: () => RelationalQueryBuilder,
      SQLiteRelationalQuery: () => SQLiteRelationalQuery,
      SQLiteSyncRelationalQuery: () => SQLiteSyncRelationalQuery
    });
    module2.exports = __toCommonJS(query_exports);
    var import_entity22 = require_entity();
    var import_query_promise = require_query_promise();
    var import_relations = require_relations();
    var RelationalQueryBuilder = class {
      constructor(mode, fullSchema, schema, tableNamesMap, table, tableConfig, dialect, session) {
        this.mode = mode;
        this.fullSchema = fullSchema;
        this.schema = schema;
        this.tableNamesMap = tableNamesMap;
        this.table = table;
        this.tableConfig = tableConfig;
        this.dialect = dialect;
        this.session = session;
      }
      static [import_entity22.entityKind] = "SQLiteAsyncRelationalQueryBuilder";
      findMany(config) {
        return this.mode === "sync" ? new SQLiteSyncRelationalQuery(
          this.fullSchema,
          this.schema,
          this.tableNamesMap,
          this.table,
          this.tableConfig,
          this.dialect,
          this.session,
          config ? config : {},
          "many"
        ) : new SQLiteRelationalQuery(
          this.fullSchema,
          this.schema,
          this.tableNamesMap,
          this.table,
          this.tableConfig,
          this.dialect,
          this.session,
          config ? config : {},
          "many"
        );
      }
      findFirst(config) {
        return this.mode === "sync" ? new SQLiteSyncRelationalQuery(
          this.fullSchema,
          this.schema,
          this.tableNamesMap,
          this.table,
          this.tableConfig,
          this.dialect,
          this.session,
          config ? { ...config, limit: 1 } : { limit: 1 },
          "first"
        ) : new SQLiteRelationalQuery(
          this.fullSchema,
          this.schema,
          this.tableNamesMap,
          this.table,
          this.tableConfig,
          this.dialect,
          this.session,
          config ? { ...config, limit: 1 } : { limit: 1 },
          "first"
        );
      }
    };
    var SQLiteRelationalQuery = class extends import_query_promise.QueryPromise {
      constructor(fullSchema, schema, tableNamesMap, table, tableConfig, dialect, session, config, mode) {
        super();
        this.fullSchema = fullSchema;
        this.schema = schema;
        this.tableNamesMap = tableNamesMap;
        this.table = table;
        this.tableConfig = tableConfig;
        this.dialect = dialect;
        this.session = session;
        this.config = config;
        this.mode = mode;
      }
      static [import_entity22.entityKind] = "SQLiteAsyncRelationalQuery";
      /** @internal */
      mode;
      /** @internal */
      getSQL() {
        return this.dialect.buildRelationalQuery({
          fullSchema: this.fullSchema,
          schema: this.schema,
          tableNamesMap: this.tableNamesMap,
          table: this.table,
          tableConfig: this.tableConfig,
          queryConfig: this.config,
          tableAlias: this.tableConfig.tsName
        }).sql;
      }
      /** @internal */
      _prepare(isOneTimeQuery = false) {
        const { query, builtQuery } = this._toSQL();
        return this.session[isOneTimeQuery ? "prepareOneTimeQuery" : "prepareQuery"](
          builtQuery,
          void 0,
          this.mode === "first" ? "get" : "all",
          true,
          (rawRows, mapColumnValue) => {
            const rows = rawRows.map(
              (row) => (0, import_relations.mapRelationalRow)(this.schema, this.tableConfig, row, query.selection, mapColumnValue)
            );
            if (this.mode === "first") {
              return rows[0];
            }
            return rows;
          }
        );
      }
      prepare() {
        return this._prepare(false);
      }
      _toSQL() {
        const query = this.dialect.buildRelationalQuery({
          fullSchema: this.fullSchema,
          schema: this.schema,
          tableNamesMap: this.tableNamesMap,
          table: this.table,
          tableConfig: this.tableConfig,
          queryConfig: this.config,
          tableAlias: this.tableConfig.tsName
        });
        const builtQuery = this.dialect.sqlToQuery(query.sql);
        return { query, builtQuery };
      }
      toSQL() {
        return this._toSQL().builtQuery;
      }
      /** @internal */
      executeRaw() {
        if (this.mode === "first") {
          return this._prepare(false).get();
        }
        return this._prepare(false).all();
      }
      async execute() {
        return this.executeRaw();
      }
    };
    var SQLiteSyncRelationalQuery = class extends SQLiteRelationalQuery {
      static [import_entity22.entityKind] = "SQLiteSyncRelationalQuery";
      sync() {
        return this.executeRaw();
      }
    };
  }
});

// node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/sqlite-core/query-builders/raw.cjs
var require_raw = __commonJS({
  "node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/sqlite-core/query-builders/raw.cjs"(exports2, module2) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc2) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc2 = __getOwnPropDesc2(from, key)) || desc2.enumerable });
      }
      return to;
    };
    var __toCommonJS = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var raw_exports = {};
    __export2(raw_exports, {
      SQLiteRaw: () => SQLiteRaw
    });
    module2.exports = __toCommonJS(raw_exports);
    var import_entity22 = require_entity();
    var import_query_promise = require_query_promise();
    var SQLiteRaw = class extends import_query_promise.QueryPromise {
      constructor(execute, getSQL, action, dialect, mapBatchResult) {
        super();
        this.execute = execute;
        this.getSQL = getSQL;
        this.dialect = dialect;
        this.mapBatchResult = mapBatchResult;
        this.config = { action };
      }
      static [import_entity22.entityKind] = "SQLiteRaw";
      /** @internal */
      config;
      getQuery() {
        return { ...this.dialect.sqlToQuery(this.getSQL()), method: this.config.action };
      }
      mapResult(result, isFromBatch) {
        return isFromBatch ? this.mapBatchResult(result) : result;
      }
      _prepare() {
        return this;
      }
      /** @internal */
      isResponseInArrayMode() {
        return false;
      }
    };
  }
});

// node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/sqlite-core/db.cjs
var require_db = __commonJS({
  "node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/sqlite-core/db.cjs"(exports2, module2) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc2) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc2 = __getOwnPropDesc2(from, key)) || desc2.enumerable });
      }
      return to;
    };
    var __toCommonJS = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var db_exports = {};
    __export2(db_exports, {
      BaseSQLiteDatabase: () => BaseSQLiteDatabase,
      withReplicas: () => withReplicas
    });
    module2.exports = __toCommonJS(db_exports);
    var import_entity22 = require_entity();
    var import_selection_proxy = require_selection_proxy();
    var import_sql4 = require_sql();
    var import_query_builders = require_query_builders();
    var import_subquery2 = require_subquery();
    var import_count = require_count();
    var import_query = require_query();
    var import_raw = require_raw();
    var BaseSQLiteDatabase = class {
      constructor(resultKind, dialect, session, schema) {
        this.resultKind = resultKind;
        this.dialect = dialect;
        this.session = session;
        this._ = schema ? {
          schema: schema.schema,
          fullSchema: schema.fullSchema,
          tableNamesMap: schema.tableNamesMap
        } : {
          schema: void 0,
          fullSchema: {},
          tableNamesMap: {}
        };
        this.query = {};
        const query = this.query;
        if (this._.schema) {
          for (const [tableName, columns] of Object.entries(this._.schema)) {
            query[tableName] = new import_query.RelationalQueryBuilder(
              resultKind,
              schema.fullSchema,
              this._.schema,
              this._.tableNamesMap,
              schema.fullSchema[tableName],
              columns,
              dialect,
              session
            );
          }
        }
        this.$cache = { invalidate: async (_params) => {
        } };
      }
      static [import_entity22.entityKind] = "BaseSQLiteDatabase";
      query;
      /**
       * Creates a subquery that defines a temporary named result set as a CTE.
       *
       * It is useful for breaking down complex queries into simpler parts and for reusing the result set in subsequent parts of the query.
       *
       * See docs: {@link https://orm.drizzle.team/docs/select#with-clause}
       *
       * @param alias The alias for the subquery.
       *
       * Failure to provide an alias will result in a DrizzleTypeError, preventing the subquery from being referenced in other queries.
       *
       * @example
       *
       * ```ts
       * // Create a subquery with alias 'sq' and use it in the select query
       * const sq = db.$with('sq').as(db.select().from(users).where(eq(users.id, 42)));
       *
       * const result = await db.with(sq).select().from(sq);
       * ```
       *
       * To select arbitrary SQL values as fields in a CTE and reference them in other CTEs or in the main query, you need to add aliases to them:
       *
       * ```ts
       * // Select an arbitrary SQL value as a field in a CTE and reference it in the main query
       * const sq = db.$with('sq').as(db.select({
       *   name: sql<string>`upper(${users.name})`.as('name'),
       * })
       * .from(users));
       *
       * const result = await db.with(sq).select({ name: sq.name }).from(sq);
       * ```
       */
      $with = (alias, selection) => {
        const self = this;
        const as = (qb) => {
          if (typeof qb === "function") {
            qb = qb(new import_query_builders.QueryBuilder(self.dialect));
          }
          return new Proxy(
            new import_subquery2.WithSubquery(
              qb.getSQL(),
              selection ?? ("getSelectedFields" in qb ? qb.getSelectedFields() ?? {} : {}),
              alias,
              true
            ),
            new import_selection_proxy.SelectionProxyHandler({ alias, sqlAliasedBehavior: "alias", sqlBehavior: "error" })
          );
        };
        return { as };
      };
      $count(source, filters) {
        return new import_count.SQLiteCountBuilder({ source, filters, session: this.session });
      }
      /**
       * Incorporates a previously defined CTE (using `$with`) into the main query.
       *
       * This method allows the main query to reference a temporary named result set.
       *
       * See docs: {@link https://orm.drizzle.team/docs/select#with-clause}
       *
       * @param queries The CTEs to incorporate into the main query.
       *
       * @example
       *
       * ```ts
       * // Define a subquery 'sq' as a CTE using $with
       * const sq = db.$with('sq').as(db.select().from(users).where(eq(users.id, 42)));
       *
       * // Incorporate the CTE 'sq' into the main query and select from it
       * const result = await db.with(sq).select().from(sq);
       * ```
       */
      with(...queries) {
        const self = this;
        function select(fields) {
          return new import_query_builders.SQLiteSelectBuilder({
            fields: fields ?? void 0,
            session: self.session,
            dialect: self.dialect,
            withList: queries
          });
        }
        function selectDistinct(fields) {
          return new import_query_builders.SQLiteSelectBuilder({
            fields: fields ?? void 0,
            session: self.session,
            dialect: self.dialect,
            withList: queries,
            distinct: true
          });
        }
        function update(table) {
          return new import_query_builders.SQLiteUpdateBuilder(table, self.session, self.dialect, queries);
        }
        function insert(into) {
          return new import_query_builders.SQLiteInsertBuilder(into, self.session, self.dialect, queries);
        }
        function delete_(from) {
          return new import_query_builders.SQLiteDeleteBase(from, self.session, self.dialect, queries);
        }
        return { select, selectDistinct, update, insert, delete: delete_ };
      }
      select(fields) {
        return new import_query_builders.SQLiteSelectBuilder({ fields: fields ?? void 0, session: this.session, dialect: this.dialect });
      }
      selectDistinct(fields) {
        return new import_query_builders.SQLiteSelectBuilder({
          fields: fields ?? void 0,
          session: this.session,
          dialect: this.dialect,
          distinct: true
        });
      }
      /**
       * Creates an update query.
       *
       * Calling this method without `.where()` clause will update all rows in a table. The `.where()` clause specifies which rows should be updated.
       *
       * Use `.set()` method to specify which values to update.
       *
       * See docs: {@link https://orm.drizzle.team/docs/update}
       *
       * @param table The table to update.
       *
       * @example
       *
       * ```ts
       * // Update all rows in the 'cars' table
       * await db.update(cars).set({ color: 'red' });
       *
       * // Update rows with filters and conditions
       * await db.update(cars).set({ color: 'red' }).where(eq(cars.brand, 'BMW'));
       *
       * // Update with returning clause
       * const updatedCar: Car[] = await db.update(cars)
       *   .set({ color: 'red' })
       *   .where(eq(cars.id, 1))
       *   .returning();
       * ```
       */
      update(table) {
        return new import_query_builders.SQLiteUpdateBuilder(table, this.session, this.dialect);
      }
      $cache;
      /**
       * Creates an insert query.
       *
       * Calling this method will create new rows in a table. Use `.values()` method to specify which values to insert.
       *
       * See docs: {@link https://orm.drizzle.team/docs/insert}
       *
       * @param table The table to insert into.
       *
       * @example
       *
       * ```ts
       * // Insert one row
       * await db.insert(cars).values({ brand: 'BMW' });
       *
       * // Insert multiple rows
       * await db.insert(cars).values([{ brand: 'BMW' }, { brand: 'Porsche' }]);
       *
       * // Insert with returning clause
       * const insertedCar: Car[] = await db.insert(cars)
       *   .values({ brand: 'BMW' })
       *   .returning();
       * ```
       */
      insert(into) {
        return new import_query_builders.SQLiteInsertBuilder(into, this.session, this.dialect);
      }
      /**
       * Creates a delete query.
       *
       * Calling this method without `.where()` clause will delete all rows in a table. The `.where()` clause specifies which rows should be deleted.
       *
       * See docs: {@link https://orm.drizzle.team/docs/delete}
       *
       * @param table The table to delete from.
       *
       * @example
       *
       * ```ts
       * // Delete all rows in the 'cars' table
       * await db.delete(cars);
       *
       * // Delete rows with filters and conditions
       * await db.delete(cars).where(eq(cars.color, 'green'));
       *
       * // Delete with returning clause
       * const deletedCar: Car[] = await db.delete(cars)
       *   .where(eq(cars.id, 1))
       *   .returning();
       * ```
       */
      delete(from) {
        return new import_query_builders.SQLiteDeleteBase(from, this.session, this.dialect);
      }
      run(query) {
        const sequel = typeof query === "string" ? import_sql4.sql.raw(query) : query.getSQL();
        if (this.resultKind === "async") {
          return new import_raw.SQLiteRaw(
            async () => this.session.run(sequel),
            () => sequel,
            "run",
            this.dialect,
            this.session.extractRawRunValueFromBatchResult.bind(this.session)
          );
        }
        return this.session.run(sequel);
      }
      all(query) {
        const sequel = typeof query === "string" ? import_sql4.sql.raw(query) : query.getSQL();
        if (this.resultKind === "async") {
          return new import_raw.SQLiteRaw(
            async () => this.session.all(sequel),
            () => sequel,
            "all",
            this.dialect,
            this.session.extractRawAllValueFromBatchResult.bind(this.session)
          );
        }
        return this.session.all(sequel);
      }
      get(query) {
        const sequel = typeof query === "string" ? import_sql4.sql.raw(query) : query.getSQL();
        if (this.resultKind === "async") {
          return new import_raw.SQLiteRaw(
            async () => this.session.get(sequel),
            () => sequel,
            "get",
            this.dialect,
            this.session.extractRawGetValueFromBatchResult.bind(this.session)
          );
        }
        return this.session.get(sequel);
      }
      values(query) {
        const sequel = typeof query === "string" ? import_sql4.sql.raw(query) : query.getSQL();
        if (this.resultKind === "async") {
          return new import_raw.SQLiteRaw(
            async () => this.session.values(sequel),
            () => sequel,
            "values",
            this.dialect,
            this.session.extractRawValuesValueFromBatchResult.bind(this.session)
          );
        }
        return this.session.values(sequel);
      }
      transaction(transaction, config) {
        return this.session.transaction(transaction, config);
      }
    };
    var withReplicas = (primary, replicas, getReplica = () => replicas[Math.floor(Math.random() * replicas.length)]) => {
      const select = (...args) => getReplica(replicas).select(...args);
      const selectDistinct = (...args) => getReplica(replicas).selectDistinct(...args);
      const $count = (...args) => getReplica(replicas).$count(...args);
      const $with = (...args) => getReplica(replicas).with(...args);
      const update = (...args) => primary.update(...args);
      const insert = (...args) => primary.insert(...args);
      const $delete = (...args) => primary.delete(...args);
      const run = (...args) => primary.run(...args);
      const all = (...args) => primary.all(...args);
      const get = (...args) => primary.get(...args);
      const values = (...args) => primary.values(...args);
      const transaction = (...args) => primary.transaction(...args);
      return {
        ...primary,
        update,
        insert,
        delete: $delete,
        run,
        all,
        get,
        values,
        transaction,
        $primary: primary,
        $replicas: replicas,
        select,
        selectDistinct,
        $count,
        with: $with,
        get query() {
          return getReplica(replicas).query;
        }
      };
    };
  }
});

// node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/cache/core/cache.cjs
var require_cache = __commonJS({
  "node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/cache/core/cache.cjs"(exports2, module2) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc2) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc2 = __getOwnPropDesc2(from, key)) || desc2.enumerable });
      }
      return to;
    };
    var __toCommonJS = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var cache_exports = {};
    __export2(cache_exports, {
      Cache: () => Cache,
      NoopCache: () => NoopCache,
      hashQuery: () => hashQuery
    });
    module2.exports = __toCommonJS(cache_exports);
    var import_entity22 = require_entity();
    var Cache = class {
      static [import_entity22.entityKind] = "Cache";
    };
    var NoopCache = class extends Cache {
      strategy() {
        return "all";
      }
      static [import_entity22.entityKind] = "NoopCache";
      async get(_key) {
        return void 0;
      }
      async put(_hashedQuery, _response, _tables, _config) {
      }
      async onMutate(_params) {
      }
    };
    async function hashQuery(sql2, params) {
      const dataToHash = `${sql2}-${JSON.stringify(params)}`;
      const encoder = new TextEncoder();
      const data = encoder.encode(dataToHash);
      const hashBuffer = await crypto.subtle.digest("SHA-256", data);
      const hashArray = [...new Uint8Array(hashBuffer)];
      const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
      return hashHex;
    }
  }
});

// node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/cache/core/index.cjs
var require_core = __commonJS({
  "node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/cache/core/index.cjs"(exports2, module2) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __copyProps2 = (to, from, except, desc2) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc2 = __getOwnPropDesc2(from, key)) || desc2.enumerable });
      }
      return to;
    };
    var __reExport = (target, mod, secondTarget) => (__copyProps2(target, mod, "default"), secondTarget && __copyProps2(secondTarget, mod, "default"));
    var __toCommonJS = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var core_exports = {};
    module2.exports = __toCommonJS(core_exports);
    __reExport(core_exports, require_cache(), module2.exports);
  }
});

// node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/sqlite-core/alias.cjs
var require_alias2 = __commonJS({
  "node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/sqlite-core/alias.cjs"(exports2, module2) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc2) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc2 = __getOwnPropDesc2(from, key)) || desc2.enumerable });
      }
      return to;
    };
    var __toCommonJS = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var alias_exports = {};
    __export2(alias_exports, {
      alias: () => alias
    });
    module2.exports = __toCommonJS(alias_exports);
    var import_alias = require_alias();
    function alias(table, alias2) {
      return new Proxy(table, new import_alias.TableAliasProxyHandler(alias2, false));
    }
  }
});

// node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/sqlite-core/session.cjs
var require_session = __commonJS({
  "node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/sqlite-core/session.cjs"(exports2, module2) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc2) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc2 = __getOwnPropDesc2(from, key)) || desc2.enumerable });
      }
      return to;
    };
    var __toCommonJS = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var session_exports = {};
    __export2(session_exports, {
      ExecuteResultSync: () => ExecuteResultSync,
      SQLitePreparedQuery: () => SQLitePreparedQuery,
      SQLiteSession: () => SQLiteSession,
      SQLiteTransaction: () => SQLiteTransaction
    });
    module2.exports = __toCommonJS(session_exports);
    var import_cache = require_cache();
    var import_entity22 = require_entity();
    var import_errors = require_errors();
    var import_query_promise = require_query_promise();
    var import_db = require_db();
    var ExecuteResultSync = class extends import_query_promise.QueryPromise {
      constructor(resultCb) {
        super();
        this.resultCb = resultCb;
      }
      static [import_entity22.entityKind] = "ExecuteResultSync";
      async execute() {
        return this.resultCb();
      }
      sync() {
        return this.resultCb();
      }
    };
    var SQLitePreparedQuery = class {
      constructor(mode, executeMethod, query, cache, queryMetadata, cacheConfig) {
        this.mode = mode;
        this.executeMethod = executeMethod;
        this.query = query;
        this.cache = cache;
        this.queryMetadata = queryMetadata;
        this.cacheConfig = cacheConfig;
        if (cache && cache.strategy() === "all" && cacheConfig === void 0) {
          this.cacheConfig = { enable: true, autoInvalidate: true };
        }
        if (!this.cacheConfig?.enable) {
          this.cacheConfig = void 0;
        }
      }
      static [import_entity22.entityKind] = "PreparedQuery";
      /** @internal */
      joinsNotNullableMap;
      /** @internal */
      async queryWithCache(queryString, params, query) {
        if (this.cache === void 0 || (0, import_entity22.is)(this.cache, import_cache.NoopCache) || this.queryMetadata === void 0) {
          try {
            return await query();
          } catch (e) {
            throw new import_errors.DrizzleQueryError(queryString, params, e);
          }
        }
        if (this.cacheConfig && !this.cacheConfig.enable) {
          try {
            return await query();
          } catch (e) {
            throw new import_errors.DrizzleQueryError(queryString, params, e);
          }
        }
        if ((this.queryMetadata.type === "insert" || this.queryMetadata.type === "update" || this.queryMetadata.type === "delete") && this.queryMetadata.tables.length > 0) {
          try {
            const [res] = await Promise.all([
              query(),
              this.cache.onMutate({ tables: this.queryMetadata.tables })
            ]);
            return res;
          } catch (e) {
            throw new import_errors.DrizzleQueryError(queryString, params, e);
          }
        }
        if (!this.cacheConfig) {
          try {
            return await query();
          } catch (e) {
            throw new import_errors.DrizzleQueryError(queryString, params, e);
          }
        }
        if (this.queryMetadata.type === "select") {
          const fromCache = await this.cache.get(
            this.cacheConfig.tag ?? await (0, import_cache.hashQuery)(queryString, params),
            this.queryMetadata.tables,
            this.cacheConfig.tag !== void 0,
            this.cacheConfig.autoInvalidate
          );
          if (fromCache === void 0) {
            let result;
            try {
              result = await query();
            } catch (e) {
              throw new import_errors.DrizzleQueryError(queryString, params, e);
            }
            await this.cache.put(
              this.cacheConfig.tag ?? await (0, import_cache.hashQuery)(queryString, params),
              result,
              // make sure we send tables that were used in a query only if user wants to invalidate it on each write
              this.cacheConfig.autoInvalidate ? this.queryMetadata.tables : [],
              this.cacheConfig.tag !== void 0,
              this.cacheConfig.config
            );
            return result;
          }
          return fromCache;
        }
        try {
          return await query();
        } catch (e) {
          throw new import_errors.DrizzleQueryError(queryString, params, e);
        }
      }
      getQuery() {
        return this.query;
      }
      mapRunResult(result, _isFromBatch) {
        return result;
      }
      mapAllResult(_result, _isFromBatch) {
        throw new Error("Not implemented");
      }
      mapGetResult(_result, _isFromBatch) {
        throw new Error("Not implemented");
      }
      execute(placeholderValues) {
        if (this.mode === "async") {
          return this[this.executeMethod](placeholderValues);
        }
        return new ExecuteResultSync(() => this[this.executeMethod](placeholderValues));
      }
      mapResult(response, isFromBatch) {
        switch (this.executeMethod) {
          case "run": {
            return this.mapRunResult(response, isFromBatch);
          }
          case "all": {
            return this.mapAllResult(response, isFromBatch);
          }
          case "get": {
            return this.mapGetResult(response, isFromBatch);
          }
        }
      }
    };
    var SQLiteSession = class {
      constructor(dialect) {
        this.dialect = dialect;
      }
      static [import_entity22.entityKind] = "SQLiteSession";
      prepareOneTimeQuery(query, fields, executeMethod, isResponseInArrayMode, customResultMapper, queryMetadata, cacheConfig) {
        return this.prepareQuery(
          query,
          fields,
          executeMethod,
          isResponseInArrayMode,
          customResultMapper,
          queryMetadata,
          cacheConfig
        );
      }
      run(query) {
        const staticQuery = this.dialect.sqlToQuery(query);
        try {
          return this.prepareOneTimeQuery(staticQuery, void 0, "run", false).run();
        } catch (err) {
          throw new import_errors.DrizzleError({ cause: err, message: `Failed to run the query '${staticQuery.sql}'` });
        }
      }
      /** @internal */
      extractRawRunValueFromBatchResult(result) {
        return result;
      }
      all(query) {
        return this.prepareOneTimeQuery(this.dialect.sqlToQuery(query), void 0, "run", false).all();
      }
      /** @internal */
      extractRawAllValueFromBatchResult(_result) {
        throw new Error("Not implemented");
      }
      get(query) {
        return this.prepareOneTimeQuery(this.dialect.sqlToQuery(query), void 0, "run", false).get();
      }
      /** @internal */
      extractRawGetValueFromBatchResult(_result) {
        throw new Error("Not implemented");
      }
      values(query) {
        return this.prepareOneTimeQuery(this.dialect.sqlToQuery(query), void 0, "run", false).values();
      }
      async count(sql2) {
        const result = await this.values(sql2);
        return result[0][0];
      }
      /** @internal */
      extractRawValuesValueFromBatchResult(_result) {
        throw new Error("Not implemented");
      }
    };
    var SQLiteTransaction = class extends import_db.BaseSQLiteDatabase {
      constructor(resultType, dialect, session, schema, nestedIndex = 0) {
        super(resultType, dialect, session, schema);
        this.schema = schema;
        this.nestedIndex = nestedIndex;
      }
      static [import_entity22.entityKind] = "SQLiteTransaction";
      rollback() {
        throw new import_errors.TransactionRollbackError();
      }
    };
  }
});

// node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/sqlite-core/subquery.cjs
var require_subquery2 = __commonJS({
  "node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/sqlite-core/subquery.cjs"(exports2, module2) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __copyProps2 = (to, from, except, desc2) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc2 = __getOwnPropDesc2(from, key)) || desc2.enumerable });
      }
      return to;
    };
    var __toCommonJS = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var subquery_exports = {};
    module2.exports = __toCommonJS(subquery_exports);
  }
});

// node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/sqlite-core/view.cjs
var require_view = __commonJS({
  "node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/sqlite-core/view.cjs"(exports2, module2) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc2) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc2 = __getOwnPropDesc2(from, key)) || desc2.enumerable });
      }
      return to;
    };
    var __toCommonJS = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var view_exports = {};
    __export2(view_exports, {
      ManualViewBuilder: () => ManualViewBuilder,
      SQLiteView: () => SQLiteView,
      ViewBuilder: () => ViewBuilder,
      ViewBuilderCore: () => ViewBuilderCore,
      sqliteView: () => sqliteView,
      view: () => view
    });
    module2.exports = __toCommonJS(view_exports);
    var import_entity22 = require_entity();
    var import_selection_proxy = require_selection_proxy();
    var import_utils6 = require_utils();
    var import_query_builder = require_query_builder2();
    var import_table4 = require_table3();
    var import_view_base = require_view_base();
    var ViewBuilderCore = class {
      constructor(name) {
        this.name = name;
      }
      static [import_entity22.entityKind] = "SQLiteViewBuilderCore";
      config = {};
    };
    var ViewBuilder = class extends ViewBuilderCore {
      static [import_entity22.entityKind] = "SQLiteViewBuilder";
      as(qb) {
        if (typeof qb === "function") {
          qb = qb(new import_query_builder.QueryBuilder());
        }
        const selectionProxy = new import_selection_proxy.SelectionProxyHandler({
          alias: this.name,
          sqlBehavior: "error",
          sqlAliasedBehavior: "alias",
          replaceOriginalName: true
        });
        const aliasedSelectedFields = qb.getSelectedFields();
        return new Proxy(
          new SQLiteView({
            // sqliteConfig: this.config,
            config: {
              name: this.name,
              schema: void 0,
              selectedFields: aliasedSelectedFields,
              query: qb.getSQL().inlineParams()
            }
          }),
          selectionProxy
        );
      }
    };
    var ManualViewBuilder = class extends ViewBuilderCore {
      static [import_entity22.entityKind] = "SQLiteManualViewBuilder";
      columns;
      constructor(name, columns) {
        super(name);
        this.columns = (0, import_utils6.getTableColumns)((0, import_table4.sqliteTable)(name, columns));
      }
      existing() {
        return new Proxy(
          new SQLiteView({
            config: {
              name: this.name,
              schema: void 0,
              selectedFields: this.columns,
              query: void 0
            }
          }),
          new import_selection_proxy.SelectionProxyHandler({
            alias: this.name,
            sqlBehavior: "error",
            sqlAliasedBehavior: "alias",
            replaceOriginalName: true
          })
        );
      }
      as(query) {
        return new Proxy(
          new SQLiteView({
            config: {
              name: this.name,
              schema: void 0,
              selectedFields: this.columns,
              query: query.inlineParams()
            }
          }),
          new import_selection_proxy.SelectionProxyHandler({
            alias: this.name,
            sqlBehavior: "error",
            sqlAliasedBehavior: "alias",
            replaceOriginalName: true
          })
        );
      }
    };
    var SQLiteView = class extends import_view_base.SQLiteViewBase {
      static [import_entity22.entityKind] = "SQLiteView";
      constructor({ config }) {
        super(config);
      }
    };
    function sqliteView(name, selection) {
      if (selection) {
        return new ManualViewBuilder(name, selection);
      }
      return new ViewBuilder(name);
    }
    var view = sqliteView;
  }
});

// node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/sqlite-core/index.cjs
var require_sqlite_core = __commonJS({
  "node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/sqlite-core/index.cjs"(exports2, module2) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __copyProps2 = (to, from, except, desc2) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc2 = __getOwnPropDesc2(from, key)) || desc2.enumerable });
      }
      return to;
    };
    var __reExport = (target, mod, secondTarget) => (__copyProps2(target, mod, "default"), secondTarget && __copyProps2(secondTarget, mod, "default"));
    var __toCommonJS = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var sqlite_core_exports = {};
    module2.exports = __toCommonJS(sqlite_core_exports);
    __reExport(sqlite_core_exports, require_alias2(), module2.exports);
    __reExport(sqlite_core_exports, require_checks(), module2.exports);
    __reExport(sqlite_core_exports, require_columns(), module2.exports);
    __reExport(sqlite_core_exports, require_db(), module2.exports);
    __reExport(sqlite_core_exports, require_dialect(), module2.exports);
    __reExport(sqlite_core_exports, require_foreign_keys2(), module2.exports);
    __reExport(sqlite_core_exports, require_indexes(), module2.exports);
    __reExport(sqlite_core_exports, require_primary_keys2(), module2.exports);
    __reExport(sqlite_core_exports, require_query_builders(), module2.exports);
    __reExport(sqlite_core_exports, require_session(), module2.exports);
    __reExport(sqlite_core_exports, require_subquery2(), module2.exports);
    __reExport(sqlite_core_exports, require_table3(), module2.exports);
    __reExport(sqlite_core_exports, require_unique_constraint2(), module2.exports);
    __reExport(sqlite_core_exports, require_utils3(), module2.exports);
    __reExport(sqlite_core_exports, require_view(), module2.exports);
  }
});

// node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/better-sqlite3/session.cjs
var require_session2 = __commonJS({
  "node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/better-sqlite3/session.cjs"(exports2, module2) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc2) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc2 = __getOwnPropDesc2(from, key)) || desc2.enumerable });
      }
      return to;
    };
    var __toCommonJS = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var session_exports = {};
    __export2(session_exports, {
      BetterSQLiteSession: () => BetterSQLiteSession,
      BetterSQLiteTransaction: () => BetterSQLiteTransaction,
      PreparedQuery: () => PreparedQuery
    });
    module2.exports = __toCommonJS(session_exports);
    var import_core = require_core();
    var import_entity22 = require_entity();
    var import_logger = require_logger();
    var import_sql4 = require_sql();
    var import_sqlite_core2 = require_sqlite_core();
    var import_session = require_session();
    var import_utils6 = require_utils();
    var BetterSQLiteSession = class extends import_session.SQLiteSession {
      constructor(client, dialect, schema, options = {}) {
        super(dialect);
        this.client = client;
        this.schema = schema;
        this.logger = options.logger ?? new import_logger.NoopLogger();
        this.cache = options.cache ?? new import_core.NoopCache();
      }
      static [import_entity22.entityKind] = "BetterSQLiteSession";
      logger;
      cache;
      prepareQuery(query, fields, executeMethod, isResponseInArrayMode, customResultMapper, queryMetadata, cacheConfig) {
        const stmt = this.client.prepare(query.sql);
        return new PreparedQuery(
          stmt,
          query,
          this.logger,
          this.cache,
          queryMetadata,
          cacheConfig,
          fields,
          executeMethod,
          isResponseInArrayMode,
          customResultMapper
        );
      }
      transaction(transaction, config = {}) {
        const tx = new BetterSQLiteTransaction("sync", this.dialect, this, this.schema);
        const nativeTx = this.client.transaction(transaction);
        return nativeTx[config.behavior ?? "deferred"](tx);
      }
    };
    var BetterSQLiteTransaction = class _BetterSQLiteTransaction extends import_sqlite_core2.SQLiteTransaction {
      static [import_entity22.entityKind] = "BetterSQLiteTransaction";
      transaction(transaction) {
        const savepointName = `sp${this.nestedIndex}`;
        const tx = new _BetterSQLiteTransaction("sync", this.dialect, this.session, this.schema, this.nestedIndex + 1);
        this.session.run(import_sql4.sql.raw(`savepoint ${savepointName}`));
        try {
          const result = transaction(tx);
          this.session.run(import_sql4.sql.raw(`release savepoint ${savepointName}`));
          return result;
        } catch (err) {
          this.session.run(import_sql4.sql.raw(`rollback to savepoint ${savepointName}`));
          throw err;
        }
      }
    };
    var PreparedQuery = class extends import_session.SQLitePreparedQuery {
      constructor(stmt, query, logger, cache, queryMetadata, cacheConfig, fields, executeMethod, _isResponseInArrayMode, customResultMapper) {
        super("sync", executeMethod, query, cache, queryMetadata, cacheConfig);
        this.stmt = stmt;
        this.logger = logger;
        this.fields = fields;
        this._isResponseInArrayMode = _isResponseInArrayMode;
        this.customResultMapper = customResultMapper;
      }
      static [import_entity22.entityKind] = "BetterSQLitePreparedQuery";
      run(placeholderValues) {
        const params = (0, import_sql4.fillPlaceholders)(this.query.params, placeholderValues ?? {});
        this.logger.logQuery(this.query.sql, params);
        return this.stmt.run(...params);
      }
      all(placeholderValues) {
        const { fields, joinsNotNullableMap, query, logger, stmt, customResultMapper } = this;
        if (!fields && !customResultMapper) {
          const params = (0, import_sql4.fillPlaceholders)(query.params, placeholderValues ?? {});
          logger.logQuery(query.sql, params);
          return stmt.all(...params);
        }
        const rows = this.values(placeholderValues);
        if (customResultMapper) {
          return customResultMapper(rows);
        }
        return rows.map((row) => (0, import_utils6.mapResultRow)(fields, row, joinsNotNullableMap));
      }
      get(placeholderValues) {
        const params = (0, import_sql4.fillPlaceholders)(this.query.params, placeholderValues ?? {});
        this.logger.logQuery(this.query.sql, params);
        const { fields, stmt, joinsNotNullableMap, customResultMapper } = this;
        if (!fields && !customResultMapper) {
          return stmt.get(...params);
        }
        const row = stmt.raw().get(...params);
        if (!row) {
          return void 0;
        }
        if (customResultMapper) {
          return customResultMapper([row]);
        }
        return (0, import_utils6.mapResultRow)(fields, row, joinsNotNullableMap);
      }
      values(placeholderValues) {
        const params = (0, import_sql4.fillPlaceholders)(this.query.params, placeholderValues ?? {});
        this.logger.logQuery(this.query.sql, params);
        return this.stmt.raw().all(...params);
      }
      /** @internal */
      isResponseInArrayMode() {
        return this._isResponseInArrayMode;
      }
    };
  }
});

// node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/better-sqlite3/driver.cjs
var require_driver = __commonJS({
  "node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/better-sqlite3/driver.cjs"(exports2, module2) {
    "use strict";
    var __create2 = Object.create;
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __getProtoOf2 = Object.getPrototypeOf;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc2) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc2 = __getOwnPropDesc2(from, key)) || desc2.enumerable });
      }
      return to;
    };
    var __toESM2 = (mod, isNodeMode, target) => (target = mod != null ? __create2(__getProtoOf2(mod)) : {}, __copyProps2(
      // If the importer is in node compatibility mode or this is not an ESM
      // file that has been converted to a CommonJS file using a Babel-
      // compatible transform (i.e. "__esModule" has not been set), then set
      // "default" to the CommonJS "module.exports" for node compatibility.
      isNodeMode || !mod || !mod.__esModule ? __defProp2(target, "default", { value: mod, enumerable: true }) : target,
      mod
    ));
    var __toCommonJS = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var driver_exports = {};
    __export2(driver_exports, {
      BetterSQLite3Database: () => BetterSQLite3Database,
      drizzle: () => drizzle
    });
    module2.exports = __toCommonJS(driver_exports);
    var import_better_sqlite3 = __toESM2(require("better-sqlite3"), 1);
    var import_entity22 = require_entity();
    var import_logger = require_logger();
    var import_relations = require_relations();
    var import_db = require_db();
    var import_dialect = require_dialect();
    var import_utils6 = require_utils();
    var import_session = require_session2();
    var BetterSQLite3Database = class extends import_db.BaseSQLiteDatabase {
      static [import_entity22.entityKind] = "BetterSQLite3Database";
    };
    function construct(client, config = {}) {
      const dialect = new import_dialect.SQLiteSyncDialect({ casing: config.casing });
      let logger;
      if (config.logger === true) {
        logger = new import_logger.DefaultLogger();
      } else if (config.logger !== false) {
        logger = config.logger;
      }
      let schema;
      if (config.schema) {
        const tablesConfig = (0, import_relations.extractTablesRelationalConfig)(
          config.schema,
          import_relations.createTableRelationsHelpers
        );
        schema = {
          fullSchema: config.schema,
          schema: tablesConfig.tables,
          tableNamesMap: tablesConfig.tableNamesMap
        };
      }
      const session = new import_session.BetterSQLiteSession(client, dialect, schema, { logger });
      const db2 = new BetterSQLite3Database("sync", dialect, session, schema);
      db2.$client = client;
      return db2;
    }
    function drizzle(...params) {
      if (params[0] === void 0 || typeof params[0] === "string") {
        const instance = params[0] === void 0 ? new import_better_sqlite3.default() : new import_better_sqlite3.default(params[0]);
        return construct(instance, params[1]);
      }
      if ((0, import_utils6.isConfig)(params[0])) {
        const { connection, client, ...drizzleConfig } = params[0];
        if (client) return construct(client, drizzleConfig);
        if (typeof connection === "object") {
          const { source, ...options } = connection;
          const instance2 = new import_better_sqlite3.default(source, options);
          return construct(instance2, drizzleConfig);
        }
        const instance = new import_better_sqlite3.default(connection);
        return construct(instance, drizzleConfig);
      }
      return construct(params[0], params[1]);
    }
    ((drizzle2) => {
      function mock(config) {
        return construct({}, config);
      }
      drizzle2.mock = mock;
    })(drizzle || (drizzle = {}));
  }
});

// node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/better-sqlite3/index.cjs
var require_better_sqlite3 = __commonJS({
  "node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/better-sqlite3/index.cjs"(exports2, module2) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __copyProps2 = (to, from, except, desc2) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc2 = __getOwnPropDesc2(from, key)) || desc2.enumerable });
      }
      return to;
    };
    var __reExport = (target, mod, secondTarget) => (__copyProps2(target, mod, "default"), secondTarget && __copyProps2(secondTarget, mod, "default"));
    var __toCommonJS = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var better_sqlite3_exports = {};
    module2.exports = __toCommonJS(better_sqlite3_exports);
    __reExport(better_sqlite3_exports, require_driver(), module2.exports);
    __reExport(better_sqlite3_exports, require_session2(), module2.exports);
  }
});

// libs/shared/database/src/lib/schema.ts
var schema_exports = {};
__export(schema_exports, {
  appState: () => appState,
  categories: () => categories,
  content: () => content,
  downloads: () => downloads,
  epgChannels: () => epgChannels,
  epgPrograms: () => epgPrograms,
  favorites: () => favorites,
  playbackPositions: () => playbackPositions,
  playlists: () => playlists,
  recentlyViewed: () => recentlyViewed
});

// node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/entity.js
var entityKind = Symbol.for("drizzle:entityKind");
var hasOwnEntityKind = Symbol.for("drizzle:hasOwnEntityKind");
function is(value, type) {
  if (!value || typeof value !== "object") {
    return false;
  }
  if (value instanceof type) {
    return true;
  }
  if (!Object.prototype.hasOwnProperty.call(type, entityKind)) {
    throw new Error(
      `Class "${type.name ?? "<unknown>"}" doesn't look like a Drizzle entity. If this is incorrect and the class is provided by Drizzle, please report this as a bug.`
    );
  }
  let cls = Object.getPrototypeOf(value).constructor;
  if (cls) {
    while (cls) {
      if (entityKind in cls && cls[entityKind] === type[entityKind]) {
        return true;
      }
      cls = Object.getPrototypeOf(cls);
    }
  }
  return false;
}

// node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/column.js
var Column = class {
  constructor(table, config) {
    this.table = table;
    this.config = config;
    this.name = config.name;
    this.keyAsName = config.keyAsName;
    this.notNull = config.notNull;
    this.default = config.default;
    this.defaultFn = config.defaultFn;
    this.onUpdateFn = config.onUpdateFn;
    this.hasDefault = config.hasDefault;
    this.primary = config.primaryKey;
    this.isUnique = config.isUnique;
    this.uniqueName = config.uniqueName;
    this.uniqueType = config.uniqueType;
    this.dataType = config.dataType;
    this.columnType = config.columnType;
    this.generated = config.generated;
    this.generatedIdentity = config.generatedIdentity;
  }
  static [entityKind] = "Column";
  name;
  keyAsName;
  primary;
  notNull;
  default;
  defaultFn;
  onUpdateFn;
  hasDefault;
  isUnique;
  uniqueName;
  uniqueType;
  dataType;
  columnType;
  enumValues = void 0;
  generated = void 0;
  generatedIdentity = void 0;
  config;
  mapFromDriverValue(value) {
    return value;
  }
  mapToDriverValue(value) {
    return value;
  }
  // ** @internal */
  shouldDisableInsert() {
    return this.config.generated !== void 0 && this.config.generated.type !== "byDefault";
  }
};

// node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/column-builder.js
var ColumnBuilder = class {
  static [entityKind] = "ColumnBuilder";
  config;
  constructor(name, dataType, columnType) {
    this.config = {
      name,
      keyAsName: name === "",
      notNull: false,
      default: void 0,
      hasDefault: false,
      primaryKey: false,
      isUnique: false,
      uniqueName: void 0,
      uniqueType: void 0,
      dataType,
      columnType,
      generated: void 0
    };
  }
  /**
   * Changes the data type of the column. Commonly used with `json` columns. Also, useful for branded types.
   *
   * @example
   * ```ts
   * const users = pgTable('users', {
   * 	id: integer('id').$type<UserId>().primaryKey(),
   * 	details: json('details').$type<UserDetails>().notNull(),
   * });
   * ```
   */
  $type() {
    return this;
  }
  /**
   * Adds a `not null` clause to the column definition.
   *
   * Affects the `select` model of the table - columns *without* `not null` will be nullable on select.
   */
  notNull() {
    this.config.notNull = true;
    return this;
  }
  /**
   * Adds a `default <value>` clause to the column definition.
   *
   * Affects the `insert` model of the table - columns *with* `default` are optional on insert.
   *
   * If you need to set a dynamic default value, use {@link $defaultFn} instead.
   */
  default(value) {
    this.config.default = value;
    this.config.hasDefault = true;
    return this;
  }
  /**
   * Adds a dynamic default value to the column.
   * The function will be called when the row is inserted, and the returned value will be used as the column value.
   *
   * **Note:** This value does not affect the `drizzle-kit` behavior, it is only used at runtime in `drizzle-orm`.
   */
  $defaultFn(fn) {
    this.config.defaultFn = fn;
    this.config.hasDefault = true;
    return this;
  }
  /**
   * Alias for {@link $defaultFn}.
   */
  $default = this.$defaultFn;
  /**
   * Adds a dynamic update value to the column.
   * The function will be called when the row is updated, and the returned value will be used as the column value if none is provided.
   * If no `default` (or `$defaultFn`) value is provided, the function will be called when the row is inserted as well, and the returned value will be used as the column value.
   *
   * **Note:** This value does not affect the `drizzle-kit` behavior, it is only used at runtime in `drizzle-orm`.
   */
  $onUpdateFn(fn) {
    this.config.onUpdateFn = fn;
    this.config.hasDefault = true;
    return this;
  }
  /**
   * Alias for {@link $onUpdateFn}.
   */
  $onUpdate = this.$onUpdateFn;
  /**
   * Adds a `primary key` clause to the column definition. This implicitly makes the column `not null`.
   *
   * In SQLite, `integer primary key` implicitly makes the column auto-incrementing.
   */
  primaryKey() {
    this.config.primaryKey = true;
    this.config.notNull = true;
    return this;
  }
  /** @internal Sets the name of the column to the key within the table definition if a name was not given. */
  setName(name) {
    if (this.config.name !== "") return;
    this.config.name = name;
  }
};

// node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/table.utils.js
var TableName = Symbol.for("drizzle:Name");

// node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/pg-core/foreign-keys.js
var ForeignKeyBuilder = class {
  static [entityKind] = "PgForeignKeyBuilder";
  /** @internal */
  reference;
  /** @internal */
  _onUpdate = "no action";
  /** @internal */
  _onDelete = "no action";
  constructor(config, actions) {
    this.reference = () => {
      const { name, columns, foreignColumns } = config();
      return { name, columns, foreignTable: foreignColumns[0].table, foreignColumns };
    };
    if (actions) {
      this._onUpdate = actions.onUpdate;
      this._onDelete = actions.onDelete;
    }
  }
  onUpdate(action) {
    this._onUpdate = action === void 0 ? "no action" : action;
    return this;
  }
  onDelete(action) {
    this._onDelete = action === void 0 ? "no action" : action;
    return this;
  }
  /** @internal */
  build(table) {
    return new ForeignKey(table, this);
  }
};
var ForeignKey = class {
  constructor(table, builder) {
    this.table = table;
    this.reference = builder.reference;
    this.onUpdate = builder._onUpdate;
    this.onDelete = builder._onDelete;
  }
  static [entityKind] = "PgForeignKey";
  reference;
  onUpdate;
  onDelete;
  getName() {
    const { name, columns, foreignColumns } = this.reference();
    const columnNames = columns.map((column) => column.name);
    const foreignColumnNames = foreignColumns.map((column) => column.name);
    const chunks = [
      this.table[TableName],
      ...columnNames,
      foreignColumns[0].table[TableName],
      ...foreignColumnNames
    ];
    return name ?? `${chunks.join("_")}_fk`;
  }
};

// node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/tracing-utils.js
function iife(fn, ...args) {
  return fn(...args);
}

// node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/pg-core/unique-constraint.js
function uniqueKeyName(table, columns) {
  return `${table[TableName]}_${columns.join("_")}_unique`;
}
var UniqueConstraintBuilder = class {
  constructor(columns, name) {
    this.name = name;
    this.columns = columns;
  }
  static [entityKind] = "PgUniqueConstraintBuilder";
  /** @internal */
  columns;
  /** @internal */
  nullsNotDistinctConfig = false;
  nullsNotDistinct() {
    this.nullsNotDistinctConfig = true;
    return this;
  }
  /** @internal */
  build(table) {
    return new UniqueConstraint(table, this.columns, this.nullsNotDistinctConfig, this.name);
  }
};
var UniqueOnConstraintBuilder = class {
  static [entityKind] = "PgUniqueOnConstraintBuilder";
  /** @internal */
  name;
  constructor(name) {
    this.name = name;
  }
  on(...columns) {
    return new UniqueConstraintBuilder(columns, this.name);
  }
};
var UniqueConstraint = class {
  constructor(table, columns, nullsNotDistinct, name) {
    this.table = table;
    this.columns = columns;
    this.name = name ?? uniqueKeyName(this.table, this.columns.map((column) => column.name));
    this.nullsNotDistinct = nullsNotDistinct;
  }
  static [entityKind] = "PgUniqueConstraint";
  columns;
  name;
  nullsNotDistinct = false;
  getName() {
    return this.name;
  }
};

// node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/pg-core/utils/array.js
function parsePgArrayValue(arrayString, startFrom, inQuotes) {
  for (let i = startFrom; i < arrayString.length; i++) {
    const char = arrayString[i];
    if (char === "\\") {
      i++;
      continue;
    }
    if (char === '"') {
      return [arrayString.slice(startFrom, i).replace(/\\/g, ""), i + 1];
    }
    if (inQuotes) {
      continue;
    }
    if (char === "," || char === "}") {
      return [arrayString.slice(startFrom, i).replace(/\\/g, ""), i];
    }
  }
  return [arrayString.slice(startFrom).replace(/\\/g, ""), arrayString.length];
}
function parsePgNestedArray(arrayString, startFrom = 0) {
  const result = [];
  let i = startFrom;
  let lastCharIsComma = false;
  while (i < arrayString.length) {
    const char = arrayString[i];
    if (char === ",") {
      if (lastCharIsComma || i === startFrom) {
        result.push("");
      }
      lastCharIsComma = true;
      i++;
      continue;
    }
    lastCharIsComma = false;
    if (char === "\\") {
      i += 2;
      continue;
    }
    if (char === '"') {
      const [value2, startFrom2] = parsePgArrayValue(arrayString, i + 1, true);
      result.push(value2);
      i = startFrom2;
      continue;
    }
    if (char === "}") {
      return [result, i + 1];
    }
    if (char === "{") {
      const [value2, startFrom2] = parsePgNestedArray(arrayString, i + 1);
      result.push(value2);
      i = startFrom2;
      continue;
    }
    const [value, newStartFrom] = parsePgArrayValue(arrayString, i, false);
    result.push(value);
    i = newStartFrom;
  }
  return [result, i];
}
function parsePgArray(arrayString) {
  const [result] = parsePgNestedArray(arrayString, 1);
  return result;
}
function makePgArray(array) {
  return `{${array.map((item) => {
    if (Array.isArray(item)) {
      return makePgArray(item);
    }
    if (typeof item === "string") {
      return `"${item.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
    }
    return `${item}`;
  }).join(",")}}`;
}

// node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/pg-core/columns/common.js
var PgColumnBuilder = class extends ColumnBuilder {
  foreignKeyConfigs = [];
  static [entityKind] = "PgColumnBuilder";
  array(size) {
    return new PgArrayBuilder(this.config.name, this, size);
  }
  references(ref, actions = {}) {
    this.foreignKeyConfigs.push({ ref, actions });
    return this;
  }
  unique(name, config) {
    this.config.isUnique = true;
    this.config.uniqueName = name;
    this.config.uniqueType = config?.nulls;
    return this;
  }
  generatedAlwaysAs(as) {
    this.config.generated = {
      as,
      type: "always",
      mode: "stored"
    };
    return this;
  }
  /** @internal */
  buildForeignKeys(column, table) {
    return this.foreignKeyConfigs.map(({ ref, actions }) => {
      return iife(
        (ref2, actions2) => {
          const builder = new ForeignKeyBuilder(() => {
            const foreignColumn = ref2();
            return { columns: [column], foreignColumns: [foreignColumn] };
          });
          if (actions2.onUpdate) {
            builder.onUpdate(actions2.onUpdate);
          }
          if (actions2.onDelete) {
            builder.onDelete(actions2.onDelete);
          }
          return builder.build(table);
        },
        ref,
        actions
      );
    });
  }
  /** @internal */
  buildExtraConfigColumn(table) {
    return new ExtraConfigColumn(table, this.config);
  }
};
var PgColumn = class extends Column {
  constructor(table, config) {
    if (!config.uniqueName) {
      config.uniqueName = uniqueKeyName(table, [config.name]);
    }
    super(table, config);
    this.table = table;
  }
  static [entityKind] = "PgColumn";
};
var ExtraConfigColumn = class extends PgColumn {
  static [entityKind] = "ExtraConfigColumn";
  getSQLType() {
    return this.getSQLType();
  }
  indexConfig = {
    order: this.config.order ?? "asc",
    nulls: this.config.nulls ?? "last",
    opClass: this.config.opClass
  };
  defaultConfig = {
    order: "asc",
    nulls: "last",
    opClass: void 0
  };
  asc() {
    this.indexConfig.order = "asc";
    return this;
  }
  desc() {
    this.indexConfig.order = "desc";
    return this;
  }
  nullsFirst() {
    this.indexConfig.nulls = "first";
    return this;
  }
  nullsLast() {
    this.indexConfig.nulls = "last";
    return this;
  }
  /**
   * ### PostgreSQL documentation quote
   *
   * > An operator class with optional parameters can be specified for each column of an index.
   * The operator class identifies the operators to be used by the index for that column.
   * For example, a B-tree index on four-byte integers would use the int4_ops class;
   * this operator class includes comparison functions for four-byte integers.
   * In practice the default operator class for the column's data type is usually sufficient.
   * The main point of having operator classes is that for some data types, there could be more than one meaningful ordering.
   * For example, we might want to sort a complex-number data type either by absolute value or by real part.
   * We could do this by defining two operator classes for the data type and then selecting the proper class when creating an index.
   * More information about operator classes check:
   *
   * ### Useful links
   * https://www.postgresql.org/docs/current/sql-createindex.html
   *
   * https://www.postgresql.org/docs/current/indexes-opclass.html
   *
   * https://www.postgresql.org/docs/current/xindex.html
   *
   * ### Additional types
   * If you have the `pg_vector` extension installed in your database, you can use the
   * `vector_l2_ops`, `vector_ip_ops`, `vector_cosine_ops`, `vector_l1_ops`, `bit_hamming_ops`, `bit_jaccard_ops`, `halfvec_l2_ops`, `sparsevec_l2_ops` options, which are predefined types.
   *
   * **You can always specify any string you want in the operator class, in case Drizzle doesn't have it natively in its types**
   *
   * @param opClass
   * @returns
   */
  op(opClass) {
    this.indexConfig.opClass = opClass;
    return this;
  }
};
var IndexedColumn = class {
  static [entityKind] = "IndexedColumn";
  constructor(name, keyAsName, type, indexConfig) {
    this.name = name;
    this.keyAsName = keyAsName;
    this.type = type;
    this.indexConfig = indexConfig;
  }
  name;
  keyAsName;
  type;
  indexConfig;
};
var PgArrayBuilder = class extends PgColumnBuilder {
  static [entityKind] = "PgArrayBuilder";
  constructor(name, baseBuilder, size) {
    super(name, "array", "PgArray");
    this.config.baseBuilder = baseBuilder;
    this.config.size = size;
  }
  /** @internal */
  build(table) {
    const baseColumn = this.config.baseBuilder.build(table);
    return new PgArray(
      table,
      this.config,
      baseColumn
    );
  }
};
var PgArray = class _PgArray extends PgColumn {
  constructor(table, config, baseColumn, range) {
    super(table, config);
    this.baseColumn = baseColumn;
    this.range = range;
    this.size = config.size;
  }
  size;
  static [entityKind] = "PgArray";
  getSQLType() {
    return `${this.baseColumn.getSQLType()}[${typeof this.size === "number" ? this.size : ""}]`;
  }
  mapFromDriverValue(value) {
    if (typeof value === "string") {
      value = parsePgArray(value);
    }
    return value.map((v) => this.baseColumn.mapFromDriverValue(v));
  }
  mapToDriverValue(value, isNestedArray = false) {
    const a = value.map(
      (v) => v === null ? null : is(this.baseColumn, _PgArray) ? this.baseColumn.mapToDriverValue(v, true) : this.baseColumn.mapToDriverValue(v)
    );
    if (isNestedArray) return a;
    return makePgArray(a);
  }
};

// node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/pg-core/columns/enum.js
var PgEnumObjectColumnBuilder = class extends PgColumnBuilder {
  static [entityKind] = "PgEnumObjectColumnBuilder";
  constructor(name, enumInstance) {
    super(name, "string", "PgEnumObjectColumn");
    this.config.enum = enumInstance;
  }
  /** @internal */
  build(table) {
    return new PgEnumObjectColumn(
      table,
      this.config
    );
  }
};
var PgEnumObjectColumn = class extends PgColumn {
  static [entityKind] = "PgEnumObjectColumn";
  enum;
  enumValues = this.config.enum.enumValues;
  constructor(table, config) {
    super(table, config);
    this.enum = config.enum;
  }
  getSQLType() {
    return this.enum.enumName;
  }
};
var isPgEnumSym = Symbol.for("drizzle:isPgEnum");
function isPgEnum(obj) {
  return !!obj && typeof obj === "function" && isPgEnumSym in obj && obj[isPgEnumSym] === true;
}
var PgEnumColumnBuilder = class extends PgColumnBuilder {
  static [entityKind] = "PgEnumColumnBuilder";
  constructor(name, enumInstance) {
    super(name, "string", "PgEnumColumn");
    this.config.enum = enumInstance;
  }
  /** @internal */
  build(table) {
    return new PgEnumColumn(
      table,
      this.config
    );
  }
};
var PgEnumColumn = class extends PgColumn {
  static [entityKind] = "PgEnumColumn";
  enum = this.config.enum;
  enumValues = this.config.enum.enumValues;
  constructor(table, config) {
    super(table, config);
    this.enum = config.enum;
  }
  getSQLType() {
    return this.enum.enumName;
  }
};

// node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/subquery.js
var Subquery = class {
  static [entityKind] = "Subquery";
  constructor(sql2, fields, alias, isWith = false, usedTables = []) {
    this._ = {
      brand: "Subquery",
      sql: sql2,
      selectedFields: fields,
      alias,
      isWith,
      usedTables
    };
  }
  // getSQL(): SQL<unknown> {
  // 	return new SQL([this]);
  // }
};
var WithSubquery = class extends Subquery {
  static [entityKind] = "WithSubquery";
};

// node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/version.js
var version = "0.45.2";

// node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/tracing.js
var otel;
var rawTracer;
var tracer = {
  startActiveSpan(name, fn) {
    if (!otel) {
      return fn();
    }
    if (!rawTracer) {
      rawTracer = otel.trace.getTracer("drizzle-orm", version);
    }
    return iife(
      (otel2, rawTracer2) => rawTracer2.startActiveSpan(
        name,
        (span) => {
          try {
            return fn(span);
          } catch (e) {
            span.setStatus({
              code: otel2.SpanStatusCode.ERROR,
              message: e instanceof Error ? e.message : "Unknown error"
              // eslint-disable-line no-instanceof/no-instanceof
            });
            throw e;
          } finally {
            span.end();
          }
        }
      ),
      otel,
      rawTracer
    );
  }
};

// node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/view-common.js
var ViewBaseConfig = Symbol.for("drizzle:ViewBaseConfig");

// node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/table.js
var Schema = Symbol.for("drizzle:Schema");
var Columns = Symbol.for("drizzle:Columns");
var ExtraConfigColumns = Symbol.for("drizzle:ExtraConfigColumns");
var OriginalName = Symbol.for("drizzle:OriginalName");
var BaseName = Symbol.for("drizzle:BaseName");
var IsAlias = Symbol.for("drizzle:IsAlias");
var ExtraConfigBuilder = Symbol.for("drizzle:ExtraConfigBuilder");
var IsDrizzleTable = Symbol.for("drizzle:IsDrizzleTable");
var Table = class {
  static [entityKind] = "Table";
  /** @internal */
  static Symbol = {
    Name: TableName,
    Schema,
    OriginalName,
    Columns,
    ExtraConfigColumns,
    BaseName,
    IsAlias,
    ExtraConfigBuilder
  };
  /**
   * @internal
   * Can be changed if the table is aliased.
   */
  [TableName];
  /**
   * @internal
   * Used to store the original name of the table, before any aliasing.
   */
  [OriginalName];
  /** @internal */
  [Schema];
  /** @internal */
  [Columns];
  /** @internal */
  [ExtraConfigColumns];
  /**
   *  @internal
   * Used to store the table name before the transformation via the `tableCreator` functions.
   */
  [BaseName];
  /** @internal */
  [IsAlias] = false;
  /** @internal */
  [IsDrizzleTable] = true;
  /** @internal */
  [ExtraConfigBuilder] = void 0;
  constructor(name, schema, baseName) {
    this[TableName] = this[OriginalName] = name;
    this[Schema] = schema;
    this[BaseName] = baseName;
  }
};

// node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/sql/sql.js
var FakePrimitiveParam = class {
  static [entityKind] = "FakePrimitiveParam";
};
function isSQLWrapper(value) {
  return value !== null && value !== void 0 && typeof value.getSQL === "function";
}
function mergeQueries(queries) {
  const result = { sql: "", params: [] };
  for (const query of queries) {
    result.sql += query.sql;
    result.params.push(...query.params);
    if (query.typings?.length) {
      if (!result.typings) {
        result.typings = [];
      }
      result.typings.push(...query.typings);
    }
  }
  return result;
}
var StringChunk = class {
  static [entityKind] = "StringChunk";
  value;
  constructor(value) {
    this.value = Array.isArray(value) ? value : [value];
  }
  getSQL() {
    return new SQL([this]);
  }
};
var SQL = class _SQL {
  constructor(queryChunks) {
    this.queryChunks = queryChunks;
    for (const chunk of queryChunks) {
      if (is(chunk, Table)) {
        const schemaName = chunk[Table.Symbol.Schema];
        this.usedTables.push(
          schemaName === void 0 ? chunk[Table.Symbol.Name] : schemaName + "." + chunk[Table.Symbol.Name]
        );
      }
    }
  }
  static [entityKind] = "SQL";
  /** @internal */
  decoder = noopDecoder;
  shouldInlineParams = false;
  /** @internal */
  usedTables = [];
  append(query) {
    this.queryChunks.push(...query.queryChunks);
    return this;
  }
  toQuery(config) {
    return tracer.startActiveSpan("drizzle.buildSQL", (span) => {
      const query = this.buildQueryFromSourceParams(this.queryChunks, config);
      span?.setAttributes({
        "drizzle.query.text": query.sql,
        "drizzle.query.params": JSON.stringify(query.params)
      });
      return query;
    });
  }
  buildQueryFromSourceParams(chunks, _config) {
    const config = Object.assign({}, _config, {
      inlineParams: _config.inlineParams || this.shouldInlineParams,
      paramStartIndex: _config.paramStartIndex || { value: 0 }
    });
    const {
      casing,
      escapeName,
      escapeParam,
      prepareTyping,
      inlineParams,
      paramStartIndex
    } = config;
    return mergeQueries(chunks.map((chunk) => {
      if (is(chunk, StringChunk)) {
        return { sql: chunk.value.join(""), params: [] };
      }
      if (is(chunk, Name)) {
        return { sql: escapeName(chunk.value), params: [] };
      }
      if (chunk === void 0) {
        return { sql: "", params: [] };
      }
      if (Array.isArray(chunk)) {
        const result = [new StringChunk("(")];
        for (const [i, p] of chunk.entries()) {
          result.push(p);
          if (i < chunk.length - 1) {
            result.push(new StringChunk(", "));
          }
        }
        result.push(new StringChunk(")"));
        return this.buildQueryFromSourceParams(result, config);
      }
      if (is(chunk, _SQL)) {
        return this.buildQueryFromSourceParams(chunk.queryChunks, {
          ...config,
          inlineParams: inlineParams || chunk.shouldInlineParams
        });
      }
      if (is(chunk, Table)) {
        const schemaName = chunk[Table.Symbol.Schema];
        const tableName = chunk[Table.Symbol.Name];
        return {
          sql: schemaName === void 0 || chunk[IsAlias] ? escapeName(tableName) : escapeName(schemaName) + "." + escapeName(tableName),
          params: []
        };
      }
      if (is(chunk, Column)) {
        const columnName = casing.getColumnCasing(chunk);
        if (_config.invokeSource === "indexes") {
          return { sql: escapeName(columnName), params: [] };
        }
        const schemaName = chunk.table[Table.Symbol.Schema];
        return {
          sql: chunk.table[IsAlias] || schemaName === void 0 ? escapeName(chunk.table[Table.Symbol.Name]) + "." + escapeName(columnName) : escapeName(schemaName) + "." + escapeName(chunk.table[Table.Symbol.Name]) + "." + escapeName(columnName),
          params: []
        };
      }
      if (is(chunk, View)) {
        const schemaName = chunk[ViewBaseConfig].schema;
        const viewName = chunk[ViewBaseConfig].name;
        return {
          sql: schemaName === void 0 || chunk[ViewBaseConfig].isAlias ? escapeName(viewName) : escapeName(schemaName) + "." + escapeName(viewName),
          params: []
        };
      }
      if (is(chunk, Param)) {
        if (is(chunk.value, Placeholder)) {
          return { sql: escapeParam(paramStartIndex.value++, chunk), params: [chunk], typings: ["none"] };
        }
        const mappedValue = chunk.value === null ? null : chunk.encoder.mapToDriverValue(chunk.value);
        if (is(mappedValue, _SQL)) {
          return this.buildQueryFromSourceParams([mappedValue], config);
        }
        if (inlineParams) {
          return { sql: this.mapInlineParam(mappedValue, config), params: [] };
        }
        let typings = ["none"];
        if (prepareTyping) {
          typings = [prepareTyping(chunk.encoder)];
        }
        return { sql: escapeParam(paramStartIndex.value++, mappedValue), params: [mappedValue], typings };
      }
      if (is(chunk, Placeholder)) {
        return { sql: escapeParam(paramStartIndex.value++, chunk), params: [chunk], typings: ["none"] };
      }
      if (is(chunk, _SQL.Aliased) && chunk.fieldAlias !== void 0) {
        return { sql: escapeName(chunk.fieldAlias), params: [] };
      }
      if (is(chunk, Subquery)) {
        if (chunk._.isWith) {
          return { sql: escapeName(chunk._.alias), params: [] };
        }
        return this.buildQueryFromSourceParams([
          new StringChunk("("),
          chunk._.sql,
          new StringChunk(") "),
          new Name(chunk._.alias)
        ], config);
      }
      if (isPgEnum(chunk)) {
        if (chunk.schema) {
          return { sql: escapeName(chunk.schema) + "." + escapeName(chunk.enumName), params: [] };
        }
        return { sql: escapeName(chunk.enumName), params: [] };
      }
      if (isSQLWrapper(chunk)) {
        if (chunk.shouldOmitSQLParens?.()) {
          return this.buildQueryFromSourceParams([chunk.getSQL()], config);
        }
        return this.buildQueryFromSourceParams([
          new StringChunk("("),
          chunk.getSQL(),
          new StringChunk(")")
        ], config);
      }
      if (inlineParams) {
        return { sql: this.mapInlineParam(chunk, config), params: [] };
      }
      return { sql: escapeParam(paramStartIndex.value++, chunk), params: [chunk], typings: ["none"] };
    }));
  }
  mapInlineParam(chunk, { escapeString }) {
    if (chunk === null) {
      return "null";
    }
    if (typeof chunk === "number" || typeof chunk === "boolean") {
      return chunk.toString();
    }
    if (typeof chunk === "string") {
      return escapeString(chunk);
    }
    if (typeof chunk === "object") {
      const mappedValueAsString = chunk.toString();
      if (mappedValueAsString === "[object Object]") {
        return escapeString(JSON.stringify(chunk));
      }
      return escapeString(mappedValueAsString);
    }
    throw new Error("Unexpected param value: " + chunk);
  }
  getSQL() {
    return this;
  }
  as(alias) {
    if (alias === void 0) {
      return this;
    }
    return new _SQL.Aliased(this, alias);
  }
  mapWith(decoder) {
    this.decoder = typeof decoder === "function" ? { mapFromDriverValue: decoder } : decoder;
    return this;
  }
  inlineParams() {
    this.shouldInlineParams = true;
    return this;
  }
  /**
   * This method is used to conditionally include a part of the query.
   *
   * @param condition - Condition to check
   * @returns itself if the condition is `true`, otherwise `undefined`
   */
  if(condition) {
    return condition ? this : void 0;
  }
};
var Name = class {
  constructor(value) {
    this.value = value;
  }
  static [entityKind] = "Name";
  brand;
  getSQL() {
    return new SQL([this]);
  }
};
function isDriverValueEncoder(value) {
  return typeof value === "object" && value !== null && "mapToDriverValue" in value && typeof value.mapToDriverValue === "function";
}
var noopDecoder = {
  mapFromDriverValue: (value) => value
};
var noopEncoder = {
  mapToDriverValue: (value) => value
};
var noopMapper = {
  ...noopDecoder,
  ...noopEncoder
};
var Param = class {
  /**
   * @param value - Parameter value
   * @param encoder - Encoder to convert the value to a driver parameter
   */
  constructor(value, encoder = noopEncoder) {
    this.value = value;
    this.encoder = encoder;
  }
  static [entityKind] = "Param";
  brand;
  getSQL() {
    return new SQL([this]);
  }
};
function sql(strings, ...params) {
  const queryChunks = [];
  if (params.length > 0 || strings.length > 0 && strings[0] !== "") {
    queryChunks.push(new StringChunk(strings[0]));
  }
  for (const [paramIndex, param2] of params.entries()) {
    queryChunks.push(param2, new StringChunk(strings[paramIndex + 1]));
  }
  return new SQL(queryChunks);
}
((sql2) => {
  function empty() {
    return new SQL([]);
  }
  sql2.empty = empty;
  function fromList(list) {
    return new SQL(list);
  }
  sql2.fromList = fromList;
  function raw(str) {
    return new SQL([new StringChunk(str)]);
  }
  sql2.raw = raw;
  function join3(chunks, separator) {
    const result = [];
    for (const [i, chunk] of chunks.entries()) {
      if (i > 0 && separator !== void 0) {
        result.push(separator);
      }
      result.push(chunk);
    }
    return new SQL(result);
  }
  sql2.join = join3;
  function identifier(value) {
    return new Name(value);
  }
  sql2.identifier = identifier;
  function placeholder2(name2) {
    return new Placeholder(name2);
  }
  sql2.placeholder = placeholder2;
  function param2(value, encoder) {
    return new Param(value, encoder);
  }
  sql2.param = param2;
})(sql || (sql = {}));
((SQL2) => {
  class Aliased {
    constructor(sql2, fieldAlias) {
      this.sql = sql2;
      this.fieldAlias = fieldAlias;
    }
    static [entityKind] = "SQL.Aliased";
    /** @internal */
    isSelectionField = false;
    getSQL() {
      return this.sql;
    }
    /** @internal */
    clone() {
      return new Aliased(this.sql, this.fieldAlias);
    }
  }
  SQL2.Aliased = Aliased;
})(SQL || (SQL = {}));
var Placeholder = class {
  constructor(name2) {
    this.name = name2;
  }
  static [entityKind] = "Placeholder";
  getSQL() {
    return new SQL([this]);
  }
};
var IsDrizzleView = Symbol.for("drizzle:IsDrizzleView");
var View = class {
  static [entityKind] = "View";
  /** @internal */
  [ViewBaseConfig];
  /** @internal */
  [IsDrizzleView] = true;
  constructor({ name: name2, schema, selectedFields, query }) {
    this[ViewBaseConfig] = {
      name: name2,
      originalName: name2,
      schema,
      selectedFields,
      query,
      isExisting: !query,
      isAlias: false
    };
  }
  getSQL() {
    return new SQL([this]);
  }
};
Column.prototype.getSQL = function() {
  return new SQL([this]);
};
Table.prototype.getSQL = function() {
  return new SQL([this]);
};
Subquery.prototype.getSQL = function() {
  return new SQL([this]);
};

// node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/utils.js
function getColumnNameAndConfig(a, b) {
  return {
    name: typeof a === "string" && a.length > 0 ? a : "",
    config: typeof a === "object" ? a : b
  };
}
var textDecoder = typeof TextDecoder === "undefined" ? null : new TextDecoder();

// node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/sql/expressions/conditions.js
function bindIfParam(value, column) {
  if (isDriverValueEncoder(column) && !isSQLWrapper(value) && !is(value, Param) && !is(value, Placeholder) && !is(value, Column) && !is(value, Table) && !is(value, View)) {
    return new Param(value, column);
  }
  return value;
}
var eq = (left, right) => {
  return sql`${left} = ${bindIfParam(right, left)}`;
};
function and(...unfilteredConditions) {
  const conditions = unfilteredConditions.filter(
    (c) => c !== void 0
  );
  if (conditions.length === 0) {
    return void 0;
  }
  if (conditions.length === 1) {
    return new SQL(conditions);
  }
  return new SQL([
    new StringChunk("("),
    sql.join(conditions, new StringChunk(" and ")),
    new StringChunk(")")
  ]);
}
function or(...unfilteredConditions) {
  const conditions = unfilteredConditions.filter(
    (c) => c !== void 0
  );
  if (conditions.length === 0) {
    return void 0;
  }
  if (conditions.length === 1) {
    return new SQL(conditions);
  }
  return new SQL([
    new StringChunk("("),
    sql.join(conditions, new StringChunk(" or ")),
    new StringChunk(")")
  ]);
}
function inArray(column, values) {
  if (Array.isArray(values)) {
    if (values.length === 0) {
      return sql`false`;
    }
    return sql`${column} in ${values.map((v) => bindIfParam(v, column))}`;
  }
  return sql`${column} in ${bindIfParam(values, column)}`;
}

// node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/sql/expressions/select.js
function asc(column) {
  return sql`${column} asc`;
}
function desc(column) {
  return sql`${column} desc`;
}

// node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/sqlite-core/foreign-keys.js
var ForeignKeyBuilder2 = class {
  static [entityKind] = "SQLiteForeignKeyBuilder";
  /** @internal */
  reference;
  /** @internal */
  _onUpdate;
  /** @internal */
  _onDelete;
  constructor(config, actions) {
    this.reference = () => {
      const { name, columns, foreignColumns } = config();
      return { name, columns, foreignTable: foreignColumns[0].table, foreignColumns };
    };
    if (actions) {
      this._onUpdate = actions.onUpdate;
      this._onDelete = actions.onDelete;
    }
  }
  onUpdate(action) {
    this._onUpdate = action;
    return this;
  }
  onDelete(action) {
    this._onDelete = action;
    return this;
  }
  /** @internal */
  build(table) {
    return new ForeignKey2(table, this);
  }
};
var ForeignKey2 = class {
  constructor(table, builder) {
    this.table = table;
    this.reference = builder.reference;
    this.onUpdate = builder._onUpdate;
    this.onDelete = builder._onDelete;
  }
  static [entityKind] = "SQLiteForeignKey";
  reference;
  onUpdate;
  onDelete;
  getName() {
    const { name, columns, foreignColumns } = this.reference();
    const columnNames = columns.map((column) => column.name);
    const foreignColumnNames = foreignColumns.map((column) => column.name);
    const chunks = [
      this.table[TableName],
      ...columnNames,
      foreignColumns[0].table[TableName],
      ...foreignColumnNames
    ];
    return name ?? `${chunks.join("_")}_fk`;
  }
};

// node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/sqlite-core/unique-constraint.js
function uniqueKeyName2(table, columns) {
  return `${table[TableName]}_${columns.join("_")}_unique`;
}
var UniqueConstraintBuilder2 = class {
  constructor(columns, name) {
    this.name = name;
    this.columns = columns;
  }
  static [entityKind] = "SQLiteUniqueConstraintBuilder";
  /** @internal */
  columns;
  /** @internal */
  build(table) {
    return new UniqueConstraint2(table, this.columns, this.name);
  }
};
var UniqueOnConstraintBuilder2 = class {
  static [entityKind] = "SQLiteUniqueOnConstraintBuilder";
  /** @internal */
  name;
  constructor(name) {
    this.name = name;
  }
  on(...columns) {
    return new UniqueConstraintBuilder2(columns, this.name);
  }
};
var UniqueConstraint2 = class {
  constructor(table, columns, name) {
    this.table = table;
    this.columns = columns;
    this.name = name ?? uniqueKeyName2(this.table, this.columns.map((column) => column.name));
  }
  static [entityKind] = "SQLiteUniqueConstraint";
  columns;
  name;
  getName() {
    return this.name;
  }
};

// node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/sqlite-core/columns/common.js
var SQLiteColumnBuilder = class extends ColumnBuilder {
  static [entityKind] = "SQLiteColumnBuilder";
  foreignKeyConfigs = [];
  references(ref, actions = {}) {
    this.foreignKeyConfigs.push({ ref, actions });
    return this;
  }
  unique(name) {
    this.config.isUnique = true;
    this.config.uniqueName = name;
    return this;
  }
  generatedAlwaysAs(as, config) {
    this.config.generated = {
      as,
      type: "always",
      mode: config?.mode ?? "virtual"
    };
    return this;
  }
  /** @internal */
  buildForeignKeys(column, table) {
    return this.foreignKeyConfigs.map(({ ref, actions }) => {
      return ((ref2, actions2) => {
        const builder = new ForeignKeyBuilder2(() => {
          const foreignColumn = ref2();
          return { columns: [column], foreignColumns: [foreignColumn] };
        });
        if (actions2.onUpdate) {
          builder.onUpdate(actions2.onUpdate);
        }
        if (actions2.onDelete) {
          builder.onDelete(actions2.onDelete);
        }
        return builder.build(table);
      })(ref, actions);
    });
  }
};
var SQLiteColumn = class extends Column {
  constructor(table, config) {
    if (!config.uniqueName) {
      config.uniqueName = uniqueKeyName2(table, [config.name]);
    }
    super(table, config);
    this.table = table;
  }
  static [entityKind] = "SQLiteColumn";
};

// node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/sqlite-core/columns/blob.js
var SQLiteBigIntBuilder = class extends SQLiteColumnBuilder {
  static [entityKind] = "SQLiteBigIntBuilder";
  constructor(name) {
    super(name, "bigint", "SQLiteBigInt");
  }
  /** @internal */
  build(table) {
    return new SQLiteBigInt(table, this.config);
  }
};
var SQLiteBigInt = class extends SQLiteColumn {
  static [entityKind] = "SQLiteBigInt";
  getSQLType() {
    return "blob";
  }
  mapFromDriverValue(value) {
    if (typeof Buffer !== "undefined" && Buffer.from) {
      const buf = Buffer.isBuffer(value) ? value : value instanceof ArrayBuffer ? Buffer.from(value) : value.buffer ? Buffer.from(value.buffer, value.byteOffset, value.byteLength) : Buffer.from(value);
      return BigInt(buf.toString("utf8"));
    }
    return BigInt(textDecoder.decode(value));
  }
  mapToDriverValue(value) {
    return Buffer.from(value.toString());
  }
};
var SQLiteBlobJsonBuilder = class extends SQLiteColumnBuilder {
  static [entityKind] = "SQLiteBlobJsonBuilder";
  constructor(name) {
    super(name, "json", "SQLiteBlobJson");
  }
  /** @internal */
  build(table) {
    return new SQLiteBlobJson(
      table,
      this.config
    );
  }
};
var SQLiteBlobJson = class extends SQLiteColumn {
  static [entityKind] = "SQLiteBlobJson";
  getSQLType() {
    return "blob";
  }
  mapFromDriverValue(value) {
    if (typeof Buffer !== "undefined" && Buffer.from) {
      const buf = Buffer.isBuffer(value) ? value : value instanceof ArrayBuffer ? Buffer.from(value) : value.buffer ? Buffer.from(value.buffer, value.byteOffset, value.byteLength) : Buffer.from(value);
      return JSON.parse(buf.toString("utf8"));
    }
    return JSON.parse(textDecoder.decode(value));
  }
  mapToDriverValue(value) {
    return Buffer.from(JSON.stringify(value));
  }
};
var SQLiteBlobBufferBuilder = class extends SQLiteColumnBuilder {
  static [entityKind] = "SQLiteBlobBufferBuilder";
  constructor(name) {
    super(name, "buffer", "SQLiteBlobBuffer");
  }
  /** @internal */
  build(table) {
    return new SQLiteBlobBuffer(table, this.config);
  }
};
var SQLiteBlobBuffer = class extends SQLiteColumn {
  static [entityKind] = "SQLiteBlobBuffer";
  mapFromDriverValue(value) {
    if (Buffer.isBuffer(value)) {
      return value;
    }
    return Buffer.from(value);
  }
  getSQLType() {
    return "blob";
  }
};
function blob(a, b) {
  const { name, config } = getColumnNameAndConfig(a, b);
  if (config?.mode === "json") {
    return new SQLiteBlobJsonBuilder(name);
  }
  if (config?.mode === "bigint") {
    return new SQLiteBigIntBuilder(name);
  }
  return new SQLiteBlobBufferBuilder(name);
}

// node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/sqlite-core/columns/custom.js
var SQLiteCustomColumnBuilder = class extends SQLiteColumnBuilder {
  static [entityKind] = "SQLiteCustomColumnBuilder";
  constructor(name, fieldConfig, customTypeParams) {
    super(name, "custom", "SQLiteCustomColumn");
    this.config.fieldConfig = fieldConfig;
    this.config.customTypeParams = customTypeParams;
  }
  /** @internal */
  build(table) {
    return new SQLiteCustomColumn(
      table,
      this.config
    );
  }
};
var SQLiteCustomColumn = class extends SQLiteColumn {
  static [entityKind] = "SQLiteCustomColumn";
  sqlName;
  mapTo;
  mapFrom;
  constructor(table, config) {
    super(table, config);
    this.sqlName = config.customTypeParams.dataType(config.fieldConfig);
    this.mapTo = config.customTypeParams.toDriver;
    this.mapFrom = config.customTypeParams.fromDriver;
  }
  getSQLType() {
    return this.sqlName;
  }
  mapFromDriverValue(value) {
    return typeof this.mapFrom === "function" ? this.mapFrom(value) : value;
  }
  mapToDriverValue(value) {
    return typeof this.mapTo === "function" ? this.mapTo(value) : value;
  }
};
function customType(customTypeParams) {
  return (a, b) => {
    const { name, config } = getColumnNameAndConfig(a, b);
    return new SQLiteCustomColumnBuilder(
      name,
      config,
      customTypeParams
    );
  };
}

// node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/sqlite-core/columns/integer.js
var SQLiteBaseIntegerBuilder = class extends SQLiteColumnBuilder {
  static [entityKind] = "SQLiteBaseIntegerBuilder";
  constructor(name, dataType, columnType) {
    super(name, dataType, columnType);
    this.config.autoIncrement = false;
  }
  primaryKey(config) {
    if (config?.autoIncrement) {
      this.config.autoIncrement = true;
    }
    this.config.hasDefault = true;
    return super.primaryKey();
  }
};
var SQLiteBaseInteger = class extends SQLiteColumn {
  static [entityKind] = "SQLiteBaseInteger";
  autoIncrement = this.config.autoIncrement;
  getSQLType() {
    return "integer";
  }
};
var SQLiteIntegerBuilder = class extends SQLiteBaseIntegerBuilder {
  static [entityKind] = "SQLiteIntegerBuilder";
  constructor(name) {
    super(name, "number", "SQLiteInteger");
  }
  build(table) {
    return new SQLiteInteger(
      table,
      this.config
    );
  }
};
var SQLiteInteger = class extends SQLiteBaseInteger {
  static [entityKind] = "SQLiteInteger";
};
var SQLiteTimestampBuilder = class extends SQLiteBaseIntegerBuilder {
  static [entityKind] = "SQLiteTimestampBuilder";
  constructor(name, mode) {
    super(name, "date", "SQLiteTimestamp");
    this.config.mode = mode;
  }
  /**
   * @deprecated Use `default()` with your own expression instead.
   *
   * Adds `DEFAULT (cast((julianday('now') - 2440587.5)*86400000 as integer))` to the column, which is the current epoch timestamp in milliseconds.
   */
  defaultNow() {
    return this.default(sql`(cast((julianday('now') - 2440587.5)*86400000 as integer))`);
  }
  build(table) {
    return new SQLiteTimestamp(
      table,
      this.config
    );
  }
};
var SQLiteTimestamp = class extends SQLiteBaseInteger {
  static [entityKind] = "SQLiteTimestamp";
  mode = this.config.mode;
  mapFromDriverValue(value) {
    if (this.config.mode === "timestamp") {
      return new Date(value * 1e3);
    }
    return new Date(value);
  }
  mapToDriverValue(value) {
    const unix = value.getTime();
    if (this.config.mode === "timestamp") {
      return Math.floor(unix / 1e3);
    }
    return unix;
  }
};
var SQLiteBooleanBuilder = class extends SQLiteBaseIntegerBuilder {
  static [entityKind] = "SQLiteBooleanBuilder";
  constructor(name, mode) {
    super(name, "boolean", "SQLiteBoolean");
    this.config.mode = mode;
  }
  build(table) {
    return new SQLiteBoolean(
      table,
      this.config
    );
  }
};
var SQLiteBoolean = class extends SQLiteBaseInteger {
  static [entityKind] = "SQLiteBoolean";
  mode = this.config.mode;
  mapFromDriverValue(value) {
    return Number(value) === 1;
  }
  mapToDriverValue(value) {
    return value ? 1 : 0;
  }
};
function integer(a, b) {
  const { name, config } = getColumnNameAndConfig(a, b);
  if (config?.mode === "timestamp" || config?.mode === "timestamp_ms") {
    return new SQLiteTimestampBuilder(name, config.mode);
  }
  if (config?.mode === "boolean") {
    return new SQLiteBooleanBuilder(name, config.mode);
  }
  return new SQLiteIntegerBuilder(name);
}

// node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/sqlite-core/columns/numeric.js
var SQLiteNumericBuilder = class extends SQLiteColumnBuilder {
  static [entityKind] = "SQLiteNumericBuilder";
  constructor(name) {
    super(name, "string", "SQLiteNumeric");
  }
  /** @internal */
  build(table) {
    return new SQLiteNumeric(
      table,
      this.config
    );
  }
};
var SQLiteNumeric = class extends SQLiteColumn {
  static [entityKind] = "SQLiteNumeric";
  mapFromDriverValue(value) {
    if (typeof value === "string") return value;
    return String(value);
  }
  getSQLType() {
    return "numeric";
  }
};
var SQLiteNumericNumberBuilder = class extends SQLiteColumnBuilder {
  static [entityKind] = "SQLiteNumericNumberBuilder";
  constructor(name) {
    super(name, "number", "SQLiteNumericNumber");
  }
  /** @internal */
  build(table) {
    return new SQLiteNumericNumber(
      table,
      this.config
    );
  }
};
var SQLiteNumericNumber = class extends SQLiteColumn {
  static [entityKind] = "SQLiteNumericNumber";
  mapFromDriverValue(value) {
    if (typeof value === "number") return value;
    return Number(value);
  }
  mapToDriverValue = String;
  getSQLType() {
    return "numeric";
  }
};
var SQLiteNumericBigIntBuilder = class extends SQLiteColumnBuilder {
  static [entityKind] = "SQLiteNumericBigIntBuilder";
  constructor(name) {
    super(name, "bigint", "SQLiteNumericBigInt");
  }
  /** @internal */
  build(table) {
    return new SQLiteNumericBigInt(
      table,
      this.config
    );
  }
};
var SQLiteNumericBigInt = class extends SQLiteColumn {
  static [entityKind] = "SQLiteNumericBigInt";
  mapFromDriverValue = BigInt;
  mapToDriverValue = String;
  getSQLType() {
    return "numeric";
  }
};
function numeric(a, b) {
  const { name, config } = getColumnNameAndConfig(a, b);
  const mode = config?.mode;
  return mode === "number" ? new SQLiteNumericNumberBuilder(name) : mode === "bigint" ? new SQLiteNumericBigIntBuilder(name) : new SQLiteNumericBuilder(name);
}

// node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/sqlite-core/columns/real.js
var SQLiteRealBuilder = class extends SQLiteColumnBuilder {
  static [entityKind] = "SQLiteRealBuilder";
  constructor(name) {
    super(name, "number", "SQLiteReal");
  }
  /** @internal */
  build(table) {
    return new SQLiteReal(table, this.config);
  }
};
var SQLiteReal = class extends SQLiteColumn {
  static [entityKind] = "SQLiteReal";
  getSQLType() {
    return "real";
  }
};
function real(name) {
  return new SQLiteRealBuilder(name ?? "");
}

// node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/sqlite-core/columns/text.js
var SQLiteTextBuilder = class extends SQLiteColumnBuilder {
  static [entityKind] = "SQLiteTextBuilder";
  constructor(name, config) {
    super(name, "string", "SQLiteText");
    this.config.enumValues = config.enum;
    this.config.length = config.length;
  }
  /** @internal */
  build(table) {
    return new SQLiteText(
      table,
      this.config
    );
  }
};
var SQLiteText = class extends SQLiteColumn {
  static [entityKind] = "SQLiteText";
  enumValues = this.config.enumValues;
  length = this.config.length;
  constructor(table, config) {
    super(table, config);
  }
  getSQLType() {
    return `text${this.config.length ? `(${this.config.length})` : ""}`;
  }
};
var SQLiteTextJsonBuilder = class extends SQLiteColumnBuilder {
  static [entityKind] = "SQLiteTextJsonBuilder";
  constructor(name) {
    super(name, "json", "SQLiteTextJson");
  }
  /** @internal */
  build(table) {
    return new SQLiteTextJson(
      table,
      this.config
    );
  }
};
var SQLiteTextJson = class extends SQLiteColumn {
  static [entityKind] = "SQLiteTextJson";
  getSQLType() {
    return "text";
  }
  mapFromDriverValue(value) {
    return JSON.parse(value);
  }
  mapToDriverValue(value) {
    return JSON.stringify(value);
  }
};
function text(a, b = {}) {
  const { name, config } = getColumnNameAndConfig(a, b);
  if (config.mode === "json") {
    return new SQLiteTextJsonBuilder(name);
  }
  return new SQLiteTextBuilder(name, config);
}

// node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/sqlite-core/columns/all.js
function getSQLiteColumnBuilders() {
  return {
    blob,
    customType,
    integer,
    numeric,
    real,
    text
  };
}

// node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/sqlite-core/table.js
var InlineForeignKeys = Symbol.for("drizzle:SQLiteInlineForeignKeys");
var SQLiteTable = class extends Table {
  static [entityKind] = "SQLiteTable";
  /** @internal */
  static Symbol = Object.assign({}, Table.Symbol, {
    InlineForeignKeys
  });
  /** @internal */
  [Table.Symbol.Columns];
  /** @internal */
  [InlineForeignKeys] = [];
  /** @internal */
  [Table.Symbol.ExtraConfigBuilder] = void 0;
};
function sqliteTableBase(name, columns, extraConfig, schema, baseName = name) {
  const rawTable = new SQLiteTable(name, schema, baseName);
  const parsedColumns = typeof columns === "function" ? columns(getSQLiteColumnBuilders()) : columns;
  const builtColumns = Object.fromEntries(
    Object.entries(parsedColumns).map(([name2, colBuilderBase]) => {
      const colBuilder = colBuilderBase;
      colBuilder.setName(name2);
      const column = colBuilder.build(rawTable);
      rawTable[InlineForeignKeys].push(...colBuilder.buildForeignKeys(column, rawTable));
      return [name2, column];
    })
  );
  const table = Object.assign(rawTable, builtColumns);
  table[Table.Symbol.Columns] = builtColumns;
  table[Table.Symbol.ExtraConfigColumns] = builtColumns;
  if (extraConfig) {
    table[SQLiteTable.Symbol.ExtraConfigBuilder] = extraConfig;
  }
  return table;
}
var sqliteTable = (name, columns, extraConfig) => {
  return sqliteTableBase(name, columns, extraConfig);
};

// node_modules/.pnpm/drizzle-orm@0.45.2_@types+better-sqlite3@7.6.13_better-sqlite3@12.5.0/node_modules/drizzle-orm/sqlite-core/indexes.js
var IndexBuilderOn = class {
  constructor(name, unique) {
    this.name = name;
    this.unique = unique;
  }
  static [entityKind] = "SQLiteIndexBuilderOn";
  on(...columns) {
    return new IndexBuilder(this.name, columns, this.unique);
  }
};
var IndexBuilder = class {
  static [entityKind] = "SQLiteIndexBuilder";
  /** @internal */
  config;
  constructor(name, columns, unique) {
    this.config = {
      name,
      columns,
      unique,
      where: void 0
    };
  }
  /**
   * Condition for partial index.
   */
  where(condition) {
    this.config.where = condition;
    return this;
  }
  /** @internal */
  build(table) {
    return new Index(this.config, table);
  }
};
var Index = class {
  static [entityKind] = "SQLiteIndex";
  config;
  constructor(config, table) {
    this.config = { ...config, table };
  }
};
function index(name) {
  return new IndexBuilderOn(name, false);
}
function uniqueIndex(name) {
  return new IndexBuilderOn(name, true);
}

// libs/shared/database/src/lib/schema.ts
var playlists = sqliteTable("playlists", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  serverUrl: text("serverUrl"),
  username: text("username"),
  password: text("password"),
  dateCreated: text("date_created").default(sql`CURRENT_TIMESTAMP`),
  lastUpdated: text("last_updated"),
  type: text("type", {
    enum: ["xtream", "stalker", "m3u-file", "m3u-text", "m3u-url"]
  }).notNull(),
  userAgent: text("userAgent"),
  origin: text("origin"),
  referrer: text("referrer"),
  filePath: text("filePath"),
  autoRefresh: integer("autoRefresh", { mode: "boolean" }).default(false),
  macAddress: text("macAddress"),
  url: text("url"),
  portalUrl: text("portal_url"),
  count: integer("count"),
  importDate: text("import_date"),
  updateDate: integer("update_date"),
  position: integer("position"),
  favorites: text("favorites"),
  recentlyViewed: text("recently_viewed"),
  payload: text("payload"),
  lastUsage: text("last_usage")
});
var appState = sqliteTable("app_state", {
  key: text("key").primaryKey(),
  value: text("value").notNull(),
  updatedAt: text("updated_at").default(sql`CURRENT_TIMESTAMP`)
});
var categories = sqliteTable(
  "categories",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    playlistId: text("playlist_id").notNull().references(() => playlists.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    type: text("type", { enum: ["live", "movies", "series"] }).notNull(),
    xtreamId: integer("xtream_id").notNull(),
    hidden: integer("hidden", { mode: "boolean" }).default(false)
  },
  (table) => ({
    playlistIdx: index("idx_categories_playlist").on(table.playlistId),
    typeIdx: index("idx_categories_type").on(table.type),
    playlistTypeXtreamUnique: uniqueIndex(
      "categories_playlist_type_xtream_unique"
    ).on(table.playlistId, table.type, table.xtreamId),
    // Partial covering index for visible categories — see connection.ts
    // for the full rationale. SQLite can satisfy joins + hidden filter
    // directly from this index for the dashboard / search queries.
    visibleIdx: index("idx_categories_visible").on(table.id, table.playlistId, table.type).where(sql`hidden = 0`)
  })
);
var content = sqliteTable(
  "content",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    categoryId: integer("category_id").notNull().references(() => categories.id, { onDelete: "cascade" }),
    title: text("title").notNull(),
    rating: text("rating"),
    added: text("added"),
    posterUrl: text("poster_url"),
    backdropUrl: text("backdrop_url"),
    epgChannelId: text("epg_channel_id"),
    tvArchive: integer("tv_archive"),
    tvArchiveDuration: integer("tv_archive_duration"),
    directSource: text("direct_source"),
    xtreamId: integer("xtream_id").notNull(),
    type: text("type", { enum: ["live", "movie", "series"] }).notNull()
  },
  (table) => ({
    typeIdx: index("idx_content_type").on(table.type),
    categoryIdx: index("idx_content_category").on(table.categoryId),
    titleIdx: index("idx_content_title").on(table.title),
    xtreamIdx: index("idx_content_xtream").on(table.xtreamId),
    categoryTypeXtreamUnique: uniqueIndex(
      "content_category_type_xtream_unique"
    ).on(table.categoryId, table.type, table.xtreamId),
    typeAddedIdx: index("idx_content_type_added").on(
      table.type,
      table.added
    )
  })
);
var recentlyViewed = sqliteTable(
  "recently_viewed",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    contentId: integer("content_id").notNull().references(() => content.id, { onDelete: "cascade" }),
    playlistId: text("playlist_id").notNull().references(() => playlists.id, { onDelete: "cascade" }),
    viewedAt: text("viewed_at").default(sql`CURRENT_TIMESTAMP`)
  },
  (table) => ({
    contentPlaylistUnique: uniqueIndex(
      "recently_viewed_content_playlist_unique"
    ).on(table.contentId, table.playlistId),
    playlistIdx: index("recently_viewed_playlist_idx").on(table.playlistId),
    viewedAtIdx: index("recently_viewed_viewed_at_idx").on(table.viewedAt),
    playlistViewedIdx: index("recently_viewed_playlist_viewed_idx").on(
      table.playlistId,
      sql`${table.viewedAt} DESC`
    )
  })
);
var favorites = sqliteTable(
  "favorites",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    contentId: integer("content_id").notNull().references(() => content.id, { onDelete: "cascade" }),
    playlistId: text("playlist_id").notNull().references(() => playlists.id, { onDelete: "cascade" }),
    addedAt: text("added_at").default(sql`CURRENT_TIMESTAMP`),
    /** Display order position in the global favorites list (lower = first) */
    position: integer("position").default(0)
  },
  (table) => ({
    contentPlaylistUnique: uniqueIndex(
      "favorites_content_playlist_unique"
    ).on(table.contentId, table.playlistId),
    playlistIdx: index("favorites_playlist_idx").on(table.playlistId),
    contentIdx: index("favorites_content_idx").on(table.contentId),
    playlistPositionIdx: index("favorites_playlist_position_idx").on(
      table.playlistId,
      table.position,
      sql`${table.addedAt} DESC`
    )
  })
);
var epgChannels = sqliteTable(
  "epg_channels",
  {
    id: text("id").primaryKey(),
    // Channel ID from EPG source
    displayName: text("display_name").notNull(),
    iconUrl: text("icon_url"),
    url: text("url"),
    sourceUrl: text("source_url").notNull(),
    // Which EPG URL this came from
    updatedAt: text("updated_at").default(sql`CURRENT_TIMESTAMP`)
  },
  (table) => ({
    sourceIdx: index("idx_epg_channels_source").on(table.sourceUrl),
    nameIdx: index("idx_epg_channels_name").on(table.displayName)
  })
);
var epgPrograms = sqliteTable(
  "epg_programs",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    channelId: text("channel_id").notNull().references(() => epgChannels.id, { onDelete: "cascade" }),
    start: text("start").notNull(),
    // ISO datetime
    stop: text("stop").notNull(),
    // ISO datetime
    title: text("title").notNull(),
    description: text("description"),
    category: text("category"),
    iconUrl: text("icon_url"),
    rating: text("rating"),
    episodeNum: text("episode_num")
  },
  (table) => ({
    channelIdx: index("idx_epg_programs_channel").on(table.channelId),
    startIdx: index("idx_epg_programs_start").on(table.start),
    stopIdx: index("idx_epg_programs_stop").on(table.stop),
    timeRangeIdx: index("idx_epg_programs_time_range").on(
      table.channelId,
      table.start,
      table.stop
    )
  })
);
var playbackPositions = sqliteTable(
  "playback_positions",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    playlistId: text("playlist_id").notNull().references(() => playlists.id, { onDelete: "cascade" }),
    // For VOD: store xtream_id of the movie
    // For Series: store episode ID (from XtreamSerieEpisode.id)
    contentXtreamId: integer("content_xtream_id").notNull(),
    // 'vod' | 'episode'
    contentType: text("content_type", {
      enum: ["vod", "episode"]
    }).notNull(),
    // For episodes: store series xtream_id for grouping
    seriesXtreamId: integer("series_xtream_id"),
    // For episodes: store season and episode numbers for display
    seasonNumber: integer("season_number"),
    episodeNumber: integer("episode_number"),
    // Playback position in seconds
    positionSeconds: integer("position_seconds").notNull().default(0),
    // Total duration in seconds (for percentage calculation)
    durationSeconds: integer("duration_seconds"),
    // Last updated timestamp
    updatedAt: text("updated_at").default(sql`CURRENT_TIMESTAMP`)
  },
  (table) => ({
    // Unique constraint: one position per content per playlist
    contentPlaylistUnique: uniqueIndex(
      "playback_positions_content_playlist_unique"
    ).on(table.contentXtreamId, table.playlistId, table.contentType),
    playlistIdx: index("playback_positions_playlist_idx").on(
      table.playlistId
    ),
    seriesIdx: index("playback_positions_series_idx").on(
      table.seriesXtreamId
    ),
    updatedIdx: index("playback_positions_updated_idx").on(table.updatedAt),
    playlistUpdatedIdx: index(
      "playback_positions_playlist_updated_idx"
    ).on(table.playlistId, sql`${table.updatedAt} DESC`)
  })
);
var downloads = sqliteTable(
  "downloads",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    playlistId: text("playlist_id").notNull().references(() => playlists.id, { onDelete: "cascade" }),
    // Content identifiers
    xtreamId: integer("xtream_id").notNull(),
    contentType: text("content_type", {
      enum: ["vod", "episode"]
    }).notNull(),
    // For episodes: store series info
    seriesXtreamId: integer("series_xtream_id"),
    seasonNumber: integer("season_number"),
    episodeNumber: integer("episode_number"),
    // Download metadata
    title: text("title").notNull(),
    url: text("url").notNull(),
    fileName: text("file_name"),
    filePath: text("file_path"),
    posterUrl: text("poster_url"),
    // Download progress
    status: text("status", {
      enum: ["queued", "downloading", "completed", "failed", "canceled"]
    }).notNull().default("queued"),
    bytesDownloaded: integer("bytes_downloaded").default(0),
    totalBytes: integer("total_bytes"),
    errorMessage: text("error_message"),
    // Timestamps
    createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
    updatedAt: text("updated_at").default(sql`CURRENT_TIMESTAMP`)
  },
  (table) => ({
    playlistIdx: index("downloads_playlist_idx").on(table.playlistId),
    statusIdx: index("downloads_status_idx").on(table.status),
    xtreamPlaylistUnique: uniqueIndex(
      "downloads_xtream_playlist_unique"
    ).on(table.xtreamId, table.playlistId, table.contentType)
  })
);

// libs/shared/database/src/lib/path-utils.ts
var import_fs = require("fs");
var import_os = require("os");
var import_path = require("path");
var IPTVNATOR_E2E_DATA_DIR_ENV = "IPTVNATOR_E2E_DATA_DIR";
function ensureDirectory(dirPath) {
  if (!(0, import_fs.existsSync)(dirPath)) {
    (0, import_fs.mkdirSync)(dirPath, { recursive: true });
  }
  return dirPath;
}
function getIptvnatorDataRoot() {
  const e2eDataDir = process.env[IPTVNATOR_E2E_DATA_DIR_ENV]?.trim();
  if (e2eDataDir) {
    return ensureDirectory(e2eDataDir);
  }
  return ensureDirectory((0, import_path.join)((0, import_os.homedir)(), ".iptvnator"));
}
function getIptvnatorDatabaseDirectory() {
  return ensureDirectory((0, import_path.join)(getIptvnatorDataRoot(), "databases"));
}
function getIptvnatorDatabasePath() {
  return (0, import_path.join)(getIptvnatorDatabaseDirectory(), "iptvnator.db");
}

// apps/electron-backend/src/app/workers/database.worker-connection.ts
var import_worker_threads = require("worker_threads");

// apps/electron-backend/src/app/workers/worker-runtime-paths.ts
var import_fs2 = require("fs");
var import_module = require("module");
var path = __toESM(require("path"));
var NATIVE_MODULE_RELATIVE_PATHS = [
  ["app.asar.unpacked", "node_modules"],
  ["app.asar.unpacked", "electron-backend", "node_modules"],
  ["app.asar.unpacked", "dist", "apps", "electron-backend", "node_modules"]
];
function dedupePaths(paths) {
  return [...new Set(paths.filter((value) => Boolean(value)))];
}
function registerNativeModuleSearchPaths(searchPaths, options) {
  const env = options?.env ?? process.env;
  const moduleApi = options?.moduleApi ?? require("module");
  const mergedPaths = dedupePaths([
    ...searchPaths,
    ...env.NODE_PATH?.split(path.delimiter) ?? [],
    ...moduleApi.globalPaths
  ]);
  if (mergedPaths.length === 0) {
    return [];
  }
  env.NODE_PATH = mergedPaths.join(path.delimiter);
  if (typeof moduleApi._initPaths === "function") {
    moduleApi._initPaths();
  } else {
    moduleApi.globalPaths.splice(0, moduleApi.globalPaths.length, ...mergedPaths);
  }
  for (let index2 = mergedPaths.length - 1; index2 >= 0; index2 -= 1) {
    const currentPath = mergedPaths[index2];
    if (!moduleApi.globalPaths.includes(currentPath)) {
      moduleApi.globalPaths.unshift(currentPath);
    }
  }
  return mergedPaths;
}
function getPackagedResourceRoots(options) {
  return dedupePaths([
    options.resourcesPath,
    options.appPath ? path.dirname(options.appPath) : void 0
  ]);
}
function getNativeModuleSearchPaths(options) {
  return dedupePaths(
    getPackagedResourceRoots(options).flatMap(
      (root) => NATIVE_MODULE_RELATIVE_PATHS.map(
        (segments) => path.join(root, ...segments)
      )
    )
  );
}
function getWorkerDataNativeModuleSearchPaths(value) {
  if (!value || typeof value !== "object") {
    return [];
  }
  if (!("nativeModuleSearchPaths" in value)) {
    return [];
  }
  const searchPaths = value.nativeModuleSearchPaths;
  if (!Array.isArray(searchPaths)) {
    return [];
  }
  return dedupePaths(
    searchPaths.filter(
      (searchPath) => typeof searchPath === "string"
    )
  );
}
function loadNativeModuleFromSearchPaths(options) {
  const fileExists = options.fileExists ?? import_fs2.existsSync;
  const requireFactory = options.requireFactory ?? import_module.createRequire;
  const attemptedPaths = [];
  const failedPaths = [];
  for (const searchPath of dedupePaths(options.searchPaths)) {
    attemptedPaths.push(searchPath);
    if (!fileExists(searchPath)) {
      failedPaths.push(`${searchPath} (missing)`);
      continue;
    }
    try {
      const nativeRequire = requireFactory(
        path.join(searchPath, "index.js")
      );
      return nativeRequire(options.moduleName);
    } catch (error2) {
      const message = error2 instanceof Error ? error2.message : String(error2);
      failedPaths.push(`${searchPath} (${message})`);
    }
  }
  if (options.fallbackRequire) {
    try {
      return options.fallbackRequire();
    } catch (error2) {
      const message = error2 instanceof Error ? error2.message : String(error2);
      failedPaths.push(`require(${options.moduleName}) (${message})`);
    }
  }
  const error = new Error(
    [
      `${options.loggerLabel} Unable to load native module "${options.moduleName}".`,
      "Tried:",
      ...attemptedPaths.map((searchPath) => `- ${searchPath}`),
      ...failedPaths.length > 0 ? ["Failures:", ...failedPaths.map((failure) => `- ${failure}`)] : []
    ].join("\n")
  );
  error.name = "NativeModuleResolutionError";
  throw error;
}

// apps/electron-backend/src/app/services/debug-trace.ts
var TRACE_ENV_TRUE_VALUES = /* @__PURE__ */ new Set(["1", "true", "yes", "on"]);
var TRACE_PREFIX = "[IPTVnator Trace]";
var MAX_TRACE_ARRAY_ITEMS = 5;
var MAX_TRACE_OBJECT_KEYS = 8;
var MAX_TRACE_STRING_LENGTH = 180;
var MAX_TRACE_DEPTH = 2;
function readFlag(name) {
  const value = process.env[name]?.trim().toLowerCase();
  return value ? TRACE_ENV_TRUE_VALUES.has(value) : false;
}
function truncateString(value) {
  if (value.length <= MAX_TRACE_STRING_LENGTH) {
    return value;
  }
  return `${value.slice(0, MAX_TRACE_STRING_LENGTH - 3)}...`;
}
function summarizeObject(value, depth) {
  const entries = Object.entries(value);
  const summary = {};
  if (value.constructor?.name && value.constructor.name !== "Object") {
    summary.__type = value.constructor.name;
  }
  entries.slice(0, MAX_TRACE_OBJECT_KEYS).forEach(([key, entryValue]) => {
    summary[key] = summarizeForTrace(entryValue, depth + 1);
  });
  if (entries.length > MAX_TRACE_OBJECT_KEYS) {
    summary.__moreKeys = entries.length - MAX_TRACE_OBJECT_KEYS;
  }
  return summary;
}
function isStartupTraceEnabled() {
  return readFlag("IPTVNATOR_TRACE_STARTUP");
}
function isSqlTraceEnabled() {
  return isStartupTraceEnabled() || readFlag("IPTVNATOR_TRACE_DB") || readFlag("IPTVNATOR_TRACE_SQL");
}
function compactSqlForTrace(sql2) {
  return truncateString(sql2.replace(/\s+/g, " ").trim());
}
function summarizeForTrace(value, depth = 0) {
  if (value == null || typeof value === "boolean" || typeof value === "number") {
    return value;
  }
  if (typeof value === "string") {
    return truncateString(value);
  }
  if (typeof value === "bigint") {
    return value.toString();
  }
  if (typeof value === "function") {
    return "[Function]";
  }
  if (value instanceof Error) {
    return {
      name: value.name,
      message: truncateString(value.message)
    };
  }
  if (depth >= MAX_TRACE_DEPTH) {
    if (Array.isArray(value)) {
      return {
        type: "array",
        length: value.length
      };
    }
    return typeof value === "object" ? {
      type: value.constructor?.name ?? "object"
    } : String(value);
  }
  if (Array.isArray(value)) {
    return {
      type: "array",
      length: value.length,
      items: value.slice(0, MAX_TRACE_ARRAY_ITEMS).map((entry) => summarizeForTrace(entry, depth + 1))
    };
  }
  if (typeof value === "object") {
    return summarizeObject(value, depth);
  }
  return String(value);
}
function safeStringifyForTrace(payload) {
  try {
    return JSON.stringify(payload);
  } catch (error) {
    return JSON.stringify({
      fallback: summarizeForTrace(payload),
      stringifyError: error instanceof Error ? truncateString(error.message) : String(error)
    });
  }
}
function trace(scope, message, payload) {
  if (payload === void 0) {
    console.log(`${TRACE_PREFIX}[${scope}] ${message}`);
    return;
  }
  console.log(
    `${TRACE_PREFIX}[${scope}] ${message} ${safeStringifyForTrace(
      summarizeForTrace(payload)
    )}`
  );
}

// apps/electron-backend/src/app/workers/database.worker-connection.ts
var Database;
var drizzleFactory;
var nativeModuleSearchPaths = [
  ...getWorkerDataNativeModuleSearchPaths(import_worker_threads.workerData),
  ...getNativeModuleSearchPaths({
    resourcesPath: process.resourcesPath
  })
];
registerNativeModuleSearchPaths(nativeModuleSearchPaths);
function loadBetterSqlite3() {
  return loadNativeModuleFromSearchPaths({
    moduleName: "better-sqlite3",
    loggerLabel: "[DB Worker]",
    searchPaths: nativeModuleSearchPaths,
    fallbackRequire: () => (
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      require("better-sqlite3")
    )
  });
}
function getDrizzleFactory() {
  if (drizzleFactory) {
    return drizzleFactory;
  }
  drizzleFactory = require_better_sqlite3().drizzle;
  return drizzleFactory;
}
Database = loadBetterSqlite3();
var db = null;
var sqlite = null;
async function getWorkerDatabase() {
  if (db) {
    return db;
  }
  const filePath = getIptvnatorDatabasePath();
  sqlite = new Database(filePath, {
    verbose: isSqlTraceEnabled() ? (sql2) => {
      trace("sql-worker", "query", {
        sql: compactSqlForTrace(sql2)
      });
    } : void 0
  });
  sqlite.pragma("foreign_keys = ON");
  sqlite.pragma("journal_mode = WAL");
  sqlite.pragma("busy_timeout = 5000");
  sqlite.pragma("synchronous = NORMAL");
  sqlite.pragma("cache_size = -64000");
  sqlite.pragma("temp_store = MEMORY");
  sqlite.pragma("mmap_size = 268435456");
  if (isSqlTraceEnabled()) {
    trace("sql-worker", "open", {
      filePath
    });
  }
  db = getDrizzleFactory()(sqlite, { schema: schema_exports });
  return db;
}
function closeWorkerDatabase() {
  if (!sqlite) {
    return;
  }
  try {
    sqlite.pragma("optimize");
  } catch {
  }
  sqlite.close();
  if (isSqlTraceEnabled()) {
    trace("sql-worker", "close");
  }
  sqlite = null;
  db = null;
}

// apps/electron-backend/src/app/workers/database.worker.ts
var import_worker_threads2 = require("worker_threads");

// apps/electron-backend/src/app/workers/database-worker.types.ts
var DB_OPERATION_NAMES = {
  SAVE_CONTENT: "save-content",
  DELETE_XTREAM_CONTENT: "delete-xtream-content",
  RESTORE_XTREAM_USER_DATA: "restore-xtream-user-data",
  DELETE_PLAYLIST: "delete-playlist",
  DELETE_ALL_PLAYLISTS: "delete-all-playlists"
};
var DB_OPERATION_PHASES = {
  PREPARING_CONTENT: "preparing-content",
  SAVING_CONTENT: "saving-content",
  COLLECTING_USER_DATA: "collecting-user-data",
  DELETING_FAVORITES: "deleting-favorites",
  DELETING_RECENTLY_VIEWED: "deleting-recently-viewed",
  DELETING_PLAYBACK_POSITIONS: "deleting-playback-positions",
  DELETING_DOWNLOADS: "deleting-downloads",
  DELETING_CONTENT: "deleting-content",
  DELETING_CATEGORIES: "deleting-categories",
  DELETING_PLAYLIST: "deleting-playlist",
  DELETING_PLAYLISTS: "deleting-playlists",
  RESTORING_FAVORITES: "restoring-favorites",
  RESTORING_RECENTLY_VIEWED: "restoring-recently-viewed"
};

// apps/electron-backend/src/app/database/operations/category.operations.ts
function normalizeXtreamCategoryId(rawCategoryId) {
  const xtreamId = Number.parseInt(String(rawCategoryId), 10);
  return Number.isNaN(xtreamId) ? null : xtreamId;
}
async function hasCategories(db2, playlistId, type) {
  const result = await db2.select({ count: sql`count(*)` }).from(categories).where(
    and(
      eq(categories.playlistId, playlistId),
      eq(categories.type, type)
    )
  );
  return result[0].count > 0;
}
async function getCategories(db2, playlistId, type) {
  return db2.select().from(categories).where(
    and(
      eq(categories.playlistId, playlistId),
      eq(categories.type, type),
      eq(categories.hidden, false)
    )
  ).orderBy(sql`name COLLATE NOCASE`);
}
async function saveCategories(db2, playlistId, categories2, type, hiddenCategoryXtreamIds) {
  if (!categories2 || categories2.length === 0) {
    return { success: true };
  }
  const existingCategories = await db2.select({ count: sql`count(*)` }).from(categories).where(
    and(
      eq(categories.playlistId, playlistId),
      eq(categories.type, type)
    )
  );
  if ((existingCategories[0]?.count ?? 0) > 0) {
    return { success: true };
  }
  const hiddenSet = new Set(hiddenCategoryXtreamIds || []);
  const values = categories2.flatMap((category) => {
    const xtreamId = normalizeXtreamCategoryId(category.category_id);
    if (xtreamId === null) {
      return [];
    }
    return [
      {
        playlistId,
        name: category.category_name,
        type,
        xtreamId,
        hidden: hiddenSet.has(xtreamId)
      }
    ];
  });
  if (values.length === 0) {
    return { success: true };
  }
  await db2.insert(categories).values(values).onConflictDoNothing({
    target: [
      categories.playlistId,
      categories.type,
      categories.xtreamId
    ]
  });
  return { success: true };
}
async function getAllCategories(db2, playlistId, type) {
  return db2.select().from(categories).where(
    and(
      eq(categories.playlistId, playlistId),
      eq(categories.type, type)
    )
  ).orderBy(sql`name COLLATE NOCASE`);
}
async function updateCategoryVisibility(db2, categoryIds, hidden) {
  if (categoryIds.length === 0) {
    return { success: true };
  }
  await db2.update(categories).set({ hidden }).where(inArray(categories.id, categoryIds));
  return { success: true };
}

// apps/electron-backend/src/app/database/operations/operation-control.ts
async function checkpointOperation(control) {
  await control?.checkpoint?.();
}
async function reportOperationProgress(control, progress) {
  await control?.onProgress?.(progress);
  await checkpointOperation(control);
}
function chunkValues(values, chunkSize) {
  const chunks = [];
  for (let index2 = 0; index2 < values.length; index2 += chunkSize) {
    chunks.push(values.slice(index2, index2 + chunkSize));
  }
  return chunks;
}

// apps/electron-backend/src/app/database/operations/content-backdrop.operations.ts
async function persistContentBackdropIfMissing(db2, contentId, backdropUrl) {
  const normalizedBackdropUrl = backdropUrl?.trim();
  if (!normalizedBackdropUrl) {
    return;
  }
  await db2.update(content).set({ backdropUrl: normalizedBackdropUrl }).where(
    and(
      eq(content.id, contentId),
      sql`(${content.backdropUrl} IS NULL OR ${content.backdropUrl} = '')`
    )
  );
}
async function setContentBackdropIfMissing(db2, contentId, backdropUrl) {
  await persistContentBackdropIfMissing(db2, contentId, backdropUrl);
  return { success: true };
}

// apps/electron-backend/src/app/database/operations/favorites.operations.ts
var DEFAULT_BATCH_SIZE = 100;
async function addFavorite(db2, contentId, playlistId, options) {
  await db2.insert(favorites).values({
    contentId,
    playlistId
  });
  await persistContentBackdropIfMissing(db2, contentId, options?.backdropUrl);
  return { success: true };
}
async function removeFavorite(db2, contentId, playlistId) {
  await db2.delete(favorites).where(
    and(
      eq(favorites.contentId, contentId),
      eq(favorites.playlistId, playlistId)
    )
  );
  return { success: true };
}
async function isFavorite(db2, contentId, playlistId) {
  const result = await db2.select({ count: sql`count(*)` }).from(favorites).where(
    and(
      eq(favorites.contentId, contentId),
      eq(favorites.playlistId, playlistId)
    )
  );
  return result[0].count > 0;
}
async function getFavorites(db2, playlistId) {
  return db2.select({
    id: content.id,
    category_id: content.categoryId,
    title: content.title,
    rating: content.rating,
    added: content.added,
    poster_url: content.posterUrl,
    xtream_id: content.xtreamId,
    type: content.type,
    added_at: favorites.addedAt,
    position: favorites.position
  }).from(favorites).innerJoin(
    content,
    eq(favorites.contentId, content.id)
  ).where(eq(favorites.playlistId, playlistId)).orderBy(
    asc(favorites.position),
    desc(favorites.addedAt)
  );
}
async function getGlobalFavorites(db2) {
  return db2.select({
    id: content.id,
    category_id: content.categoryId,
    title: content.title,
    rating: content.rating,
    added: content.added,
    poster_url: content.posterUrl,
    xtream_id: content.xtreamId,
    type: content.type,
    playlist_id: playlists.id,
    playlist_name: playlists.name,
    added_at: favorites.addedAt,
    position: favorites.position
  }).from(favorites).innerJoin(
    content,
    eq(favorites.contentId, content.id)
  ).innerJoin(
    categories,
    eq(content.categoryId, categories.id)
  ).innerJoin(
    playlists,
    eq(categories.playlistId, playlists.id)
  ).where(eq(content.type, "live")).orderBy(asc(favorites.position), desc(favorites.addedAt)).limit(300);
}
async function getAllGlobalFavorites(db2) {
  return db2.select({
    id: content.id,
    category_id: content.categoryId,
    title: content.title,
    rating: content.rating,
    added: content.added,
    poster_url: content.posterUrl,
    backdrop_url: content.backdropUrl,
    xtream_id: content.xtreamId,
    type: content.type,
    playlist_id: playlists.id,
    playlist_name: playlists.name,
    added_at: favorites.addedAt,
    position: favorites.position
  }).from(favorites).innerJoin(
    content,
    eq(favorites.contentId, content.id)
  ).innerJoin(
    categories,
    eq(content.categoryId, categories.id)
  ).innerJoin(
    playlists,
    eq(categories.playlistId, playlists.id)
  ).orderBy(asc(favorites.position), desc(favorites.addedAt)).limit(500);
}
async function reorderGlobalFavorites(db2, updates, control) {
  if (!Array.isArray(updates) || updates.length === 0) {
    return { success: true };
  }
  let current = 0;
  const total = updates.length;
  const updateFavoritePosition = db2.update(favorites).set({ position: sql`${sql.placeholder("position")}` }).where(eq(favorites.contentId, sql.placeholder("contentId"))).prepare();
  for (const chunk of chunkValues(updates, DEFAULT_BATCH_SIZE)) {
    await checkpointOperation(control);
    await db2.transaction(() => {
      for (const { content_id, position } of chunk) {
        updateFavoritePosition.execute({
          position,
          contentId: content_id
        });
      }
    });
    current += chunk.length;
    await reportOperationProgress(control, {
      phase: "reordering-global-favorites",
      current,
      total,
      increment: chunk.length
    });
  }
  return { success: true };
}

// apps/electron-backend/src/app/database/operations/content.operations.ts
function escapeLikePattern(term) {
  return term.replace(/[%_\\]/g, "\\$&");
}
function buildLikePatterns(term) {
  const variants = /* @__PURE__ */ new Set();
  const titleCase = term.length > 0 ? term.charAt(0).toLocaleUpperCase() + term.slice(1).toLocaleLowerCase() : term;
  variants.add(term);
  variants.add(term.toLocaleLowerCase());
  variants.add(term.toLocaleUpperCase());
  variants.add(titleCase);
  return [...variants].map((value) => `%${escapeLikePattern(value)}%`);
}
function getRecentlyAddedContentTypes(kind) {
  if (kind === "vod") {
    return ["movie"];
  }
  if (kind === "series") {
    return ["series"];
  }
  return ["movie", "series"];
}
function selectContentFields() {
  return {
    id: content.id,
    category_id: content.categoryId,
    title: content.title,
    rating: content.rating,
    added: content.added,
    poster_url: content.posterUrl,
    epg_channel_id: content.epgChannelId,
    tv_archive: content.tvArchive,
    tv_archive_duration: content.tvArchiveDuration,
    direct_source: content.directSource,
    xtream_id: content.xtreamId,
    type: content.type
  };
}
async function hasContent(db2, playlistId, type) {
  const result = await db2.select({ count: sql`count(*)` }).from(content).innerJoin(
    categories,
    eq(content.categoryId, categories.id)
  ).where(
    and(
      eq(categories.playlistId, playlistId),
      eq(content.type, type)
    )
  );
  return result[0].count > 0;
}
async function getContent(db2, playlistId, type) {
  const baseQuery = db2.select(selectContentFields()).from(content).innerJoin(
    categories,
    eq(content.categoryId, categories.id)
  ).where(
    and(
      eq(categories.playlistId, playlistId),
      eq(content.type, type)
    )
  );
  return type === "live" ? baseQuery.orderBy(asc(content.id)) : baseQuery.orderBy(desc(content.added));
}
async function getGlobalRecentlyAdded(db2, kind = "all", limit = 200, playlistType) {
  const contentTypes = getRecentlyAddedContentTypes(kind);
  const normalizedLimit = Number.isFinite(limit) ? Math.min(Math.max(Math.trunc(limit), 1), 200) : 200;
  const whereConditions = [
    inArray(content.type, contentTypes),
    eq(categories.hidden, false),
    sql`${content.added} <> ''`
  ];
  if (playlistType) {
    whereConditions.push(eq(playlists.type, playlistType));
  }
  return db2.select({
    ...selectContentFields(),
    added_at: content.added,
    playlist_id: playlists.id,
    playlist_name: playlists.name
  }).from(content).innerJoin(
    categories,
    eq(content.categoryId, categories.id)
  ).innerJoin(
    playlists,
    eq(categories.playlistId, playlists.id)
  ).where(and(...whereConditions)).orderBy(desc(content.added)).limit(normalizedLimit);
}
function toXtreamContentValue(stream, type, categoryMap) {
  const source = stream;
  const streamCategoryId = type === "series" ? parseInt(String(source.category_id || "0")) : parseInt(String(source.category_id));
  const categoryId = categoryMap.get(streamCategoryId);
  if (!categoryId) {
    return null;
  }
  const title = type === "series" ? source.title || source.name || `Unknown Series ${source.series_id ?? ""}`.trim() : source.name || source.title || `Unknown Stream ${source.stream_id ?? ""}`.trim();
  return {
    categoryId,
    title,
    rating: String(source.rating || source.rating_imdb || ""),
    added: type === "series" ? String(source.last_modified || "") : String(source.added || ""),
    posterUrl: String(
      source.stream_icon || source.poster || source.cover || ""
    ),
    epgChannelId: type === "live" ? String(source.epg_channel_id ?? "").trim() || null : null,
    tvArchive: type === "live" ? Number.parseInt(String(source.tv_archive ?? "0"), 10) || 0 : null,
    tvArchiveDuration: type === "live" ? Number.parseInt(
      String(source.tv_archive_duration ?? "0"),
      10
    ) || 0 : null,
    directSource: type === "live" ? String(source.direct_source ?? "").trim() || null : null,
    xtreamId: type === "series" ? parseInt(String(source.series_id || "0")) : parseInt(String(source.stream_id || "0")),
    type
  };
}
async function saveContent(db2, playlistId, streams, type, control) {
  const dbType = type === "series" ? "series" : type === "movie" ? "movies" : "live";
  const existingContent = await db2.select({ count: sql`count(*)` }).from(content).innerJoin(
    categories,
    eq(content.categoryId, categories.id)
  ).where(
    and(
      eq(categories.playlistId, playlistId),
      eq(categories.type, dbType),
      eq(content.type, type)
    )
  );
  if ((existingContent[0]?.count ?? 0) > 0) {
    return { success: true, count: existingContent[0].count };
  }
  const categories2 = await db2.select({
    id: categories.id,
    xtreamId: categories.xtreamId
  }).from(categories).where(
    and(
      eq(categories.playlistId, playlistId),
      eq(categories.type, dbType)
    )
  );
  const categoryMap = new Map(categories2.map((category) => [
    category.xtreamId,
    category.id
  ]));
  const values = streams.map((stream) => toXtreamContentValue(stream, type, categoryMap)).filter((value) => value !== null);
  const total = values.length;
  const chunkSize = 100;
  let totalInserted = 0;
  for (let index2 = 0; index2 < values.length; index2 += chunkSize) {
    await checkpointOperation(control);
    const chunk = values.slice(index2, index2 + chunkSize);
    await db2.transaction((tx) => {
      tx.insert(content).values(chunk).onConflictDoNothing({
        target: [
          content.categoryId,
          content.type,
          content.xtreamId
        ]
      }).run();
    });
    totalInserted += chunk.length;
    await reportOperationProgress(control, {
      phase: "saving-content",
      current: totalInserted,
      total,
      increment: chunk.length
    });
  }
  return { success: true, count: totalInserted };
}
async function clearXtreamImportCache(db2, playlistId, type) {
  const dbType = type === "series" ? "series" : type === "movie" ? "movies" : "live";
  const categoryRows = await db2.select({ id: categories.id }).from(categories).where(
    and(
      eq(categories.playlistId, playlistId),
      eq(categories.type, dbType)
    )
  );
  const categoryIds = categoryRows.map((category) => category.id);
  if (categoryIds.length === 0) {
    return { success: true };
  }
  const contentRows = await db2.select({ id: content.id }).from(content).where(inArray(content.categoryId, categoryIds));
  for (const chunk of chunkValues(
    contentRows.map((row) => row.id),
    100
  )) {
    await db2.transaction((tx) => {
      tx.delete(content).where(inArray(content.id, chunk)).run();
    });
  }
  for (const chunk of chunkValues(categoryIds, 100)) {
    await db2.transaction((tx) => {
      tx.delete(categories).where(inArray(categories.id, chunk)).run();
    });
  }
  return { success: true };
}
async function getContentByXtreamId(db2, xtreamId, playlistId, contentType) {
  const conditions = [
    eq(content.xtreamId, xtreamId),
    eq(categories.playlistId, playlistId)
  ];
  if (contentType) {
    conditions.push(eq(content.type, contentType));
  }
  const result = await db2.select(selectContentFields()).from(content).innerJoin(
    categories,
    eq(content.categoryId, categories.id)
  ).where(and(...conditions)).limit(1);
  return result[0] || null;
}
async function searchContent(db2, playlistId, searchTerm, types, excludeHidden = false) {
  if (!types || types.length === 0) {
    return [];
  }
  const searchTermLower = searchTerm.toLocaleLowerCase();
  const likePatterns = buildLikePatterns(searchTerm);
  const likeConditions = likePatterns.map(
    (pattern) => sql`${content.title} LIKE ${pattern} ESCAPE '\\'`
  );
  const conditions = [
    eq(categories.playlistId, playlistId),
    inArray(content.type, types),
    or(...likeConditions)
  ];
  if (excludeHidden) {
    conditions.push(eq(categories.hidden, false));
  }
  const candidates = await db2.select(selectContentFields()).from(content).innerJoin(
    categories,
    eq(content.categoryId, categories.id)
  ).where(and(...conditions)).limit(200);
  return candidates.filter(
    (item) => item.title?.toLocaleLowerCase().includes(searchTermLower)
  ).slice(0, 50);
}
async function globalSearch(db2, searchTerm, types, excludeHidden = false) {
  if (!types || types.length === 0) {
    return [];
  }
  const searchTermLower = searchTerm.toLocaleLowerCase();
  const likePatterns = buildLikePatterns(searchTerm);
  const likeConditions = likePatterns.map(
    (pattern) => sql`${content.title} LIKE ${pattern} ESCAPE '\\'`
  );
  const conditions = [
    inArray(content.type, types),
    or(...likeConditions)
  ];
  if (excludeHidden) {
    conditions.push(eq(categories.hidden, false));
  }
  const candidates = await db2.select({
    ...selectContentFields(),
    playlist_id: categories.playlistId,
    playlist_name: playlists.name
  }).from(content).innerJoin(
    categories,
    eq(content.categoryId, categories.id)
  ).innerJoin(
    playlists,
    eq(categories.playlistId, playlists.id)
  ).where(and(...conditions)).orderBy(content.title).limit(200);
  return candidates.filter(
    (item) => item.title?.toLocaleLowerCase().includes(searchTermLower)
  ).slice(0, 50);
}

// apps/electron-backend/src/app/database/operations/playback-position.operations.ts
async function ensurePlaylistExists(db2, playlistId, playlistType = "stalker") {
  const existing = await db2.select().from(playlists).where(eq(playlists.id, playlistId)).limit(1);
  if (existing.length === 0) {
    await db2.insert(playlists).values({
      id: playlistId,
      name: "Imported Playlist",
      type: playlistType
    });
  }
}
async function savePlaybackPosition(db2, playlistId, data) {
  await ensurePlaylistExists(db2, playlistId, data.playlistType);
  const values = {
    playlistId,
    contentXtreamId: data.contentXtreamId,
    contentType: data.contentType,
    seriesXtreamId: data.seriesXtreamId,
    seasonNumber: data.seasonNumber,
    episodeNumber: data.episodeNumber,
    positionSeconds: data.positionSeconds,
    durationSeconds: data.durationSeconds,
    updatedAt: sql`CURRENT_TIMESTAMP`
  };
  const existing = await db2.select().from(playbackPositions).where(
    and(
      eq(playbackPositions.playlistId, playlistId),
      eq(
        playbackPositions.contentXtreamId,
        data.contentXtreamId
      ),
      eq(playbackPositions.contentType, data.contentType)
    )
  ).limit(1);
  if (existing.length > 0) {
    await db2.update(playbackPositions).set(values).where(eq(playbackPositions.id, existing[0].id));
  } else {
    await db2.insert(playbackPositions).values(values);
  }
  return { success: true };
}
async function getPlaybackPosition(db2, playlistId, contentXtreamId, contentType) {
  const result = await db2.select().from(playbackPositions).where(
    and(
      eq(playbackPositions.playlistId, playlistId),
      eq(playbackPositions.contentXtreamId, contentXtreamId),
      eq(playbackPositions.contentType, contentType)
    )
  ).limit(1);
  return result[0] || null;
}
async function getSeriesPlaybackPositions(db2, playlistId, seriesXtreamId) {
  return db2.select().from(playbackPositions).where(
    and(
      eq(playbackPositions.playlistId, playlistId),
      eq(playbackPositions.seriesXtreamId, seriesXtreamId),
      eq(playbackPositions.contentType, "episode")
    )
  );
}
async function getRecentPlaybackPositions(db2, playlistId, limit = 20) {
  return db2.select().from(playbackPositions).where(eq(playbackPositions.playlistId, playlistId)).orderBy(desc(playbackPositions.updatedAt)).limit(limit);
}
async function getAllPlaybackPositions(db2, playlistId) {
  return db2.select().from(playbackPositions).where(eq(playbackPositions.playlistId, playlistId));
}
async function clearAllPlaybackPositions(db2, playlistId) {
  await db2.delete(playbackPositions).where(eq(playbackPositions.playlistId, playlistId));
  return { success: true };
}
async function clearPlaybackPosition(db2, playlistId, contentXtreamId, contentType) {
  await db2.delete(playbackPositions).where(
    and(
      eq(playbackPositions.playlistId, playlistId),
      eq(playbackPositions.contentXtreamId, contentXtreamId),
      eq(playbackPositions.contentType, contentType)
    )
  );
  return { success: true };
}

// apps/electron-backend/src/app/database/operations/playlist.operations.ts
var PLAYLIST_TYPES = {
  XTREAM: "xtream",
  STALKER: "stalker",
  M3U_FILE: "m3u-file",
  M3U_TEXT: "m3u-text",
  M3U_URL: "m3u-url"
};
var DEFAULT_BATCH_SIZE2 = 100;
var PLAYLIST_TYPE_VALUES = new Set(
  Object.values(PLAYLIST_TYPES)
);
function getStringValue(value) {
  if (typeof value !== "string") {
    return void 0;
  }
  const normalized = value.trim();
  return normalized.length > 0 ? normalized : void 0;
}
function getNumericValue(value) {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }
  if (typeof value === "string" && value.trim() !== "") {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : void 0;
  }
  return void 0;
}
function parseJsonValue(value, fallback) {
  if (!value) {
    return fallback;
  }
  try {
    return JSON.parse(value);
  } catch (error) {
    console.warn("Failed to parse JSON value from DB:", error);
    return fallback;
  }
}
function inferPlaylistType(playlist) {
  const explicitType = getStringValue(playlist.type);
  if (explicitType && PLAYLIST_TYPE_VALUES.has(explicitType)) {
    return explicitType;
  }
  if (getStringValue(playlist.serverUrl)) {
    return PLAYLIST_TYPES.XTREAM;
  }
  if (getStringValue(playlist.macAddress)) {
    return PLAYLIST_TYPES.STALKER;
  }
  if (getStringValue(playlist.filePath)) {
    return PLAYLIST_TYPES.M3U_FILE;
  }
  if (getStringValue(playlist.url)) {
    return PLAYLIST_TYPES.M3U_URL;
  }
  return PLAYLIST_TYPES.M3U_TEXT;
}
function buildPlaylistRow(playlist) {
  const id = getStringValue(playlist._id) ?? getStringValue(playlist.id);
  if (!id) {
    return null;
  }
  const type = inferPlaylistType(playlist);
  const portalUrl = getStringValue(playlist.portalUrl);
  const url = getStringValue(playlist.url);
  const nowIso = (/* @__PURE__ */ new Date()).toISOString();
  const updateDate = getNumericValue(playlist.updateDate);
  return {
    id,
    name: getStringValue(playlist.title) ?? getStringValue(playlist.name) ?? id,
    serverUrl: getStringValue(playlist.serverUrl),
    username: getStringValue(playlist.username),
    password: getStringValue(playlist.password),
    lastUpdated: typeof updateDate === "number" ? new Date(updateDate).toISOString() : getStringValue(playlist.lastUpdated),
    type,
    userAgent: getStringValue(playlist.userAgent),
    origin: getStringValue(playlist.origin),
    referrer: getStringValue(playlist.referrer),
    filePath: getStringValue(playlist.filePath),
    autoRefresh: Boolean(playlist.autoRefresh),
    macAddress: getStringValue(playlist.macAddress),
    url: type === PLAYLIST_TYPES.STALKER ? portalUrl ?? url : url,
    portalUrl,
    count: getNumericValue(playlist.count),
    importDate: getStringValue(playlist.importDate),
    updateDate,
    position: getNumericValue(playlist.position),
    favorites: playlist.favorites !== void 0 ? JSON.stringify(playlist.favorites) : void 0,
    recentlyViewed: playlist.recentlyViewed !== void 0 ? JSON.stringify(playlist.recentlyViewed) : void 0,
    payload: JSON.stringify(playlist),
    lastUsage: getStringValue(playlist.lastUsage) ?? nowIso
  };
}
function parseAppPlaylist(row) {
  const payload = parseJsonValue(
    row.payload,
    null
  );
  const base = payload && typeof payload === "object" ? payload : {};
  const favorites2 = parseJsonValue(row.favorites, []);
  const recentlyViewed2 = parseJsonValue(row.recentlyViewed, []);
  const importDate = row.importDate ?? row.dateCreated ?? (/* @__PURE__ */ new Date()).toISOString();
  const portalUrl = row.portalUrl ?? (row.type === PLAYLIST_TYPES.STALKER ? row.url : null);
  const updateDate = row.updateDate ?? (row.lastUpdated ? new Date(row.lastUpdated).getTime() : void 0);
  return {
    ...base,
    _id: row.id,
    title: getStringValue(base.title) ?? getStringValue(base.name) ?? row.name,
    count: row.count ?? getNumericValue(base.count) ?? 0,
    importDate: getStringValue(base.importDate) ?? importDate,
    lastUsage: row.lastUsage ?? getStringValue(base.lastUsage) ?? getStringValue(base.importDate) ?? importDate,
    favorites: favorites2,
    recentlyViewed: recentlyViewed2,
    autoRefresh: row.autoRefresh ?? Boolean(base.autoRefresh),
    url: row.type === PLAYLIST_TYPES.M3U_URL ? row.url ?? getStringValue(base.url) : getStringValue(base.url),
    filePath: row.filePath ?? getStringValue(base.filePath),
    userAgent: row.userAgent ?? getStringValue(base.userAgent),
    referrer: row.referrer ?? getStringValue(base.referrer),
    origin: row.origin ?? getStringValue(base.origin),
    updateDate,
    position: row.position ?? getNumericValue(base.position),
    serverUrl: row.serverUrl ?? getStringValue(base.serverUrl),
    username: row.username ?? getStringValue(base.username),
    password: row.password ?? getStringValue(base.password),
    macAddress: row.macAddress ?? getStringValue(base.macAddress),
    portalUrl: portalUrl ?? getStringValue(base.portalUrl)
  };
}
async function createPlaylist(db2, playlist) {
  await db2.insert(playlists).values({
    id: playlist.id,
    name: playlist.name,
    serverUrl: playlist.serverUrl,
    username: playlist.username,
    password: playlist.password,
    macAddress: playlist.macAddress,
    url: playlist.url,
    portalUrl: playlist.type === PLAYLIST_TYPES.STALKER ? playlist.url : void 0,
    type: playlist.type
  });
  return { success: true };
}
async function upsertAppPlaylist(db2, playlist) {
  const row = buildPlaylistRow(playlist);
  if (!row) {
    throw new Error("Playlist ID is required for upsert");
  }
  await db2.insert(playlists).values(row).onConflictDoUpdate({
    target: playlists.id,
    set: row
  });
  return { success: true };
}
async function upsertAppPlaylists(db2, playlists2) {
  if (!Array.isArray(playlists2) || playlists2.length === 0) {
    return { success: true, count: 0 };
  }
  const rows = playlists2.map((playlist) => buildPlaylistRow(playlist)).filter((row) => row !== null);
  if (rows.length === 0) {
    return { success: true, count: 0 };
  }
  await db2.transaction((tx) => {
    for (const row of rows) {
      tx.insert(playlists).values(row).onConflictDoUpdate({
        target: playlists.id,
        set: row
      }).run();
    }
  });
  return { success: true, count: rows.length };
}
async function getAppPlaylists(db2) {
  const rows = await db2.select().from(playlists);
  return rows.map((row) => parseAppPlaylist(row));
}
async function getAppPlaylist(db2, playlistId) {
  const rows = await db2.select().from(playlists).where(eq(playlists.id, playlistId)).limit(1);
  return rows[0] ? parseAppPlaylist(rows[0]) : null;
}
async function getPlaylist(db2, playlistId) {
  const result = await db2.select().from(playlists).where(eq(playlists.id, playlistId)).limit(1);
  return result[0] || null;
}
async function updatePlaylist(db2, playlistId, updates) {
  await db2.update(playlists).set(updates).where(eq(playlists.id, playlistId));
  return { success: true };
}
async function deletePlaylist(db2, playlistId, control) {
  const [favoriteRows, recentlyViewedRows, playbackPositionRows, downloadRows] = await Promise.all([
    db2.select({ id: favorites.id }).from(favorites).where(eq(favorites.playlistId, playlistId)),
    db2.select({ id: recentlyViewed.id }).from(recentlyViewed).where(eq(recentlyViewed.playlistId, playlistId)),
    db2.select({ id: playbackPositions.id }).from(playbackPositions).where(eq(playbackPositions.playlistId, playlistId)),
    db2.select({ id: downloads.id }).from(downloads).where(eq(downloads.playlistId, playlistId))
  ]);
  const categoryRows = await db2.select({ id: categories.id }).from(categories).where(eq(categories.playlistId, playlistId));
  const categoryIds = categoryRows.map((category) => category.id);
  const contentRows = categoryIds.length > 0 ? await db2.select({ id: content.id }).from(content).where(inArray(content.categoryId, categoryIds)) : [];
  for (const [phase, ids, column, table] of [
    [
      "deleting-favorites",
      favoriteRows.map((row) => row.id),
      favorites.id,
      favorites
    ],
    [
      "deleting-recently-viewed",
      recentlyViewedRows.map((row) => row.id),
      recentlyViewed.id,
      recentlyViewed
    ],
    [
      "deleting-playback-positions",
      playbackPositionRows.map((row) => row.id),
      playbackPositions.id,
      playbackPositions
    ],
    [
      "deleting-downloads",
      downloadRows.map((row) => row.id),
      downloads.id,
      downloads
    ],
    [
      "deleting-content",
      contentRows.map((row) => row.id),
      content.id,
      content
    ],
    [
      "deleting-categories",
      categoryIds,
      categories.id,
      categories
    ]
  ]) {
    let current = 0;
    const total = ids.length;
    for (const chunk of chunkValues(ids, DEFAULT_BATCH_SIZE2)) {
      await checkpointOperation(control);
      await db2.transaction((tx) => {
        tx.delete(table).where(inArray(column, chunk)).run();
      });
      current += chunk.length;
      await reportOperationProgress(control, {
        phase,
        current,
        total,
        increment: chunk.length
      });
    }
  }
  await checkpointOperation(control);
  await db2.delete(playlists).where(eq(playlists.id, playlistId));
  await reportOperationProgress(control, {
    phase: "deleting-playlist",
    current: 1,
    total: 1,
    increment: 1
  });
  return { success: true };
}
async function getAppState(db2, key) {
  const rows = await db2.select().from(appState).where(eq(appState.key, key)).limit(1);
  return rows[0]?.value ?? null;
}
async function setAppState(db2, key, value) {
  const updatedAt = (/* @__PURE__ */ new Date()).toISOString();
  await db2.insert(appState).values({
    key,
    value,
    updatedAt
  }).onConflictDoUpdate({
    target: appState.key,
    set: { value, updatedAt }
  });
  return { success: true };
}
async function deleteAllPlaylists(db2, control) {
  const deleteStages = [
    {
      phase: "deleting-favorites",
      execute: () => db2.delete(favorites)
    },
    {
      phase: "deleting-recently-viewed",
      execute: () => db2.delete(recentlyViewed)
    },
    {
      phase: "deleting-playback-positions",
      execute: () => db2.delete(playbackPositions)
    },
    {
      phase: "deleting-downloads",
      execute: () => db2.delete(downloads)
    },
    {
      phase: "deleting-content",
      execute: () => db2.delete(content)
    },
    {
      phase: "deleting-categories",
      execute: () => db2.delete(categories)
    },
    {
      phase: "deleting-playlists",
      execute: () => db2.delete(playlists)
    }
  ];
  let current = 0;
  const total = deleteStages.length;
  for (const stage of deleteStages) {
    await checkpointOperation(control);
    await stage.execute();
    current += 1;
    await reportOperationProgress(control, {
      phase: stage.phase,
      current,
      total,
      increment: 1
    });
  }
  return { success: true };
}

// apps/electron-backend/src/app/database/operations/recently-viewed.operations.ts
async function getRecentlyViewed(db2) {
  return db2.select({
    id: content.id,
    category_id: content.categoryId,
    title: content.title,
    rating: content.rating,
    added: content.added,
    poster_url: content.posterUrl,
    backdrop_url: content.backdropUrl,
    xtream_id: content.xtreamId,
    type: content.type,
    playlist_id: categories.playlistId,
    playlist_name: playlists.name,
    viewed_at: recentlyViewed.viewedAt
  }).from(recentlyViewed).innerJoin(
    content,
    eq(recentlyViewed.contentId, content.id)
  ).innerJoin(
    categories,
    eq(content.categoryId, categories.id)
  ).innerJoin(
    playlists,
    eq(categories.playlistId, playlists.id)
  ).orderBy(desc(recentlyViewed.viewedAt)).limit(100);
}
async function clearRecentlyViewed(db2) {
  await db2.delete(recentlyViewed);
  return { success: true };
}
async function getRecentItems(db2, playlistId) {
  return db2.select({
    id: content.id,
    category_id: content.categoryId,
    title: content.title,
    rating: content.rating,
    added: content.added,
    poster_url: content.posterUrl,
    backdrop_url: content.backdropUrl,
    xtream_id: content.xtreamId,
    type: content.type,
    viewed_at: recentlyViewed.viewedAt
  }).from(recentlyViewed).innerJoin(
    content,
    eq(recentlyViewed.contentId, content.id)
  ).where(eq(recentlyViewed.playlistId, playlistId)).orderBy(desc(recentlyViewed.viewedAt)).limit(100);
}
async function addRecentItem(db2, contentId, playlistId, options) {
  const existing = await db2.select().from(recentlyViewed).where(
    and(
      eq(recentlyViewed.contentId, contentId),
      eq(recentlyViewed.playlistId, playlistId)
    )
  ).limit(1);
  if (existing.length > 0) {
    await db2.update(recentlyViewed).set({ viewedAt: sql`CURRENT_TIMESTAMP` }).where(
      and(
        eq(recentlyViewed.contentId, contentId),
        eq(recentlyViewed.playlistId, playlistId)
      )
    );
  } else {
    await db2.insert(recentlyViewed).values({
      contentId,
      playlistId
    });
  }
  await persistContentBackdropIfMissing(db2, contentId, options?.backdropUrl);
  return { success: true };
}
async function clearPlaylistRecentItems(db2, playlistId) {
  const contentIds = await db2.select({ id: content.id }).from(content).innerJoin(
    categories,
    eq(content.categoryId, categories.id)
  ).where(eq(categories.playlistId, playlistId));
  if (contentIds.length > 0) {
    await db2.delete(recentlyViewed).where(
      inArray(
        recentlyViewed.contentId,
        contentIds.map((content2) => content2.id)
      )
    );
  }
  return { success: true };
}
async function removeRecentItem(db2, contentId, playlistId) {
  await db2.delete(recentlyViewed).where(
    and(
      eq(recentlyViewed.contentId, contentId),
      eq(recentlyViewed.playlistId, playlistId)
    )
  );
  return { success: true };
}
async function removeRecentItemsBatch(db2, items) {
  if (!Array.isArray(items) || items.length === 0) {
    return { success: true, count: 0 };
  }
  const stmt = db2.delete(recentlyViewed).where(
    and(
      eq(
        recentlyViewed.contentId,
        sql.placeholder("contentId")
      ),
      eq(
        recentlyViewed.playlistId,
        sql.placeholder("playlistId")
      )
    )
  ).prepare();
  await db2.transaction(() => {
    for (const { contentId, playlistId } of items) {
      stmt.execute({ contentId, playlistId });
    }
  });
  return { success: true, count: items.length };
}

// apps/electron-backend/src/app/database/operations/xtream.operations.ts
var DEFAULT_BATCH_SIZE3 = 100;
function toContentIdentityKey(contentType, xtreamId) {
  return `${contentType}:${xtreamId}`;
}
async function deleteXtreamContent(db2, playlistId, control) {
  const categories2 = await db2.select({
    id: categories.id,
    xtreamId: categories.xtreamId,
    type: categories.type,
    hidden: categories.hidden
  }).from(categories).where(eq(categories.playlistId, playlistId));
  const categoryIds = categories2.map((category) => category.id);
  const hiddenCategories = categories2.filter((category) => category.hidden).map((category) => ({
    xtreamId: category.xtreamId,
    categoryType: category.type
  }));
  let favorites2 = [];
  let recentlyViewed2 = [];
  if (categoryIds.length > 0) {
    const favoritedContent = await db2.select({
      xtreamId: content.xtreamId,
      contentType: content.type,
      addedAt: favorites.addedAt,
      position: favorites.position
    }).from(favorites).innerJoin(
      content,
      eq(favorites.contentId, content.id)
    ).where(
      and(
        eq(favorites.playlistId, playlistId),
        inArray(content.categoryId, categoryIds)
      )
    );
    favorites2 = favoritedContent.map((favorite) => ({
      xtreamId: favorite.xtreamId,
      contentType: favorite.contentType,
      addedAt: favorite.addedAt ?? void 0,
      position: favorite.position
    }));
    const recentlyViewedContent = await db2.select({
      xtreamId: content.xtreamId,
      contentType: content.type,
      viewedAt: recentlyViewed.viewedAt
    }).from(recentlyViewed).innerJoin(
      content,
      eq(recentlyViewed.contentId, content.id)
    ).where(
      and(
        eq(recentlyViewed.playlistId, playlistId),
        inArray(content.categoryId, categoryIds)
      )
    );
    recentlyViewed2 = recentlyViewedContent.map((item) => ({
      xtreamId: item.xtreamId,
      contentType: item.contentType,
      viewedAt: item.viewedAt || (/* @__PURE__ */ new Date()).toISOString()
    }));
    const contentRows = await db2.select({ id: content.id }).from(content).where(inArray(content.categoryId, categoryIds));
    let deletedContent = 0;
    const totalContent = contentRows.length;
    for (const chunk of chunkValues(
      contentRows.map((content2) => content2.id),
      DEFAULT_BATCH_SIZE3
    )) {
      await checkpointOperation(control);
      await db2.transaction((tx) => {
        tx.delete(content).where(inArray(content.id, chunk)).run();
      });
      deletedContent += chunk.length;
      await reportOperationProgress(control, {
        phase: "deleting-content",
        current: deletedContent,
        total: totalContent,
        increment: chunk.length
      });
    }
  }
  let deletedCategories = 0;
  const totalCategories = categoryIds.length;
  for (const chunk of chunkValues(categoryIds, DEFAULT_BATCH_SIZE3)) {
    await checkpointOperation(control);
    await db2.transaction((tx) => {
      tx.delete(categories).where(inArray(categories.id, chunk)).run();
    });
    deletedCategories += chunk.length;
    await reportOperationProgress(control, {
      phase: "deleting-categories",
      current: deletedCategories,
      total: totalCategories,
      increment: chunk.length
    });
  }
  return {
    success: true,
    favorites: favorites2,
    recentlyViewed: recentlyViewed2,
    hiddenCategories
  };
}
async function getContentIdentityMap(db2, playlistId, identities) {
  const xtreamIds = Array.from(
    new Set(identities.map((item) => item.xtreamId))
  );
  if (xtreamIds.length === 0) {
    return /* @__PURE__ */ new Map();
  }
  const content2 = await db2.select({
    id: content.id,
    xtreamId: content.xtreamId,
    contentType: content.type
  }).from(content).innerJoin(
    categories,
    eq(content.categoryId, categories.id)
  ).where(
    and(
      eq(categories.playlistId, playlistId),
      inArray(content.xtreamId, xtreamIds)
    )
  );
  return new Map(
    content2.map((item) => [
      toContentIdentityKey(item.contentType, item.xtreamId),
      item.id
    ])
  );
}
async function restoreXtreamUserData(db2, playlistId, favorites2, recentlyViewed2, control) {
  await checkpointOperation(control);
  await db2.delete(favorites).where(eq(favorites.playlistId, playlistId));
  await checkpointOperation(control);
  await db2.delete(recentlyViewed).where(eq(recentlyViewed.playlistId, playlistId));
  const contentByIdentity = await getContentIdentityMap(db2, playlistId, [
    ...favorites2.map((item) => ({
      contentType: item.contentType,
      xtreamId: item.xtreamId
    })),
    ...recentlyViewed2.map((item) => ({
      contentType: item.contentType,
      xtreamId: item.xtreamId
    }))
  ]);
  const favoriteValues = favorites2.map((item, index2) => {
    const contentId = contentByIdentity.get(
      toContentIdentityKey(item.contentType, item.xtreamId)
    );
    if (!contentId) {
      return null;
    }
    return {
      contentId,
      playlistId,
      addedAt: item.addedAt ?? (/* @__PURE__ */ new Date()).toISOString(),
      position: item.position ?? index2
    };
  }).filter(
    (value) => value !== null
  );
  let restoredFavorites = 0;
  const totalFavorites = favoriteValues.length;
  for (const chunk of chunkValues(favoriteValues, DEFAULT_BATCH_SIZE3)) {
    await checkpointOperation(control);
    await db2.transaction((tx) => {
      tx.insert(favorites).values(chunk).run();
    });
    restoredFavorites += chunk.length;
    await reportOperationProgress(control, {
      phase: "restoring-favorites",
      current: restoredFavorites,
      total: totalFavorites,
      increment: chunk.length
    });
  }
  const recentlyViewedValues = recentlyViewed2.map((item) => {
    const contentId = contentByIdentity.get(
      toContentIdentityKey(item.contentType, item.xtreamId)
    );
    if (!contentId) {
      return null;
    }
    return {
      contentId,
      playlistId,
      viewedAt: item.viewedAt
    };
  }).filter(
    (value) => value !== null
  );
  let restoredRecentlyViewed = 0;
  const totalRecentlyViewed = recentlyViewedValues.length;
  for (const chunk of chunkValues(recentlyViewedValues, DEFAULT_BATCH_SIZE3)) {
    await checkpointOperation(control);
    await db2.transaction((tx) => {
      tx.insert(recentlyViewed).values(chunk).run();
    });
    restoredRecentlyViewed += chunk.length;
    await reportOperationProgress(control, {
      phase: "restoring-recently-viewed",
      current: restoredRecentlyViewed,
      total: totalRecentlyViewed,
      increment: chunk.length
    });
  }
  return { success: true };
}

// apps/electron-backend/src/app/workers/database.worker.ts
var loggerLabel = "[DB Worker]";
var batchDelayMs = Number.parseInt(
  process.env["IPTVNATOR_DB_WORKER_BATCH_DELAY_MS"] ?? "0",
  10
);
var activeOperations = /* @__PURE__ */ new Map();
if (!import_worker_threads2.parentPort) {
  throw new Error("Database worker must be started with a parent port");
}
function createAbortError(message) {
  const error = new Error(message);
  error.name = "AbortError";
  return error;
}
function isAbortError(error) {
  return error instanceof Error && error.name === "AbortError";
}
function serializeError(error) {
  if (error instanceof Error) {
    return {
      name: error.name,
      message: error.message,
      stack: error.stack
    };
  }
  return {
    message: String(error)
  };
}
function postMessage(message) {
  import_worker_threads2.parentPort?.postMessage(message);
}
function postEvent(requestId, event) {
  postMessage({
    type: "event",
    requestId,
    event
  });
}
async function pauseBetweenBatches() {
  if (batchDelayMs <= 0) {
    return;
  }
  await new Promise((resolve) => setTimeout(resolve, batchDelayMs));
}
function createOperationController(config) {
  const { operationId, operation, playlistId, requestId } = config;
  const cancellable = config.cancellable ?? true;
  const activeState = operationId && cancellable ? { cancelled: false } : null;
  if (operationId && activeState) {
    activeOperations.set(operationId, activeState);
  }
  let lastEvent = {};
  const send = (status, event = {}) => {
    const mergedEvent = {
      operationId,
      operation,
      playlistId,
      status,
      phase: event.phase ?? lastEvent.phase,
      current: event.current ?? lastEvent.current,
      total: event.total ?? lastEvent.total,
      increment: event.increment,
      error: event.error
    };
    lastEvent = {
      phase: mergedEvent.phase,
      current: mergedEvent.current,
      total: mergedEvent.total
    };
    postEvent(requestId, mergedEvent);
  };
  const checkpoint = async () => {
    if (activeState?.cancelled) {
      throw createAbortError(`Operation "${operation}" was cancelled`);
    }
    await pauseBetweenBatches();
    if (activeState?.cancelled) {
      throw createAbortError(`Operation "${operation}" was cancelled`);
    }
  };
  return {
    control: {
      checkpoint,
      onProgress: async (progress) => {
        send("progress", progress);
      }
    },
    emitStarted: (event) => {
      send("started", event);
    },
    emitCompleted: (event) => {
      send("completed", event);
    },
    emitCancelled: (event) => {
      send("cancelled", event);
    },
    emitError: (error, event) => {
      send("error", {
        ...event,
        error: error instanceof Error ? error.message : String(error)
      });
    },
    cleanup: () => {
      if (operationId) {
        activeOperations.delete(operationId);
      }
    }
  };
}
async function executeTrackedOperation(config, handler) {
  const controller = createOperationController(config);
  try {
    return await handler(controller);
  } catch (error) {
    if (isAbortError(error)) {
      controller.emitCancelled();
    } else {
      controller.emitError(error);
    }
    throw error;
  } finally {
    controller.cleanup();
  }
}
async function executeRequest(message) {
  const db2 = await getWorkerDatabase();
  switch (message.operation) {
    case "DB_HAS_CATEGORIES": {
      const payload = message.payload;
      return hasCategories(db2, payload.playlistId, payload.type);
    }
    case "DB_GET_CATEGORIES": {
      const payload = message.payload;
      return getCategories(db2, payload.playlistId, payload.type);
    }
    case "DB_SAVE_CATEGORIES": {
      const payload = message.payload;
      return saveCategories(
        db2,
        payload.playlistId,
        payload.categories,
        payload.type,
        payload.hiddenCategoryXtreamIds
      );
    }
    case "DB_GET_ALL_CATEGORIES": {
      const payload = message.payload;
      return getAllCategories(db2, payload.playlistId, payload.type);
    }
    case "DB_UPDATE_CATEGORY_VISIBILITY": {
      const payload = message.payload;
      return updateCategoryVisibility(
        db2,
        payload.categoryIds,
        payload.hidden
      );
    }
    case "DB_HAS_CONTENT": {
      const payload = message.payload;
      return hasContent(db2, payload.playlistId, payload.type);
    }
    case "DB_GET_CONTENT": {
      const payload = message.payload;
      return getContent(db2, payload.playlistId, payload.type);
    }
    case "DB_GET_GLOBAL_RECENTLY_ADDED": {
      const payload = message.payload;
      return getGlobalRecentlyAdded(
        db2,
        payload.kind,
        payload.limit,
        payload.playlistType
      );
    }
    case "DB_SAVE_CONTENT": {
      const payload = message.payload;
      return executeTrackedOperation(
        {
          requestId: message.requestId,
          operation: DB_OPERATION_NAMES.SAVE_CONTENT,
          operationId: payload.operationId,
          playlistId: payload.playlistId
        },
        async (controller) => {
          controller.emitStarted({
            phase: DB_OPERATION_PHASES.PREPARING_CONTENT,
            current: 0,
            total: payload.streams.length
          });
          const result = await saveContent(
            db2,
            payload.playlistId,
            payload.streams,
            payload.type,
            controller.control
          );
          controller.emitCompleted({
            phase: DB_OPERATION_PHASES.SAVING_CONTENT,
            current: result.count,
            total: result.count
          });
          return result;
        }
      );
    }
    case "DB_CLEAR_XTREAM_IMPORT_CACHE": {
      const payload = message.payload;
      return clearXtreamImportCache(db2, payload.playlistId, payload.type);
    }
    case "DB_GET_CONTENT_BY_XTREAM_ID": {
      const payload = message.payload;
      return getContentByXtreamId(
        db2,
        payload.xtreamId,
        payload.playlistId,
        payload.contentType
      );
    }
    case "DB_SET_CONTENT_BACKDROP_IF_MISSING": {
      const payload = message.payload;
      return setContentBackdropIfMissing(
        db2,
        payload.contentId,
        payload.backdropUrl
      );
    }
    case "DB_SEARCH_CONTENT": {
      const payload = message.payload;
      return searchContent(
        db2,
        payload.playlistId,
        payload.searchTerm,
        payload.types,
        payload.excludeHidden
      );
    }
    case "DB_GLOBAL_SEARCH": {
      const payload = message.payload;
      return globalSearch(
        db2,
        payload.searchTerm,
        payload.types,
        payload.excludeHidden
      );
    }
    case "DB_CREATE_PLAYLIST": {
      return createPlaylist(
        db2,
        message.payload
      );
    }
    case "DB_UPSERT_APP_PLAYLIST": {
      return upsertAppPlaylist(
        db2,
        message.payload
      );
    }
    case "DB_UPSERT_APP_PLAYLISTS": {
      return upsertAppPlaylists(
        db2,
        message.payload
      );
    }
    case "DB_GET_APP_PLAYLISTS":
      return getAppPlaylists(db2);
    case "DB_GET_APP_PLAYLIST": {
      const payload = message.payload;
      return getAppPlaylist(db2, payload.playlistId);
    }
    case "DB_GET_PLAYLIST": {
      const payload = message.payload;
      return getPlaylist(db2, payload.playlistId);
    }
    case "DB_UPDATE_PLAYLIST": {
      const payload = message.payload;
      return updatePlaylist(db2, payload.playlistId, payload.updates);
    }
    case "DB_DELETE_PLAYLIST": {
      const payload = message.payload;
      return executeTrackedOperation(
        {
          requestId: message.requestId,
          operation: DB_OPERATION_NAMES.DELETE_PLAYLIST,
          operationId: payload.operationId,
          playlistId: payload.playlistId
        },
        async (controller) => {
          controller.emitStarted({
            phase: DB_OPERATION_PHASES.DELETING_FAVORITES,
            current: 0
          });
          const result = await deletePlaylist(
            db2,
            payload.playlistId,
            controller.control
          );
          controller.emitCompleted({
            phase: DB_OPERATION_PHASES.DELETING_PLAYLIST,
            current: 1,
            total: 1
          });
          return result;
        }
      );
    }
    case "DB_GET_APP_STATE": {
      const payload = message.payload;
      return getAppState(db2, payload.key);
    }
    case "DB_SET_APP_STATE": {
      const payload = message.payload;
      return setAppState(db2, payload.key, payload.value);
    }
    case "DB_DELETE_ALL_PLAYLISTS": {
      const payload = message.payload;
      return executeTrackedOperation(
        {
          requestId: message.requestId,
          operation: DB_OPERATION_NAMES.DELETE_ALL_PLAYLISTS,
          operationId: payload.operationId,
          cancellable: false
        },
        async (controller) => {
          controller.emitStarted({
            phase: DB_OPERATION_PHASES.DELETING_FAVORITES,
            current: 0,
            total: 7
          });
          const result = await deleteAllPlaylists(
            db2,
            controller.control
          );
          controller.emitCompleted({
            phase: DB_OPERATION_PHASES.DELETING_PLAYLISTS,
            current: 7,
            total: 7
          });
          return result;
        }
      );
    }
    case "DB_DELETE_XTREAM_CONTENT": {
      const payload = message.payload;
      return executeTrackedOperation(
        {
          requestId: message.requestId,
          operation: DB_OPERATION_NAMES.DELETE_XTREAM_CONTENT,
          operationId: payload.operationId,
          playlistId: payload.playlistId
        },
        async (controller) => {
          controller.emitStarted({
            phase: DB_OPERATION_PHASES.COLLECTING_USER_DATA,
            current: 0
          });
          const result = await deleteXtreamContent(
            db2,
            payload.playlistId,
            controller.control
          );
          controller.emitCompleted({
            phase: DB_OPERATION_PHASES.DELETING_CATEGORIES
          });
          return result;
        }
      );
    }
    case "DB_RESTORE_XTREAM_USER_DATA": {
      const payload = message.payload;
      return executeTrackedOperation(
        {
          requestId: message.requestId,
          operation: DB_OPERATION_NAMES.RESTORE_XTREAM_USER_DATA,
          operationId: payload.operationId,
          playlistId: payload.playlistId
        },
        async (controller) => {
          const totalItems = payload.favorites.length + payload.recentlyViewed.length;
          controller.emitStarted({
            phase: DB_OPERATION_PHASES.RESTORING_FAVORITES,
            current: 0,
            total: totalItems
          });
          const result = await restoreXtreamUserData(
            db2,
            payload.playlistId,
            payload.favorites,
            payload.recentlyViewed,
            controller.control
          );
          controller.emitCompleted({
            phase: DB_OPERATION_PHASES.RESTORING_RECENTLY_VIEWED,
            current: totalItems,
            total: totalItems
          });
          return result;
        }
      );
    }
    case "DB_ADD_FAVORITE": {
      const payload = message.payload;
      return addFavorite(db2, payload.contentId, payload.playlistId, {
        backdropUrl: payload.backdropUrl
      });
    }
    case "DB_REMOVE_FAVORITE": {
      const payload = message.payload;
      return removeFavorite(db2, payload.contentId, payload.playlistId);
    }
    case "DB_IS_FAVORITE": {
      const payload = message.payload;
      return isFavorite(db2, payload.contentId, payload.playlistId);
    }
    case "DB_GET_FAVORITES": {
      const payload = message.payload;
      return getFavorites(db2, payload.playlistId);
    }
    case "DB_GET_GLOBAL_FAVORITES":
      return getGlobalFavorites(db2);
    case "DB_GET_ALL_GLOBAL_FAVORITES":
      return getAllGlobalFavorites(db2);
    case "DB_REORDER_GLOBAL_FAVORITES": {
      const payload = message.payload;
      return reorderGlobalFavorites(db2, payload.updates);
    }
    case "DB_GET_RECENTLY_VIEWED":
      return getRecentlyViewed(db2);
    case "DB_CLEAR_RECENTLY_VIEWED":
      return clearRecentlyViewed(db2);
    case "DB_GET_RECENT_ITEMS": {
      const payload = message.payload;
      return getRecentItems(db2, payload.playlistId);
    }
    case "DB_ADD_RECENT_ITEM": {
      const payload = message.payload;
      return addRecentItem(db2, payload.contentId, payload.playlistId, {
        backdropUrl: payload.backdropUrl
      });
    }
    case "DB_CLEAR_PLAYLIST_RECENT_ITEMS": {
      const payload = message.payload;
      return clearPlaylistRecentItems(db2, payload.playlistId);
    }
    case "DB_REMOVE_RECENT_ITEM": {
      const payload = message.payload;
      return removeRecentItem(db2, payload.contentId, payload.playlistId);
    }
    case "DB_REMOVE_RECENT_ITEMS_BATCH": {
      const payload = message.payload;
      return removeRecentItemsBatch(db2, payload.items);
    }
    case "DB_SAVE_PLAYBACK_POSITION": {
      const payload = message.payload;
      return savePlaybackPosition(db2, payload.playlistId, payload.data);
    }
    case "DB_GET_PLAYBACK_POSITION": {
      const payload = message.payload;
      return getPlaybackPosition(
        db2,
        payload.playlistId,
        payload.contentXtreamId,
        payload.contentType
      );
    }
    case "DB_GET_SERIES_PLAYBACK_POSITIONS": {
      const payload = message.payload;
      return getSeriesPlaybackPositions(
        db2,
        payload.playlistId,
        payload.seriesXtreamId
      );
    }
    case "DB_GET_RECENT_PLAYBACK_POSITIONS": {
      const payload = message.payload;
      return getRecentPlaybackPositions(
        db2,
        payload.playlistId,
        payload.limit
      );
    }
    case "DB_GET_ALL_PLAYBACK_POSITIONS": {
      const payload = message.payload;
      return getAllPlaybackPositions(db2, payload.playlistId);
    }
    case "DB_CLEAR_ALL_PLAYBACK_POSITIONS": {
      const payload = message.payload;
      return clearAllPlaybackPositions(db2, payload.playlistId);
    }
    case "DB_CLEAR_PLAYBACK_POSITION": {
      const payload = message.payload;
      return clearPlaybackPosition(
        db2,
        payload.playlistId,
        payload.contentXtreamId,
        payload.contentType
      );
    }
  }
}
import_worker_threads2.parentPort.on("message", async (message) => {
  if (message.type === "cancel") {
    const activeOperation = activeOperations.get(message.operationId);
    if (activeOperation) {
      activeOperation.cancelled = true;
    }
    return;
  }
  try {
    const result = await executeRequest(message);
    postMessage({
      type: "response",
      requestId: message.requestId,
      success: true,
      result
    });
  } catch (error) {
    console.error(
      loggerLabel,
      `Error handling ${message.operation}:`,
      error
    );
    postMessage({
      type: "response",
      requestId: message.requestId,
      success: false,
      error: serializeError(error)
    });
  }
});
process.on("exit", () => {
  closeWorkerDatabase();
});
postMessage({ type: "ready" });
//# sourceMappingURL=database.worker.js.map
