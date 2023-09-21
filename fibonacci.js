const fib = (n) => {
  const F = [
    [BigInt(1), BigInt(1)],
    [BigInt(1), BigInt(0)]
  ]

  let M = F;
  for(let i = 2; i <= n; i++) {
    let a11 = M[0][0] * F[0][0] + M[0][1] * F[1][0];
    let a12 = M[0][0] * F[0][1] + M[0][1] * F[1][1];
    let a21 = M[1][0] * F[0][0] + M[1][1] * F[1][0];
    let a22 = M[1][0] * F[0][1] + M[1][1] * F[1][1];

    M = [
      [a11, a12],
      [a21, a22]
    ]
  }
  return M[0][1].toString(); // Valor equivalente a F(n)
}

console.log(fib(1000));

// Fontes: 
// Wikipedia: https://pt.wikipedia.org/wiki/Sequ%C3%AAncia_de_Fibonacci
// Matemática Rio: https://www.youtube.com/watch?v=N3mgQIGxtlE
// Lucas Montano(do canal Lucas Montano): https://youtu.be/XfmZRS6oP3U?si=JyGOaxo_EuwQhi9p
