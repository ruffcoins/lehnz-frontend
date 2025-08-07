'use client';

import React, { useState, useRef, useEffect } from 'react';
import { BookOpen, Code, GripVertical, Trash2, Type, AlertCircle, List, Plus, Copy, Check } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import ReactMarkdown from 'react-markdown';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  Block, 
  TextBlock, 
  CodeBlock, 
  NoticeBlock, 
  ListBlock, 
  TabContent, 
  DragState,
  BlockType,
  TextHierarchy,
  CodeLanguage,
  NoticeType
} from '@/types/create';

const generateId = () => Math.random().toString(36).substr(2, 9);

const initialContent: TabContent = {
  overview: [
    {
      id: generateId(),
      type: 'text',
      content: 'Welcome to the Documentation Editor',
      hierarchy: 'h1'
    } as TextBlock
  ],
  implementation: [
    {
      id: generateId(),
      type: 'code',
      content: `# Project Documentation

## Overview
This is a comprehensive documentation example showing how to use README formatting in code blocks.

## Installation
\`\`\`bash
npm install my-package
\`\`\`

## Usage
1. Import the component
2. Configure settings
3. Start building!

## Features
- **Bold text** for emphasis
- *Italic text* for subtle emphasis
- [Links](https://example.com) to resources
- \`Inline code\` for technical terms

> **Note**: This is a blockquote example showing important information.

## Code Example
\`\`\`javascript
function greet(name) {
  return \`Hello, \${name}!\`;
}
\`\`\`

## Contributing
Please read our [contributing guidelines](CONTRIBUTING.md) before submitting PRs.`,
      language: 'readme'
    } as CodeBlock
  ]
};

export default function CreatePage() {
  const [content, setContent] = useState<TabContent>(initialContent);
  const [dragState, setDragState] = useState<DragState>({
    draggedBlock: null,
    dragOverIndex: null
  });
  const [hoveredBlockId, setHoveredBlockId] = useState<string | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [copiedBlockId, setCopiedBlockId] = useState<string | null>(null);
  const [newlyCreatedBlockId, setNewlyCreatedBlockId] = useState<string | null>(null);
  const [showBlockSelector, setShowBlockSelector] = useState<{tabKey: keyof TabContent, index: number} | null>(null);
  const blockRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Scroll to newly created block
  useEffect(() => {
    if (newlyCreatedBlockId && blockRefs.current[newlyCreatedBlockId]) {
      const blockElement = blockRefs.current[newlyCreatedBlockId];
      if (blockElement) {
        // Small delay to ensure DOM is updated
        setTimeout(() => {
          blockElement.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
            inline: 'nearest'
          });
          // Clear the newly created block ID after scrolling
          setNewlyCreatedBlockId(null);
        }, 100);
      }
    }
  }, [newlyCreatedBlockId]);

  // Language mapping for syntax highlighter
  const getLanguageForHighlighter = (language: CodeLanguage): string => {
    const languageMap: Record<CodeLanguage, string> = {
      python: 'python',
      text: 'text',
      readme: 'markdown',
      dockerfile: 'dockerfile',
      json: 'json'
    };
    return languageMap[language] || 'text';
  };

  // Copy to clipboard functionality
  const copyToClipboard = async (text: string, blockId: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedBlockId(blockId);
      setTimeout(() => setCopiedBlockId(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const addBlock = (tabKey: keyof TabContent, blockType: BlockType, index: number) => {
    const newBlock: Block = (() => {
      const baseId = generateId();
      switch (blockType) {
        case 'text':
          return {
            id: baseId,
            type: 'text',
            content: 'New text block',
            hierarchy: 'paragraph'
          } as TextBlock;
        case 'code':
          return {
            id: baseId,
            type: 'code',
            content: '// Your code here',
            language: 'python'
          } as CodeBlock;
        case 'notice':
          return {
            id: baseId,
            type: 'notice',
            content: 'Important notice',
            noticeType: 'info',
            format: 'text'
          } as NoticeBlock;
        case 'list':
          return {
            id: baseId,
            type: 'list',
            items: ['First item']
          } as ListBlock;
        default:
          throw new Error(`Unknown block type: ${blockType}`);
      }
    })();

    setContent(prev => ({
      ...prev,
      [tabKey]: [
        ...prev[tabKey].slice(0, index),
        newBlock,
        ...prev[tabKey].slice(index)
      ]
    }));

    // Set the newly created block ID for scrolling
    setNewlyCreatedBlockId(newBlock.id);
  };

  const updateBlock = (tabKey: keyof TabContent, blockId: string, updates: Partial<Block>) => {
    setContent(prev => ({
      ...prev,
      [tabKey]: prev[tabKey].map(block =>
        block.id === blockId ? { ...block, ...updates } : block
      )
    }));
  };

  const deleteBlock = (tabKey: keyof TabContent, blockId: string) => {
    setContent(prev => ({
      ...prev,
      [tabKey]: prev[tabKey].filter(block => block.id !== blockId)
    }));
  };

  const moveBlock = (tabKey: keyof TabContent, fromIndex: number, toIndex: number) => {
    setContent(prev => {
      const blocks = [...prev[tabKey]];
      const [movedBlock] = blocks.splice(fromIndex, 1);
      blocks.splice(toIndex, 0, movedBlock);
      return {
        ...prev,
        [tabKey]: blocks
      };
    });
  };

  const handleDragStart = (e: React.DragEvent, block: Block, index: number) => {
    setDragState({ draggedBlock: block, dragOverIndex: null });
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', (e.currentTarget as HTMLElement).outerHTML);
    (e.currentTarget as HTMLElement).style.opacity = '0.5';
  };

  const handleDragEnd = (e: React.DragEvent) => {
    (e.currentTarget as HTMLElement).style.opacity = '';
    setDragState({ draggedBlock: null, dragOverIndex: null });
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragState(prev => ({ ...prev, dragOverIndex: index }));
  };

  const handleDrop = (e: React.DragEvent, tabKey: keyof TabContent, dropIndex: number) => {
    e.preventDefault();
    if (dragState.draggedBlock) {
      const draggedIndex = content[tabKey].findIndex(block => block.id === dragState.draggedBlock!.id);
      if (draggedIndex !== -1 && draggedIndex !== dropIndex) {
        moveBlock(tabKey, draggedIndex, dropIndex);
      }
    }
    setDragState({ draggedBlock: null, dragOverIndex: null });
  };

  const renderTextBlock = (block: TextBlock, tabKey: keyof TabContent) => {
    const getTextStyle = (hierarchy: TextHierarchy) => {
      const styles = {
        h1: 'text-4xl font-bold',
        h2: 'text-3xl font-semibold',
        h3: 'text-2xl font-semibold',
        h4: 'text-xl font-semibold',
        h5: 'text-lg font-medium',
        h6: 'text-base font-medium',
        paragraph: 'text-base',
        blockquote: 'text-base italic border-l-4 border-gray-300 bg-gray-50 pl-4'
      };
      return styles[hierarchy] || styles.paragraph;
    };

    return (
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Select
            value={block.hierarchy}
            onValueChange={(value: TextHierarchy) => 
              updateBlock(tabKey, block.id, { hierarchy: value })
            }
          >
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="h1">Heading 1</SelectItem>
              <SelectItem value="h2">Heading 2</SelectItem>
              <SelectItem value="h3">Heading 3</SelectItem>
              <SelectItem value="h4">Heading 4</SelectItem>
              <SelectItem value="h5">Heading 5</SelectItem>
              <SelectItem value="h6">Heading 6</SelectItem>
              <SelectItem value="paragraph">Paragraph</SelectItem>
              <SelectItem value="blockquote">Blockquote</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Textarea
          value={block.content}
          onChange={(e) => updateBlock(tabKey, block.id, { content: e.target.value })}
          className="min-h-[80px]"
          placeholder="Enter your text..."
        />
        <div className={`p-3 rounded border ${getTextStyle(block.hierarchy)}`}>
          {block.content || 'Preview will appear here...'}
        </div>
      </div>
    );
  };

  const renderCodeBlock = (block: CodeBlock, tabKey: keyof TabContent) => (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Select
          value={block.language}
          onValueChange={(value: CodeLanguage) => 
            updateBlock(tabKey, block.id, { language: value })
          }
        >
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="python">Python</SelectItem>
            <SelectItem value="text">Text</SelectItem>
            <SelectItem value="readme">Readme</SelectItem>
            <SelectItem value="dockerfile">Dockerfile</SelectItem>
            <SelectItem value="json">JSON</SelectItem>
          </SelectContent>
        </Select>
        
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="text-xs"
          >
            {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => copyToClipboard(block.content, block.id)}
            className="flex items-center gap-1"
          >
            {copiedBlockId === block.id ? (
              <>
                <Check className="h-3 w-3" />
                <span className="text-xs">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="h-3 w-3" />
                <span className="text-xs">Copy</span>
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Editor */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Editor</label>
          <Textarea
            value={block.content}
            onChange={(e) => updateBlock(tabKey, block.id, { content: e.target.value })}
            className="font-mono min-h-[200px] text-sm"
            placeholder="Enter your code..."
          />
        </div>

                {/* Preview */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Preview</label>
          <div className="relative">
            {block.language === 'readme' ? (
              <div className={`border rounded-lg p-4 min-h-[200px] overflow-auto ${theme === 'dark' ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
                <div className="prose prose-sm max-w-none">
                  <ReactMarkdown 
                    components={{
                      // Override default styles to match code block theme
                      h1: ({children}) => <h1 className="text-lg font-bold mb-2 text-blue-400">{children}</h1>,
                      h2: ({children}) => <h2 className="text-base font-semibold mb-2 text-blue-300">{children}</h2>,
                      h3: ({children}) => <h3 className="text-sm font-semibold mb-1 text-blue-200">{children}</h3>,
                      p: ({children}) => <p className="mb-2 last:mb-0">{children}</p>,
                      ul: ({children}) => <ul className="list-disc list-inside mb-2 space-y-1 ml-4">{children}</ul>,
                      ol: ({children}) => <ol className="list-decimal list-inside mb-2 space-y-1 ml-4">{children}</ol>,
                      li: ({children}) => <li className="text-sm">{children}</li>,
                      code: ({children}) => (
                        <code className={`px-1 py-0.5 rounded text-xs font-mono ${theme === 'dark' ? 'bg-gray-800 text-green-300' : 'bg-gray-200 text-green-700'}`}>
                          {children}
                        </code>
                      ),
                      pre: ({children}) => (
                        <pre className={`p-2 rounded text-xs font-mono overflow-x-auto mb-2 ${theme === 'dark' ? 'bg-gray-800 text-green-300' : 'bg-gray-200 text-green-700'}`}>
                          {children}
                        </pre>
                      ),
                      blockquote: ({children}) => (
                        <blockquote className={`border-l-2 pl-3 italic mb-2 ${theme === 'dark' ? 'border-gray-600 text-gray-300' : 'border-gray-400 text-gray-600'}`}>
                          {children}
                        </blockquote>
                      ),
                      a: ({children, href}) => (
                        <a href={href} className="underline hover:no-underline text-blue-400 hover:text-blue-300">
                          {children}
                        </a>
                      ),
                      strong: ({children}) => <strong className="font-bold text-yellow-300">{children}</strong>,
                      em: ({children}) => <em className="italic">{children}</em>,
                    }}
                  >
                    {block.content || '# Your README will appear here...'}
                  </ReactMarkdown>
                </div>
              </div>
            ) : (
              <SyntaxHighlighter
                language={getLanguageForHighlighter(block.language)}
                style={theme === 'dark' ? oneDark : oneLight}
                customStyle={{
                  margin: 0,
                  borderRadius: '6px',
                  fontSize: '14px',
                  minHeight: '200px',
                }}
                showLineNumbers={true}
                wrapLines={true}
              >
                {block.content || '// Your code will appear here...'}
              </SyntaxHighlighter>
            )}
          </div>
        </div>
      </div>

      {/* Language-specific formatting tips */}
      <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <h4 className="text-sm font-medium text-blue-800 mb-2">
          {block.language.charAt(0).toUpperCase() + block.language.slice(1)} Formatting Tips:
        </h4>
        <div className="text-xs text-blue-700">
          {block.language === 'python' && (
            <ul className="list-disc list-inside space-y-1">
              <li>Use 4 spaces for indentation</li>
              <li>Follow PEP 8 style guidelines</li>
              <li>Use descriptive variable names</li>
            </ul>
          )}
          {block.language === 'json' && (
            <ul className="list-disc list-inside space-y-1">
              <li>Use double quotes for strings</li>
              <li>No trailing commas allowed</li>
              <li>Proper nesting and indentation</li>
            </ul>
          )}
          {block.language === 'dockerfile' && (
            <ul className="list-disc list-inside space-y-1">
              <li>Use UPPERCASE for instructions</li>
              <li>Minimize the number of layers</li>
              <li>Use specific version tags</li>
            </ul>
          )}
          {block.language === 'readme' && (
            <ul className="list-disc list-inside space-y-1">
              <li>Use clear headings and structure</li>
              <li>Include code examples in fenced blocks</li>
              <li>Add badges and links where appropriate</li>
            </ul>
          )}
          {block.language === 'text' && (
            <ul className="list-disc list-inside space-y-1">
              <li>Plain text formatting</li>
              <li>No syntax highlighting applied</li>
              <li>Good for configuration files or logs</li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );

  const renderNoticeBlock = (block: NoticeBlock, tabKey: keyof TabContent) => {
    const getNoticeStyle = (noticeType: NoticeType) => {
      const styles = {
        info: 'border-blue-200 bg-blue-50 text-blue-800',
        warning: 'border-yellow-200 bg-yellow-50 text-yellow-800',
        error: 'border-red-200 bg-red-50 text-red-800',
        success: 'border-green-200 bg-green-50 text-green-800'
      };
      return styles[noticeType];
    };

    return (
      <div className="space-y-3">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700">Type:</label>
            <Select
              value={block.noticeType}
              onValueChange={(value: NoticeType) => 
                updateBlock(tabKey, block.id, { noticeType: value })
              }
            >
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="info">Info</SelectItem>
                <SelectItem value="warning">Warning</SelectItem>
                <SelectItem value="error">Error</SelectItem>
                <SelectItem value="success">Success</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700">Format:</label>
            <Select
              value={block.format}
              onValueChange={(value: 'text' | 'markdown') => 
                updateBlock(tabKey, block.id, { format: value })
              }
            >
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="text">Plain Text</SelectItem>
                <SelectItem value="markdown">Markdown</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Editor */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Content</label>
            <Textarea
              value={block.content}
              onChange={(e) => updateBlock(tabKey, block.id, { content: e.target.value })}
              className="min-h-[120px] text-sm"
              placeholder={block.format === 'markdown' 
                ? "Enter markdown content...\n\n**Bold text**\n*Italic text*\n- List item\n[Link](url)"
                : "Enter notice content..."
              }
            />
          </div>

          {/* Preview */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Preview</label>
            <div className={`p-4 rounded border-2 min-h-[120px] ${getNoticeStyle(block.noticeType)}`}>
              {block.content ? (
                block.format === 'markdown' ? (
                  <div className="prose prose-sm max-w-none">
                    <ReactMarkdown 
                      components={{
                      // Override default styles to match notice theme
                      h1: ({children}) => <h1 className="text-lg font-bold mb-2">{children}</h1>,
                      h2: ({children}) => <h2 className="text-base font-semibold mb-2">{children}</h2>,
                      h3: ({children}) => <h3 className="text-sm font-semibold mb-1">{children}</h3>,
                      p: ({children}) => <p className="mb-2 last:mb-0">{children}</p>,
                      ul: ({children}) => <ul className="list-disc list-inside mb-2 space-y-1">{children}</ul>,
                      ol: ({children}) => <ol className="list-decimal list-inside mb-2 space-y-1">{children}</ol>,
                      li: ({children}) => <li className="text-sm">{children}</li>,
                      code: ({children}) => <code className="bg-black/10 px-1 py-0.5 rounded text-xs font-mono">{children}</code>,
                      pre: ({children}) => <pre className="bg-black/10 p-2 rounded text-xs font-mono overflow-x-auto mb-2">{children}</pre>,
                      blockquote: ({children}) => <blockquote className="border-l-2 border-current pl-3 italic mb-2">{children}</blockquote>,
                      a: ({children, href}) => <a href={href} className="underline hover:no-underline">{children}</a>,
                      strong: ({children}) => <strong className="font-bold">{children}</strong>,
                      em: ({children}) => <em className="italic">{children}</em>,
                    }}
                                        >
                      {block.content}
                    </ReactMarkdown>
                  </div>
                ) : (
                  <span className="text-sm whitespace-pre-wrap">{block.content}</span>
                )
              ) : (
                <span className="text-sm opacity-60">
                  {block.format === 'markdown' 
                    ? 'Markdown preview will appear here...' 
                    : 'Notice preview will appear here...'
                  }
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Formatting help */}
        {block.format === 'markdown' && (
          <div className="mt-4 p-3 bg-gray-50 border border-gray-200 rounded-lg">
            <h4 className="text-sm font-medium text-gray-800 mb-2">Markdown Formatting Guide:</h4>
            <div className="text-xs text-gray-600 grid grid-cols-1 md:grid-cols-2 gap-2">
              <div>
                <div><code>**bold**</code> → <strong>bold</strong></div>
                <div><code>*italic*</code> → <em>italic</em></div>
                <div><code>[link](url)</code> → <a href="#" className="underline">link</a></div>
              </div>
              <div>
                <div><code>- list item</code> → bullet list</div>
                <div><code>1. numbered</code> → numbered list</div>
                <div><code>`code`</code> → <code className="bg-gray-200 px-1 rounded">code</code></div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderListBlock = (block: ListBlock, tabKey: keyof TabContent) => (
    <div className="space-y-3">
      {block.items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <span className="text-lg">•</span>
          <Input
            value={item}
            onChange={(e) => {
              const newItems = [...block.items];
              newItems[index] = e.target.value;
              updateBlock(tabKey, block.id, { items: newItems });
            }}
            className="flex-1"
            placeholder="List item..."
          />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              const newItems = block.items.filter((_, i) => i !== index);
              updateBlock(tabKey, block.id, { items: newItems });
            }}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ))}
      <Button
        variant="outline"
        size="sm"
        onClick={() => {
          const newItems = [...block.items, ''];
          updateBlock(tabKey, block.id, { items: newItems });
        }}
      >
        <Plus className="h-4 w-4 mr-1" />
        Add Item
      </Button>
    </div>
  );

  const getBlockIcon = (type: BlockType) => {
    const icons = {
      text: Type,
      code: Code,
      notice: AlertCircle,
      list: List
    };
    const Icon = icons[type];
    return <Icon className="h-4 w-4" />;
  };

  const BlockSelector = ({ tabKey, index }: { tabKey: keyof TabContent, index: number }) => {
    const blockTypes: { type: BlockType; label: string; description: string; icon: React.ComponentType<any> }[] = [
      { type: 'text', label: 'Text Block', description: 'Add headings, paragraphs, and formatted text', icon: Type },
      { type: 'code', label: 'Code Block', description: 'Add syntax-highlighted code with multiple languages', icon: Code },
      { type: 'notice', label: 'Notice Block', description: 'Add info, warning, error, or success notices', icon: AlertCircle },
      { type: 'list', label: 'List Block', description: 'Add bullet-point or numbered lists', icon: List }
    ];

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
          <h3 className="text-lg font-semibold mb-4">Add New Block</h3>
          <div className="space-y-2">
            {blockTypes.map(({ type, label, description, icon: Icon }) => (
              <button
                key={type}
                onClick={() => {
                  addBlock(tabKey, type, index);
                  setShowBlockSelector(null);
                }}
                className="w-full p-3 text-left border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Icon className="h-5 w-5 text-gray-600" />
                  <div>
                    <div className="font-medium text-gray-900">{label}</div>
                    <div className="text-sm text-gray-500">{description}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
          <button
            onClick={() => setShowBlockSelector(null)}
            className="mt-4 w-full p-2 text-gray-500 hover:text-gray-700 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  };

  const renderBlock = (block: Block, tabKey: keyof TabContent, index: number) => {
    const isBeingDragged = dragState.draggedBlock?.id === block.id;
    const isDropTarget = dragState.dragOverIndex === index && dragState.draggedBlock?.id !== block.id;

    return (
      <div
        key={block.id}
        ref={(el) => {
          blockRefs.current[block.id] = el;
        }}
        className={`relative ${isBeingDragged ? 'opacity-50' : ''} ${isDropTarget ? 'ring-2 ring-blue-500' : ''}`}
        draggable
        onDragStart={(e) => handleDragStart(e, block, index)}
        onDragEnd={handleDragEnd}
        onDragOver={(e) => handleDragOver(e, index)}
        onDrop={(e) => handleDrop(e, tabKey, index)}
        onMouseEnter={() => setHoveredBlockId(block.id)}
        onMouseLeave={() => setHoveredBlockId(null)}
      >
        {hoveredBlockId === block.id && (
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-10 flex gap-1 bg-white border rounded-lg shadow-lg p-1">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => addBlock(tabKey, 'text', index + 1)}
            >
              <Type className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => addBlock(tabKey, 'code', index + 1)}
            >
              <Code className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => addBlock(tabKey, 'notice', index + 1)}
            >
              <AlertCircle className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => addBlock(tabKey, 'list', index + 1)}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        )}
        
        <Card className="mb-4">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="flex items-center gap-2">
              <GripVertical className="h-4 w-4 text-gray-400 cursor-grab" />
              {getBlockIcon(block.type)}
              <Badge variant="secondary" className="capitalize">
                {block.type}
              </Badge>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => deleteBlock(tabKey, block.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            {block.type === 'text' && renderTextBlock(block as TextBlock, tabKey)}
            {block.type === 'code' && renderCodeBlock(block as CodeBlock, tabKey)}
            {block.type === 'notice' && renderNoticeBlock(block as NoticeBlock, tabKey)}
            {block.type === 'list' && renderListBlock(block as ListBlock, tabKey)}
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {showBlockSelector && (
        <BlockSelector 
          tabKey={showBlockSelector.tabKey} 
          index={showBlockSelector.index} 
        />
      )}
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Create Content</h1>
          <p className="text-lg text-gray-600">
            Build comprehensive documentation with our block-based editor
          </p>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="implementation" className="flex items-center gap-2">
              <Code className="h-4 w-4" />
              Implementation
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <Card>
              <CardHeader>
                <h2 className="text-2xl font-semibold">Project Overview</h2>
                <p className="text-gray-600">
                  Define the high-level structure and goals of your documentation
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {content.overview.map((block, index) => 
                    renderBlock(block, 'overview', index)
                  )}
                  <Button
                    variant="outline"
                    onClick={() => setShowBlockSelector({ tabKey: 'overview', index: content.overview.length })}
                    className="w-full"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Block
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="implementation">
            <Card>
              <CardHeader>
                <h2 className="text-2xl font-semibold">Implementation Details</h2>
                <p className="text-gray-600">
                  Provide technical specifications and code examples
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {content.implementation.map((block, index) => 
                    renderBlock(block, 'implementation', index)
                  )}
                  <Button
                    variant="outline"
                    onClick={() => setShowBlockSelector({ tabKey: 'implementation', index: content.implementation.length })}
                    className="w-full"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Block
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}