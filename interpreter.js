function interpreter(node, environment) {
  switch (node.kind) {
    case 'Bool':
    case 'Int':
    case 'Str':
      return node.value;
    case 'Print':
      const term = interpreter(node.value, environment);
      console.log(term);
      return term;
    case 'Let':
      const valor = interpreter(node.value, environment);
      environment[node.name.text] = valor;
      return interpreter(node.next, environment);
    case 'Var':
      const newVar = node.text;
      if(newVar in environment) {
        return environment[newVar];
      }
      throw new Error(`Variável '${node.text}' não definida`);
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
          return lhs % rhs;
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
      return interpreter(node.condition, environment) === true ? interpreter(node.then, environment) : interpreter(node.otherwise, environment);
    case 'Function':
      return {node: node, env: environment};      
    case 'Call':
      const callee = interpreter(node.callee, environment);
      const FNode = callee.node;
      const args = node.arguments.map(arg => interpreter(arg, environment));
      const localEnv = { ...callee.env };
      FNode.parameters.forEach((param, i) => {
        localEnv[param.text] = args[i];
      });
      return interpreter(FNode.value, localEnv);
    case 'Tuple':
      return `(${interpreter(node.first, environment)}, ${interpreter(node.second, environment)})`;
    case 'First':
      return interpreter(node.value.first, environment);
    case 'Second':
      return interpreter(node.value.second, environment);
    default:
      throw new Error('Termo não reconhecido');
  }
}

// TODO: ajeitar caso de fib
// TODO: Realizar testes nodeJS\Bun

function logStats(txt) {
  console.log(txt);
}

function logDebug(txt) {
  console.log(txt);
}

module.exports = interpreter;