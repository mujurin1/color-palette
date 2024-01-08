
export interface Node {
  childNodes: Node[];
}

export interface RootNode extends Node { }

export interface ParagraphNode extends Node { }

export interface TextNode extends Node { }

export interface LinkNode extends Node { }
