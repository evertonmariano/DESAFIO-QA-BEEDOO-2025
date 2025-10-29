# language: pt

Funcionalidade: Cadastro de Curso
  Como um administrador
  Eu quero cadastrar novos cursos na plataforma
  Para que eles fiquem disponíveis na lista de cursos

  Cenário: CT-002 (Sucesso) Cadastrar um curso omline com sucesso (Caminho Feliz)
    Dado que eu estou na página de "Cadastro de curso"
    Quando eu preencher o formulário com dados válidos para um curso "Online"
    E eu clicar em "Cadastrar Curso"
    Então eu devo ser redirecionado para a "Lista de cursos"
    E eu devo ver o curso "Curso de Automação BDD (Online)" na lista
