# Atena API

## Executando o projeto

Para executar o projeto se faz necessário tem em sua máquina o [Node.js](https://nodejs.org/en/) e o [Docker](https://www.docker.com/).
Se recomenda ter o [Yarn](https://yarnpkg.com/) instalado também, maioria dos exemplos abaixo serão com o yarn.

O proximo passo é instalar as depêndencias (com o yarn ou npm):

**`yarn install` ou `npm install`**

Logo depois executar o comando do Docker:

**`docker-compose up -d`**

Esse comando vai criar um contêiner em um estado separado para que você possa continuar a usar a guia do terminal.

Pode-se  verificar se o banco de dados foi criado executando:

**`docker ps`**

Logo depois você deve alterar o arquivo `.env.example` para `.env` e modifique as variaveis com as configurações do banco Postgres que está sendo executado no Docker, com as configurações do Google Cloud Platform e do JWT Secret.

Em seguida execute o seguinte comando para iniciar as migrações do prisma:

**`yarn prisma migrate dev`**

E por fim para executar o projeto:

**`yarn dev`**

Para maior entendimento do prima dê uma olhada em [nesse link](https://www.digitalocean.com/community/tutorials/how-to-build-a-rest-api-with-prisma-and-postgresql-pt) e na [documentação](https://www.prisma.io/).

Para maior entendimento de como está sendo tratada a autentição com Oauth do Google dê uma olhada nos seguintes links:
- [Como construir o login do Google em um aplicativo React e API Node/Express](https://ichi.pro/pt/como-construir-o-login-do-google-em-um-aplicativo-react-e-api-node-express-143061143185008)
- [Programação orientada a Google #1 - Login com Google API NodeJS](https://www.youtube.com/watch?v=9alVt8IJthI&t=562s)
- [Programação orientada a Google #2 - Login com Google API NodeJS](https://www.youtube.com/watch?v=ge75_bhTFfA)
