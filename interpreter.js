function interpreter(node, environment) {
  switch (node.kind) {
    // Tipagem
    case 'Bool':
    case 'Int':
    case 'Str':
      return node.value;
    // Alterar caso print(print(x))
    case 'Print':
      const term = interpreter(node.value, environment);
      return console.log(term);
    case 'Let':
      const valor = interpreter(node.value, environment)
      return interpreter(node.next, {...environment, [node.name.text]: valor});
    case 'Var':
      if(environment[node.text]) {
        return environment[node.text];
      }
      throw new Error('Variável Indefinida');
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
          if(rhs === 0){
            throw new Error('Divisão Impossível');
          }
          return Math.floor(lhs / rhs);
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
          throw new Error('Operação não reconhecida')
        }
    case 'If':
      // TODO: Ajeitar casos de booleanos para entradas SOMENTE booleanas
      if(interpreter(node.condition, environment)){
        return interpreter(node.then, environment);
      }else {
        return interpreter(node.otherwise, environment);
      }
    case 'Function':
      return node;
    default:
      throw new Error('Termo não reconhecido');
  }
}

module.exports = interpreter;