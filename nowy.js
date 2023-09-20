const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Podaj ilość włosów na swojej głowie: ', (iloscWlosow) => {
  const iloscWlosowNum = parseInt(iloscWlosow);

  if (iloscWlosowNum === 0) {
    console.log('Jesteś łysy.');
  } else if (iloscWlosowNum <= 1000) {
    console.log('Jesteś łysiną.');
  } else {
    console.log('Jesteś normalny.');
  }

  rl.close();
});
