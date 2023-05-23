window.onload = () => {
    window.localStorage.clear();
}

const btn = document.querySelector("#login");
btn.onclick = function() {
    let data = {
        "email": document.querySelector("#email").value,
        "password": document.querySelector("#password").value 
    }
    console.log(data);
    
    fetch("http://localhost:4000/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    }).then((response) => response.json())
    .then((res) => {
        console.log(res);
        if(res.error == true) {
            alert("Invalid credentials. Please try again.");
        }
        if(res.error == false) {
            window.localStorage.setItem("token", res.token);
            window.localStorage.setItem("firstName", res.firstName);
            window.location.href = "http://127.0.0.1:5500/Client/main.html";
        }
    })
}