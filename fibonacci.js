// Melhor para números "pequenos"

function fib(n) {
  if (n <= 0) return 0;
  if (n === 1) return 1;

  let pre = 0;
  let atual = 1;

  for (let i = 2; i <= n; i++) {
    const next = pre + atual;
    pre = atual;
    atual = next;
  }

  return atual;
}

module.exports = fib;