import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  protected readonly path = '/wiki/Wikipedia:Strona_g%C5%82%C3%B3wna';

  private readonly loginLink: Locator;
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;
  private readonly errorMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.loginLink = page.getByRole('link', { name: 'Zaloguj się' });
    this.usernameInput = page.locator('#wpName1');
    this.passwordInput = page.locator('#wpPassword1');
    this.loginButton = page.locator('#wpLoginAttempt');
    this.errorMessage = page.locator('.cdx-message--error, .mw-message-box-error, .errorbox');
  }

  /** Opens the main page, clicks "Zaloguj się" and signs in like a real user. */
  async login(username: string, password: string): Promise<void> {
    await this.open();
    await this.loginLink.click();
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();

    // Wait until we are back on the wiki and the site knows who is logged in.
    await this.page.waitForURL(/pl\.wikipedia\.org/);
    await this.page.waitForFunction("!!window.mw?.config.get('wgUserName')");
  }
}
