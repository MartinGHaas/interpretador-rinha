// TODO: Verificar mais arquivos e somente compilar os não modificados
// TODO: Executar um erro só, ao invés de executar todos de uma vez
// TODO: Adicionar autosave | UTILIZAR rinhaconfig.json

const { exec } = require('child_process');

// Comando para gerar a AST.
const comando = 'rinha ./var/rinha/files/source.rinha > ./var/rinha/source.rinha.json';

class Compiler {
  static comandos = comando; // TODO: alterar para uma array posteriormente

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