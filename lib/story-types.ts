export type StoryTextBlock = {
  type: "text";
  text: string;
};

export type StoryHighlightBlock = {
  type: "highlight";
  text: string;
};

export type StoryQuestionBlock = {
  type: "question";
  text: string;
};

export type StoryImageBlock = {
  type: "image";
  src: string;
  alt: string;
};

export type StoryListBlock = {
  type: "list";
  items: string[];
};

export type StoryBlock =
  | StoryTextBlock
  | StoryHighlightBlock
  | StoryQuestionBlock
  | StoryImageBlock
  | StoryListBlock;

export type StoryBeat = {
  id: string;
  blocks: StoryBlock[];
};

export type Story = {
  title: string;

  /* Subtitle belongs to the story header, not to an individual story slide. */
  subtitle?: string;

  beats: StoryBeat[];
};