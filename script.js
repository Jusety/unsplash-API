const input = document.querySelector("#input");
const grid = document.querySelector(".grid");

window.addEventListener("load", dayNightMode);

input.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        loadImg();
    }
});

function loadImg() {
    removeImg();

    const url =
        "https://api.unsplash.com/search/photos/?query=" +
        input.value +
        "&per_page=20&client_id=U9Pq01cg8ppyAo5Mlhjhlu7UATIRt-W08kF2FYRZDrE";

    fetch(url)
        .then((response) => {
            if (response.ok) return response.json();
            else alert(response.status);
        })

        .then((data) => {
            const imageNodes = [];
            for (let i = 0; i < data.results.length; i++) {
                imageNodes[i] = document.createElement("div");
                imageNodes[i].className = "img";
                imageNodes[i].style.backgroundImage =
                    "url(" + data.results[i].urls.raw + ")";
                imageNodes[i].addEventListener("dblclick", function () {
                    window.open(data.results[i].links.download, "_blank");
                });
                grid.appendChild(imageNodes[i]);
            }
        });
}

function removeImg() {
    grid.innerHTML = "";
}

function dayNightMode() {
    const date = new Date();
    const hour = date.getHours();

    if (hour >= 8 && hour <= 18) {
        document.body.style.backgroundColor = "whitesmoke";
        document.body.style.color = "black";
    } else {
        document.body.style.backgroundColor = "black";
        document.body.style.color = "whitesmoke";
    }
}
