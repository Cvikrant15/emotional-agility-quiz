# QuizLab

A lightweight quiz site built as a static GitHub Pages site. No backend — all data is stored in the browser's localStorage.

## User Flow

Login → Test 1 (MCQ) → Test 2 (This or That) → Thank You

- Users cannot skip ahead or navigate back mid-test
- Each test can only be taken once per session
- Results are not visible to participants

## Admin Access

The results dashboard is at `/results.html` — it is not linked anywhere in the user flow.

| Username | Password     |
|----------|--------------|
| admin1   | QuizAdmin1!  |
| admin2   | QuizAdmin2!  |

Both admins see the full dashboard including:
- Participant table with MCQ scores
- Group preference breakdown for This or That
- CSV export

## Files

| File           | Purpose                              |
|----------------|--------------------------------------|
| `index.html`   | Login page                           |
| `test1.html`   | MCQ test (10 questions)              |
| `test2.html`   | This or That (10 rounds)             |
| `thanks.html`  | Completion / thank you page          |
| `results.html` | Admin-only results dashboard         |
| `data.js`      | Question content                     |
| `seed.js`      | Mock participant data (auto-inserts) |
| `store.js`     | localStorage helpers                 |
| `style.css`    | Styles                               |

## Updating Questions

Edit `data.js` — `MCQ_QUESTIONS` for multiple choice, `THIS_OR_THAT` for preference pairs.

## Removing Mock Data

To clear the mock users and start fresh, open the admin dashboard and click **"Clear all participant data"**, or open the browser console and run:

```js
localStorage.removeItem('quizlab_v2')
```
