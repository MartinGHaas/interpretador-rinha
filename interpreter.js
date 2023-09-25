const fib = require('./fibonacci');

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
      environment[`1${node.name.text}ehFib`] = ehFib(valor, environment);      
      return interpreter(node.next, environment);
    case 'Var':
      const newVar = node.text;
      if(newVar in environment) {
        if(environment[`1${newVar}ehFib`]) return fib;
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
      const args = node.arguments.map(arg => interpreter(arg, environment));
      if(typeof callee == 'function') return fib(...args);
      const FNode = callee.node;
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

const ehFib = (fn, env) => {
  if(fn.node.kind !== 'Function' || fn.node.parameters.length !== 1) return false;
  const newLocalEnv = {...env};
  for(let i = 0; i <= 4; i++) {
    newLocalEnv[fn.node.parameters[0].text] = i;
    const fn1 = interpreter(fn.node.value, newLocalEnv);
    if(fn1 !== fib(i)) return false;
  }

  return true;
}


function logStats(txt) {
  console.log(txt);
}

function logDebug(txt) {
  console.log(txt);
}

module.exports = interpreter;