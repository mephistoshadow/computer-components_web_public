const search = document.querySelector('#search_box');



const information = document.querySelector('#profile_name');
const wishList = document.querySelector('#Wishtable');
const comment = document.querySelector('#comment_history');
const submit = document.querySelector('#newpform');





search.addEventListener('submit', stratSearch);
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
	insertRow();
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


function insertRow(){
	var table=document.getElementById("Wishtable");
	var row = table.insertRow(-1);
	var cell1 = row.insertCell(0);
	var cell2 = row.insertCell(1);
	var img=document.getElementById('productimg').value;
	var name=document.getElementById("productname").value;

	// Add some text to the new cells:
	
	cell1.innerHTML = "<img src='" +img+ "' alt='' border=3 height=100 width=100><a>" + name + "</a>";
	cell2.innerHTML = "<button class='check_button'>Reviews</button>"+
						"</br><button class='delete_button'>Delete</button>";
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










