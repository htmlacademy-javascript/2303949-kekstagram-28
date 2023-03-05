// Cтрока короче 20 символов
//имяФункции('проверяемая строка', 20); // true
// Длина строки ровно 18 символов
//имяФункции('проверяемая строка', 18); // true
// Строка длиннее 10 символов
//имяФункции('проверяемая строка', 10); // false

const isLessOrEqual = (string, length) => string.length <= length;
isLessOrEqual();

// Строка является палиндромом
//имяФункции('топот'); // true
// Несмотря на разный регистр, тоже палиндром
//имяФункции('ДовОд'); // true
// Это не палиндром
//имяФункции('Кекс');  // false

const isPalidrom = (string) => {
 return string.split('').reverse().join('').replaceAll(' ', '').toLowerCase() === string.replaceAll(' ', '').toLowerCase();
};
isPalidrom();

//имяФункции('2023 год');            // 2023
//имяФункции('ECMAScript 2022');     // 2022
//имяФункции('1 кефир, 0.5 батона'); // 105
//имяФункции('агент 007');           // 7
//имяФункции('а я томат');           // NaN

const extractNumber = (string) => {
  if (typeof string === 'number') {
    return string;
  }
  let result = '';
  for (let i = 0; i < string.length; i++){
    if (!Number.isNaN(parseInt(string.at(i),10))){
      result += string.at(i);
    }
  }
  return parseInt(result, 10);
};
extractNumber();

// Добавочный символ использован один раз
//имяФункции('1', 2, '0');      // '01'

// Добавочный символ использован три раза
//имяФункции('1', 4, '0');      // '0001'

// Добавочные символы обрезаны с конца
//имяФункции('q', 4, 'werty');  // 'werq'

// Добавочные символы использованы полтора раза
//имяФункции('q', 4, 'we');     // 'wweq'

// Добавочные символы не использованы, исходная строка не изменена
//имяФункции('qwerty', 4, '0'); // 'qwerty'

const myPadStart = (string, minLength, pad) => {
  const actualPad = minLength - string.length;

  return actualPad <= 0
    ? string
    : pad.slice(0, actualPad % pad.length) + pad.repeat(actualPad / pad.length)
 + string;
};
myPadStart();
