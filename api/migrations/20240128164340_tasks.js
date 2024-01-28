/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async knex=> {
    await knex.schema.createTable('tasks',tbl=>{
      tbl.increments();
      tbl.text('title',256).notNullable();
      tbl.text('description',256);
      
    })
  };

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async knex => {
    await knex.schema.dropTableIfExists('tasks');
  };