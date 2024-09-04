/* ------ Task G -------  */

// Shunday function tuzingki unga integerlardan iborat array pass bolsin va function bizga osha arrayning eng katta qiymatiga tegishli birinchi indexni qaytarsin.
// MASALAN: getHighestIndex([5, 21, 12, 21, 8]) return qiladi 1 sonini.

function findIndexOfGreatest(array) {
    let greatest;
    let indexOfGreatest;
    for (let i = 0; i < array.length; i++) {
      if (!greatest || array[i] > greatest) {
        greatest = array[i];
        indexOfGreatest = i;
      }
    }
    return indexOfGreatest;
  }
const javob = findIndexOfGreatest([22,44,6,12])
console.log(javob);