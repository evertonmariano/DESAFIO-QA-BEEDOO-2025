# language: pt

Funcionalidade: Cadastro de Curso - Cenários de Erro e Validação
  Testa as validações de formulário e a robustez da aplicação contra
  entradas incorretas.

  Cenário: (CT-003) Tentar submeter formulário com todos os campos vazios
    Dado que eu estou na página de "Cadastro de curso"
    E nenhum campo do formulário foi preenchido
    Quando eu clicar em "Cadastrar Curso"
    Então o usuário deve permanecer na página "Cadastro de curso"
    E uma mensagem de erro "O nome do curso é obrigatório" deve ser exibida abaixo do campo "Nome do curso"

  Cenário: (CT-004) Tentar submeter formulário sem o nome do curso
    Dado que eu estou na página de "Cadastro de curso"
    E o usuário preencheu todos os campos, exceto "Nome do curso"
    Quando eu clicar em "Cadastrar Curso"
    Então o usuário deve permanecer na página "Cadastro de curso"
    E uma mensagem de erro "O nome do curso é obrigatório" deve ser exibida abaixo do campo "Nome do curso"

  Cenário: (CT-005) Tentar submeter formulário com formato de URL inválido
    Dado que eu estou na página de "Cadastro de curso"
    E o usuário preencheu todos os campos com dados válidos
    E o usuário inseriu o caractere "url_invalida" no campo "Url da imagem de capa"
    Quando eu clicar em "Cadastrar Curso"
    Então o usuário deve permanecer na página "Cadastro de curso"
    E uma mensagem de erro "Formato de URL inválido" deve ser exibida abaixo do campo "Url da imagem de capa"

  Cenário: (CT-006) Tentar submeter formulário com intervalo de datas inconsistente
    Dado que eu estou na página de "Cadastro de curso"
    E o usuário preencheu todos os campos com dados válidos
    E o usuário inseriu uma "Data de início" "2026-10-10"
    E o usuário inseriu uma "Data de fim" "2026-01-01"
    Quando eu clicar em "Cadastrar Curso"
    Então o usuário deve permanecer na página "Cadastro de curso"
    E uma mensagem de erro "A data de fim não pode ser anterior à data de início" deve ser exibida

  Cenário: (CT-007) Tentar submeter formulário com tipo de dado inválido (não numérico)
    Dado que eu estou na página de "Cadastro de curso"
    E o usuário preencheu todos os campos com dados válidos
    E o usuário inseriu o caractere "cinquenta" no campo "Número de vagas"
    Quando eu clicar em "Cadastrar Curso"
    Então o usuário deve permanecer na página "Cadastro de curso"
    E uma mensagem de erro "Este campo aceita apenas números" deve ser exibida abaixo do campo "Número de vagas"

  Cenário: (CT-008 Bug) Erro 404 ao atualizar (F5) a página de cadastro
    Dado que eu estou na página de "Cadastro de curso"
    Quando o usuário atualizar a página do navegador (pressionar F5)
    Então a página "Cadastro de curso" deve ser recarregada corretamente
    E o formulário de cadastro deve ser exibido

  Cenário: (CT-009 Bug) Erro 404 no console ao cadastrar com "0" na URL da imagem
    Dado que eu estou na página de "Cadastro de curso"
    E o console do desenvolvedor (F12) está aberto
    E o usuário preencheu todos os campos com dados válidos
    E o usuário inseriu o caractere "0" no campo "Url da imagem de capa"
    Quando eu clicar em "Cadastrar Curso"
    Então o sistema deve exibir uma validação de URL inválida
    E nenhum erro do tipo 404 deve ser registrado no console