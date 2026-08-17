# DOOM-style platformer — JS port

A 2D platformer originally written in C++ with SFML, ported to plain JavaScript and Canvas 2D — no external libraries, no build step.

Originally paired with a friend's pseudo-3D raycasting engine ([SDL project](https://github.com/Rblba20/pseudo-doom)) as a companion mini-game: bullets collected here carried over into the other game via a shared save file.

## Run it

Serve the folder over HTTP (ES modules don't load from `file://`), for example:

```
python -m http.server 8000
```

Then open `http://localhost:8000/` in a browser.

## Structure

- `index.html`, `style.css` — page shell
- `js/constants.js` — tuning constants
- `js/map.js` — level data, tile lookup, procedural map generator
- `js/player.js` — player physics and collision
- `js/enemy.js` — enemy behaviors
- `js/game.js` — asset loading, menu, input, render loop
