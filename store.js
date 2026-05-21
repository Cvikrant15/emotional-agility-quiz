const STORE_KEY = 'quizlab_v3';

function getStore() {
  try { return JSON.parse(localStorage.getItem(STORE_KEY)) || { users: [] }; }
  catch { return { users: [] }; }
}

function saveStore(d) { localStorage.setItem(STORE_KEY, JSON.stringify(d)); }

function getCurrentUser() {
  const email = sessionStorage.getItem('ql_email');
  if (!email) return null;
  return getStore().users.find(u => u.email === email) || null;
}

function loginUser(name, email) {
  const store = getStore();
  let user = store.users.find(u => u.email === email);
  if (!user) {
    user = { name, email, test1: null, test2: null, joinedAt: new Date().toISOString() };
    store.users.push(user);
  } else {
    user.name = name;
  }
  saveStore(store);
  sessionStorage.setItem('ql_email', email);
}

function saveTest1(answers) {
  const email = sessionStorage.getItem('ql_email');
  if (!email) return;
  const store = getStore();
  const user = store.users.find(u => u.email === email);
  if (user) {
    user.test1 = { answers, completedAt: new Date().toISOString() };
    saveStore(store);
  }
}

function saveTest2(answers, skipped = false) {
  const email = sessionStorage.getItem('ql_email');
  if (!email) return;
  const store = getStore();
  const user = store.users.find(u => u.email === email);
  if (user) {
    user.test2 = { answers, skipped, completedAt: new Date().toISOString() };
    saveStore(store);
  }
}

function requireLogin() {
  if (!sessionStorage.getItem('ql_email')) {
    window.location.href = 'index.html';
    return false;
  }
  return true;
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ── Test 2 scoring ──

// Returns all letters sorted by win count desc, e.g. [{letter:'d', wins:5}, ...]
function tallyTest2(answers) {
  const counts = {};
  answers.forEach(a => {
    const letter = a.chosen === 'a' ? a.a : a.b;
    counts[letter] = (counts[letter] || 0) + 1;
  });
  return Object.entries(counts)
    .map(([letter, wins]) => ({ letter, wins }))
    .sort((x, y) => y.wins - x.wins || x.letter.localeCompare(y.letter));
}

// Returns exactly the top 3 picks (or fewer if <3 letters were chosen)
function getTop3(answers) {
  return tallyTest2(answers).slice(0, 3);
}

// Returns letters that are tied at the 3rd-place cutoff (and cause >3 top picks),
// or null if there is no tie to resolve.
function getTiedAtCutoff(answers) {
  const tally = tallyTest2(answers);
  if (tally.length <= 3) return null;
  const threshold = tally[2].wins;
  const tied = tally.filter(x => x.wins === threshold);
  return tied.length > 1 ? tied.map(x => x.letter) : null;
}

// Generates all C(n,2) round-robin pairs for a set of letters
function roundRobinPairs(letters, idPrefix) {
  const pairs = [];
  let n = 1;
  for (let i = 0; i < letters.length; i++)
    for (let j = i + 1; j < letters.length; j++)
      pairs.push({ id: `${idPrefix}_${n++}`, a: letters[i], b: letters[j] });
  return pairs;
}

// Paste your Apps Script Web App URL here after deploying (see apps-script.js for setup)
const SHEETS_URL = '';

async function submitToSheets(user) {
  if (!SHEETS_URL) return;
  try {
    await fetch(SHEETS_URL, {
      method: 'POST',
      // text/plain avoids a CORS preflight while Apps Script still receives the body
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify(user),
    });
  } catch (e) {
    console.warn('Sheets sync failed — data is safe in localStorage:', e);
  }
}
