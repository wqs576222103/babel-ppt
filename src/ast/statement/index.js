// Statement 语句
function foo(n) {
  let sum = 0;
  try {
    while (sum < n) {
      sum += 1;
    }
    for (let i = 0; i < 10; i++) {
      if (i % 2 === 0) {
        console.log(i);
      } else {
        continue;
      }
    }

    switch (n) {
      case 1:
      case 2:
        break;
    }
    return sum;
  } catch (error) {}
  return sum;
}
for (const key in {}) {
}
