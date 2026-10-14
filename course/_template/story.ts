import type { Story } from "../../lib/story-types";

export const story: Story = {
  title: "Journey title",
  subtitle: "The Math History Series · Part N",
  beats: [
    {
      id: "opening",
      blocks: [
        // { type: "image", src: "/course/NNN-your-slug/assets/image01.png", alt: "Describe the image." },
        { type: "highlight", text: "A short, striking line." },
        { type: "text", text: "Introduce the mathematical question here." },
      ],
    },
    {
      id: "question",
      blocks: [{ type: "question", text: "What would you do?" }],
    },
  ],
};
