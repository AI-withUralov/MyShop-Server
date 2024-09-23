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



/* ------ Task K -------  */
//Shunday function yozing, u string qabul qilsin va string ichidagi hamma sozlarni chappasiga yozib va sozlar ketma-ketligini buzmasdan stringni qaytarsin.
//MASALAN: reverseSentence("we like coding!") return "ew ekil gnidoc";

function reverseSentence(sentence: string): string {
  return sentence
      .split(' ')                  
      .map(word => word.split('').reverse().join(''))  
      .join(' ');                 
}

console.log(reverseSentence("we like coding!")); 
