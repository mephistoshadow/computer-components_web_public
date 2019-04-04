// let numberOfUser = 0;

// const functions = require('./index_fs');


// class user {
	// constructor(name, password, type) {
		// this.name = name;
		// this.password = password;
		// this.type = type;
		//set user ID
		// this.userId = numberOfUser;
		// this.liked = [];
		// numberOfUser++;
	// }
// }


// class product{
	
	// constructor(name, img, description, comments){
		// this.name = name;
		// this.img = img;
		// this.description = description;
		// this.comments = comments;
	// }
// }




// function generaClick(e) {
	// e.preventDefault();
	// let index = e.target.parentElement.parentElement.rowIndex;
	// fromTableToProduct(index);
    
// }




function signup_open(){
	window.open('./signup/signup.html');
}

function login_open(){
	window.open('login.html');
}



function showproducts() {
	
	const url = '/products';
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
			console.log(information["products"][0])
	        for(var i = 0 ; i < information["products"].length; i ++) {
	        	var product = information["products"][i];
				
	        	addproduct(product);
	        }
	        
	        // Use the JSON to add a script part
	        // addScriptPart(jsonResult[0], jsonResult[1], jsonResult[2], jsonResult[3])
	    }).catch((error) => {
	    	// if an error occured it will be logged to the JavaScript console here.
	        console.log("An error occured with fetch:", error)
	    })	
}

function addproduct(product) {
	var table=document.getElementById("producttable");
	var row = table.insertRow(-1);
	var cell1 = row.insertCell(0);
	var cell2 = row.insertCell(1);
	var cell3 = row.insertCell(2);
	var name= product.name;
	var desc = product.description;
	var url = product.img_url;
	
	console.log(url)

			//Add some text to the new cells:
	
	cell1.innerHTML = "<li><img src='" +url+ "'alt='' border=3 height=100 width=100></li>"
	cell2.innerHTML =  "<li>"+name+"</li><li>"+desc+"</li>"
	cell3.innerHTML = "<a href='/product/"+name+ "'>Check</a>";
}






function showlogin(){
	alert("Please Login!");
	return false;
}



function search(){
	
	item = document.getElementById("searchname").value;
	
	console.log(item);
	
	const url = 'http://localhost:3000/product/' + item;
	
	window.open(url, '_self')
	
	
}

function fromTableToProduct(index){
	
	item = product_list.rows[index].children[0].getElementsByTagName("li")[1].innerText;
	
	const url = 'http://localhost:3000/product/' + item;
	
	window.open(url, '_self')
	
	
	
	
	
}

function fromNaviToProduct(item){
	
	console.log(item.innerText);
	
	const url = 'http://localhost:3000/product/' + item.innerText;
	
	window.open(url, '_self')
    	
}

function toProfile(){
	const url = "/profile"
	fetch(url)
    	.then((res) => { 
    		//// Do not write any code here
	        return res.json()
	        //// Do not write any code here
	    })
	    .then((jsonResult) => {
	    	// This is where the JSON result (jsonResult) from the server can be accessed and used.
	        console.log('Result:', jsonResult)
	        
	        
	        // Use the JSON to add a script part
	        // addScriptPart(jsonResult[0], jsonResult[1], jsonResult[2], jsonResult[3])
	    }).catch((error) => {
	    	// if an error occured it will be logged to the JavaScript console here.
	        console.log("An error occured with fetch:", error)
	    })
}



function delete_product(){
	e.preventDefault();
	
	name = document.getElementById('deleteName').value;
	var product = productDB.find(function(element){
		if(element.name = name){
			return element;
		}
	});
	
	if(name == ''){
		alert("please give product name");
		return false;
	}
	
	if(product == null){
		alert("no such product");
		return false;
	}
	
	productDB = productDB.filter(function(item) { 
		return item !== product;
	})
	
}


// Get the elements with class="column"
var elements = document.getElementsByClassName("column");


// Declare a loop variable
var i;

// Four images side by side
function four() {
	console.log(elements.length);
  for (i = 0; i < elements.length; i++) {
    elements[i].style.msFlex = "15%";  // IE10
    elements[i].style.flex = "15%";
  }
}
four()

