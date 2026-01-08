// Main plugin code for Smart Find & Replace (TypeScript version)
figma.showUI(__html__, { width: 380, height: 600 });

interface SearchOptions {
  wholeWord: boolean;
  caseSensitive: boolean;
  exactPhrase: boolean;
  selectionOnly: boolean;
}

interface MatchResult {
  node: TextNode;
  layerName: string;
  preview: string;
}

interface MatchData {
  layerName: string;
  preview: string;
}

// Helper function to escape regex special characters
function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Helper function to create regex pattern based on options
function createSearchPattern(searchText: string, options: SearchOptions): RegExp {
  let pattern = escapeRegex(searchText);
  
  if (options.wholeWord) {
    // Match whole words only using word boundaries
    pattern = `\\b${pattern}\\b`;
  }
  
  const flags = options.caseSensitive ? 'g' : 'gi';
  return new RegExp(pattern, flags);
}

// Helper function to check if text matches according to options
function textMatches(text: string, searchText: string, options: SearchOptions): boolean {
  if (options.exactPhrase) {
    // For exact phrase matching
    if (options.caseSensitive) {
      return text.includes(searchText);
    } else {
      return text.toLowerCase().includes(searchText.toLowerCase());
    }
  } else {
    // Use regex for more flexible matching
    const pattern = createSearchPattern(searchText, options);
    return pattern.test(text);
  }
}

// Helper function to get all text nodes
function getTextNodes(node: PageNode, selectionOnly: boolean): TextNode[] {
  const textNodes: TextNode[] = [];
  
  if (selectionOnly) {
    // Only search in selected nodes and their children
    const selection = figma.currentPage.selection;
    if (selection.length === 0) {
      return textNodes;
    }
    
    for (const selectedNode of selection) {
      collectTextNodes(selectedNode, textNodes);
    }
  } else {
    // Search the entire page
    collectTextNodes(figma.currentPage, textNodes);
  }
  
  return textNodes;
}

function collectTextNodes(node: BaseNode, textNodes: TextNode[]): void {
  if (node.type === 'TEXT') {
    textNodes.push(node);
  }
  
  if ('children' in node) {
    for (const child of node.children) {
      collectTextNodes(child, textNodes);
    }
  }
}

// Helper function to get preview text with context
function getPreviewText(text: string, searchText: string, options: SearchOptions): string {
  const maxLength = 100;
  let preview = text;
  
  // Truncate if too long
  if (preview.length > maxLength) {
    if (options.exactPhrase) {
      const searchIndex = options.caseSensitive 
        ? text.indexOf(searchText)
        : text.toLowerCase().indexOf(searchText.toLowerCase());
      
      if (searchIndex !== -1) {
        const start = Math.max(0, searchIndex - 30);
        const end = Math.min(text.length, searchIndex + searchText.length + 30);
        preview = (start > 0 ? '...' : '') + 
                  text.substring(start, end) + 
                  (end < text.length ? '...' : '');
      } else {
        preview = text.substring(0, maxLength) + '...';
      }
    } else {
      preview = text.substring(0, maxLength) + '...';
    }
  }
  
  return preview;
}

// Main find function
async function findMatches(searchText: string, options: SearchOptions): Promise<MatchResult[]> {
  try {
    const textNodes = getTextNodes(figma.currentPage, options.selectionOnly);
    const matches: MatchResult[] = [];
    
    for (const node of textNodes) {
      await figma.loadFontAsync(node.fontName as FontName);
      
      if (textMatches(node.characters, searchText, options)) {
        matches.push({
          node: node,
          layerName: node.name,
          preview: getPreviewText(node.characters, searchText, options)
        });
      }
    }
    
    return matches;
  } catch (error) {
    console.error('Error finding matches:', error);
    throw error;
  }
}

// Main replace function
async function replaceMatches(searchText: string, replaceText: string, options: SearchOptions): Promise<number> {
  try {
    const textNodes = getTextNodes(figma.currentPage, options.selectionOnly);
    let replaceCount = 0;
    
    for (const node of textNodes) {
      await figma.loadFontAsync(node.fontName as FontName);
      const originalText = node.characters;
      
      if (!textMatches(originalText, searchText, options)) {
        continue;
      }
      
      let newText: string | undefined;
      
      if (options.exactPhrase) {
        // Replace exact phrase matches
        if (options.caseSensitive) {
          // Case sensitive replacement
          let tempText = originalText;
          let replaced = false;
          while (tempText.includes(searchText)) {
            tempText = tempText.replace(searchText, replaceText);
            replaced = true;
          }
          if (replaced) {
            newText = tempText;
          }
        } else {
          // Case insensitive replacement
          const regex = new RegExp(escapeRegex(searchText), 'gi');
          newText = originalText.replace(regex, replaceText);
        }
      } else {
        // Use regex pattern for replacement
        const pattern = createSearchPattern(searchText, options);
        newText = originalText.replace(pattern, replaceText);
      }
      
      if (newText !== undefined && newText !== originalText) {
        node.characters = newText;
        replaceCount++;
      }
    }
    
    return replaceCount;
  } catch (error) {
    console.error('Error replacing matches:', error);
    throw error;
  }
}

// Message handler
figma.ui.onmessage = async (msg: any) => {
  if (msg.type === 'find') {
    try {
      const matches = await findMatches(msg.find, msg.options);
      
      // Send results back to UI
      figma.ui.postMessage({
        type: 'find-results',
        count: matches.length,
        matches: matches.map(m => ({
          layerName: m.layerName,
          preview: m.preview
        }))
      });
      
      // Select the matching nodes for visual feedback
      if (matches.length > 0) {
        figma.currentPage.selection = matches.map(m => m.node);
        figma.viewport.scrollAndZoomIntoView(matches.map(m => m.node));
      }
    } catch (error: any) {
      figma.ui.postMessage({
        type: 'error',
        message: error.message
      });
    }
  } else if (msg.type === 'replace-all') {
    try {
      const count = await replaceMatches(msg.find, msg.replace, msg.options);
      
      figma.ui.postMessage({
        type: 'replace-results',
        count: count
      });
      
      if (count > 0) {
        figma.notify(`✅ Replaced ${count} match${count !== 1 ? 'es' : ''}`);
      }
    } catch (error: any) {
      figma.ui.postMessage({
        type: 'error',
        message: error.message
      });
      figma.notify(`❌ Error: ${error.message}`, { error: true });
    }
  } else if (msg.type === 'close') {
    figma.closePlugin();
  }
};
