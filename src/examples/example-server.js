const express = require('express');
const PORT = process.env.EXPRESS_PORT || 3001;
const app = express();

function nthFibonacci(num) {
  const pre = {0: 0, 1: 1};
  function subFib(num) {
    if (pre[num] !== undefined) return pre[num];
    return subFib(num - 1) + subFib(num - 2);
  }
  return subFib(num);
}

app.use('/', (_req, res) => {
  const fibNum = Math.ceil(Math.random()*40);
  const fibRes = nthFibonacci(fibNum);
  res.send(`<html><body>Fibonacci number ${fibNum}: ${fibRes}<button onClick="window.location.reload()">Random Fib</button></body></html>`)
})

app.listen(PORT, () => {
  console.log(`example-server listening on: http://localhost:${PORT}/`);
});