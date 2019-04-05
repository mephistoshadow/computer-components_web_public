













function showreviews() {
	var name = document.querySelector('#productNameContent').innerHTML;
	console.log(name)
	
	const url = '/product/all_reviews/' + name;
	
	
	
    fetch(url)
    	.then((res) => { 
    		//// Do not write any code here
	        return res.json()
	        //// Do not write any code here
	    })
	    .then((jsonResult) => {
	    	// This is where the JSON result (jsonResult) from the server can be accessed and used.
	        console.log('Result:', jsonResult)
	        var information = jsonResult;
			console.log(information["product"][0].reviews)
	        for(var i = 0 ; i < information["product"][0].reviews.length; i ++) {
	        	var user = information["product"][0].reviews[i];
				if(user.role != "admin"){
					addcomment(user);
				}
	        	
	        }
	        
	        // Use the JSON to add a script part
	        // addScriptPart(jsonResult[0], jsonResult[1], jsonResult[2], jsonResult[3])
	    }).catch((error) => {
	    	// if an error occured it will be logged to the JavaScript console here.
	        console.log("An error occured with fetch:", error)
	    })	
}

function addReview() {
	
	var name = document.querySelector('#productNameContent').innerHTML;
	console.log(name)
	const url = '/product/review/' + name;
    // The data we are going to send in our request
	
	
	
    let data = {
        title: document.querySelector('#title').value,
        content: document.querySelector('#content').value,
		time: new Date()
		
    }
	
	console.log(data)
    // Create our request constructor with all the parameters we need
    const request = new Request(url, {
        method: 'post', 
        body: JSON.stringify(data),
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
    });
    fetch(request)
    .then(function(res) {
        // Handle response we get from the API
        // Usually check the error codes to see what happened
        const message = document.querySelector('#message')
        if (res.status === 200) {
            console.log('Added review')
            message.innerText = 'Success: Added a product.';
            message.setAttribute("style", "color: green");
			console.log(data)
			addcomment(data)
			
           
        } else {
            message.innerText = 'Could not add review'
            message.setAttribute("style", "color: red")
     
        }
        
        
    }).catch((error) => {
        console.log(error)
    })
}




function addWishlist(){
	
	var name = document.querySelector('#productNameContent').innerHTML;
	
	const url = "/product/wish_list/" + name;
	
	const request = new Request(url, {
		method: 'post'
		});
		
	fetch(request)
    .then(function(res) {
        // Handle response we get from the API
        // Usually check the error codes to see what happened
        const message = document.querySelector('#message')
        if (res.status === 200) {
            
            message.innerText = 'Success: Added to wish list.';
            message.setAttribute("style", "color: green");
		} else if(res.status === 300) {
            message.innerText = 'Already in wish list'
            message.setAttribute("style", "color: red")
     	
			
           
        } else {
            message.innerText = 'Could not add to wish list'
            message.setAttribute("style", "color: red")
     
        }
        console.log(res)
        
    }).catch((error) => {
        console.log(error)
    })
	
}

function addcomment(review) {
	
	console.log(review.username)
	var table=document.getElementById("comment_table");
	var row = table.insertRow(-1);
	var cell1 = row.insertCell(0);
	var cell2 = row.insertCell(1);
	var cell3 = row.insertCell(2);
	var name= review.username;
	var content = review.content;
	
	var date = review.time;

			//Add some text to the new cells:
	
	cell1.innerHTML = "<li>"+"name: "+name+"</li>";
	cell2.innerHTML = "<li>"+content+"</li>";
	cell3.innerHTML = "<li>"+date+"</li>";
}







