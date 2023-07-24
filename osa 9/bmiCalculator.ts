
const calculateBmi = (height: number, weight: number) : string => {


const calcHeight = height/100
const heightSqr = Math.pow(calcHeight, 2)

const bmi = weight / heightSqr

if(bmi <= 17) return `Dangerous under nourishment needs immediate medical atention`
else if (bmi >= 17 && bmi <= 18.4) return `Underweight`
else if (bmi >= 18.5 && bmi <= 24.9) return `Normal weigth`
else if (bmi >= 25 && bmi <= 39.9) return `Overweigth`
else if (bmi >= 40) return `Obese` 

}

console.log(calculateBmi(180, 74));