function interpreter(node, environment) {
  switch (node.kind) {
    // Tipagem
    case 'Bool':
    case 'Int':
    case 'Str':
      console.log('ENTROU NA TIPAGEM');
      return node.value;
    // Alterar caso print(print(x))
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
      const lhs = interpreter(node.lhs, environment);
      const rhs = interpreter(node.rhs, environment);
      switch(node.op) {
        case 'Add':
          return lhs + rhs;
        case 'Sub':
          return lhs - rhs;
        case 'Mul': 
          return lhs * rhs;
        case 'Div':
          return Math.floor(lhs / rhs); // Consertar divisões por 0 | O resultado é arredondado para o menor numero
        case 'Rem':
          return lhs / rhs;
        case 'Eq':
          return lhs === rhs;
        case 'Neq':
          return lhs !== rhs;
        case 'Lt':
          return lhs < rhs;
        case 'Gt':
          return lhs > rhs;
        case 'Lte':
          return lhs <= rhs;
        case 'Gte':
          return lhs >= rhs;
        case 'And':
          return lhs && rhs;
        case 'Or':
          return lhs || rhs;
        default: 
          console.log('Nenhuma Operação Encotrada');
        // TODO: Ajeitar casos de booleanos para entradas SOMENTE booleanas
      }
    case 'If':
      return;
    default:
      console.log('Unrecognized Term');
  }
}

module.exports = interpreter;