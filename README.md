# 🎯 Smart Find & Replace for Figma

A powerful Figma plugin that gives you precise control over finding and replacing text, solving the common problem where Figma's native find & replace affects unintended text.

## 🔥 Key Features

### The Problem It Solves
- **Native Figma Issue**: Searching for "kitty" replaces it everywhere, even in "Hello what's up, Kitty?" when you only wanted to change "Hello kitty"
- **Our Solution**: Smart matching options that give you surgical precision

### Main Features
- ✅ **Whole Word Matching** - Only match complete words, not partial matches
- ✅ **Exact Phrase Matching** - Match the entire phrase exactly as written
- ✅ **Case Sensitivity** - Choose whether "Kitty" should match "kitty"
- ✅ **Search in Selection Only** - Limit search to selected layers/frames
- ✅ **Live Preview** - See all matches before replacing anything
- ✅ **Match Counter** - Know exactly how many matches you're dealing with
- ✅ **Visual Feedback** - Automatically selects and zooms to matching layers

## 📦 Installation

### Method 1: Import into Figma Desktop (Recommended)

1. **Download the plugin files** from this folder
2. **Open Figma Desktop app** (not the browser version)
3. Go to **Menu → Plugins → Development → Import plugin from manifest...**
4. Navigate to the folder containing `manifest.json` and select it
5. The plugin is now installed and ready to use!

### Method 2: Manual Setup

1. **Create a new plugin folder** on your computer
2. **Copy these files** into that folder:
   - `manifest.json`
   - `code.js`
   - `ui.html`
3. **Open Figma Desktop**
4. Go to **Menu → Plugins → Development → Import plugin from manifest...**
5. Select the `manifest.json` file from your folder

## 🚀 How to Use

### Basic Usage

1. **Open the plugin**
   - In Figma: Menu → Plugins → Development → Smart Find & Replace

2. **Enter your search text**
   - Type what you want to find (e.g., "kitty")

3. **Enter replacement text**
   - Type what you want to replace it with (e.g., "mama")

4. **Choose your options**
   - ✅ Match whole words only (recommended)
   - ✅ Match exact phrase (recommended)
   - Case sensitive (optional)
   - Search in selection only (optional)

5. **Click "Find Matches"**
   - See preview of all matches
   - Matching layers are automatically selected

6. **Click "Replace All"**
   - All matches are replaced at once
   - Get confirmation of how many replacements were made

### 💡 Use Cases

#### Scenario 1: Replace word in a phrase only
**Problem**: You want to change "Hello kitty" to "Hello mama" but NOT "Hey there, Kitty!"

**Solution**:
- Find: `Hello kitty`
- Replace: `Hello mama`
- ✅ Match exact phrase
- ✅ Match whole words only

#### Scenario 2: Replace a word everywhere
**Problem**: Change all instances of "kitty" to "mama" in your entire design

**Solution**:
- Find: `kitty`
- Replace: `mama`
- ✅ Match whole words only (to avoid matching "skitty")
- ❌ Match exact phrase (OFF - to match it in all contexts)

#### Scenario 3: Replace in selected frames only
**Problem**: Only update text in specific frames/components

**Solution**:
1. Select the frames/layers you want to search in
2. Find: `old text`
3. Replace: `new text`
4. ✅ Search in selection only

#### Scenario 4: Case-specific replacement
**Problem**: Replace "API" but not "api"

**Solution**:
- Find: `API`
- Replace: `Backend`
- ✅ Case sensitive
- ✅ Match whole words only

## ⚙️ Options Explained

### 🎯 Match Whole Words Only (Recommended: ON)
- **ON**: "kitty" only matches "kitty" as a complete word
  - ✅ Matches: "Hello kitty", "kitty is here"
  - ❌ Doesn't match: "skitty", "kittylicious"
- **OFF**: "kitty" matches anywhere in text
  - ✅ Matches: "Hello kitty", "skitty", "kittylicious"

### 📝 Match Exact Phrase (Recommended: ON)
- **ON**: Must match your entire search string exactly
  - Find: "Hello kitty" only matches "Hello kitty"
  - Doesn't match: "Hello there kitty"
- **OFF**: Matches the pattern anywhere in text
  - More flexible but less precise

### Aa Case Sensitive (Recommended: OFF)
- **ON**: "Kitty" ≠ "kitty"
- **OFF**: "Kitty" = "kitty" = "KITTY"

### 🎨 Search in Selection Only
- **ON**: Only searches within selected layers
- **OFF**: Searches entire page
- **Tip**: Select frames/components first, then enable this option

## 🎨 Best Practices

1. **Always preview first** - Click "Find Matches" before "Replace All"
2. **Use "Match whole words"** - Prevents accidental partial replacements
3. **Start specific, then broaden** - Begin with exact phrase matching
4. **Test on selection** - Try on a few frames before doing entire page
5. **Check the counter** - Make sure the number of matches makes sense

## 🐛 Troubleshooting

### "No matches found" but you see the text
- Check if **Case sensitive** is enabled
- Try turning **OFF** "Match whole words"
- Try turning **OFF** "Match exact phrase"

### Too many matches
- Enable **"Match whole words only"**
- Enable **"Match exact phrase"**
- Enable **"Search in selection only"** and select specific layers

### Plugin not appearing
- Make sure you're using **Figma Desktop** (not browser)
- Check that all files are in the same folder
- Try reimporting the plugin manifest

## 📝 Tips for Content Refinement

When doing content refinement across multiple screens:

1. **Work in batches**
   - Select related frames
   - Enable "Search in selection only"
   - Process one section at a time

2. **Use exact phrase for precision**
   - When you know the exact text to replace
   - Prevents unexpected changes

3. **Save time with word-only matching**
   - Avoids matching parts of other words
   - Reduces manual cleanup

4. **Preview is your friend**
   - Always check matches before replacing
   - Confirms you're targeting the right text

## 🔄 Updates and Improvements

This plugin is designed to be:
- **Fast**: Processes large files efficiently
- **Safe**: Preview before committing changes
- **Precise**: Multiple filtering options
- **User-friendly**: Clean, intuitive interface

## 📄 License

Free to use for personal and commercial projects.

## 🙋 Support

If you encounter issues or have suggestions:
1. Check the troubleshooting section
2. Verify all options are configured correctly
3. Try with a simple test case first

---

**Made with ❤️ to solve real content refinement problems in Figma**
