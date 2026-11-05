const repository = require("./post.repository.js");
const AppError = require("../../shared/errors/AppError.js");

function validar(dados) {
  if (!dados) {
    throw new AppError("Corpo da requisição é obrigatório", 400);
  }

  if (typeof dados.title !== "string" || dados.title.trim() === "") {
    throw new AppError("Título é obrigatório", 400);
  }

  if (dados.title.trim().length > 150) {
    throw new AppError("O título deve ter no máximo 150 caracteres", 400);
  }

  if (typeof dados.content !== "string" || dados.content.trim() === "") {
    throw new AppError("Conteúdo é obrigatório", 400);
  }
}

async function create(dados) {
  validar(dados);
  return repository.create(dados);
}

async function findAll() {
  validar(dados);
  return repository.findAll();
}

async function findById(id) {
  const item = await repository.findById(id);
  if (!item) {
    throw new AppError("Post não encontrado", 404);
  }
  return item;
}

async function update(id, dados) {
  await findById(id);
  validar(dados);
  return repository.update(id, dados);
}

async function remove(id) {
  await findById(id);
  return repository.remove(id);
}

module.exports = { create, findAll, findById, update, remove };
