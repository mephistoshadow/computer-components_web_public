

// const button = document.querySelector('#signup');

// button.addEventListener("click", addStudent);




// function addStudent(e) {
// 	e.preventDefault();
// 	const password_1 = document.getElementById('password').value;
//     const email_2 = document.getElementById('email').value;
//     const url = '/users';
//     // The data we are going to send in our request
//     let data = {
//         email: email_2,
//         password: password_1
//     }
//     // Create our request constructor with all the parameters we need
//     const request = new Request(url, {
//         method: 'POST', 
//         body: JSON.stringify(data),
//         followAllRedirects: true,
//         headers: {
//             'Accept': 'application/json, text/plain, */*',
//             'Content-Type': 'application/json'
//         },
//     });
//    fetch(request)
//     .then(function(res) {
//         // Handle response we get from the API
//         // Usually check the error codes to see what happened
//         if (res.status === 400) {
//            alert("the user already exist or you have type wrong information required,please try again");
//         } else {
//         	console.log(res)
//         	window.alert("Success")
//         	// res.render(res.url);
//         	// window.open(res.url,"_self")
        	
//         }
        
        
//     }).catch((error) => {
//         console.log(error)
//     })


// }
