const repository = require("./comment.repository.js");
const postService = require("../posts/post.service.js");
const AppError = require("../../shared/errors/AppError.js");

function validar(dados) {
  if (!dados) {
    throw new AppError("Corpo da requisição é obrigatório", 400);
  }

  if (
    typeof dados.author_name !== "string" ||
    dados.author_name.trim() === ""
  ) {
    throw new AppError("Nome do autor é obrigatório", 400);
  }

  if (dados.author_name.trim().length > 100) {
    throw new AppError(
      "O nome do autor deve ter no máximo 100 caracteres",
      400,
    );
  }

  if (typeof dados.content !== "string" || dados.content.trim() === "") {
    throw new AppError("Conteúdo é obrigatório", 400);
  }

  if (dados.content.trim().length > 1000) {
    throw new AppError("O comentário deve ter no máximo 1000 caracteres", 400);
  }
}

async function create(postId, dados) {
  await postService.findById(postId);
  validar(dados);
  return repository.create({ ...dados, post_id: postId });
}

async function findAllByPostId(postId) {
  await postService.findById(postId);
  return repository.findAllByPostId(postId);
}

async function remove(id) {
  const comentario = await repository.findById(id);
  if (!comentario) {
    throw new AppError("Comentário não encontrado", 404);
  }
  return repository.remove(id);
}

module.exports = { create, findAllByPostId, remove };
