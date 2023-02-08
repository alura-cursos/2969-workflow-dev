/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema
    .createTable('autores', (table) => {
      table.increments('id');
      table.string('nome', 255).notNullable();
      table.string('nacionalidade', 255).notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    })
    .createTable('editoras', (table) => {
      table.increments('id');
      table.string('nome', 255).notNullable();
      table.string('cidade', 255).notNullable();
      table.string('email', 255).notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    })
    .createTable('livros', (table) => {
      table.increments('id');
      table.string('titulo', 255).notNullable();
      table.integer('paginas').notNullable();
      table.integer('editora_id').notNullable();
      table.integer('autor_id').notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema
    .dropTable('livros')
    .dropTable('editoras')
    .dropTable('autores');
}

// npx knex --knexfile=./src/db/knexfile.js migrate:make livraria
