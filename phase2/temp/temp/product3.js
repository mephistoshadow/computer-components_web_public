
const login=document.querySelector('#login')
login.addEventListener("click", logIn);


function logIn() {
    console.log("=login=")
    const username= login.children[0].value
    const password= login.children[1].value

    if(username==="user"&&password==="user"){

        location.href = "../login/product_3.html";
    }
    if(username==="admin"&&password==="admin"){

        location.href = "../login/product_3a.html";

    }

}