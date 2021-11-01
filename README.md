# Atena API

# Rodando o projeto

Para executar o projeto se faz necessário tem em sua máquina o [Node.js](https://nodejs.org/en/) e o [Docker](https://www.docker.com/).
Se recomenda ter o [Yarn](https://yarnpkg.com/) instalado também.

O proximo passo é instalar as depêndencias (com o yarn ou npm):

**`yarn install` ou `npm install`**

Logo depois executar o comando do Docker:

**`docker-compose up -d`**

Esse comando vai criar um contêiner m um estado separado para que você possa continuar a usar a guia do terminal.

Pode-se  verificar se o banco de dados foi criado executando:

**`docker ps`**

Logo depois você deve alterar o arquivo `.env.example` para `.env` e modifique as variavel com as configurações do seu banco Postgres, com as configurações do Google Cloud Platform e do JWT Secret.

