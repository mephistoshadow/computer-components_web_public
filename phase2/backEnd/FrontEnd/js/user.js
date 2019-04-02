

const wishList = document.querySelector('#Wishtable');
const comment = document.querySelector('#comment_history');
const profile = document.querySelector('#changeprofile');
const password = document.querySelector('#changePw');
const email = document.getElementById('email').innerText;
const id = document.getElementById('id').innerText;
let information = {};






profile.addEventListener('click',chaneInfo);
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



function DeleterowComment(index) {
	comment.deleteRow(index);
	
}


function Checkpage(index) {
	let hardcode ="../product/login/product_";
	hardcode = hardcode + index + ".html"
	window.open(hardcode);
}










