import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class PreferencesPage extends BasePage {
  protected readonly path = '/wiki/Special:Preferences';

  private readonly userProfileTab: Locator;
  private readonly languageInput: Locator;
  private readonly saveButton: Locator;

  /** Page title (<h1>); its text depends on the interface language. */
  readonly heading: Locator;

  constructor(page: Page) {
    super(page);
    // Locators are language-independent: tab names change with the interface language.
    this.userProfileTab = page.getByRole('tab').first();
    this.languageInput = page
      .locator('.mw-htmlform-field-HTMLSelectLanguageField')
      .getByRole('combobox');
    this.saveButton = page.locator('#prefcontrol button');
    this.heading = page.locator('h1').first();
  }

  async openUserProfileTab(): Promise<void> {
    await this.userProfileTab.click();
  }

  /** Picks an interface language by its code. List items look like "en · English". */
  async selectLanguage(code: string): Promise<void> {
    await this.languageInput.click();
    await this.languageInput.fill(code);
    await this.page.getByRole('option', { name: new RegExp(`^${code} ·`) }).first().click();
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
