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

  // Correct answers for reference:
  // Q1→1  Q2→2  Q3→3  Q4→2  Q5→1  Q6→3  Q7→3  Q8→3  Q9→2  Q10→3
  const CORRECT = [1, 2, 3, 2, 1, 3, 3, 3, 2, 3];

  const QUESTIONS = [
    { id: 1,  question: "Which country is credited with inventing sushi?",              options: ["China","Japan","South Korea","Vietnam"] },
    { id: 2,  question: "Which city is nicknamed 'The City of Love'?",                  options: ["Rome","Venice","Paris","Vienna"] },
    { id: 3,  question: "What is the main ingredient in traditional guacamole?",        options: ["Tomato","Lime","Onion","Avocado"] },
    { id: 4,  question: "In which country would you find the Great Barrier Reef?",      options: ["Indonesia","Philippines","Australia","Fiji"] },
    { id: 5,  question: "Which spice gives paella its distinctive golden colour?",      options: ["Turmeric","Saffron","Paprika","Cumin"] },
    { id: 6,  question: "Pad Thai is the national dish of which country?",              options: ["Malaysia","Vietnam","Indonesia","Thailand"] },
    { id: 7,  question: "Which ocean do you cross when flying from Europe to New York?",options: ["Indian","Pacific","Southern","Atlantic"] },
    { id: 8,  question: "What type of pastry is used in a classic French croissant?",   options: ["Choux","Shortcrust","Filo","Laminated dough"] },
    { id: 9,  question: "The ancient city of Petra is carved into rock in which country?",options:["Egypt","Iraq","Jordan","Saudi Arabia"] },
    { id: 10, question: "Which country produces the most coffee in the world?",         options: ["Colombia","Vietnam","Ethiopia","Brazil"] }
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

  function buildTest1(choices) {
    let score = 0;
    const answers = choices.map((chosen, i) => {
      const q = QUESTIONS[i];
      const isCorrect = chosen === CORRECT[i];
      if (isCorrect) score++;
      return { questionId: q.id, question: q.question, chosen, correct: CORRECT[i], isCorrect };
    });
    return { answers, score, total: 10, completedAt: null };
  }

  function buildTest2(choices) {
    const answers = choices.map((chosen, i) => {
      const q = TOT_Q[i];
      return { questionId: q.id, a: q.a, b: q.b, chosen };
    });
    return { answers, completedAt: null };
  }

  // ─────────────────────────────────────────────
  // Mock users — realistic travel & food personas
  // ─────────────────────────────────────────────

  // Sofia Rossi — Italian, luxury traveler, passionate foodie
  // Knows food well, prefers comfort, fine dining, beach
  const sofia = {
    name: 'Sofia Rossi',
    email: 'sofia.rossi@example.com',
    joinedAt: '2026-05-08T08:42:00.000Z',
    test1: buildTest1([1, 2, 3, 2, 1, 3, 3, 3, 2, 3]), // 10/10
    test2: buildTest2(['a','a','b','b','a','a','b','b','b','a'])
    //  window, beach, fine dining, luxury, coffee, local, group, mild, evening, all-inclusive
  };
  sofia.test1.completedAt  = '2026-05-08T08:51:00.000Z';
  sofia.test2.completedAt  = '2026-05-08T08:57:00.000Z';

  // James Chen — budget backpacker, street food adventurer
  // Strong on geography, misses a couple of food details
  const james = {
    name: 'James Chen',
    email: 'james.chen@example.com',
    joinedAt: '2026-05-08T10:05:00.000Z',
    test1: buildTest1([1, 2, 3, 2, 0, 3, 3, 2, 2, 3]), // 8/10 — got Q5 (guessed turmeric), Q8 (guessed filo) wrong
    test2: buildTest2(['a','b','a','a','a','a','a','a','a','b'])
    //  window, mountain, street food, backpacking, coffee, local, solo, spicy, early, plan it yourself
  };
  james.test1.completedAt  = '2026-05-09T10:18:00.000Z';
  james.test2.completedAt  = '2026-05-09T10:24:00.000Z';

  // Priya Nair — Kerala-born, spice expert, beach destination lover
  // Near perfect on food, slight gap on geography
  const priya = {
    name: 'Priya Nair',
    email: 'priya.nair@example.com',
    joinedAt: '2026-05-09T14:30:00.000Z',
    test1: buildTest1([1, 2, 3, 3, 1, 3, 3, 3, 2, 3]), // 9/10 — got Q4 wrong (Fiji)
    test2: buildTest2(['a','a','a','b','b','a','b','a','a','b'])
    //  window, beach, street food, luxury, tea, local, group, spicy, early, plan it yourself
  };
  priya.test1.completedAt  = '2026-05-09T14:42:00.000Z';
  priya.test2.completedAt  = '2026-05-09T14:48:00.000Z';

  // Tom Mueller — German engineer, adventure traveler
  // Solid on geography, shaky on food trivia
  const tom = {
    name: 'Tom Mueller',
    email: 'tom.mueller@example.com',
    joinedAt: '2026-05-10T09:00:00.000Z',
    test1: buildTest1([0, 2, 3, 2, 0, 3, 3, 2, 2, 3]), // 6/10 — Q1 (China), Q5 (turmeric), Q8 (filo), Q9 (Jordan wrong → Iraq)
    test2: buildTest2(['b','b','a','a','a','a','a','a','a','b'])
    //  aisle, mountain, street food, backpacking, coffee, local, solo, spicy, early, plan it yourself
  };
  tom.test1.completedAt  = '2026-05-10T09:14:00.000Z';
  tom.test2.completedAt  = '2026-05-10T09:20:00.000Z';

  // Emma Wilson — London-based travel blogger, fine dining enthusiast
  // Excellent general knowledge, prefers comfort and good wine
  const emma = {
    name: 'Emma Wilson',
    email: 'emma.wilson@example.com',
    joinedAt: '2026-05-10T16:15:00.000Z',
    test1: buildTest1([1, 2, 3, 2, 1, 3, 3, 3, 2, 2]), // 9/10 — Q10 (Ethiopia instead of Brazil)
    test2: buildTest2(['b','a','b','b','b','b','b','b','b','a'])
    //  aisle, beach, fine dining, luxury, tea, familiar, group, mild, evening, all-inclusive
  };
  emma.test1.completedAt  = '2026-05-10T16:26:00.000Z';
  emma.test2.completedAt  = '2026-05-10T16:32:00.000Z';

  localStorage.setItem(KEY, JSON.stringify({ users: [sofia, james, priya, tom, emma] }));
})();
