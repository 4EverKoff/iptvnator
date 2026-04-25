# Session Context

## User Prompts

### Prompt 1

what do you think about the current look and feel of the dashboard UI, with draggable widgets and hide/show options, resizeable etc? this should be the first screen that user sees of the app. also when user enters it first time, and there is no data it should provide a nice looking ui with oplaceholder and hints how to use it, how to add first playlist (currenty there is placeholder like this in @libs/playlist/shared/ui/src/lib/recent-playlists  view or sources view) analyse: is the current vers...

### Prompt 2

yes

### Prompt 3

do it, but before create some screenshots, because i think some background colors are missing, and/or typography could be improved. also there are some gaps between sections. or do oyu plan all the polishing later on?

### Prompt 4

continue

### Prompt 5

it looks like the width of card elements in rails can differ and depends on title of the item, can you check it and make sure that the title is trimmed and the width and height are always same. and also something was changed, the electron app size or width? the app is not really responsible anymore when i resize the window, definetely a regression

### Prompt 6

when no playlist is selected in the navigation rail on the left the global favorites and recent viewed links are not shown. do you know why? i think we should show them independent from the playlist, since they are global views or?

### Prompt 7

continue please

### Prompt 8

looks good without playlist selection, but now when a playlist selected they appear twice. on top in the first two views i think there is no segmented control for switching between ths playlist and all playlist and in the bottom two links it is there. what do you think is the best way to avoid dupliactes, but to cover those two use casees and show proper links, like without selected playlist adn with selecerd. use /userinterface-wiki and /frontend-design and /sc-brainstorm to think and suggest a...

### Prompt 9

sounds amazing, do it

### Prompt 10

another issue or idea is the cover image of vod or series in the "continue watching" hero in the dashboard, it is cut-off, see the image in hero and the same one in recently watched, i think it's not ideal or (see screenshot)? what do you think. other idea is about the background of the hero element, can we use the same style like in @libs/portal/xtream/feature/src/lib/vod-details and/or @libs/ui/components/src/lib/content-hero where we show the backdrop cover image if it's available for selecte...

### Prompt 11

i see that backdrop is available for the same item in the vod-details view, but not in the dashboard, see screenshots. i have restarted the electron app, try to check with agent browser and create screenshots

### Prompt 12

yes proceed with A, i think we can just persist the backdrop for recently watched or favorites when we click on favorite item or item started to play and was added to "recently watched", because when we do that, it's either from the vod-details or series-details view, where we have the backdropUrl image info (could be called differently for stalker or maybe it's unified, check in code)

### Prompt 13

what do you think about adding a slider to the "continue watching" hero in the dashboard with 5 recently watched items, and  showing dots for items that are clickable but also slowly rotating through in endless cycle? use /frontend-design

### Prompt 14

okay i think we don't need it since  "You already have a "Recently Watched" rail directly below showing the same items". another question, how many recently items do we show now, is there a limit in that query? maby e we can limit it to speed up the loading time, and there is also manage all button to see them all

### Prompt 15

please check the font usage and typography and all the labels, panel headers, subtitles, count badges etc in hero and panels in the dashboard one more time so that everyhing looks solid and professional for a streaming app. i have restarted the app, so you should be able to connect with agent-browser. use /frontend-design and /userinterface-wiki

### Prompt 16

in rails, what do you think about the style of buttons to navigate in a rail to left and/or right, somehow the form is not to easy to hit and colors are too close to background and placeholder items, or what do yo u think? maybe we can improve it, any ideas?

### Prompt 17

for xtream we have @libs/portal/xtream/feature/src/lib/recently-added view where we also have rails for different types of content, can you apply similar ui changes or reuse the same styling for that views as well just like in the dashboard?

### Prompt 18

sometimes there is a border around rail in @libs/portal/xtream/feature/src/lib/recently-added component, can you remove it? and when the view is loading there are no ghosts/skeletons there, can you add them?

### Prompt 19

in @libs/portal/xtream/feature/src/lib/recently-added view, similar to the buttons "manage all" in dashboard rails, add similar buttons with proper label that would navigate from rails to the type sections - vod/live tv/serials

### Prompt 20

looks amazing. the skeletons/ghosts are quite cool and precise in @libs/portal/xtream/feature/src/lib/recently-added component, can we add similar to the dashboard rails as well?

### Prompt 21

the continue watching label in hero panel, for white theme especially sometiimes it looks not so good readable, any idea how to improve that? move it outside, remove it completely, or change the color, add background. what do yout hink? /userinterface-wiki  /frontend-design  what do you think? what is good option? /sc-brainstorm

### Prompt 22

good, do option B

### Prompt 23

ok, remove it, i think it's not needed since there is a button saying same. make sure to remove the "continue watching" label placeholder from the ghost/skeleton of the hero as well

