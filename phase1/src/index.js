let numberOfUser = 0;


class user {
	constructor(name, password, type) {
		this.name = name;
		this.password = password;
		this.type = type;
		// set user ID
		this.userId = numberOfUser;
		this.liked = [];
		numberOfUser++;
	}
}


class product{
	
	constructor(name, img, description){
		this.name = name;
		this.img = img;
		this.description = description;
	}
}


const login = document.querySelector('#login');

login.addEventListener('submit', loginFunction);



// hardcode database
var userDB = []
var productDB = []

// hardcode database
userDB.push(new user('user', 'user', 'user'));
userDB.push(new user('admin', 'admin', 'admin'));



function signup_open(){
	window.open('signup.html');
}


function loginFunction(e){
	e.preventDefault();
	
	name = document.getElementById('username').value;
	password = document.getElementById('password').value;
	
	var user = userDB.find(function(element){
		if(element.name == name){
			return element;
		}
	});
	
	if(name == ''){
		alert("please type your name and password");
		return false;
	}
	
	if(user == null){
		alert("no such user/wrong password");
		return false;
	}
	else if(user.type == 'admin'){
		var status = document.getElementById('userstatus');
		var node = document.createElement("a");                 // Create a <li> node
		var textnode = document.createTextNode(user.name);         // Create a text node
		node.appendChild(textnode);
		status.replaceChild(node, status.childNodes[0]);
		window.open("admin.html");
	}
	
	else{
		var status = document.getElementById('userstatus');
		var node = document.createElement("a");                 // Create a <li> node
		var textnode = document.createTextNode(user.name);         // Create a text node
		node.appendChild(textnode);
		status.replaceChild(node, status.childNodes[0]);
		window.open('user.html');
		
	}
	
}

function like(e){
	
}

function delete_product(e){
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

