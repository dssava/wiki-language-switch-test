import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class PreferencesPage extends BasePage {
  protected readonly path = '/wiki/Special:Preferences';

  private readonly userProfileTab: Locator;
  private readonly languageSelect: Locator;
  private readonly saveButton: Locator;

  /** Page title (<h1>); its text depends on the interface language. */
  readonly heading: Locator;

  constructor(page: Page) {
    super(page);
    // Locators are language-independent: tab names change with the interface language.
    this.userProfileTab = page.getByRole('tab').first();
    // The real form field (a <select>); the visible dropdown is only a wrapper around it.
    this.languageSelect = page.locator('#mw-input-wplanguage');
    this.saveButton = page.locator('#prefcontrol button');
    this.heading = page.locator('h1').first();
  }

  async openUserProfileTab(): Promise<void> {
    await this.userProfileTab.click();
  }

  /** Picks an interface language by its code, e.g. "en". */
  async selectLanguage(code: string): Promise<void> {
    // force: the <select> is hidden behind the custom dropdown, so skip the visibility check.
    await this.languageSelect.selectOption(code, { force: true });
  }

  async save(): Promise<void> {
    await this.saveButton.click();
  }

  /** Whole scenario: open the tab, choose a language, save. */
  async changeLanguage(code: string): Promise<void> {
    await this.open();
    await this.openUserProfileTab();
    await this.selectLanguage(code);
    await this.save();
  }

  /** Postcondition helper: set the language back, saving only if something changed. */
  async restoreLanguage(code: string): Promise<void> {
    await this.open();
    await this.openUserProfileTab();
    await this.selectLanguage(code);
    if (await this.saveButton.isEnabled()) {
      await this.save();
    }
  }
}
