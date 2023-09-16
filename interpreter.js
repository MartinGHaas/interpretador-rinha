function interpreter(node, environment) {
  switch (node.kind) {

    // Tipagem
    case 'Bool' || 'Int' || 'Str': 
    return node.value;
    
    // Método Print
    case 'Print':
      const term = interpreter(node.value, environment);
      return console.log(term);
    default:
      console.log('Unrecognized Term');
  }
}

module.exports = interpreter;