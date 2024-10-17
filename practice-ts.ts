/*------------------- Array methods:  filter()------------------------*/

const numb :number[] = [120,5,345,10,9] 


function checkAges(age:number[]):number[] {
    return age.filter((num) => num >50)
}
//console.log(checkAges(numb))


const names: string[] = ["Sherzod", "Jason2", "Jack"];

function CheckName(person: string[]): string {
    if (person.filter((personName) => personName === "Jason")) {
        return "There is this name"
    }
    else {
        return "This name is not on the list"
    }
    
}
//console.log(CheckName(names))

const even: number[] = [12,34,45,33];

function getEven(numb: number[]): number[] {
    return numb.filter((evenNumber) => evenNumber % 2 == 1)
}
//console.log(getEven(even))

const a : number[] = [12,34,234,123,5,6,4]

function gethigher(b:number[]):number[] {
    return b.filter((num) => num > 10)
}

//console.log(gethigher(a))

const numbers: number[] = [-4,-45,1,-34,-5,23];

function getPositiveNum(num:number[]):number[] {
    return num.filter((a) => a > 0)
}

//console.log(getPositiveNum(numbers))


/*------------------- Array methods:  map()------------------------*/

function positiveNumbers(num:number):any {
    return num > 0 ? num : 1
}

const numbers1: number[] = [-23,34,-45,23]

const numbers2 = numbers1.map(positiveNumbers)

console.log(numbers2)



/*------------------- Array methods:  foreach()------------------------*/

function sumAll(num:number):number{
    return sum += num 
}
let sum = 0
const anynumb: number[] = [2,3,2,6];

 anynumb.forEach(sumAll)


console.log(sum)