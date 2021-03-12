let fizzBuzz = (num) => {
        num % 15 == 0 ? console.log(num) : (num % 5 == 0) ? console.log("Fizz") : (num % 3 == 0) ? console.log("Buzz") : typeof num == "number" ? console.log("Not a number") : console.log("Not a suitable number");
          
    }
    fizzBuzz(15);
    
    let speedLimit = 70;
    let maxLimit = 12;
    let kmPerPoint = 5;
    
    function speedCheck(speed) {    
        if (speed < speedLimit + kmPerPoint)
            console.log("Message is ok");
        else { 
            let points = Math.floor((speed - speedLimit) / kmPerPoint);
            if (points >= maxLimit)
                console.log("License suspended");
            else
                console.log("Point is ", points);
        }
    }
    
    speedCheck(75);
    
    // Even and odd numbers
    function rangeOfEvenAndOdd(range) {
        for (i = 0; i <= range; i++)
            (i % 2 !== 0) ? console.log(`${i} is odd`) : console.log(`${i} is even`);        
        
    }
    
    rangeOfEvenAndOdd(100);
    
    const arr = [0, null, undefined, false,'', 2, 3];
    
    let countTruthy = (arr) => { 
        var count = 0;
        for (ele of arr)
            if (ele)
                count++; 
        return count;
            
    }
    
    console.log(countTruthy(arr));
    
    // showProperties 
    
    const movie = { title: 'a', releaseYear: 2018, rating: 4.5, director: 'b' };
    
    var showProperties = (movie) => { 
        for (prop in movie) { 
            var type = typeof(movie[prop])
            if (type == 'string')
                console.log(prop,movie[prop]);
        }
            
            
    }
    
    showProperties(movie);
    
    
    // Sum of all the multiples of 3 and 5
    
    var multipleRange = (num) => { 
        var sum = 0;
        for (i = 0; i <= num; i++) 
            if (i % 3 == 0 || i%5==0)
                sum += i;           
        return sum;
    
    }
    
    console.log(multipleRange(15));
    
    
    // Calculating the grade of a student
    
    // avg is 1-59 then F
    // avg is 60-69 then D 
    // avg is 70-79 then C
    // avg is 80-89 then B
    // avg is 90-100 then A 
    
    const marks = [90, 90, 90]
    
    let calculateGrade = (marks) => { 
        let avg;
        let sum = 0;
        let len_arr = 0;
        let message  = "Grade is "
        for (mark of marks)
        {
            sum += mark;
            len_arr += 1;
        
        }
        avg = sum / len_arr;
        avg > 1 && avg <= 59 ? console.log(message, "F"):avg >= 60 && avg <= 69 ?console.log(message, "D"):avg>=70 && avg <= 79 ?console.log(message,"C"):avg>=80 && avg <= 89?console.log(message, "B"):avg>=90 && avg <= 100?console.log(message, "A"):avg;
            
    }
    
    calculateGrade(marks)
    
    
    let showStars = (limit) => { 
    
        for (i = 0; i <= limit; i++) {
            let str = ''
            for (j = 0; j <= i; j++) {
                str+='* '
            }
            console.log(str);
        }
    
    }
    
    showStars(10);
    
    // Prime numbers 
    // showPrime(limit)
    showPrime(10);
    function showPrime(limit) {
        for (i = 2; i <= limit; i++) {
            for (j = 2; j <= i ; j++)
                if (i % j == 0)               
                    break;
            if (j == i)
                console.log(i);
        }
    }