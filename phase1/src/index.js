
let numberOfUser = 0;


class user {
	constructor(name, password, type) {
		this.name = name;
		this.password = password;
		this.type = type;
		// set user ID
		this.bookId = numberOfUser;
		numberOfUser++;
	}
}


const login = document.querySelector('#login');

login.addEventListener('submit', loginFunction);



//
var userDB = [];


userDB.push(new user('user', 'user', 'user'));
userDB.push(new user('admin', 'admin', 'admin'));


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
		window.open("admin.html");
	}
	
	else{
		window.open('user.html');
		
	}
	
}