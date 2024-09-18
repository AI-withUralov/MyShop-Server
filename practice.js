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
console.log(result);