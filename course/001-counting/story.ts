import type { Story } from "../../lib/story-types";

export const story: Story = {
  title: "When Did Humans Begin Counting?",

  subtitle: "The Math History Series · Part 1",

  beats: [
    {
      id: "how-many",
      blocks: [
        {
          type: "image",
          src: "/course/001-counting/assets/mt_01_image01.png",
          alt: "A shepherd wondering whether all his sheep have returned.",
        },
        {
          type: "highlight",
          text: "“How many?”",
        },
        {
          type: "text",
          text: "Someone must have asked this for the first time, long before there was any language to answer it in.",
        },
      ],
    },

    {
      id: "shepherd",
      blocks: [
        {
          type: "text",
          text: "Imagine a shepherd standing at the hillside.",
        },
        {
          type: "text",
          text: "He has sheep. Not four. Not six. Perhaps forty, spread across further than he can take in at a glance.",
        },
        {
          type: "highlight",
          text: "In the morning they go out. In the evening they come back. And there is one thing he needs to know before dark:",
        },
        {
          type: "question",
          text: "Are they all here?",
        },
      ],
    },

    {
      id: "pause",
      blocks: [
        {
          type: "text",
          text: "He has no word for forty. No numerals. No writing. He cannot hold forty in his mind the way he holds his own name.",
        },
        {
          type: "question",
          text: "So what does he do?",
        },
        {
          type: "highlight",
          text: "There is a solution here that needs no numbers at all.",
        },
      ],
    },

    {
      id: "perception",
      blocks: [
        {
          type: "highlight",
          text: "What we have, before we invent anything",
        },
        {
          type: "text",
          text: "Here is something you can test on yourself.",
        },
        {
          type: "text",
          text: "Look at a small cluster of objects — coins, dots, pebbles — without deliberately counting.",
        },
        {
          type: "image",
          src: "/course/001-counting/assets/mt_01_image02.png",
          alt: "Small clusters of objects used to explore perception of quantity.",
        },
      ],
    },

    {
      id: "subitizing",
      blocks: [
        {
          type: "highlight",
          text: "Up to about four, you simply see the quantity.",
        },
        {
          type: "text",
          text: "It arrives whole, instantly, the way colour does. Psychologists call this subitizing.",
        },
        {
          type: "highlight",
          text: "At five or six, something changes.",
        },
        {
          type: "text",
          text: "The instant knowing runs out. You catch yourself counting instead.",
        },
      ],
    },

    {
      id: "approximate",
      blocks: [
        {
          type: "text",
          text: "For very small numbers, we can perceive how many without counting. Beyond that, our perception becomes approximate.",
        },
        {
          type: "text",
          text: "We can tell that one pile is larger than another, or that there are roughly twice as many objects in one group—but we no longer know the exact number at a glance.",
        },
        {
          type: "highlight",
          text: "Everything beyond that small range had to be built.",
        },
      ],
    },

    {
      id: "tribes-question",
      blocks: [
        {
          type: "highlight",
          text: "What happens when a language has only a few number words?",
        },
        {
          type: "text",
          text: "Could you still tell which group has more? Could you keep track of an exact quantity without saying its number?",
        },
        {
          type: "question",
          text: "How would you keep track?",
        },
      ],
    },

    {
      id: "tribes-overview",
      blocks: [
        {
          type: "image",
          src: "/course/001-counting/assets/mt_01_image08.png",
          alt: "An illustration of one-to-one correspondence among the Pirahã.",
        },
        {
          type: "highlight",
          text: "Mundurukú and Pirahã",
        },
        {
          type: "text",
          text: "Two Indigenous peoples of the Amazon whose ways of talking about quantity have been studied. Their examples show that people can compare, estimate, and keep track of quantities in ways that do not depend on a long list of number words.",
        },
        {
          type: "text",
          text: "Different tools. Same human need: to keep track of how much.",
        },
      ],
    },

    {
      id: "one-to-one",
      blocks: [
        {
          type: "highlight",
          text: "Back to the shepherd.",
        },
        {
          type: "text",
          text: "He doesn't need to know forty.",
        },
        {
          type: "text",
          text: "Each morning, as a sheep leaves the pen, he drops a pebble into a pouch. Each evening, as a sheep returns, he takes one out.",
        },
      ],
    },

    {
      id: "correspondence",
      blocks: [
        {
          type: "highlight",
          text: "Pouch empty — all is well. A pebble left over — a sheep is still out there.",
        },
        {
          type: "text",
          text: "He has just tracked a precise quantity he cannot name.",
        },
        {
          type: "highlight",
          text: "This is one-to-one correspondence, and it is older and deeper than counting.",
        },
        {
          type: "text",
          text: "A notch for a sheep. A knot for a day. A pebble for a sack of grain.",
        },
      ],
    },

    {
      id: "ancient-marks",
      blocks: [
        {
          type: "image",
          src: "/course/001-counting/assets/mt_01_image03.png",
          alt: "Ancient tally marks and objects used to keep track of quantities.",
        },
        {
          type: "text",
          text: "The Lebombo bone, found in a cave in southern Africa, carries twenty-nine notches and is thought to be tens of thousands of years old. The Ishango bone, from the Congo, is younger but still ancient, its notches grouped in ways some researchers read as deliberate.",
        },
        {
          type: "highlight",
          text: "We recognise the gesture of correspondence in the marks. We cannot read the intention behind them.",
        },
      ],
    },

    {
      id: "grouping",
      blocks: [
        {
          type: "highlight",
          text: "Where the pebbles stop working",
        },
        {
          type: "text",
          text: "Forty sheep, a pouch of pebbles works beautifully.",
        },
        {
          type: "text",
          text: "Four hundred sheep, and something begins to break down. Not because the idea has stopped working, but because the pouch becomes too large to carry.",
        },
      ],
    },

    {
      id: "bundling",
      blocks: [
        {
          type: "highlight",
          text: "So we bundle.",
        },
        {
          type: "text",
          text: "Ten pebbles become one larger stone. Ten larger stones become something else again.",
        },
        {
          type: "text",
          text: "The moment we begin grouping, we have to make a choice.",
        },
        {
          type: "question",
          text: "How many units before we make a new one?",
        },
      ],
    },

    {
      id: "bases",
      blocks: [
        {
          type: "highlight",
          text: "Ten is one answer. But it could have been five. Or twenty. Or sixty.",
        },
        {
          type: "text",
          text: "Something that began as a practical way to keep track of sheep becomes a way of organising numbers themselves.",
        },
      ],
    },

    {
      id: "egypt",
      blocks: [
        {
          type: "highlight",
          text: "The Egyptians grouped by ten.",
        },
        {
          type: "text",
          text: "They gave each level of grouping its own fresh symbol — a stroke for one, a heel bone for ten, a coiled rope for a hundred, and so on, all the way up to a million.",
        },
        {
          type: "image",
          src: "/course/001-counting/assets/mt_01_image04.png",
          alt: "Egyptian number symbols.",
        },
      ],
    },

    {
      id: "egypt-limit",
      blocks: [
        {
          type: "text",
          text: "Seven symbols in total. Only seven symbols in total.",
        },
        {
          type: "text",
          text: "It worked beautifully for recording numbers. To write 3,604, you needed three thousand-symbols, six hundred-symbols and four strokes — a total of thirteen marks.",
        },
        {
          type: "highlight",
          text: "But not easy for calculations.",
        },
      ],
    },

    {
      id: "babylon",
      blocks: [
        {
          type: "highlight",
          text: "The Babylonians grouped by sixty.",
        },
        {
          type: "text",
          text: "What surprised me most, researching this, was how few symbols it actually took.",
        },
        {
          type: "image",
          src: "/course/001-counting/assets/mt_01_image05.png",
          alt: "Babylonian number symbols.",
        },
      ],
    },

    {
      id: "place-value",
      blocks: [
        {
          type: "highlight",
          text: "They reused the same symbols in different positions, and position changed their value.",
        },
        {
          type: "text",
          text: "Move a symbol one place to the left, and it no longer meant one. It meant sixty. Move it another place, and it meant 3,600.",
        },
        {
          type: "question",
          text: "Place value.",
        },
      ],
    },

    {
      id: "babylon-zero",
      blocks: [
        {
          type: "highlight",
          text: "But there was a problem. They had no true zero.",
        },
        {
          type: "text",
          text: "An empty position could sometimes be shown by leaving a gap, but the reader still had to use the surrounding numbers and the context to work out what that empty position meant.",
        },
        {
          type: "text",
          text: "Their sixty still runs through our lives — sixty minutes in an hour, sixty seconds in a minute, three hundred and sixty degrees in a circle.",
        },
      ],
    },

    {
      id: "india",
      blocks: [
        {
          type: "highlight",
          text: "The Indian system is the one that closed the gap.",
        },
        {
          type: "text",
          text: "Ten symbols. Position doing the work of value. And a mark for the empty place itself.",
        },
        {
          type: "image",
          src: "/course/001-counting/assets/mt_01_image06.png",
          alt: "The Indian decimal place-value system and zero.",
        },
      ],
    },

    {
      id: "three-ideas",
      blocks: [
        {
          type: "highlight",
          text: "Three ideas had finally come together.",
        },
        {
          type: "list",
          items: [
            "Ten symbols are enough to represent any number.",
            "A symbol's value depends on where it sits.",
            "An empty place needs a symbol of its own.",
          ],
        },
      ],
    },

    {
      id: "zero",
      blocks: [
        {
          type: "text",
          text: "Without zero, a place-value system has a hole in it. With zero, the empty place becomes something we can write down, preserve, and calculate with.",
        },
        {
          type: "highlight",
          text: "Nothing became a number.",
        },
      ],
    },

    {
      id: "reflection",
      blocks: [
        {
          type: "highlight",
          text: "One last question.",
        },
        {
          type: "text",
          text: "We invented zero because we needed a symbol for an empty group. It took centuries, and some very good mathematicians resisted it.",
        },
        {
          type: "question",
          text: "What else might we still be missing a symbol for?",
        },
        {
          type: "image",
          src: "/course/001-counting/assets/mt_01_image07.png",
          alt: "A final reflection on mathematical symbols and ideas.",
        },
      ],
    },
  ],
};