const compiler = require('./compiler');

compiler.compile((compilou) => {
  compilou ? console.log('Programa compilado com sucesso') : null;
});
