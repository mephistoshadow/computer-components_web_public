
const login=document.querySelector('#login')
login.addEventListener("click", logIn);


function logIn() {
    console.log("=login=")
    const username= login.children[0].value
    const password= login.children[1].value

    if(username==="user"&&password==="user"){

        location.href = "../login/product_1.html";
        console.log(login.children[2])
    }
    if(username==="admin"&&password==="admin"){

        location.href = "../login/product_1a.html";
    }

}