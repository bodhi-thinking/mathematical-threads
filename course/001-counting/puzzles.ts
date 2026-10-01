import type { Puzzle } from "../../lib/puzzle-types";

export const puzzles: Puzzle[] = [
  {
    id: "egyptian-merchant-secret-shortcut",
    title: "The Merchant's Secret Shortcut",
    type: "reasoning",
    prompt:
      "Long before calculators, Egyptian merchants had a clever way to multiply. A trader needs to work out how many coins are in 6 baskets with 7 coins each. Instead of multiplying directly, he keeps doubling and combining the results. Can you discover his shortcut?",
    instructions: [
      "Start with 1 basket = 7 coins.",
      "Double it: 2 baskets = 14 coins.",
      "Double again: 4 baskets = 28 coins.",
      "The Challenge: You need exactly 6 baskets. Which groups can you combine to make 6, and what is the total price?"
    ],
    hints: [
      {
        label: "Hint 1",
        text: "You already know the price of 2 baskets and 4 baskets."
      },
      {
        label: "Hint 2",
        text: "Can you put the 4-basket group and the 2-basket group together?"
      },
      {
        label: "Hint 3",
        text: "28 + 14 = ?"
      }
    ],
    answer: {
      accepted: ["42", "42 coins"],
      placeholder: "How many silver coins?"
    },
    reveal:
      "6 baskets can be made from 4 + 2 baskets. So the price is 28 + 14 = 42 coins. The same doubling-and-combining idea was used in ancient Egyptian multiplication.",
    image: {
      src: "/course/001-counting/assets/mt_01_image04.png",
      alt: "Ancient Egyptian number symbols and groups of quantities"
    }
  },

  {
    id: "village-of-eight-fingers",
    title: "The Land of Eight Fingers",
    type: "represent",
    prompt:
      "Imagine you land in an alien city where everyone has eight fingers instead of ten. When they count objects, they group them into piles of 8 instead of piles of 10. What would their numbers look like?",
    instructions: [
      "Take 12 objects.",
      "In our world, 12 is 1 group of 10 and 2 ones.",
      "The Challenge: In the village of eight fingers, make groups of 8. How many groups do you have, and how many are left?"
    ],
    hints: [
      {
        label: "Hint 1",
        text: "Their full group is 8, not 10."
      },
      {
        label: "Hint 2",
        text: "Put 8 objects into one group. How many objects are left?"
      },
      {
        label: "Hint 3",
        text: "Write the number of groups first, then the leftover objects. What does 1 group of 8 and 4 ones look like in base 8?"
      }
    ],
    answer: {
      accepted: ["14", "14 base 8", "14_8", "14₈"],
      placeholder: "How would they write 12?"
    },
    reveal:
      "12 objects are written as 14₈ in base 8: one group of 8 and four ones. The quantity has not changed; only the grouping and notation have changed.",
    image: {
      src: "/course/001-counting/assets/mt_01_image09.png",
      alt: "A visual exploration of grouping objects in a different base"
    }
  },

  {
    id: "brahmagupta-zero",
    title: "Brahmagupta's Zero",
    type: "reasoning",
    prompt:
      "Imagine having 7 mangoes and giving them all away. There is nothing left, but what should we call that nothing? About 1,400 years ago, Indian mathematicians began treating zero as a number. Can you discover what happens when you add, subtract and multiply with zero?",
  instructions: [
  "Start with 7 mangoes. Give all 7 away. How many are left?",
  "Now imagine you have 7 mangoes and give away nothing. How many are left?",
  "What if you have 7 mangoes and put them into zero groups? Can you make sense of that?",
  "The Challenge: What do you think 7 ÷ 0 could mean? Is there a number that makes sense?"
],
hints: [
  {
    label: "Hint 1",
    text: "Zero does not make 7 bigger or smaller when nothing is added or taken away."
  },
  {
    label: "Hint 2",
    text: "Zero groups is different from one group, two groups, or three groups. What would zero groups of 7 contain?"
  },
  {
    label: "Hint 3",
    text: "Division asks how many equal groups can be made. Can 7 mangoes be shared into zero groups?"
  }
],
    answer: {
      accepted: ["undefined", "not defined", "cannot be defined"],
      placeholder: "What is 10 divided by 0?"
    },
    reveal:
      "In modern mathematics, 10 ÷ 0 is undefined. Brahmagupta was one of the early mathematicians to give systematic rules for zero, though his treatment of division by zero differed from modern mathematics.",
    image: {
      src: "/course/001-counting/assets/mt_01_image07.png",
      alt: "A historical illustration about zero and number symbols"
    }
  },

  {
    id: "magic-mirror-number",
    title: "The Magic Mirror Number",
    type: "predict",
    prompt:
     "A travelling magician challenges you with a strange number trick. He says, “Give me any three-digit number, as long as its first and last digits are at least 2 apart (eg: 461, 985, 529). I’ll reverse it, subtract the reversed from the original number, reverse the answer, and add both. Somehow, we will both end up with the same number.” Can you uncover his secret?",
    instructions: [
  "Choose any three-digit number where the first and last digits are at least 2 apart.",
  "Reverse its digits and subtract the smaller number from the larger.",
  "Reverse your answer. If it has only two digits, put a zero in front.",
  "Add the two numbers together.",
  "The Challenge: What number does the magician's trick always reveal? Why does it work"
],
    hints: [
  {
    label: "Hint 1",
    text: "The magician's first rule matters: the first and last digits must be at least 2 apart."
  },
  {
    label: "Hint 2",
    text: "Watch what happens to the place values when the digits are reversed."
  },
  {
    label: "Hint 3",
    text: "Try the trick with a completely different three-digit number. Does the same number appear?"
  }
],
    answer: {
      accepted: ["1089", "1089 pattern"],
      mode: "contains",
      placeholder: "What number do you discover?"
    },
    reveal:
      "The number 1089 is part of a famous digit pattern. Reversing digits changes their place values, creating a surprising chain of numbers. Try the trick with other numbers and see which ones behave differently.",
    image: {
      src: "/course/001-counting/assets/mt_01_image10.png",
      alt: "A visual puzzle about place value and reversing digits"
    }
  },

  {
  id: "kaprekars-number",
  title: "Kaprekar's Number",
  type: "predict",

  prompt:
    "In 1949, Indian mathematician D. R. Kaprekar discovered a strange number trick. Start with almost any four-digit number, rearrange its digits from largest to smallest and smallest to largest, then subtract. Keep repeating. Can you find the number that the trick cannot escape?",

  instructions: [
    "Choose any four-digit number whose digits are not all the same.",
    "Arrange its digits from largest to smallest.",
    "Arrange the same digits from smallest to largest.",
    "Subtract the smaller number from the larger.",
    "The Challenge: Repeat the process with your new number. What number do you eventually reach?"
  ],

  hints: [
    {
      label: "Hint 1",
      text: "The same four digits can make two very different numbers when their places are changed."
    },
    {
      label: "Hint 2",
      text: "Keep repeating the process. Your numbers may change at first, but watch for one that refuses to change."
    },
    {
      label: "Hint 3",
      text: "When you reach 6174, try the process one more time. Does anything happen?"
    }
  ],

  answer: {
    accepted: ["6174", "six thousand one hundred seventy-four"],
    placeholder: "What number did you discover?"
  },

  reveal:
    "The number is 6174. Once you reach it, the trick gets stuck: 7641 minus 1467 gives 6174 again. This is known as Kaprekar's constant.",

  image: {
    src: "/course/001-counting/assets/mt_01_image10.png",
    alt: "A visual puzzle showing Kaprekar's number pattern"
  }
},

  {
    id: "balance-scale-detective",
    title: "The Balance Scale Detective",
    type: "reasoning",
    prompt:
      "A jeweller has been tricked! Among nine identical-looking coins, one is lighter than the rest. You have a balance scale and only two chances to weigh. Can you become the detective who finds the fake coin in two steps?",
    instructions: [
  "You have nine coins, a balance scale, and only two chances to use it.",
  "The scale does not tell you how heavy a coin is. It only tells you which side is heavier, or whether the two sides balance.",
  "Your challenge is to use each weighing to rule out as many possibilities as you can.",
  "The Challenge: Can you guarantee that you will find the lighter coin in just two weighings?"
],
    hints: [
      {
        label: "Hint 1",
        text: "Make three groups of 3."
      },
      {
        label: "Hint 2",
        text: "Weigh 3 coins against 3 coins. If they balance, where must the fake be?"
      },
      {
        label: "Hint 3",
        text: "You will have only 3 possible coins left. One more weighing is enough."
      }
    ],
    answer: {
      accepted: [
        "three groups",
        "3 groups of 3",
        "weigh 3 against 3",
        "then 1 against 1",
        "third group then 1 vs 1",
        "lighter group then 1 vs 1"
      ],
      mode: "contains",
      placeholder: "Describe your two weighings"
    },
    reveal:
      "Split the coins into three groups of three. Weigh one group against another. If they balance, the fake is in the third group; otherwise it is in the lighter group. Then weigh two of those three coins against each other.",
    image: {
      src: "/course/001-counting/assets/mt_01_image10.png",
      alt: "A balance scale puzzle with groups of coins"
    }
  },

  {
    id: "merchants-weights",
    title: "The Merchant's Weights",
    type: "generalise",
    prompt:
      "A travelling merchant wants to weigh every whole amount from 1 kg to 15 kg, but does not want to carry a heavy collection of weights. What is the smallest set of weights that can do it?",
    instructions: [
      "You can place weights on only one side of the scale.",
      "A 1 kg weight lets you measure 1 kg.",
      "With 1 kg and 2 kg, you can make 1, 2, and 3 kg.",
      "The Challenge: Find the smallest set of weights that can make every whole number from 1 to 15."
    ],
    hints: [
      {
        label: "Hint 1",
        text: "With 1 and 2, what is the first number you cannot make?"
      },
      {
        label: "Hint 2",
        text: "Make that next number your third weight."
      },
      {
        label: "Hint 3",
        text: "With 1, 2, and 4, you can make everything from 1 to 7. What weight would unlock 8 to 15?"
      }
    ],
    answer: {
      accepted: [
        "1, 2, 4, 8",
        "1 2 4 8",
        "1 kg, 2 kg, 4 kg, 8 kg",
        "four weights"
      ],
      placeholder: "What weights do you need?"
    },
    reveal:
      "The smallest set is 1 kg, 2 kg, 4 kg and 8 kg. By choosing different combinations, you can make every whole number from 1 to 15. This is the same doubling pattern behind binary place values.",
    image: {
      src: "/course/001-counting/assets/mt_01_image09.png",
      alt: "A merchant's collection of weights arranged by powers of two"
    }
  },

  {
    id: "babylonian-time-machine",
    title: "The Babylonian Time Machine",
    type: "represent",
    prompt:
      "Why are there 60 seconds in a minute, and 360 degrees in a circle? You can thank the ancient Babylonians! They loved 60 because it can be divided in many useful ways. Can you figure out how their ancient calculator worked?",
    instructions: [
  "Hold up both hands.",
  "Choose one hand for counting. Touch the sections of your four fingers with your thumb, one after another.",
  "When you have touched every section, you have completed one round. Use a finger on your other hand to mark that round.",
  "The Challenge: Keep going until you have marked five rounds. How many sections have you counted?"
],
    hints: [
  {
    label: "Hint 1",
    text: "There are four fingers with three sections each on the first hand. How many sections does that give you?"
  },
  {
    label: "Hint 2",
    text: "Once you reach the end of the first hand, your second hand can help you keep track of how many times you have completed that count."
  },
  {
    label: "Hint 3",
    text: "If one complete count gives you 12, how many groups of 12 would you need to reach 60?"
  }
],

    answer: {
      accepted: ["60", "sixty"],
      placeholder: "How many?"
    },
    reveal:
      "Four fingers with three sections each give 12. Five groups of 12 give 60. This is a useful way to see how larger counting systems can be built from smaller groups.",
    image: {
      src: "/course/001-counting/assets/mt_01_image10.png",
      alt: "A hand-counting demonstration for groups of twelve"
    }
  },

  {
    id: "alien-spaceships-dashboard",
    title: "The Alien Spaceship's Dashboard",
    type: "represent",
    prompt:
      "You discover a crashed alien spaceship on Earth. Its dashboard counts 0, 1, 2, 3, 4... and then jumps to 10. There is no symbol for 5. The computer asks for 12 power cells to poower it up. How many cells is that in our numbers?",
    instructions: [
      "Look at what happens after 4 in the alien system.",
      "In our system, 10 means one group of 10. What does 10 mean in the alien system?",
      "The Challenge: Translate alien 12 into our ordinary numbers."
    ],
    hints: [
      {
        label: "Hint 1",
        text: "The aliens start a new place after 4, not after 9."
      },
      {
        label: "Hint 2",
        text: "So alien 10 means one group of 5."
      },
      {
        label: "Hint 3",
        text: "Alien 12 means one group of 5 and two more."
      }
    ],
    answer: {
      accepted: ["7", "seven"],
      placeholder: "How many human power cells?"
    },
    reveal:
      "The alien system is base 5. Alien 12 means one group of 5 plus two ones, so it represents 7 in our base-10 system.",
    image: {
      src: "/course/001-counting/assets/mt_01_image09.png",
      alt: "An alien dashboard showing a base-five counting system"
    }
  },

  {
    id: "fibonaccis-secret-code",
    title: "Fibonacci's Secret Code",
    type: "generalise",
    prompt:
      "Leonardo of Pisa, better known as Fibonacci, wrote a famous rabbit problem in his book Liber Abaci. A pair of rabbits keeps producing new pairs, following an idealised pattern. The numbers of pairs form a sequence where each number is the sum of the two before it.",
    instructions: [
      "The sequence begins 1, 1, 2, 3, 5, 8, 13, 21, 34...",
      "Now imagine using these Fibonacci numbers as a secret code.",
      "The Challenge: Can you write 50 as a sum of Fibonacci numbers without using two neighbouring numbers in the sequence?"
    ],
    hints: [
      {
        label: "Hint 1",
        text: "The largest Fibonacci number that fits into 50 is 34."
      },
      {
        label: "Hint 2",
        text: "50 − 34 = 16. The largest Fibonacci number that fits into 16 is 13."
      },
      {
        label: "Hint 3",
        text: "After 34 + 13, you need 3 more. So 50 = 34 + 13 + 3."
      }
    ],
    answer: {
      accepted: [
        "34 + 13 + 3",
        "34+13+3",
        "50 = 34 + 13 + 3",
        "50"
      ],
      mode: "contains",
      placeholder: "What is the secret code?"
    },
    reveal:
      "50 = 34 + 13 + 3. None of these are neighbouring Fibonacci numbers. This kind of representation is known as Zeckendorf representation: every positive whole number has a unique representation using nonconsecutive Fibonacci numbers.",
    image: {
      src: "/course/001-counting/assets/mt_01_image10.png",
      alt: "A visual puzzle inspired by Fibonacci's sequence"
    }
  }
];