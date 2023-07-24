interface Response
  { periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number; 
  }
   
 
  const calculateExecises = (hours: number[], target: number): Partial<Response> => {

    const totalHours = hours.reduce((acc, curr) => acc + curr, 0);
    const trainingDays = hours.filter((hour) => hour !=  0);
    const avgHours = totalHours/hours.length;
    let rating = 0;
    let successMeter = false;
    let ratingDescription = ""; 

    if(avgHours >= target ){
      successMeter = true
    }

    if (avgHours===0) {rating = 0; ratingDescription = "Poor"}
    else if (avgHours < 0.1) {rating = 0; ratingDescription = "Not even one drop of sweat"}
    else if (avgHours >= 0.1 && avgHours <= 0.9) {rating= 1; ratingDescription = "You can do better than this"}
    else if (avgHours >= 1 && avgHours < 2) {rating= 2; ratingDescription = "not too bad but could be better"}
    else if (avgHours >= 2) {rating= 3; ratingDescription = "Excelent!"}


  
    return{
      periodLength: hours.length,
      trainingDays: trainingDays.length,
      success: successMeter,
      rating: rating,
      ratingDescription: ratingDescription,
      target: target,
      average: avgHours 
    }

};

  console.log(calculateExecises([3, 0, 2, 4.5, 0, 3, 1], 2));