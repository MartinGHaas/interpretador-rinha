function interpreter(node, environment) {
  switch (node.kind) {
    // Tipagem
    case 'Bool':
    case 'Int':
    case 'Str':
      console.log('ENTROU NA TIPAGEM');
      return node.value;
    // Método Print
    case 'Print':
      console.log('ENTROU NO PRINT');
      const term = interpreter(node.value, environment);
      return console.log(term);
    case 'Let':
      console.log('ENTROU NO LET');
      const valor = interpreter(node.value, environment)
      return interpreter(node.next, {...environment, [node.name.text]: valor});
    case 'Var':
      console.log('ENTROU NO VAR');
      return environment[node.text];
    case 'Binary':
      const rhs = interpreter(node.rhs, environment);
      const lhs = interpreter(node.lhs, environment);
      switch(node.op) {
        case 'Add':
          return rhs + lhs;
        default: 
          console.log('Nenhuma Operação Encotrada');
      }
      
      return;
    default:
      console.log('Unrecognized Term');
  }
}

module.exports = interpreter;