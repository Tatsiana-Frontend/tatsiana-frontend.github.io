function openBurgerMenu () {
    let menuBtn = document.querySelector('.menu-btn');
    let menu = document.querySelector('.header_menu');
    let body = document.querySelector('body');

    menuBtn.addEventListener('click', function(){
        menuBtn.classList.toggle('active');
        menu.classList.toggle('active');
        body.classList.toggle('menu-opened');
    });

    menu.addEventListener('click', function (event) {
        if(event.target.tagName === "A") {
            menuBtn.classList.toggle('active');
            menu.classList.toggle('active');
            body.classList.toggle('menu-opened');
        }
    });
}

openBurgerMenu();

function bluredProjectCards() {

    const gardensBtn = document.querySelector("#gardens-btn"),
        lawnBtn = document.querySelector("#lawn-btn"),
        plantingBtn = document.querySelector("#planting-btn"),
        gardensCards = document.querySelectorAll(".gardens-card"),
        plantingCards = document.querySelectorAll(".planting-card"),
        lawnCards = document.querySelectorAll(".lawn-card");

    gardensBtn.addEventListener("click", function () {
        if (lawnBtn.classList.contains("active-btn") && plantingBtn.classList.contains("active-btn")) {
            return;
        } else if (gardensBtn.matches(".active-btn") && !lawnBtn.matches(".active-btn") && !plantingBtn.matches(".active-btn")) {
            gardensBtn.classList.remove("active-btn");
            gardensCards.forEach(function (elem) {
                elem.classList.remove("blured");
            });
            lawnCards.forEach(function (elem) {
                elem.classList.remove("blured");
            });
            plantingCards.forEach(function (elem) {
                elem.classList.remove("blured");
            });
        } else if (!lawnBtn.matches(".active-btn") && !gardensBtn.matches(".active-btn") && !plantingBtn.matches(".active-btn")) {
            gardensBtn.classList.add("active-btn");
            plantingCards.forEach(function (elem) {
                elem.classList.add("blured");
            });
            lawnCards.forEach(function (elem) {
                elem.classList.add("blured");
            });
        } else {
            gardensBtn.classList.toggle("active-btn");
            gardensCards.forEach(function (elem) {
                elem.classList.toggle("blured");
            });
           }
    });

    lawnBtn.addEventListener("click", function () {
        if (gardensBtn.classList.contains("active-btn") && plantingBtn.classList.contains("active-btn")) {
            return;
        } else if (lawnBtn.matches(".active-btn") && !gardensBtn.matches(".active-btn") && !plantingBtn.matches(".active-btn")) {
            lawnBtn.classList.remove("active-btn");
            gardensCards.forEach(function (elem) {
                elem.classList.remove("blured");
            });
            lawnCards.forEach(function (elem) {
                elem.classList.remove("blured");
            });
            plantingCards.forEach(function (elem) {
                elem.classList.remove("blured");
            });
        } else if (!lawnBtn.matches(".active-btn") && !gardensBtn.matches(".active-btn") && !plantingBtn.matches(".active-btn")) {
            lawnBtn.classList.add("active-btn");
            plantingCards.forEach(function (elem) {
                elem.classList.add("blured");
            });
            gardensCards.forEach(function (elem) {
                elem.classList.add("blured");
            });
        } else {
            lawnBtn.classList.toggle("active-btn");
            lawnCards.forEach(function (elem) {
                elem.classList.toggle("blured");
            });
        }
    });

    plantingBtn.addEventListener("click", function () {
        if (gardensBtn.classList.contains("active-btn") && lawnBtn.classList.contains("active-btn")) {
            return;
        } else if (plantingBtn.matches(".active-btn") && !lawnBtn.matches(".active-btn") && !gardensBtn.matches(".active-btn")) {
            plantingBtn.classList.remove("active-btn");
            gardensCards.forEach(function (elem) {
                elem.classList.remove("blured");
            });
            lawnCards.forEach(function (elem) {
                elem.classList.remove("blured");
            });
            plantingCards.forEach(function (elem) {
                elem.classList.remove("blured");
            });
        } else if (!lawnBtn.matches(".active-btn") && !gardensBtn.matches(".active-btn") && !plantingBtn.matches(".active-btn")) {
            plantingBtn.classList.add("active-btn");
            gardensCards.forEach(function (elem) {
                elem.classList.add("blured");
            });
            lawnCards.forEach(function (elem) {
                elem.classList.add("blured");
            });
        } else {
            plantingBtn.classList.toggle("active-btn");
            plantingCards.forEach(function (elem) {
                elem.classList.toggle("blured");
            });
        }
    });
}

bluredProjectCards();

function accordionToggle () {
    const accordionItems = document.querySelectorAll(".accordion_item");

    function removeActiveClasses() {
        accordionItems.forEach((item) => {
        item.classList.remove("active");
        });
    }

    accordionItems.forEach((item) => {

        const accordionBtn = item.querySelector(".accordion_btn");

        accordionBtn.addEventListener("click", (event) => {
            event.stopPropagation();
        });

    item.addEventListener("click", () => {
        if (item.classList.contains("active")) {
            removeActiveClasses();
        } else {
            removeActiveClasses();
            item.classList.add("active");
        }
        });
    });
}

accordionToggle();

function chooseOffice () {

    const select = document.querySelector(".select");
    const selectTitle = document.querySelector(".select span");
    const dropdownMenu = document.querySelector(".dropdown_menu");
    const dropdownMenuItem = document.querySelectorAll(".dropdown_menu-item");
    const dropdownCard = document.querySelectorAll(".dropdown_card");

    select.addEventListener('click', () => {

        const hasActiveClass = Array.from(dropdownCard).some((card) => {
            return card.classList.contains("active");
          });

        if (select.classList.contains("active") && hasActiveClass ) {
            select.classList.remove("active");
            select.classList.add("active");
            dropdownCard.forEach((card) => {
                card.classList.remove("active");
            });
            dropdownMenu.classList.toggle("active");
            selectTitle.innerText = "City";
            selectTitle.style.fontSize = '20px';
        } else {
            dropdownMenu.classList.toggle("active");
            select.classList.toggle("active");
            dropdownCard.forEach((card) => {
                card.classList.remove("active");
            });
        }
    });

    dropdownMenuItem.forEach((item, index) => {
        item.addEventListener("click", () => {
            dropdownCard.forEach((card) => {
                card.classList.remove("active");
            });
            dropdownCard[index].classList.add("active");
            dropdownMenu.classList.remove("active");
            selectTitle.innerText = dropdownMenuItem[index].innerText;
            selectTitle.style.fontSize = '16px';
        });
      });

}

chooseOffice();