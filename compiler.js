// TODO: Verificar mais arquivos e somente compilar os não modificados
// TODO: Executar um erro só, ao invés de executar todos de uma vez
// TODO: Adicionar autosave | UTILIZAR rinhaconfig.json

const { exec } = require('child_process');

// Comando para gerar a AST.
const comando = 'rinha ./var/rinha/files/source.rinha > ./var/rinha/source.rinha.json';

class Compiler {
  static comandos = comando; // TODO: alterar para uma array posteriormente

  // "Compila" o programa gerando a AST
  static compile() {
    exec(comando, (err, stdout, stderr) => {
      if(err) console.log(stderr);
      return false;
    });
    return true;
  }
}

module.exports = Compiler;