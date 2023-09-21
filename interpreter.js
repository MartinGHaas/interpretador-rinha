function interpreter(node, environment) {
  switch (node.kind) {
    // Tipagem
    case 'Bool':
    case 'Int':
    case 'Str':
      return node.value;
    case 'Print':
      const term = interpreter(node.value, environment);
      console.log(term);
      return term;
    case 'Let':
      const valor = interpreter(node.value, environment)
      return interpreter(node.next, {...environment, [node.name.text]: valor});
    case 'Var':
      if(node.text in environment) {
        return environment[node.text];
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
      return (obj) => {       
        const args = obj.args;
        const environment = obj.env;

        const localEnv = {...environment};
        node.parameters.forEach((param, i) => {
          localEnv[param.text] = args[i];
        })
        return interpreter(node.value, localEnv);
      }
      case 'Call':
        const execFunc = interpreter(node.callee, environment);
        const args = node.arguments.map(arg => interpreter(arg, environment));
        // adicionar if mais args q params
        return execFunc({args: [...args], env: environment}); // talvez melhorar a logica dps
      case 'Tuple':
        return [interpreter(node.first, environment), interpreter(node.second, environment)];
      case 'First':
        return interpreter(node.value.first, environment);
      case 'Second':
        return interpreter(node.value.second, environment);
    default:
      throw new Error('Termo não reconhecido');
  }
}

// TODO: Ajeitar casos de Closures
// TODO: ajeitar caso de fib
// TODO: FUNCS -> adicionar if mais args q params
// TODO: Realizar testes nodeJS\Bun

function logStats(txt) {
  console.log(txt);
}

function logDebug(txt) {
  console.log(txt);
}

module.exports = interpreter;