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
                const parentElement = document.querySelector("#delete");
                if (res[i].firstName == localStorage.getItem("firstName")) {
                    parentElement.innerHTML += `<p>${JSON.stringify(res[i].blog)}</p>`;
                    const newElement = document.createElement("button");
                    newElement.textContent = "Delete Blog";
                    newElement.id = `delete-${i}}`;
                    parentElement.appendChild(newElement);
                }
            }
        } catch (error) {
            console.log(error);
        }
    })

let btn;

setTimeout(function () {
    btn = document.querySelectorAll("button");
    console.log(btn);
}, 5000)

// document.querySelector("button").onclick = function () {
//     for (let i = 0; ; i++) {
//         document.querySelector(`#delete-${i}`).onclick = function () {
//             fetch("http://localhost:3000/delete-blog", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json"
//                 },
//             }).then((response) => response.json)
//                 .then((res) => {
//                     console.log(res);

//                 })
//         }
//     }
// }