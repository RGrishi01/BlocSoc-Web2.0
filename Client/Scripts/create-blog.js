const btn = document.querySelector("#save");
btn.onclick = () => {
    let blog = document.querySelector("#input-blog").value;
    let data = {
        "firstName": localStorage.getItem("firstName"),
        "blog": blog
    }
    console.log(data);

    fetch("http://localhost:3000/create-blog", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }).then((response) => response.json())
        .then((res) => {
            console.log(res);
            if (res.error == false) {
                alert("Blog Saved!");
                window.location.href = "http://127.0.0.1:5500/Client/main.html";
            }
            if (res.error == true) {
                if (res.message == "Blog length should be atleast 10 characters.") {
                    alert("Blog length should be atleast 10 characters");
                    return;
                };
                if (res.message == "No first name available.") {
                    alert("No first name available");
                    return;
                };
            }
        })
}