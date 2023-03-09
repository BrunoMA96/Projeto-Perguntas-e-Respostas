# ProjetoPerguntasRespostas
Primeiro projeto usando Node.js e MySQL.

Para rodar o projeto é necessio ter o MySQL Server instalado e alterar alguns dados no arquivo database.js na pasta database:

~~~javascript
const connection = new Sequelize('Nome do banco de dados', 'Usuario do server MySQL', 'Senha do server MySQL', {
    host: 'localhost',
    dialect: 'mysql'
})
~~~