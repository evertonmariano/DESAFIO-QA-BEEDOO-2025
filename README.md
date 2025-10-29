# Projeto: Beedoo QA Challenge - Módulo de Cursos

Este documento descreve o processo de análise e definição de requisitos para a *feature* de "Cadastro de Curso", incluindo a História de Usuário (User Story) e os Critérios de Aceite (AC) que guiarão o desenvolvimento e os testes.

---

## 1. User Story (História de Usuário)

**ID:** US-001
**Título:** Cadastro de Novo Curso

**Descrição (formato BDD):**
**Como um** Administrador (ou Instrutor) da plataforma,
**Eu quero** poder cadastrar um novo curso no sistema,
**Para que** ele seja exibido na "Lista de cursos" e possa ser acessado pelos usuários.

---

## 2. Tomada de Decisão: Como a User Story e os Critérios de Aceite foram definidos

A criação desta documentação é baseada em três pilares:
1.  **Análise das Telas:** O que a interface do usuário (UI) nos informa.
2.  **Análise de Bugs/Vulnerabilidades:** Os problemas concretos identificados por você nos testes exploratórios.
3.  **Boas Práticas de QA/Negócio:** Os requisitos implícitos que garantem a usabilidade e integridade dos dados.

### 2.1. Decisões sobre a História de Usuário (US-001)

A história foi estruturada usando o formato padrão "Como... Eu quero... Para que...":

* **"Como um Administrador (ou Instrutor)..." (A Persona)**
    * **Decisão:** A funcionalidade de "Cadastrar Curso" não é uma ação de um usuário final (aluno). É uma tarefa administrativa. A persona foi definida como "Administrador" ou "Instrutor", pois são os perfis que, logicamente, gerenciariam o conteúdo da plataforma.

* **"Eu quero poder cadastrar um novo curso no sistema..." (A Ação/Meta)**
    * **Decisão:** Esta é a descrição literal da funcionalidade. Através do link fornecido (`https://creative-sherbet-a51eac.netlify.app/` e o botão "CADASTRAR CURSO") deixam claro que o objetivo central do usuário é *criar* uma nova entrada de curso.

* **"...Para que ele seja exibido na 'Lista de cursos' e possa ser acessado pelos usuários." (O Valor/Benefício)**
    * **Decisão:** Esta é a "justificativa de negócio". Por que o administrador quer cadastrar um curso? O objetivo final não é apenas preencher um formulário, mas sim *popular a plataforma*. A tela inicial mostra a "Lista de cursos". Portanto, o benefício direto é fazer com que o novo item apareça nessa lista, ficando disponível para o público-alvo (alunos).

### 2.2. Decisões sobre os Critérios de Aceite (ACs)

Os Critérios de Aceite são as "regras" que definem se a história foi implementada corretamente. Eles foram criados para *blindar* a funcionalidade contra os problemas que você identificou.

**Fonte da Decisão: Bug 1 (Refresh 404)**
* **Bug1:** "ERRO do tipo GET 404 (Not Found) ao dar um refrech/F5 na URL: .../new-course."
* **AC Criado (AC 2):** "A página de cadastro (`/new-course`) deve carregar corretamente mesmo ao ser atualizada (F5), sem gerar erros 404."
* **Justificativa:** Este é um bug crítico de roteamento (comum em SPAs - Single Page Applications). O AC transforma o seu *relatório de bug* em um *requisito de qualidade*: a rota deve ser persistente.

**Fonte da Decisão: Bug 2 (URL "0" com 404 no console)**
* **Bug2:** "ERRO do tipo GET 404 (Not Found) ao informar '0' no campo = 'Url da imagem de capa'."
* **AC Criado (AC 5):** "O campo 'Url da imagem de capa' deve validar se a entrada é uma URL válida (ex: iniciar com `http://` ou `https://`). A entrada '0' não deve ser aceita e não deve gerar um erro 404 no console."
* **Justificativa:** O problema não é apenas o erro 404 no console, mas a *causa raiz*: o *backend* ou *frontend* está tentando processar "0" como um link, o que falha. O AC ataca a causa, exigindo validação de formato de URL *antes* do envio.

**Fonte da Decisão: Vulnerabilidades 1, 2, 4 e 7 (Validação de Campos)**
* **Vulnerabilidades:** "Nenhum campo é obrigatório", "Nenhum campo é tipificado", "O cadastro pode ser feito com todos os campos vazios", "Os campos poderiam ter alguma máscara...".
* **ACs Criados (AC 3, 4, 6, 10):**
    * `AC 3`: "Os campos 'Nome do curso', 'Instrutor', 'Data de início', 'Data de fim' e 'Número de vagas' são de preenchimento obrigatório." (Define *quais* são obrigatórios).
    * `AC 4`: "O sistema **não deve** permitir o cadastro se qualquer campo obrigatório estiver vazio." (Define o *comportamento*).
    * `AC 6`: "O campo 'Número de vagas' deve aceitar apenas números inteiros e positivos (ex: > 0)." (Define a *tipificação*).
    * `AC 10`: "Ao tentar cadastrar com dados inválidos... o sistema deve exibir mensagens de erro claras e objetivas..." (Define o *feedback* ao usuário, que você mencionou faltar).
* **Justificativa:** Foi identificada uma falha total de validação de dados (*client-side* e/ou *server-side*). Esses ACs estabelecem as regras de negócio básicas para garantir a integridade dos dados (Data Integrity).

**Fonte da Decisão: Boas Práticas de QA (Requisitos Implícitos)**
* **Problema:** A UI não diz, mas a lógica de negócio exige.
* **ACs Criados (AC 7, 8, 9):**
    * `AC 7`: "O campo 'Data de fim' não pode ser anterior à 'Data de início'." (Validação de consistência lógica).
    * `AC 8`: "O campo 'Descrição do curso' deve ter um limite de [ex: 500] caracteres." (Evita estouro de banco de dados, baseado na sua vulnerabilidade 3).
    * `AC 9`: "Ao cadastrar um curso com sucesso, o usuário deve ser redirecionado para a tela 'Lista de cursos'..." (Define o "fluxo feliz" pós-sucesso).
* **Justificativa:** Um QA não testa apenas o que está escrito, mas também o que está *implícito*. Se o formulário permite inserir uma data de término anterior ao início, os dados são inválidos. Se o usuário cadastra e nada acontece, a usabilidade é ruim. Esses ACs cobrem a lógica e a usabilidade que o usuário espera.


---


# Informações Complementares

## 1. Metodologia de Desenvolvimento: Ágil (Scrum/Kanban)
A metodologia de desenvolvimento escolhida para criar a documentação (User Story, Casos de Teste) foi inequivocamente a Ágil.

### Justificativa:

Na criação de User Stories (Histórias de Usuário): O formato usado (Como um... Eu quero... Para que...) é a pedra angular do desenvolvimento Ágil. Ele foca em entregar "fatias" de valor para o usuário (o módulo de curso), em vez de um grande projeto monolítico.

Definição de Critérios de Aceite (ACs): Os casos de teste (especialmente os Gherkins) são derivados diretamente dos Critérios de Aceite. Em um time Ágil, o time de QA trabalha junto com o Product Owner (PO) e Desenvolvedores para definir esses critérios antes do desenvolvimento, exatamente como simulado na "Situação Hipotética 3".

Foco em Features (Funcionalidades): Todo o desafio é centrado em um "módulo" ou "feature" (o cadastro de curso). Isso é característico de Sprints (Scrum) ou de um fluxo contínuo (Kanban), onde o trabalho é dividido em partes menores e gerenciáveis.

## 2. Metodologia de Teste: Black Box (Caixa-Preta)
A abordagem técnica que utilizada para encontrar os bugs e para escrever os casos de teste é a Black Box.

### Justificativa:

Sem Acesso ao Código-Fonte: Em nenhum momento foi analizado o código (HTML, CSS, JavaScript ou back-end) da aplicação.

Foco no Comportamento Externo: Todos os nossos testes foram baseados em observar o comportamento da aplicação do ponto de vista do usuário. Foram dadas entradas (cliques, dados nos formulários) e validamos as saídas (redirecionamento de página, erros 404, cursos aparecendo na lista).

Testes Baseados em Requisitos: Os casos de teste foram criados com base nos requisitos que definimos (os Critérios de Aceite), e não com base na lógica interna do software.

## 3. Tipos de Teste Aplicados
Dentro da metodologia Black Box, aplicamos principalmente dois tipos de teste:

### Testes Funcionais:

* Justificativa: A grande maioria dos nossos casos de teste (CT-001 a CT-007) são funcionais. Eles verificam sistematicamente se as funções da aplicação (cadastro, validação de campos, lógica de datas) estão em conformidade com os requisitos (os ACs).

### Testes Exploratórios:

* Justificativa: Foram identificados dois cenários, a partir de testes exploratórios. Não foi seguido um script, mas usada intuição e conhecimento para "explorar" a aplicação, resultando na descoberta dos bugs 404 (o refresh e o "0" na URL), que são cenários que um caso de teste padrão poderia não cobrir.


---


# LINK DE ARTEFATOS E EVIDÊNCIAS  
https://drive.google.com/drive/folders/1oJwiL8AHTLwirp8jTvZSMDN1AubLtZbe?usp=sharing
