# Session Context

## User Prompts

### Prompt 1

in favorites view when i scroll down the list with channels and click on a checnnel the list view automatically scrolls up on channel selection. can you check and fix this behaviour, so that the list is not automatically scrolls up without user intention. use agent-browser cli to check, the app is already running. also use /electron and /angular-developer and /frontend-design skills

### Prompt 2

Base directory for this skill: /Users/4gray/.claude/skills/electron

# Electron App Automation

Automate any Electron desktop app using agent-browser. Electron apps are built on Chromium and expose a Chrome DevTools Protocol (CDP) port that agent-browser can connect to, enabling the same snapshot-interact workflow used for web pages.

## Core Workflow

1. **Launch** the Electron app with remote debugging enabled
2. **Connect** agent-browser to the CDP port
3. **Snapshot** to discover interactive...

### Prompt 3

Base directory for this skill: /Users/4gray/.claude/skills/angular-developer

# Angular Developer Guidelines

1. Always analyze the project's Angular version before providing guidance, as best practices and available features can vary significantly between versions. If creating a new project with Angular CLI, do not specify a version unless prompted by the user.

2. When generating code, follow Angular's style guide and best practices for maintainability and performance. Use the Angular CLI for ...

### Prompt 4

Base directory for this skill: /Users/4gray/.claude/plugins/marketplaces/anthropic-agent-skills/skills/frontend-design

This skill guides creation of distinctive, production-grade frontend interfaces that avoid generic "AI slop" aesthetics. Implement real working code with exceptional attention to aesthetic details and creative choices.

The user provides frontend requirements: a component, page, application, or interface to build. They may include context about the purpose, audience, or technic...

### Prompt 5

it's still scrolling/jumping, can you check one more time, i feel like the list is getting re-rendered somehow, is there a fundementional angular component init issue? maybe /angular-component skill /angular-signals and /angular-developer skills could help me here to investigate deeper

### Prompt 6

better now, but the sidebar is resizing and is shaky after click selection, any idea why that happens? so when i click on channel i want that the sidebar rezises to one size and stays like this, could it be related to size defined in component and later on the size which is defined/persisted in the resize directive?

### Prompt 7

This session is being continued from a previous conversation that ran out of context. The summary below covers the earlier portion of the conversation.

Summary:
1. Primary Request and Intent:
   The user reported a UX bug in IPTVnator: when scrolling down the favorites list (at URL `/workspace/stalker/.../favorites` — the unified-live-tab favorites view), then clicking a channel, the list automatically scrolls up, losing the user's scroll position. They want the scroll position preserved on c...

### Prompt 8

ok, other idea, to avoid issues with jumping sidebar sizes etc. what do you think about showing a two column layout initially just like for m3u module, where sidebar has initially restricted size and resize directive is used to change it by user, and at the right side when no channel is selected there is a placeholder . in m3u module it should be in @libs/playlist/m3u/feature-player/src/lib/video-player and @libs/playlist/shared/ui/src/lib/recent-playlists/empty-state/empty-state.component.html ...

