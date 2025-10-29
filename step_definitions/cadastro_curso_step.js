// step_definitions/cadastro_curso_step.js
import { When, Then } from '@cucumber/cucumber';
import { expect } from 'expect';

const URL_BASE = 'https://creative-sherbet-a51eac.netlify.app';

// Nota: O passo 'Given' e 'When (clicar)' estão em common_steps.js

// PASSO ESPECÍFICO DE SUCESSO
When('eu preencher o formulário com dados válidos para um curso {string}', async function (tipoCurso) {

  const nomeDoCurso = `Curso de Automação BDD (${tipoCurso})`;
  await this.page.getByLabel('Nome do curso').fill(nomeDoCurso);
  await this.page.getByLabel('Descrição do curso').fill('Aplicando Cucumber e Playwright');
  await this.page.getByLabel('Instrutor').fill('Fulano de Tal da Silva');
  await this.page.getByLabel('Url da imagem de capa').fill('https://i.imagem.com/123456.png');
  await this.page.getByLabel('Data de início').fill('2024-01-01');
  await this.page.getByLabel('Data de fim').fill('2026-12-31');

  const numeroVagas = 50;
  await this.page.getByLabel('Número de vagas').fill(numeroVagas.toString());

  // Lógica específica
  if (tipoCurso === 'Presencial') {
    await this.page.getByLabel('Tipo de curso').click();
    await this.page.getByRole('option', { name: 'Presencial' }).click();
    await this.page.getByLabel('Endereço').fill('Rua dos bobos, número zero - CEP: 00000-00');

  } else if (tipoCurso === 'Online') {
    await this.page.getByLabel('Tipo de curso').click();
    await this.page.getByRole('option', { name: 'Online' }).click();

    const linkLocator = this.page.getByLabel('Link de inscrição');
    await linkLocator.waitFor({ state: 'visible', timeout: 10000 });
    await linkLocator.fill('https://beedoo.com.br');
  }
});

// PASSOS DE VALIDAÇÃO DE SUCESSO
Then('eu devo ser redirecionado para a "Lista de cursos"', async function () {
  await this.page.waitForURL(`${URL_BASE}/`);
  await expect(this.page.url()).toBe(`${URL_BASE}/`);
});

Then('eu devo ver o curso {string} na lista', async function (nomeCurso) {
  const seletorTexto = this.page.getByText(nomeCurso, { exact: true });
  await seletorTexto.waitFor();
  const isVisible = await seletorTexto.isVisible();
  await expect(isVisible).toBe(true);
});