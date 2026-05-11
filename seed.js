/**
 * Injects mock participant data into localStorage.
 * Only runs if no users exist yet — safe to include on every page.
 */
(function seedMockData() {
  const KEY = 'quizlab_v2';
  try {
    const existing = JSON.parse(localStorage.getItem(KEY));
    if (existing && existing.users && existing.users.length > 0) return;
  } catch (_) {}

  const T1_QUESTIONS = [
    { id: 1,  question: "When I don't do well in something, I blame myself." },
    { id: 2,  question: "When I am upset, I can calm myself down on my own." },
    { id: 3,  question: "I keep trying even when I lose." },
    { id: 4,  question: "I try to do things that seem difficult to me." },
    { id: 5,  question: "I know it is okay to sometimes feel sad, angry or scared." },
    { id: 6,  question: "It is okay to make mistakes when I am trying something for the first time." },
    { id: 7,  question: "It is hard for me to forget when someone hurts me." },
    { id: 8,  question: "I am kind to myself even when I don't like something about myself." },
    { id: 9,  question: "I can focus on what I am doing without worrying too much about the past or the future." },
    { id: 10, question: "I can pay attention to what I am doing right now." }
  ];

  const TOT_Q = [
    { id: 1,  a: "Window seat",          b: "Aisle seat"           },
    { id: 2,  a: "Beach holiday",        b: "Mountain retreat"     },
    { id: 3,  a: "Street food",          b: "Fine dining"          },
    { id: 4,  a: "Backpacking",          b: "Luxury resort"        },
    { id: 5,  a: "Coffee",               b: "Tea"                  },
    { id: 6,  a: "Local cuisine",        b: "Familiar food abroad" },
    { id: 7,  a: "Solo travel",          b: "Travel with friends"  },
    { id: 8,  a: "Spicy food",           b: "Mild food"            },
    { id: 9,  a: "Early morning flight", b: "Evening flight"       },
    { id: 10, a: "All-inclusive",        b: "Plan it yourself"     }
  ];

  // choices: array of 'yes'|'no' for each of the 10 statements
  function buildTest1(choices) {
    const answers = choices.map((chosen, i) => ({
      questionId: T1_QUESTIONS[i].id,
      question:   T1_QUESTIONS[i].question,
      chosen
    }));
    return { answers, completedAt: null };
  }

  function buildTest2(choices) {
    const answers = choices.map((chosen, i) => ({
      questionId: TOT_Q[i].id,
      a: TOT_Q[i].a,
      b: TOT_Q[i].b,
      chosen
    }));
    return { answers, completedAt: null };
  }

  // ─────────────────────────────────────────────────────────────
  // Mock users — realistic travel & food personas
  // Test 1 questions are about self-awareness & emotional resilience
  // ─────────────────────────────────────────────────────────────

  // Sofia Rossi — confident, self-compassionate, emotionally aware
  // Q1(blame self):no  Q2(calm down):yes  Q3(keep trying):yes  Q4(try hard):yes
  // Q5(ok to feel):yes  Q6(ok mistakes):yes  Q7(hard to forget):no
  // Q8(kind to self):yes  Q9(focus):yes  Q10(pay attention):yes
  const sofia = {
    name: 'Sofia Rossi',
    email: 'sofia.rossi@example.com',
    joinedAt: '2026-05-08T08:42:00.000Z',
    test1: null,
    test2: buildTest2(['a','a','b','b','a','a','b','b','b','a'])
  };
  sofia.test2.completedAt = '2026-05-08T08:57:00.000Z';

  const james = {
    name: 'James Chen',
    email: 'james.chen@example.com',
    joinedAt: '2026-05-08T10:05:00.000Z',
    test1: null,
    test2: buildTest2(['a','b','a','a','a','a','a','a','a','b'])
  };
  james.test2.completedAt = '2026-05-09T10:24:00.000Z';

  const priya = {
    name: 'Priya Nair',
    email: 'priya.nair@example.com',
    joinedAt: '2026-05-09T14:30:00.000Z',
    test1: null,
    test2: buildTest2(['a','a','a','b','b','a','b','a','a','b'])
  };
  priya.test2.completedAt = '2026-05-09T14:48:00.000Z';

  const tom = {
    name: 'Tom Mueller',
    email: 'tom.mueller@example.com',
    joinedAt: '2026-05-10T09:00:00.000Z',
    test1: null,
    test2: buildTest2(['b','b','a','a','a','a','a','a','a','b'])
  };
  tom.test2.completedAt = '2026-05-10T09:20:00.000Z';

  const emma = {
    name: 'Emma Wilson',
    email: 'emma.wilson@example.com',
    joinedAt: '2026-05-10T16:15:00.000Z',
    test1: null,
    test2: buildTest2(['b','a','b','b','b','b','b','b','b','a'])
  };
  emma.test2.completedAt = '2026-05-10T16:32:00.000Z';

  localStorage.setItem(KEY, JSON.stringify({ users: [sofia, james, priya, tom, emma] }));
})();
