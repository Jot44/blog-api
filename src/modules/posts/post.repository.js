const pool = require("../../config/database.js");

async function create(dados) {
  const result = await pool.query(
    `INSERT INTO posts (title, content) VALUES ($1, $2) RETURNING *`,
    [dados.title, dados.content],
  );

  return result.rows[0];
}

async function findAll() {
  const result = await pool.query(`SELECT * FROM posts`);

  return result.rows;
}

async function findById(id) {
  const result = await pool.query(`SELECT * FROM posts WHERE ID = $1`, [id]);

  return result.rows[0] || null;
}

async function update(id, dados) {
  const result = await pool.query(
    `UPDATE posts SET title = $1, content = $2 WHERE id = $3 RETURNING *`,
    [dados.title, dados.content, id],
  );

  return result.rows[0] || null;
}

async function remove(id) {
  const result = await pool.query(`DELETE * FROM posts WHERE id = $1`, [id]);

  return result.rowCount > 0;
}

module.exports = { create, findAll, findById, update, remove };
