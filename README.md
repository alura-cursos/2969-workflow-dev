# API Livraria

![Badge em Desenvolvimento](http://img.shields.io/static/v1?label=STATUS&message=EM%20DESENVOLVIMENTO&color=GREEN)

## Resumo do projeto

Projeto de API REST para prática de JavaScript.
Livraria com sistema de cadastro e manejo de livros, autores e editoras.


## Stack utilizada

* `Node.js` v18.10.
* `express` v4.18.1,
* `knex` v2.1.0
* `sqlite3` v5.0.8
* `postgres` v8.9.0


## Instalação

Este projeto já conta com o código necessário para subir a API em um servidor local:

```
├── .github
│   └── workflows
│       ├── pre-push.yaml
│       └── unit-tests-pr.yaml
├── src
│   ├── controllers
│   │   ├── autoresController.js
│   │   ├── editorasController.js
│   │   └── livrosController.js
│   ├── db
│   │   ├── migrations
│   │   │   └── 20230130173832_livraria.js
│   │   ├── seeds
│   │   │   └── livraria.js
│   │   ├── dbconfig.js
│   │   ├── knexfile.js
│   │   └── livraria.sqlite
│   ├── models
│   │   ├── autor.js
│   │   ├── editora.js
│   │   └── livro.js
│   ├── routes
│   │   ├── autoresRoutes.js
│   │   ├── editorasRoutes.js
│   │   ├── index.js
│   │   └── livrosRoutes.js
│   ├── test
│   │   ├── models
│   │   │   ├── autor.test.js
│   │   │   └── editora.test.js
│   │   ├── routes
│   │   │   ├── autoresRoutes.test.js
│   │   │   ├── editorasRoutes.test.js
│   │   │   └── livrosRoutes.test.js
│   │   └── livraria.sqlite
│   └── app.js
├── docker-compose.yaml
├── Dockerfile
├── .env
├── .eslintrc.cjs
├── .gitignore
├── package.json
├── package-lock.json
├── populate.sql
├── README.md
└── server.js
```

### Instalação do projeto

> **IMPORTANTE:** Se você usa Windows como sistema operacional, recomendamos fortemente o uso do WSL (Windows Subsystem for Linux) durante o curso. Caso ainda não utilize, temos um [vídeo](https://cursos.alura.com.br/extra/alura-mais/windows-subsystem-for-linux-wsl--c238) e um [artigo](https://www.alura.com.br/artigos/wsl-executar-programas-comandos-linux-no-windows) explicando seus usos e como instalar. Siga os passos de instalação e uso antes de começar com o projeto do curso.

Este projeto está pronto para ser executado em um ambiente Docker. Por este motivo, será necessária apenas a instalação do Docker, não sendo necessária a instalação manual do projeto via `npm install`; também não será necessária a instalação manual dos bancos de dados utilizados (Postgres e SQLite).

Caso não tenha o Docker instalado, siga as instruções para seu sistema operacional na [documentação oficial do Docker](https://docs.docker.com/get-docker/).

Para executar em ambiente de desenvolvimento:

* Faça o `fork` e `clone` este repositório em seu computador;
* Entre no diretório local onde o repositório foi clonado;
* Utilize o comando `sudo docker-compose up dev` para "build" e subir o servidor local e expor a porta 3000 em `localhost`. Além de `dev` também subirá o serviço `db` com o banco de dados de desenvolvimento.

Para executar os testes:
* Com o projeto já clonado, navegue até o diretório local;
* Utilize o comando `sudo docker-compose run test`. O terminal deverá executar todos os testes, exibir os resultados e finalizar o processo.

## Como rodar a API

O comando `sudo docker-compose up dev` já fará o processo de instalar e subir o servidor local da API em modo de desenvolvimento. Você deverá ver no terminal a seguinte mensagem:

```
Starting livraria_api_dev ... done
Attaching to livraria_api_dev
livraria_api_dev | 
livraria_api_dev | > api-js-local@1.0.0 dev
livraria_api_dev | > npm run migrate && npm run seed && nodemon server.js
livraria_api_dev | 
livraria_api_dev | 
livraria_api_dev | > api-js-local@1.0.0 migrate
livraria_api_dev | > npx knex --knexfile=./src/db/knexfile.js migrate:latest
livraria_api_dev | 
livraria_api_dev | Working directory changed to /app/src/db
livraria_api_dev | Using environment: development
livraria_api_dev | Already up to date
livraria_api_dev | 
livraria_api_dev | > api-js-local@1.0.0 seed
livraria_api_dev | > npx knex --knexfile=./src/db/knexfile.js seed:run
livraria_api_dev | 
livraria_api_dev | Working directory changed to /app/src/db
livraria_api_dev | Using environment: development
livraria_api_dev | Ran 1 seed files
livraria_api_dev | [nodemon] 2.0.16
livraria_api_dev | [nodemon] to restart at any time, enter `rs`
livraria_api_dev | [nodemon] watching path(s): *.*
livraria_api_dev | [nodemon] watching extensions: js,mjs,json
livraria_api_dev | [nodemon] starting `node server.js`
livraria_api_dev | Servidor escutando em http://localhost:3000
```

Este projeto utiliza o Nodemon para gerenciar as mudanças na base de código e reiniciar o servidor automaticamente.

> **IMPORTANTE:** Esta API está programada para ser acessada a partir de `http://localhost:3000`. Certifique-se de que não existem outros recursos ocupando a porta `3000` antes de subir o projeto.

### Endpoints

A API expõe os seguintes *endpoints* a partir da *base URL* `localhost:3000`:

`/livros`
* `GET /livros`
* `GET /livros/:id`
* `POST /livros`
* `PUT /livros/:id`
* `DELETE /livros/:id`

`/autores`
* `GET /autores`
* `GET /autores/:id`
* `GET /autores/:id/livros`
* `POST /autores`
* `PUT /autores/:id`
* `DELETE /autores/:id`

`/editoras`
* `GET /editoras`
* `GET /editoras/:id`
* `GET /editoras/:id/livros`
* `POST /editoras`
* `PUT /editoras/:id`
* `DELETE /editoras/:id`

### Consulta aos bancos

Este projeto utiliza o SQLite como gerenciador de banco de dados SQL no ambiente de testes e o Postgres no ambiente de desenvolvimento.

#### Desenvolvimento com Postgres

O projeto utiliza um volume Docker para armazenar os dados e um serviço Postgres do Docker para subir um servidor de banco de dados atrelado à API.

Caso deseje fazer consultas diretamente ao Postgres:
* Execute o comando `sudo docker-compose up db`;
* Em um terminal separado, execute `sudo docker ps` para acessar os IDs dos containers ativos;
* `sudo docker exec -it <id do container> sh`
* Dentro do shell (identificado por `#`), execute `psql -U postgres`. Você verá a seguinte mensagem:
```
# psql -U postgres
psql (15.1 (Debian 15.1-1.pgdg110+1))
Type "help" for help.

postgres=# 
```

A partir desse momento o terminal estará pronto para receber consultas ao banco utilizando as linguagens PSQL e SQL.


#### Testes com SQLite

O SQLite utiliza um arquivo, normalmente de extensão `.sqlite` ou `.db`, para armazenar os dados.

O projeto já conta com uma base de dados configurada e populada com alguns dados iniciais, localizado na pasta `src/test/livraria.sqlite`. A base de testes é apagada, recriada e populada a cada teste; os scripts necessários estão no `package.json`: `prepare-test-db` e `drop-test-db`.

> **IMPORTANTE:** Não será necessário modificar nenhum dos scripts de teste durante o curso.

Caso queira acessar o arquivo `livraria.sqlite` para fazer consultas usando diretamente os comandos próprios do SQLite e do SQL, é possível fazer isso através do container:
* Execute o comando `sudo docker ps` para acessar o ID do container (`curso-workflow_dev` ou semelhante);
* Execute o comando `sudo docker exec -it <id do container> sh` para acessar o terminal do container.

A partir daí você pode entrar na cli do SQLite para acessar o arquivo `src/test/livraria.sqlite` e fazer consultas. Utilize o comando `sqlite3 ./src/test/livraria.sqlite`. O terminal deverá exibir a seguinte mensagem (a data e hora do acesso serão as locais do momento em que você acessar):

```
/app $ sqlite3 ./src/test/livraria.sqlite
SQLite version 3.40.1 2022-12-28 14:03:47
Enter ".help" for usage hints.
sqlite>
```

Para sair do SQLite utilize ctrl+C e para sair do terminal do container utilize ctrl+D.

> **IMPORTANTE:** Garanta que está utilizando exatamente os mesmos nomes de arquivo e caminhos de pasta, pois o comando `sqlite3 ./caminho/arquivo.sqlite` **irá criar um novo arquivo no local, caso já não exista um com o mesmo nome**. Ou seja, nesse caso será acessado um novo arquivo, ao invés do já existente.

## Roadmap

* Autenticação
* Tratamento de erros
* Validações
