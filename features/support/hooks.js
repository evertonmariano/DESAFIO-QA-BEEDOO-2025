// features/support/hooks.js

import { Before, After, setDefaultTimeout } from '@cucumber/cucumber';
import playwright from 'playwright';

// TIMEOUT PARA 30 SEGUNDOS
setDefaultTimeout(30 * 1000); // 30.000 milissegundos

// Antes de cada cenário
Before(async function (scenario) {
  this.browser = await playwright.chromium.launch({ headless: false });
  this.context = await this.browser.newContext();
  this.page = await this.context.newPage();
});

// Depois de cada cenário
After(async function (scenario) {
  if (this.browser) {
    await this.browser.close();
  }
});