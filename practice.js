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
console.log(Task_O);  // Output will be 45 (10 + 35)
