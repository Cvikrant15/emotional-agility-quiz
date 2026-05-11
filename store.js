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
