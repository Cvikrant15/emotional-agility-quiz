// QuizLab — Google Apps Script
//
// Setup:
//   1. Open your Google Sheet → Extensions → Apps Script
//   2. Paste this entire file, replacing any existing code
//   3. Click Deploy → New deployment → Web App
//      - Execute as: Me
//      - Who has access: Anyone
//   4. Copy the Web App URL and paste it into store.js as SHEETS_URL

const SHEET_NAME = 'Responses';

const HEADERS = [
  'name', 'email', 'joinedAt',
  't1Answers', 't1CompletedAt',
  't2Status', 't2Answers', 't2CompletedAt',
  'submittedAt'
];

function doPost(e) {
  try {
    const user  = JSON.parse(e.postData.contents);
    const sheet = getOrCreateSheet();

    // Update existing row if email already present, otherwise append
    const values   = sheet.getDataRange().getValues();
    let targetRow  = -1;
    for (let i = 1; i < values.length; i++) {
      if (values[i][1] === user.email) { targetRow = i + 1; break; }
    }

    const row = buildRow(user);
    if (targetRow > 0) {
      sheet.getRange(targetRow, 1, 1, row.length).setValues([row]);
    } else {
      sheet.appendRow(row);
    }

    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: err.toString() });
  }
}

function doGet(e) {
  try {
    const sheet  = getOrCreateSheet();
    const values = sheet.getDataRange().getValues();

    if (values.length <= 1) return json({ users: [] });

    const users = values.slice(1)
      .filter(r => r[1]) // skip rows with no email
      .map(r => ({
        name:     r[0],
        email:    r[1],
        joinedAt: toISO(r[2]),
        test1: r[3] ? tryParse({ answers: r[3], completedAt: toISO(r[4]) }) : null,
        test2: r[5] ? tryParse({
          skipped:     r[5] === 'skipped',
          answers:     r[5] !== 'skipped' && r[6] ? r[6] : '[]',
          completedAt: toISO(r[7])
        }, true) : null,
      }));

    return json({ users });
  } catch (err) {
    return json({ ok: false, error: err.toString() });
  }
}

// ── Helpers ──

function buildRow(user) {
  const t1 = user.test1;
  const t2 = user.test2;
  return [
    user.name,
    user.email,
    user.joinedAt,
    t1 ? JSON.stringify(t1.answers)   : '',
    t1 ? t1.completedAt               : '',
    t2 ? (t2.skipped ? 'skipped' : 'done') : '',
    t2 && !t2.skipped ? JSON.stringify(t2.answers) : '',
    t2 ? t2.completedAt               : '',
    new Date().toISOString()
  ];
}

function getOrCreateSheet() {
  const ss    = SpreadsheetApp.getActiveSpreadsheet();
  let   sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length)
      .setFontWeight('bold')
      .setBackground('#f3f0ff');
  }
  return sheet;
}

function tryParse(obj, isTest2) {
  try {
    if (isTest2) {
      return { ...obj, answers: JSON.parse(obj.answers) };
    }
    return { ...obj, answers: JSON.parse(obj.answers) };
  } catch (e) {
    return isTest2 ? { skipped: false, answers: [], completedAt: null } : null;
  }
}

function toISO(val) {
  if (!val) return new Date().toISOString();
  try { return new Date(val).toISOString(); } catch (e) { return String(val); }
}

function json(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
