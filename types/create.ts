export type TextHierarchy = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'paragraph' | 'blockquote';

export type CodeLanguage = 'python' | 'text' | 'readme' | 'dockerfile' | 'json';

export type NoticeType = 'info' | 'warning' | 'error' | 'success';

export type BlockType = 'text' | 'code' | 'notice' | 'list';

export interface BaseBlock {
  id: string;
  type: BlockType;
}

export interface TextBlock extends BaseBlock {
  type: 'text';
  content: string;
  hierarchy: TextHierarchy;
}

export interface CodeBlock extends BaseBlock {
  type: 'code';
  content: string;
  language: CodeLanguage;
}

export interface NoticeBlock extends BaseBlock {
  type: 'notice';
  content: string;
  noticeType: NoticeType;
  format: 'text' | 'markdown';
}

export interface ListBlock extends BaseBlock {
  type: 'list';
  items: string[];
}

export type Block = TextBlock | CodeBlock | NoticeBlock | ListBlock;

export interface TabContent {
  overview: Block[];
  implementation: Block[];
}

export interface DragState {
  draggedBlock: Block | null;
  dragOverIndex: number | null;
}