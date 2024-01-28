/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('tasks').del()
  await knex('tasks').insert([
    {
       
      title:'dogs',
      description:"sggddbnfvsdfs"
  },
  {
     
      title:'update address',
      description:"dsvfsdgfshdgfsdvcb"
  },
  {
    
      title:' wash clothe',
      description:"dsvdcx"
  },
  
  ]);
};
