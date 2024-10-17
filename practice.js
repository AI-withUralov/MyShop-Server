function longestWord(a) {
    let str = a.split(" ");
    let longest = 0;
    let word = null;
    str.forEach(function(str){
        if(longest < str.length ){
            longest = str.length;
            word = str
        }
    });
    return word;
}

const result = longestWord("Salom qalaysiz dustim!")
//console.log(result);


function calculateNumbers(arr) {
    const filterNumber = arr.filter(item => typeof item === 'number'); // Only filter numbers
    let sum = 0;
    for (let i of filterNumber) {
        sum += i;  // Sum all filtered numbers
    }
    return sum;
}

const Task_O = calculateNumbers([10, "10", {son: 10}, true, 35]);  // Properly passing the array
//console.log(Task_O);  // Output will be 45 (10 + 35)




/*------------------- Array methods:  filter()------------------------*/

const number = [23,45,3,23,10];
const filtered = number.filter(checkAge)

function checkAge(age) {
    return age > 20
}


console.log(filtered)
