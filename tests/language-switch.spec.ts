import { test, expect } from '../fixtures';
import { env } from '../config/env';

// The test account uses Ukrainian as its default interface language.
const NEW_LANGUAGE = { code: 'en', heading: 'Preferences' };
const DEFAULT_LANGUAGE = { code: 'uk', heading: 'Налаштування' };

test.describe('TC-001: interface language switch', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.login(env.username, env.password);
  });

  // Postcondition: always return the account to Ukrainian, even if the test fails.
  test.afterEach(async ({ preferencesPage }) => {
    await preferencesPage.restoreLanguage(DEFAULT_LANGUAGE.code);
  });

  test('authorized user can change the interface language', async ({ preferencesPage }) => {
    await preferencesPage.changeLanguage(NEW_LANGUAGE.code);

    await expect(preferencesPage.heading).toHaveText(NEW_LANGUAGE.heading);
  });
});
