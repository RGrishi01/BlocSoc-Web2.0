document.querySelector("#name").innerHTML = "Hello " + localStorage.getItem("firstName");

fetch("http://localhost:3000/view-blog", {
    method: "GET",
    headers: {
        "Content-Type": "application/json"
    }
}).then((response) => response.json())
    .then((res) => {
        console.log(res);
        try {
            for (let i = 0; ; i++) {
                const parentElement = document.querySelector("#blog");
                parentElement.innerHTML += `<p>${JSON.stringify(res[i].blog)}</p>`;
            }
        } catch (error) {
            console.log(error);
        }
    })

const btn1 = document.querySelector("#create-blog");
btn1.onclick = () => {
    window.location.href = "http://127.0.0.1:5500/Client/create-blog.html";
}

const btn2 = document.querySelector("#remove-blog");
btn2.onclick = () => {
    window.location.href = "http://127.0.0.1:5500/Client/remove-blog.html";
}