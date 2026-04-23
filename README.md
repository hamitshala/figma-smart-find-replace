# Smart Find & Replace for Figma

A Figma plugin that gives you precise control over finding and replacing text — without accidentally replacing unintended occurrences the way Figma's native find & replace does.

## Why it exists

Figma's built‑in find & replace is too eager. Searching for `kitty` replaces it everywhere, including inside `Hello what's up, Kitty?` when all you wanted to change was `Hello kitty`.

This plugin adds the matching controls that are missing: whole‑word, exact phrase, case sensitivity, and scoped search — so every replacement is the one you intended.

## Features

- **Whole word matching** — only match complete words, not substrings
- **Exact phrase matching** — match the full phrase, not loose fragments
- **Case sensitivity** — choose whether `Kitty` should match `kitty`
- **Search in selection only** — limit the scope to selected layers or frames
- **Live preview** — see every match before replacing anything
- **Match counter** — know exactly how many hits you're about to change
- **Visual feedback** — matched layers are auto‑selected and zoomed to

## Installation

The plugin runs as a local development plugin in Figma Desktop.

1. Download or clone this repo so `manifest.json`, `code.js`, and `ui.html` all live in the same folder.
2. Open **Figma Desktop** (the browser version does not support local plugins).
3. Go to **Menu → Plugins → Development → Import plugin from manifest…**
4. Select the `manifest.json` file from the folder.

The plugin now appears under **Plugins → Development → Smart Find & Replace**.

## Usage

1. Open the plugin from **Plugins → Development → Smart Find & Replace**.
2. Enter the text to find and the replacement text.
3. Choose your matching options (defaults are a good starting point).
4. Click **Find Matches** to preview — matched layers are selected on the canvas.
5. Click **Replace All** to apply.

## Options

| Option | Default | Behavior |
|---|---|---|
| Match whole words only | On | `kitty` matches `kitty` but not `skitty` or `kittylicious` |
| Match exact phrase | On | `Hello kitty` matches only `Hello kitty`, not `Hello there kitty` |
| Case sensitive | Off | When on, `Kitty` and `kitty` are treated as different |
| Search in selection only | Off | When on, only searches within currently selected layers |

## Common scenarios

**Replace a phrase in one place only**
Change `Hello kitty` → `Hello mama` without touching `Hey there, Kitty!`.
→ Enable *whole words* and *exact phrase*.

**Replace a word everywhere**
Change every `kitty` → `mama`, regardless of surrounding text.
→ Keep *whole words* on, turn *exact phrase* off.

**Replace only inside specific frames**
Select the frames first, then enable *Search in selection only*.

**Replace `API` but not `api`**
Enable *case sensitive* along with *whole words*.

## Troubleshooting

**"No matches found" but you can see the text.**
Try turning off *case sensitive*, *whole words*, or *exact phrase* — one of them is likely filtering it out.

**Too many matches.**
Enable *exact phrase* and *whole words*, or narrow the scope with *search in selection only*.

**Plugin doesn't appear in the menu.**
Make sure you're using Figma Desktop (not the browser), and that `manifest.json`, `code.js`, and `ui.html` are all in the same folder. Re‑importing the manifest usually fixes a missing entry.

## Tips

- Always preview with **Find Matches** before hitting **Replace All**.
- For large content passes, work one section at a time using *search in selection only*.
- When in doubt, start with *exact phrase* on and loosen from there.

## License

Free to use for personal and commercial projects.
