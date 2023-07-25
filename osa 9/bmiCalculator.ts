    interface BmiValues {
        height: number;
        weight: number;
    }
    const parseArguments = (args: string[]): BmiValues => {
        if (args.length < 4) throw new Error('Not enough arguments');
        if (args.length > 4) throw new Error('Too many arguments');
      
        if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
          return {
            height: Number(args[2]),
            weight: Number(args[3])
          }
        } else {
          throw new Error('Provided values were not numbers!');
        }
      }

const calculateBmi = (height: number, weight: number)=> {
    const calcHeight = height/100
    const heightSqr = Math.pow(calcHeight, 2)
    
    const bmi = weight / heightSqr


const printText = (bmi: number) => {
if(bmi <= 17) return `Dangerous under nourishment needs immediate medical atention`
else if (bmi >= 17 && bmi <= 18.4) return `Underweight`
else if (bmi >= 18.5 && bmi <= 24.9) return `Normal weigth`
else if (bmi >= 25 && bmi <= 39.9) return `Overweigth`
else if (bmi >= 40) return `Obese` 
}
console.log(printText(bmi))

}

try {
    const { height, weight } = parseArguments(process.argv);
    calculateBmi(height, weight);
  } catch (error: unknown) {
    let errorMessage = 'Something bad happened.'
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
  }