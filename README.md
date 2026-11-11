# Wikipedia: interface language switch (Playwright + TypeScript)

Automated UI test for changing the interface language of an authorized Wikipedia user.

## Automated test case

**TC-001: Successful interface language switch by an authorized user** (full text: [TEST_CASE.md](TEST_CASE.md))

1. Open https://pl.wikipedia.org and click **Zaloguj się**; log in as the test user.
2. Open **Preferences** → tab **User profile** → section **Internationalisation**.
3. Choose **English (en)** as the interface language and save.
4. **Expected:** the interface is shown in English — the page title is `Preferences`.
5. **Postcondition:** the language is set back to Ukrainian (`uk`).

## Project structure

```
config/env.ts          reads and validates environment variables
pages/BasePage.ts      abstract base class for pages
pages/LoginPage.ts     login page object
pages/PreferencesPage.ts  preferences page object
fixtures/index.ts      Playwright fixtures that provide page objects to tests
tests/                 test scenarios
Dockerfile, docker-compose.yml
```

## Setup

1. Create a `.env` file from the template and fill in the credentials of a Wikipedia test account:

   ```bash
   cp .env.example .env
   ```

   | Variable | Meaning |
   |---|---|
   | `WIKI_BASE_URL` | `https://pl.wikipedia.org` |
   | `WIKI_NAME` | test account user name |
   | `WIKI_PASSWORD` | test account password |

   The `.env` file is git-ignored and must never be committed.

2. The account's interface language must be Ukrainian (`uk`) before the first run.

## Run in Docker (recommended)

Requires Docker with Docker Compose.

```bash
docker compose up --build --abort-on-container-exit
```

The HTML report is written to **`./playwright-report`** on the host machine (not left inside the container).
Open it with:

```bash
npx playwright show-report
```

or open `playwright-report/index.html` in a browser.

## Run locally (without Docker)

```bash
npm ci
npx playwright install chromium
npm test
npm run report   # open the HTML report
```

## Notes

- Do not run the test many times in a row: Wikipedia temporarily blocks logins after too many attempts.
