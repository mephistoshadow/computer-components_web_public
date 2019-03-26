let numberOfUser = 0;

const functions = require('./index_fs');


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
	
	constructor(name, img, description, comments){
		this.name = name;
		this.img = img;
		this.description = description;
		this.comments = comments;
	}
}




// hardcode database
var userDB = []
var productDB = []

// hardcode database
userDB.push(new user('user', 'user', 'user'));
userDB.push(new user('admin', 'admin', 'admin'));

productDB.push(new product('rtx2070','',''));
productDB.push(new product('lenovom710s','',''));




function signup_open(){
	window.open('./signup/signup.html');
}

function login_open(){
	window.open('login.html');
}

function loginFunction(){

	
	name = document.getElementById('username').value;
	password = document.getElementById('password').value;
	
	console.log(name);
	
	
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
		window.open("./admin/admin.html");
	}
	
	else{
		window.open('./users/user.html');
		
	}
	
}

function showlogin(){
	alert("Please Login!");
	return false;
}

function swappic(){
	var ranl = 0;
    var useRand = 0;
    images = new Array;
	images[1] = new Image();
	images[1].src = "./banners/pic0.jpg";
	images[2] = new Image();
	images[2].src = "./banners/pic1.jpg";
	images[3] = new Image();
	images[3].src = "./banners/pic3.jpg";
	images[4] = new Image();
	images[4].src = "./banners/pic4.jpg";
	function swapPic(){
	   var imgnum = images.length-1;
       do{
	    var randnum = Math.random();
		randl = Math.round((imgnum-1)*randnum)+1;
	   }while(randl==useRand);
        useRand = randl;
        document.randimg.src = images[useRand].src		
		setTimeout('swapPic()',2000);
	}

}

function search(){
	
	item = document.getElementById("searchname").value;
	
	console.log(item);
	
	var product = productDB.find(function(element){
		if(element.name == item){
			return element;
		}
	});
	
	if(item == ''){
		alert("please give product names");
		return false;
	}
	else if(product == null){
		window.open("working.html")
		return false;
	}
	else{
		window.open( "./temp/temp/" +item + ".html");
	}
	
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

