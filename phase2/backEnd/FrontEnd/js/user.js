

const wishList = document.querySelector('#Wishtable');
const comment = document.querySelector('#comment_history');
const profile = document.querySelector('#changeprofile');
const password = document.querySelector('#changePw');






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
	if (e.target.className == 'jump_button') {
		Checkpage(index);
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

function Checkpage(index) {
	let hardcode ="../product/login/product_";
	hardcode = hardcode + index + ".html"
	window.open(hardcode);
}










