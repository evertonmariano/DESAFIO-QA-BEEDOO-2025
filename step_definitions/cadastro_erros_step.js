// step_definitions/cadastro_erros_step.js
import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from 'expect';

const URL_BASE = 'https://creative-sherbet-a51eac.netlify.app';

// --- Função Auxiliar (HELPER) ---
async function fillAllFields(page, { except = null, overrides = {} } = {}) {
  const commonFields = {
    'Nome do curso': 'Curso de Teste de Erro',
    'Descrição do curso': 'Testando validações',
    'Instrutor': 'QA Tester',
    'Url da imagem de capa': 'https://i.imgur.com/QdF3Q4w.png',
    'Data de início': '2024-01-01',
    'Data de fim': '2026-12-31',
    'Número de vagas': 10,
  };

  const finalFields = { ...commonFields, ...overrides };

  for (const label in finalFields) {
    if (label !== except) {
      const valueAsString = finalFields[label].toString(); 
      try {
        await page.getByLabel(label).fill(valueAsString);
      } catch (e) {
        await page.getByPlaceholder(label).fill(valueAsString);
      }
    }
  }

  if (except !== 'Tipo de curso') {
    await page.getByLabel('Tipo de curso').click();
    await page.getByRole('option', { name: 'Presencial' }).click();
    if (except !== 'Endereço') {
      await page.getByLabel('Endereço').fill('Rua dos Testes, 123');
    }
  }
}

// --- Steps de Erro ---
Given('nenhum campo do formulário foi preenchido', function () { /* Passo vazio */ });

Given('o usuário preencheu todos os campos, exceto {string}', async function (campoExcluido) {
  await fillAllFields(this.page, { except: campoExcluido });
});

Given('o usuário preencheu todos os campos com dados válidos', async function () {
  await fillAllFields(this.page);
});

Given('o usuário inseriu o número {int} no campo {string}', async function (numero, campo) {
  const texto = numero.toString();
  try { await this.page.getByLabel(campo).fill(texto); }
  catch (e) { await this.page.getByPlaceholder(campo).fill(texto); }
});

When('o usuário inseriu uma {string} {string}', async function (campo, data) {
  await this.page.getByLabel(campo).fill(data);
});

Then('o usuário deve permanecer na página "Cadastro de curso"', async function () {
  // Falha esperada: prova o bug do redirecionamento
  try { await this.page.waitForURL(`${URL_BASE}/`, { timeout: 3000 }); } 
  catch (e) { /* Timeout é bom */ }
  await expect(this.page.url()).toContain('/new-course');
});

Then('uma mensagem de erro {string} deve ser exibida abaixo do campo {string}', async function (mensagem, campo) {
  // Falha esperada: prova o bug da falta de mensagem
  let seletorErro;
  try { seletorErro = this.page.getByLabel(campo).locator('..').getByText(mensagem); } 
  catch(e) { seletorErro = this.page.getByPlaceholder(campo).locator('..').getByText(mensagem); }
  await expect(seletorErro).toBeVisible({ timeout: 5000 }); // Damos 5s para a mensagem aparecer
});

Then('uma mensagem de erro {string} deve ser exibida', async function (mensagem) {
  // Falha esperada: prova o bug da falta de mensagem
  const seletorErro = this.page.getByText(mensagem);
  await expect(seletorErro).toBeVisible({ timeout: 5000 });
});

// --- Steps para os Bugs (CT-008 e CT-009) ---

When('o usuário atualizar a página do navegador \\(pressionar F5)', async function () {
  // Falha esperada: prova o bug do 404
  await this.page.reload(); 
});

Then('a página "Cadastro de curso" deve ser recarregada corretamente', async function () {
  await expect(this.page.url()).toContain('/new-course');
});

Then('o formulário de cadastro deve ser exibido', async function () {
  // Falha esperada: prova o bug do 404
  const isVisible = await this.page.getByLabel('Nome do curso').isVisible();
  await expect(isVisible).toBe(true);
});

Given('o console do desenvolvedor \\(F12) está aberto', function () {
  this.consoleMessages = [];
  this.page.on('console', msg => {
    if (msg.type() === 'error' || msg.text().includes('404')) {
      this.consoleMessages.push(msg.text());
    }
  });
});

When('o usuário inseriu o caractere {string} no campo {string}', async function (texto, campo) {
  await this.page.getByLabel(campo).fill(texto);
});

Then('o sistema deve exibir uma validação de URL inválida', async function () {
  // Falha esperada: prova o bug da falta de validação
  const seletorErro = this.page.getByLabel('Url da imagem de capa').locator('..').getByText('Formato de URL inválido');
  
  let isVisible = false;
  try {
    await seletorErro.waitFor({ state: 'visible', timeout: 5000 });
    isVisible = await seletorErro.isVisible();
  } catch(e) {
  }
  await expect(isVisible).toBe(true);
});

Then('nenhum erro do tipo 404 deve ser registrado no console', function () {
  // Falha esperada: prova o bug do console
  const has404Error = this.consoleMessages.some(msg => msg.includes('404'));
  expect(has404Error).toBe(false); 
});