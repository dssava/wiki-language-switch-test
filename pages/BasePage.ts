import { Page } from '@playwright/test';

/**
 * Base class for all pages (inheritance + abstraction).
 * Holds what every page needs: the Playwright `page` and the ability to open itself.
 */
export abstract class BasePage {
  /** Relative path of the page; every concrete page must define its own. */
  protected abstract readonly path: string;

  constructor(protected readonly page: Page) {}

  async open(): Promise<void> {
    await this.page.goto(this.path);
  }
}
