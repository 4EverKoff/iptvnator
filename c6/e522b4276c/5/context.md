# Session Context

## User Prompts

### Prompt 1

in recently viewed view (available from sidebar rail), when i click on "clear" button in header (class .collection-header-toggles in @libs/portal/shared/ui/src/lib/components/unified-collection/unified-collection-page.component.html ) , there is no visual feedback that something has been started also the button is still active and be clicked multiple times. what do you could a be a good process indication? just blocking the button and show loading spinner  close to the button or maybe a simple s...

### Prompt 2

yes, but simple version, undo is not needed. maybe just show a popup dialog before (similar one like when playlist get refresh or before we delete playlist from sources/playlists view), to ask user where user is sure about deletion of all items

### Prompt 3

can you check if the "clear" button is scope related and just removes the selected scope items, like depending on whether all playlsits or this playlist is selected?

### Prompt 4

what do you think about considering the select type for the "clear" action, so to not delete all the tpes in scope, but just from the type which is selected? is is that a bad mental model? use /userinterface-wiki  and /frontend-design  to think about good solution

### Prompt 5

Base directory for this skill: /Users/4gray/.claude/skills/userinterface-wiki

# User Interface Wiki

Comprehensive UI/UX best practices guide for web interfaces. Contains 152 rules across 12 categories, prioritized by impact to guide automated code review and generation.

## When to Apply

Reference these guidelines when:
- Implementing or reviewing animations (CSS transitions, Motion/Framer Motion)
- Choosing between springs, easing curves, or no animation
- Working with AnimatePresence and ex...

### Prompt 6

yes

### Prompt 7

add same "clear" button function for favorites view

