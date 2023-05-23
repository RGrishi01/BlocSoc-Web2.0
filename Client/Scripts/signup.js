window.onload = () => {
    window.localStorage.clear();
}

let btn = document.querySelector("#sign-up-btn");
btn.onclick = function() {
    let data = {
        "firstName": document.querySelector("#first_name").value,
        "lastName": document.querySelector("#last_name").value,
        "email": document.querySelector("#email").value,
        "password": document.querySelector("#password").value
    }
    console.log(data);
    
    fetch('http://localhost:4000/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }).then((response) => response.json())
    .then((res) => {
        console.log(res);
        if(res.error == true) {
            if(res.message == "A user login already exists on this account") {
                alert("A user already exists on this email. Please login.");
                window.location.href = "http://127.0.0.1:5500/Client/login.html";
            } else
            alert("Invalid credentials. Please try again.");
        }
        if(res.error == false) {
            // window.localStorage.setItem("token", res.token);
            window.location.href = "http://127.0.0.1:5500/Client/login.html";
        } 
    }).catch((error) => {
        console.log(error);
    })
}