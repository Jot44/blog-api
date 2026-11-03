const pool = require("../../config/database.js");

async function create(dados) {
  const result = await pool.query(
    `INSERT INTO comments (post_id, author_name, content) VALUES ($1, $2, $3) RETURNING *`,
    [dados.post_id, dados.author_name, dados.content],
  );

  return result.rows[0];
}

async function findAllByPostId(postId) {
  const result = await pool.query(
    `SELECT * FROM comments WHERE post_id = $1 ORDER BY created_at ASC`,
    [postId],
  );
  return result.rows;
}

async function findById(id) {
  const result = await pool.query(`SELECT * FROM comments WHERE id = $1`, [id]);
  return result.rows[0] || null;
}

async function remove(id) {
  const result = await pool.query(`DELETE FROM comments WHERE id = $1`, [id]);
  return result.rowCount > 0;
}

module.exports = { create, findAllByPostId, findById, remove };
