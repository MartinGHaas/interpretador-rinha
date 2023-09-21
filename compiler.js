// SERÁ UTILIZADO SOMENTE EM DESENVOLVIMENTO

const { exec } = require('child_process');

// Comando para gerar a AST.
const comando = 'rinha ./var/rinha/files/source.rinha > ./var/rinha/source.rinha.json';

class Compiler {
  // Gera a AST
  static compile(callback) {
    exec(comando, (err, stdout, stderr) => {
      if(err) {
        console.log(stderr);
        return callback(false);
      }
      return callback(true);
    });
  }
}

module.exports = Compiler;