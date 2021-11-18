# Atena API

---
## Executando o projeto em ambiente de dev

#### Setup

Para executar o projeto localmente tenha as seguintes ferramentas instaladas:

- Docker;
- Docker compose;
- Algum client para gerenciar banco de dados (PGAdmin, DBeaver, Beekeeper, etc.)

#### Configurando variáveis de ambiente

Em seguida, clone o projeto na sua máquina, entre no diretório do repositório e crie um arquivo **`.env`** tomando como exemplo o arquivo **`.env.example`**.

#### Construindo o ambiente

Construa o ambiente dentro do container executando:

**```docker-compose build```**

E para executar o ambiente, execute:

**```docker-compose up```**

O resultado deve ser algo parecido com isso:

![](/home/lucas/Imagens/Captura de tela de 2021-11-18 02-00-53.png)

#### Aplicando as migrações no banco de dados

Com o docker em execução, todos os comandos relacionados ao projeto da API serão executados dentro do container. Para isso, vamos acessar o container desejado dessa forma:

**```docker ps```**

para listar os processos relacionados ao Docker. O resultado deve ser semelhante a:

![](/home/lucas/Imagens/Captura de tela de 2021-11-18 02-00-53.png)

Copie o id do container da API - que deve estar nomeado como `atena-api_atena-api` e use no seguinte comando:

**```docker exec -it <id-do-container> bash```**

e pronto! Você está dentro do container! Agora, para aplicar as migrações do banco, execute:

**```yarn prisma migrate dev```**

e fique atento ao retorno do comando.

De agora em diante, qualquer comando relacionado ao Node que você queria executar, terá que entrar dentro do container. Vale ressaltar que toda vez que você derruba e sobre o container novamente, um outro id é gerado para cada container, fazendo que os prcedimentos acima seja repetidos.

---

## Material de referência

Para maior entendimento do prisma dê uma olhada em [nesse link](https://www.digitalocean.com/community/tutorials/how-to-build-a-rest-api-with-prisma-and-postgresql-pt) e na [documentação](https://www.prisma.io/).

Para maior entendimento de como está sendo tratada a autentição com Oauth do Google dê uma olhada nos seguintes links:
- [Como construir o login do Google em um aplicativo React e API Node/Express](https://ichi.pro/pt/como-construir-o-login-do-google-em-um-aplicativo-react-e-api-node-express-143061143185008)
- [Programação orientada a Google #1 - Login com Google API NodeJS](https://www.youtube.com/watch?v=9alVt8IJthI&t=562s)
- [Programação orientada a Google #2 - Login com Google API NodeJS](https://www.youtube.com/watch?v=ge75_bhTFfA)
