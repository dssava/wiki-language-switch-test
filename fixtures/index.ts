import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { PreferencesPage } from '../pages/PreferencesPage';

type Pages = {
  loginPage: LoginPage;
  preferencesPage: PreferencesPage;
};

/** Extends Playwright's `test` so page objects are created for us (dependency injection). */
export const test = base.extend<Pages>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  preferencesPage: async ({ page }, use) => {
    await use(new PreferencesPage(page));
  },
});

export { expect } from '@playwright/test';
