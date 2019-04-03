


const search = document.querySelector('#search_box');


const email = document.getElementById('email').innerText;
const information = document.querySelector('#profile_name');
const wishList = document.querySelector('#Wishtable');
const comment = document.querySelector('#comment_history');
const submit = document.querySelector('#newpform');





//search.addEventListener('submit', stratSearch);
submit.addEventListener('submit',createNew);
wishList.addEventListener('click',generaClick);
comment.addEventListener('click',commentClick);


class personinfo {
	constructor(Nickname, description, id) {
		this.id = id;
		this.Nickname = Nickname;
		this.description = description;
	}
}






function createNew(e){
	e.preventDefault;
	//insertRow();
}


function stratSearch(e) {
	e.preventDefault();
	const information = document.querySelector("#product").value;
	let name = "";
	name = name + information;
	name = name + ".html"
	hardcode ="../product/nonlogin/product_1.html"
	window.open(hardcode);
}


function chaneInfo(e) {
	e.preventDefault();
	const nickname = document.querySelector("#Nickname").value;
	const description = document.querySelector("#Description").value;
	const information = new personinfo(nickname,description);
	changeIt(information);
}


function generaClick(e) {
	e.preventDefault();
	let index = e.target.parentElement.parentElement.rowIndex;
	if (e.target.className == 'check_button') {
		Checkpage(index);
    }
    else if (e.target.className == 'delete_button'){
    	Deleterow(index);
    }
    
}

function commentClick(e) {
	e.preventDefault();
	let index = e.target.parentElement.parentElement.rowIndex;
	if (e.target.className == 'jump_button') {
		comment.deleteRow(index);
    }
}







/////////////////DOM

function deleterow(btn) {
  var row = btn.parentNode.parentNode;
  row.parentNode.removeChild(row);
}


// function insertRow(){
	
	// var name = document.getElementById("productname").value;
	// var desc = document.getElementById("productdesc").value;
	
	// const product = new Product({
		// name: name,
		// description: desc
	// })
	
	// log(product);
	
	// product.save().then((result) => {
		// var table=document.getElementById("Wishtable");
		// var row = table.insertRow(-1);
		// var cell1 = row.insertCell(0);
		// var cell2 = row.insertCell(1);
		// var name= result.name;
		// var description = result.description;

			//Add some text to the new cells:
	
		// cell1.innerHTML = "<a>" +name+ "/a><a>" + description + "</a>";
		// cell2.innerHTML = "<button class='check_button'>Reviews</button> <button class='delete_button'>Delete</button>";
		
	// }
	// )
	
	
// }
function addProduct() {
	const url = '/product';
    // The data we are going to send in our request
    let data = {
        name: document.querySelector('#productname').value,
        description: document.querySelector('#productdesc').value,
		url: document.querySelector('#productimg').value
    }
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
            console.log('Added product')
            message.innerText = 'Success: Added a product.';
            message.setAttribute("style", "color: green");
			console.log(data);
			addproduct(data)
			
           
        } else {
            message.innerText = 'Could not add product'
            message.setAttribute("style", "color: red")
     
        }
        console.log(res)
        
    }).catch((error) => {
        console.log(error)
    })
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
	var table=document.getElementById("Wishtable");
	var row = table.insertRow(-1);
	var cell1 = row.insertCell(0);
	var cell2 = row.insertCell(1);
	var name= product.name;
	var description = product.description;

			//Add some text to the new cells:
	
	cell1.innerHTML = "<a>" +name+ "/a><a>" + description + "</a>";
	cell2.innerHTML = "<button class='delete_button'>Delete</button>";
}

function viewAll(){
	
	// var email = document.getElementById("email").value;
	
	// User.findOne({email: email}).then((user) => {
		
	Product.find({}).then((products) => {
		
		for(var i = 0; i < products.length; i++){
			var table=document.getElementById("Wishtable");
			var row = table.insertRow(-1);
			var cell1 = row.insertCell(0);
			var cell2 = row.insertCell(1);
			var name= products[i].name;
			var url = products[i].img_url;

			// Add some text to the new cells:
	
			cell1.innerHTML = "<img src=" +url+ " alt='' border=3 height=100 width=100><a>"+name+"</a>"
			cell2.innerHTML = "<button class='check_button'>Reviews</button> <button class='delete_button'>Delete</button>";
		}
	})
	
	
}


function changeIt(personinfo) {
	const info = document.querySelector("#profileInfo");
	info.children[1].children[0].children[0].innerText = personinfo.Nickname;
	info.children[2].children[0].children[0].innerText = personinfo.description;
}


function Deleterow(index) {
	wishList.deleteRow(index);
}

function Checkpage(index) {
	let hardcode ="../product/login/product_";
	hardcode = hardcode + index + ".html"
	window.open(hardcode);
}










