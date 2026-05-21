const MCQ_QUESTIONS = [
  { id: 1,  question: "When I don't do well in something, I blame myself.",                         correct: 'no'  },
  { id: 2,  question: "When I am upset, I can calm myself down on my own.",                          correct: 'yes' },
  { id: 3,  question: "I keep trying even when I lose.",                                             correct: 'yes' },
  { id: 4,  question: "I try to do things that seem difficult to me.",                               correct: 'yes' },
  { id: 5,  question: "I know it is okay to sometimes feel sad, angry or scared.",                   correct: 'yes' },
  { id: 6,  question: "It is okay to make mistakes when I am trying something for the first time.",  correct: 'yes' },
  { id: 7,  question: "It is hard for me to forget when someone hurts me.",                          correct: 'no'  },
  { id: 8,  question: "I am kind to myself even when I don't like something about myself.",          correct: 'yes' },
  { id: 9,  question: "I can focus on what I am doing without worrying too much about the past or the future.", correct: 'yes' },
  { id: 10, question: "I can pay attention to what I am doing right now.",                           correct: 'yes' },
];

// Display names for each Test 2 option — swap these for real labels when ready
const ITEMS = {
  a: 'Rome',
  b: 'Barcelona',
  c: 'London',
  d: 'Paris',
  e: 'Tokyo',
  f: 'Sydney',
  g: 'New York',
};

// Test 3 question template — {item} is replaced with each top-3 pick's name
const TEST3_TEMPLATE = 'Would you like to go to {item}?';

const THIS_OR_THAT = [
  { id: 1,  a: 'd', b: 'g' },
  { id: 2,  a: 'a', b: 'c' },
  { id: 3,  a: 'f', b: 'b' },
  { id: 4,  a: 'e', b: 'g' },
  { id: 5,  a: 'b', b: 'd' },
  { id: 6,  a: 'c', b: 'a' },
  { id: 7,  a: 'f', b: 'e' },
  { id: 8,  a: 'g', b: 'b' },
  { id: 9,  a: 'a', b: 'd' },
  { id: 10, a: 'c', b: 'f' },
  { id: 11, a: 'e', b: 'a' },
  { id: 12, a: 'b', b: 'g' },
  { id: 13, a: 'd', b: 'c' },
  { id: 14, a: 'f', b: 'a' },
  { id: 15, a: 'g', b: 'e' },
  { id: 16, a: 'b', b: 'c' },
  { id: 17, a: 'd', b: 'f' },
  { id: 18, a: 'a', b: 'g' },
  { id: 19, a: 'e', b: 'b' },
  { id: 20, a: 'c', b: 'd' },
  { id: 21, a: 'f', b: 'g' },
];
