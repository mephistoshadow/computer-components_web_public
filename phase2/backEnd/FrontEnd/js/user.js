

const wishList = document.querySelector('#Wishtable');
const comment = document.querySelector('#comment_history');
const profile = document.querySelector('#changeprofile');
const password = document.querySelector('#changePw');

const email = document.getElementById('email').innerText;


let information = {};






// profile.addEventListener('click',chaneInfo);
password.addEventListener('click',changePw);
wishList.addEventListener('click',generaClick);
comment.addEventListener('click',commentClick);


class personinfo {
	constructor(Nickname, description, id) {
		this.id = id;
		this.Nickname = Nickname;
		this.description = description;
	}
}

function changePw(e) {
	e.preventDefault();
	url = '/changePW/' + email;
	const newPW = document.getElementById('pass').value;
	let data = {
		password : newPW
	}
	// console.log(newPW);
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

        
    }).catch((error) => {
        console.log(error)
    })

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
    	url = '/user/wish_list/' + information["user"][0]["_id"] + '/' + e.target.parentElement.parentElement.children[0].children[2].innerText;
	// console.log(newPW);
	console.log(e.target.parentElement.parentElement.children[0].children[2].innerText);
	data = {

	}
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

        
    }).catch((error) => {
        console.log(error)
    })

    }
    
}

function commentClick(e) {
	e.preventDefault();
	let index = e.target.parentElement.parentElement.rowIndex;
	if (e.target.className == 'delete_button') {
		DeleterowComment(index);
    }
}



/////////////////below is the function that modify the DOM elements.
function changeIt(personinfo) {
	const info = document.querySelector("#profileInfo");
	info.children[1].children[0].children[0].innerText = personinfo.Nickname;
	info.children[2].children[0].children[0].innerText = personinfo.description;
}



function Deleterow(index) {
	wishList.deleteRow(index);
}

function addThings(index) {
	const url = '/user/wish_list/' + email;
    fetch(url)
    	.then((res) => { 
    		//// Do not write any code here
	        return res.json()
	        //// Do not write any code here
	    })
	    .then((jsonResult) => {
	    	// This is where the JSON result (jsonResult) from the server can be accessed and used.
	        console.log('Result:', jsonResult)
	        information = jsonResult;
	        for(let i = 0 ; i < information["user"][0]["comment_history"].length; i ++) {
	        	let comment = information["user"][0]["comment_history"][i]["review"];
	        	addcomment(comment);
	        	
	        }
	        for(let i = 0 ; i < information["user"][0]["wish_list"].length; i ++) {
	        	let name_p = information["user"][0]["wish_list"][i]["name"];
	        	let description_p = information["user"][0]["wish_list"][i]["description"];
	        	let id = information["user"][0]["wish_list"][i]["_id"];
	        	
	        	addProduct(name_p,description_p,id);
	        }
	        
	        // Use the JSON to add a script part
	        // addScriptPart(jsonResult[0], jsonResult[1], jsonResult[2], jsonResult[3])
	    }).catch((error) => {
	    	// if an error occured it will be logged to the JavaScript console here.
	        console.log("An error occured with fetch:", error)
	    })	
}




function addcomment(comment_1) {
	var el = document.querySelector('#clone_comment');
	var addElement = el.cloneNode(true);
	addElement.children[0].children[0].innerText = comment_1;
	comment.appendChild(addElement);
}

function addProduct(name,description,id) {
	var el = document.querySelector('#clone_product');
	var addElement = el.cloneNode(true);
	addElement.children[0].children[0].innerText = name;
	addElement.children[0].children[1].innerText = description;
	addElement.children[0].children[2].innerText = id;
	wishList.appendChild(addElement);
}




function DeleterowComment(index) {
	comment.deleteRow(index);
	
}


function Checkpage(index) {
	let hardcode ="../product/login/product_";
	hardcode = hardcode + index + ".html"
	window.open(hardcode);
}



// function addproducts(index) {
// 	const url = '/user/wish_list/' + email;
//     fetch(url)
//     	.then((res) => { 
//     		//// Do not write any code here
// 	        return res.json()
// 	        //// Do not write any code here
// 	    })
// 	    .then((jsonResult) => {
// 	    	// This is where the JSON result (jsonResult) from the server can be accessed and used.
// 	        console.log('Result:', jsonResult)
// 	        information = jsonResult;
// 	        for(let i = 0 ; i < information["user"][0]["wish_list"].length; i ++) {
// 	        	let product = information["user"][0]["wish_list"][i];
// 	        	addcomment(comment);
// 	        }
	        
// 	        // Use the JSON to add a script part
// 	        // addScriptPart(jsonResult[0], jsonResult[1], jsonResult[2], jsonResult[3])
// 	    }).catch((error) => {
// 	    	// if an error occured it will be logged to the JavaScript console here.
// 	        console.log("An error occured with fetch:", error)
// 	    })	
// }




// function addproduct(product) {
// 	var table=document.getElementById("Wishtable");
// 	var row = table.insertRow(-1);
// 	var cell1 = row.insertCell(0);
// 	var cell2 = row.insertCell(1);
// 	var name= product.name;
// 	var description = product.description;

// 			//Add some text to the new cells:
	
// 	cell1.innerHTML = "<a>" +name+ "/a><a>" + description + "</a>";
// 	cell2.innerHTML = "<button class='check_button'>Reviews</button> <button class='delete_button'>Delete</button>";
// }






