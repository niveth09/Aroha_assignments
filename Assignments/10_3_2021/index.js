//Assignments

//Address object with the below properties and create a function showAddress(address)
//which displays all the properties and the values
//street 
// city 
//zipCode 


//create address object by using factory and constructor function 

//create a blog post object 
//title 
//body 
//author 
//views
//comments 
// [authour,body]
//isLive 


function showAddress(street,city,zipCode) { 
    return {
        street: street,
        city: city,
        zipCode: zipCode
    }
}

console.log(showAddress("vp street", "Tirunelveli", 627416));


function ShowAddress(street, city, zipCode) { 
    this.street = street;
    this.city = city;
    this.zipCode = zipCode;

}

console.log(new ShowAddress("vp street", "Tirunelveli", 627416));

function blogPost(title,author,body,views,comments,isLive) { 
    return {
        title,
        details: { author, body },
        views,
        comments,
        isLive
    }
}

console.log(blogPost("Raja Rani", "Atlee", "Love movie", "500000", "Good one", "No"));


function BlogPost(title, author, body, views, comments, isLive) { 
    this.title = title;
    this.details = { author, body };
    this.views = views;
    this.comments = comments;
    this.isLive = isLive;
}

console.log( new BlogPost("Raja Rani", "Atlee", "Love movie", "500000", "Good one", "No"));