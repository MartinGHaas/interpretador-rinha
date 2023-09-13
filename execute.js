const fs = require('fs');
const interpreter = require('./interpreter');
const Compiler = require('./compiler');

function executeRinha(pathToRinha, environment = {}) {
  if(Compiler.compile()) {
    try {
      const pureData = fs.readFileSync(pathToRinha, 'utf-8');
      const AST = JSON.parse(pureData);
      return interpreter(AST, environment);
    } catch(err) {
      const error = new Error();
      error.name = "Erro ao interpretar o Código"
      error.stack = err.stack;
      throw error;
    }
  }
  // Caso não exista compilação, o Compiler já executa a causa do erro
}

executeRinha('./var/rinha/source.rinha.json');