function changeBackground(color) {
    switch (color) {
        case "1":
            document.body.style.backgroundColor = "#a2c2e6";
            break;
        case "2":
            document.body.style.background = "linear-gradient(to bottom, #ffb347, #ffcc33)";
            break;
        case "3":
            document.body.style.background = "linear-gradient(to bottom, #a8e0ff, #b3f2ff)";
            break;
    }
}

function toggleNav() {
    const sideNav = document.getElementById("sideNav");
    if (sideNav.style.width === "250px" || sideNav.style.width === "30%") {
        sideNav.style.width = "0";
    } else {
        sideNav.style.width = window.innerWidth <= 768 ? "30%" : "250px";
    }
}
