// Funkcja do zmiany tła
function changeBackground(color) {
    switch (color) {
        case "1":
            document.body.style.backgroundColor = "#f1f1f2";
            break;
        case "2":
            document.body.style.backgroundColor = "#45f684";
            break;
        case "3":
            document.body.style.backgroundColor = "#faffd1";
            break;
    }
}

// Funkcja do przełączania widoczności menu nawigacyjnego
function toggleNav() {
    const sideNav = document.getElementById("sideNav");
    if (sideNav.style.width === "250px") {
        sideNav.style.width = "0";
    } else {
        sideNav.style.width = "250px";
    }
}
