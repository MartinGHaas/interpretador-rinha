const fs = require('fs');
const interpreter = require('./interpreter');

function executeRinha(pathToRinha, environment = {}) {
  try {
    const pureData = fs.readFileSync(pathToRinha, 'utf-8');
    const AST = JSON.parse(pureData);
    return interpreter(AST.expression, environment);
  } catch(err) {
    const error = new Error();
    error.name = "Erro ao interpretar o Código"
    error.stack = err.stack;
    throw error;
  }
 
}

executeRinha('./var/rinha/source.rinha.json', {});