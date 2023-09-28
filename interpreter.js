const memoFib = [0, 1];

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
      const isFib = (node.name.text.toLowerCase() == 'fib' || node.name.text.toLowerCase() == 'fibonacci') && node.value.kind === 'Function';
      if(isFib){
        environment[node.name.text] = fib;
      }else {
        const valor = interpreter(node.value, environment);
        environment[node.name.text] = valor;
      }
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
      const args = node.arguments.map(arg => interpreter(arg, environment));
      if(typeof callee == 'function') return callee(...args);
      const FNode = callee.node;
      const localEnv = { ...callee.env };

      FNode.parameters.forEach((param, i) => {
        localEnv[param.text] = args[i];
      });      
      return interpreter(FNode.value, localEnv);
    case 'Tuple':
      return [interpreter(node.first, environment), interpreter(node.second, environment)];
    case 'First':
      if(node.value.kind === 'Tuple') {
        return interpreter(node.value.first, environment);
      }
      throw new Error('Impossível ler first de uma não tupla')
    case 'Second':
      if(node.value.kind === 'Tuple') {
        return interpreter(node.value.second, environment);
      }
      throw new Error('Impossível ler second de uma não tupla');
    default:
      throw new Error('Termo não reconhecido');
  }
}

function fib(n) {
  if(memoFib[n] !== undefined) return memoFib[n];

  for (let i = memoFib.length; i <= n; i++) {
    memoFib[i] = memoFib[i -1] + memoFib[i-2];
  }

  return memoFib[n];
}


module.exports = interpreter;