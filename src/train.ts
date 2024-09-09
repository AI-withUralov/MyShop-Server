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
  return num.replace(/\D/g, '');
}

const H2 = separate('he234llo99');
console.log(H2);