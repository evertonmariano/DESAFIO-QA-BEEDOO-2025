// step_definitions/common_steps.js
import { Given, When } from '@cucumber/cucumber';
import { expect } from 'expect';

const URL_BASE = 'https://creative-sherbet-a51eac.netlify.app';

// PASSO COMUM: Abrir a página de cadastro
Given('que eu estou na página de "Cadastro de curso"', async function () {
  await this.page.goto(URL_BASE);
  await this.page.click('text=Cadastrar Curso');
  await this.page.waitForURL(`${URL_BASE}/new-course`);
  await expect(this.page.url()).toContain('/new-course');
});

// PASSO COMUM: Clicar no botão de salvar
When('eu clicar em "Cadastrar Curso"', async function () {
  await this.page.getByRole('button', { name: 'CADASTRAR CURSO' }).click();
});