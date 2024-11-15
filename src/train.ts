/* Project Standards:
- Logging standards
- Naming standards:
    function, method, variable => CAMEL 
    class => PASCAL 
    folder, file => KEBAB
    CSS = SNAKE
- Error handling
*/


/** Validations:
  1) Frontend validation
  2) Backend validation
  3) Database validation

  4) Pipe validation - Front va Backend orasida serverga kirishga javob beradi
 
 */



/** Request: 
  Traditional API
  Rest API
  GraphQL API
 */

/** Frontend Development:
Traditional FD => BSSR (admin) => EJS
Modern FD => SPA (user's application) => React

 */

/** Cookylar xislatlari:
  request join
  self destroy
 
 */

/* ------ Task G -------  */

// Shunday function tuzingki unga integerlardan iborat array pass bolsin va function bizga osha arrayning eng katta qiymatiga tegishli birinchi indexni qaytarsin.
// MASALAN: getHighestIndex([5, 21, 12, 21, 8]) return qiladi 1 sonini.

function findIndexOfGreatest(array: number[]): number | undefined {
  let greatest: number | undefined;
  let indexOfGreatest: number | undefined;

  for (let i = 0; i < array.length; i++) {
    if (greatest === undefined || array[i] > greatest) {
      greatest = array[i];
      indexOfGreatest = i;
    }
  }

  return indexOfGreatest;
}

const javob = findIndexOfGreatest([22, 44, 6, 12]);
//console.log(javob);

/* ------ Task H -------  */
//shunday function tuzing, u integerlardan iborat arrayni argument sifatida qabul qilib, faqat positive qiymatlarni olib string holatda return qilsin
//MASALAN: getPositive([1, -4, 2]) return qiladi "12"

function getPositive(arr: number[]): string {
  const result = arr.filter(num => num > 0).join('');
  return `"${result}"`; // Natijani qo'shtirnoq ichida qaytarish
}

const javob2 = getPositive([33,-3, -4, 55]);
//console.log("Javob: ",javob2); 


/* ------ Task H2 -------  */

//Shunday function tuzing, unga string argument pass bolsin. Function ushbu agrumentdagi digitlarni yangi stringda return qilsin
//MASALAN: getDigits("m14i1t") return qiladi "141"


function separate(num: string) {
  return num.replace(/\D/gi, '');
}

const H2 = separate('he234llo99');
//console.log(H2);


/* ------ Task I -------  */
// Shunday function yozing, u parametridagi array ichida eng kop takrorlangan raqamni topib qaytarsin.
// MASALAN: majorityElement([1,2,3,4,5,4,3,4]) return 4

function mostFrequentElement(arr: number[]) {
  let res = [];
  for (let x of arr) {
      let count = 0;
      for (let i of arr) {
          if (i == x) {
              count++;
          }
      }
      res.push(count);
  }
  return arr[res.indexOf(Math.max(...res))];
}
const Task_I = mostFrequentElement([13 , 2 , 1 , 2 , 10 , 1 , 1 ]);
//console.log("The most frequent number is: ", Task_I)


/* ------ Task J -------  */
//Shunday function yozing, u string qabul qilsin va string ichidagi eng uzun sozni qaytarsin.
//MASALAN: findLongestWord("I come from Uzbekistan") return "Uzbekistan"

function longestWord(a:string){
  let str = a.split(" ");
  let longest = 0;
  let word = null;
  str.forEach(function(str:string) {
      if (longest < str.length) {
          longest = str.length;
          word = str;
      }
  });
  return word;
}
const Task_J = longestWord("I am from Uzbekistan");
//console.log(Task_J);

/* ------ Task K -------  */
//Shunday function yozing, u string qabul qilsin va string ichidagi unli harflar sonini qaytarsin.
//MASALAN: countVowels("string") return 1;


function countWovels(v:string) {
  let m = v.match(/[euioa]/gi);
  return m === null ? 0: m.length 
}

const Taks_K = countWovels("Wee are MIT15!")
//console.log("We have",Taks_K, "vowels");



/* ------ Task L -------  */
//Shunday function yozing, u string qabul qilsin va string ichidagi hamma sozlarni chappasiga yozib va sozlar ketma-ketligini buzmasdan stringni qaytarsin.
//MASALAN: reverseSentence("we like coding!") return "ew ekil gnidoc";

function reverseSentence(sentence: string): string {
  return sentence
      .split(' ')                  
      .map(word => word.split('').reverse().join(''))  
      .join(' ');                 
}

//console.log(reverseSentence("we like coding!")); 

/* ------ Task M -------  */

//Shunday function yozing, u raqamlardan tashkil topgan array qabul qilsin va array ichidagi har bir raqam uchun raqamni ozi va hamda osha raqamni kvadratidan tashkil topgan object hosil qilib, hosil bolgan objectlarni array ichida qaytarsin.
//MASALAN: getSquareNumbers([1, 2, 3]) return [{number: 1, square: 1}, {number: 2, square: 4}, {number: 3, square: 9}];

function getSquareNumbers(numbers: number[]): { number: number, square: number }[] {
  return numbers.map(num => ({
    number: num,
    square: num * num
  }));
}

//console.log(getSquareNumbers([1, 2, 3]));

/* ------ Task N -------  */
//Shunday function yozing, u string qabul qilsin va string palindrom yani togri oqilganda ham, orqasidan oqilganda ham bir hil oqiladigan soz ekanligini aniqlab boolean qiymat qaytarsin.
//MASALAN: palindromCheck("dad") return true;  palindromCheck("son") return false;

function palindromCheck(str: string): boolean {
  // Stringni teskari o'giramiz va uni asl string bilan solishtiramiz
  const reversedStr = str.split('').reverse().join('');
  return str === reversedStr;
}

//console.log(palindromCheck("dad"));  // true
//console.log(palindromCheck("son"));  // false

/* ------ Task O -------  */
// Shunday function yozing, u har xil valuelardan iborat array qabul qilsin va array ichidagi sonlar yigindisini hisoblab chiqqan javobni qaytarsin.
// MASALAN: calculateSumOfNumbers([10, "10", {son: 10}, true, 35]) return 45

function calculateNumbers(arr: any[]):number {
  const filterNumber = arr.filter((item: any) => typeof item === 'number'); // Only filter numbers
  let sum = 0;
  for (let i of filterNumber) {
      sum += i;  // Sum all filtered numbers
  }
  return sum;
}

const Task_O = calculateNumbers([10, "10", {son: 10}, true, 25]);
//console.log("Natija: ",Task_O);  

/* ------ Task P -------  */

//Shunday function yozing, u object qabul qilsin va arrayni object arrayga otkazib arrayni qaytarsin qaytarsin.
//MASALAN: objectToArray( {a: 10, b: 20}) return [['a', 10], ['b', 20]]

function objectToArray(obj: { [key: string]: any }): [string, any][] {
  return Object.entries(obj);
}

const Task_P = objectToArray({ a: 33, b: 44 });
//console.log("Natija:",Task_P); 

/* ------ Task Q -------  */

//Shunday function yozing, u 2 ta parametrgga ega bolib birinchisi object, ikkinchisi string. Agar string parametr objectni propertysi bolsa true bolmasa false qaytarsin.
//MASALAN: hasProperty({name: "BMW", model: "M3"}, "model") return true; hasProperty({name: "BMW", model: "M3"}, "year") return false

function hasProperty(obj: object, prop: string): boolean {
  return obj.hasOwnProperty(prop);
}
//console.log(hasProperty({ name: "BMW", model: "M3" }, "model")); 
//console.log(hasProperty({ name: "BMW", model: "M3" }, "year")); 

/* ------ Task R -------  */
//Shunday function yozing, u string parametrga ega bolsin. String "1+2" holatda pass qilinganda string ichidagi sonlar yigindisini number holatda qaytarsin.
//MASALAN: calculate("1+3") return 4;

function calculate(expression: string): number {
  return eval(expression);
}

//console.log(calculate("12+21+33")); 

/* ------ Task S -------  */
//Shunday function yozing, u numberlardan tashkil topgan array qabul qilsin va osha numberlar orasidagi tushib qolgan sonni topib uni return qilsin
//MASALAN: missingNumber([3, 0, 1]) return 2

function missingNumber(nums: number[]): number {
  const n = nums.length;
  const expectedSum = (n * (n + 1)) / 2; // 0 dan N gacha bo'lgan sonlar yig'indisi
  const actualSum = nums.reduce((acc, curr) => acc + curr, 0); // Massivdagi mavjud sonlar yig'indisi
  return expectedSum - actualSum; // Yetishmayotgan son - kutilgan yig'indi va haqiqiy yig'indi orasidagi farq
}


// console.log("Yetishmagan son:",missingNumber([0, 1])); // 2

/* ------ Task T -------  */
//Shunday function yozing, u sonlardan tashkil topgan 2 ta array qabul qilsin va ikkala arraydagi sonlarni tartiblab bir arrayda qaytarsin
//MASALAN: mergeSortedArrays([0,3,4,31], [4,6,30]); return [0,3,4,4,6,30,31]


function mergeSortedArrays(arr1: number[], arr2: number[]): number[] {
  let mergedArray: number[] = [];
  let i = 0; // arr1 uchun index
  let j = 0; // arr2 uchun index

  // Ikkala arrayni birlashtirish
  while (i < arr1.length && j < arr2.length) {
      if (arr1[i] < arr2[j]) {
          mergedArray.push(arr1[i]);
          i++;
      } else {
          mergedArray.push(arr2[j]);
          j++;
      }
  }

  // Qolgan elementlarni qo'shish
  while (i < arr1.length) {
      mergedArray.push(arr1[i]);
      i++;
  }

  while (j < arr2.length) {
      mergedArray.push(arr2[j]);
      j++;
  }

  return mergedArray;
}

const Task_T = mergeSortedArrays([0, 3, 4, 31], [4, 6, 30]);
//console.log(Task_T);


/* ------ Task U -------  */
//Shunday function yozing, uni number parametri bolsin va 0 dan berilgan parametrgacha bolgan oraliqdagi faqat toq sonlar nechtaligini return qilsin
//MASALAN: sumOdds(9) return 4; sumOdds(11) return 5;

function sumOdds(n: number): number {
  let count = 0;
  for (let i = 1; i <= n; i += 2) {
    count++;
  }
  return count;
}
//console.log("Natija:",sumOdds(7));  


/* ------ Task V -------  */
//Shunday function yozing, uni string parametri bolsin va stringdagi harf va u harf necha marta takrorlangani sonidan tashkil topgan object qaytarsin.
//MASALAN: countChars("hello") return {h: 1, e: 1, l: 2, o: 1}

function countChars(str: string): { [key: string]: number } {
  const charCount: { [key: string]: number } = {};
  
  for (const char of str) {
      charCount[char] = (charCount[char] || 0) + 1;
  }
  
  return charCount;
}
//console.log(countChars("Jason"));

/* ------ Task W -------  */
//Shunday function yozing, uni array va number parametrlari bolsin. Function arrayni numberda berilgan uzunlikda kesib bolaklarga ajratilgan array holatida qaytarsin
//MASALAN: chunkArray([1,2,3,4,5,6,7,8,9,10], 3) return [[1,2,3], [4,5,6], [7,8,9], [10]]

function chunkArray(arr: any[], chunkSize: number): any[][] {
  const result: any[][] = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
      const chunk = arr.slice(i, i + chunkSize);
      result.push(chunk);
  }
  return result;
}

//console.log(chunkArray([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 4));

/* ------ Task X -------  */
/** 
Shunday function yozing, uni object va string parametrlari bo'lsin.
Bu function, birinchi object parametri tarkibida, kalit sifatida ikkinchi string parametri
necha marotaba takrorlanganlini sanab qaytarsin.

Eslatma => Nested object'lar ham sanalsin

MASALAN: countOccurrences({model: 'Bugatti', steer: {model: 'HANKOOK', size: 30}}, 'model') return 2

Yuqoridagi misolda, birinchi argument object, ikkinchi argument 'model'.
Funktsiya, shu ikkinchi argument 'model', birinchi argument object
tarkibida kalit sifatida 2 marotaba takrorlanganligi uchun 2 soni return qilmoqda */

function countOccurrences(obj: any, key: string): number {
  let count = 0;
  if (typeof obj === 'object' && obj !== null) {
      for (const k in obj) {
          if (k === key) {
              count++;
          }
          count += countOccurrences(obj[k], key);
      }
  }

  if (Array.isArray(obj)) {
      for (const item of obj) {
          count += countOccurrences(item, key);
      }
  }
  return count;
}
const exampleObject = {
  model: 'Bugatti',
  steer: {
      model: 'HANKOOK',
      size: 30
  }
};
//console.log(countOccurrences(exampleObject, 'model')); 


/* ------ Task Y -------  */

//Shunday function yozing, uni 2 ta array parapetri bolsin. Function ikkala arrayda ham ishtirok etgan qiymatlarni bir arrayda qaytarsin
//MASALAN: findIntersection([1,2,3], [3,2,0]) return [2,3]

function findIntersection(arr1: number[], arr2: number[]): number[] {
  return arr1.filter(value => arr2.includes(value));
}


const result = findIntersection([1, 2, 3], [3, 2, 0]);
//console.log(result); 

/* ------ Task Z -------  */
//Shunday function yozing, u sonlardan tashkil topgan array qabul qilsin. Function arraydagi juft sonlarni yigindisini qaytarsin
//MASALAN: sumEvens([1,2,3]) return 2


function sumEvens(arr: number[]): number {
  let sum = 0;
  for (let num of arr) { 
      if (num % 2 === 0) { 
          sum += num; 
      }
  }
  return sum; 
}
//console.log(sumEvens([1, 2, 3, 4, 5,6]));

/* ------ Task ZA -------  */
//Shunday function yozing, u array ichidagi objectlarni “age” qiymati boyicha sortlab bersin. 
//MASALAN: sortByAge([{age:23}, {age:21}, {age:13}]) return [{age:13}, {age:21}, {age:23}]

type Person = { age: number };

function sortByAge(arr: Person[]): Person[] {
  return arr.sort((a, b) => a.age - b.age);
}


const sortedArray = sortByAge([{ age: 23 }, { age: 21 }, { age: 13 }]);
//console.log(sortedArray);

/* ------ Task ZB -------  */
//Shunday function yozing, uni 2 ta number parametri bolsin va berilgan sonlar orasidan random raqam return qilsin
//MASALAN: randomBetween(30, 50) return 45

function randomBetween(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


const randomNumber = randomBetween(20, 65);
//console.log(randomNumber); 


/** TASK ZC */

/**Selisy (°C) shkalasi bo'yicha raqam qabul qilib, uni Ferenhayt (°F) shkalisaga o'zgaritib beradigan function yozing.

MASALAN: celsiusToFahrenheit(0) return 32;
MASALAN: celsiusToFahrenheit(10) return 50;

Yuqoridagi misolda, 0°C, 32°F'ga teng.
Yoki 10 gradus Selsiy, 50 Farenhaytga teng.

°C va °F => Tempraturani o'lchashda ishlatiladigan o'lchov birligi. */

function celsiusToFahrenheit(celsius: number): number {
  return (celsius * 9/5) + 32;
}


//console.log("Temperatura:",celsiusToFahrenheit(25)); 


/**Shunday function yozing. Bu function o'ziga, parametr sifatida
birinchi oddiy number, keyin yagona array va uchinchi bo'lib oddiy number
qabul qilsin. Berilgan birinchi number parametr, arrayning tarkibida indeks bo'yicha hisoblanib,
shu aniqlangan indeksni uchinchi number parametr bilan alashtirib, natija sifatida
yangilangan arrayni qaytarsin.

MASALAN: changeNumberInArray(1, [1,3,7,2], 2) return [1,2,7,2];

Yuqoridagi misolda, birinchi raqam bu '1' va arrayning '1'chi indeksi bu 3.
Bizning function uchinchi berilgan '2' raqamini shu '3' bilan almashtirib,
yangilangan arrayni qaytarmoqda. */

function changeNumberInArray(firstNumber: number, array: number[], thirdNumber: number): number[] {
  if (firstNumber >= 0 && firstNumber < array.length) {
      array[firstNumber] = thirdNumber;
  }
  return array;
}

//console.log(changeNumberInArray(1, [1, 3, 7, 2], 2)); 


/** TASK ZE */
//Shunday function yozing, uni  string parametri bolsin. String ichida takrorlangan harflarni olib tashlab qolganini qaytarsin
//MASALAN: removeDuplicate('stringg') return 'string'

function removeDuplicates(str: string): string {

  const uniqueChars = new Set<string>();
  let result = '';
  for (const char of str) {

    if (!uniqueChars.has(char)) {
      uniqueChars.add(char);
      result += char;
    }
  }

  return result;
}
const originalString = 'Jassonn';
const uniqueString = removeDuplicates(originalString);
//console.log(uniqueString); 

// TASK ZG

// String sifatida berilgan string parametrni
// snake case'ga o'tkazib beradigan function yozing.

// MASALAN: convertToSnakeCase('name should be a string')
// return 'name_should_be_a_string'


function convertToSnakeCase(input: string): string {
  // Remove leading/trailing spaces, convert to lowercase, and replace spaces with underscores
  return input.trim().toLowerCase().replace(/\s+/g, '_');
}

// Test the function
const ZG = convertToSnakeCase('name should be a string');
console.log(ZG); // Output: 'name_should_be_a_string'
