/* =====================================================
   MOBILE NAVIGATION
===================================================== */

const mobileMenuButton =
    document.getElementById("mobileMenuButton");

const mainNavigation =
    document.getElementById("mainNavigation");


function openMobileMenu() {

    mainNavigation.classList.add("open");

    document.body.classList.add("menu-open");

    mobileMenuButton.setAttribute(
        "aria-expanded",
        "true"
    );

    mobileMenuButton.setAttribute(
        "aria-label",
        "Close navigation menu"
    );

    const icon =
        mobileMenuButton.querySelector("i");

    icon.classList.remove("fa-bars");
    icon.classList.add("fa-xmark");
}


function closeMobileMenu() {

    mainNavigation.classList.remove("open");

    document.body.classList.remove("menu-open");

    mobileMenuButton.setAttribute(
        "aria-expanded",
        "false"
    );

    mobileMenuButton.setAttribute(
        "aria-label",
        "Open navigation menu"
    );

    const icon =
        mobileMenuButton.querySelector("i");

    icon.classList.remove("fa-xmark");
    icon.classList.add("fa-bars");
}


mobileMenuButton.addEventListener(
    "click",
    () => {

        const isOpen =
            mainNavigation.classList.contains("open");

        if (isOpen) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }

    }
);


/* =====================================================
   CLOSE MENU WHEN NAVIGATION LINK IS CLICKED
===================================================== */

const navigationLinks =
    document.querySelectorAll(".nav-link");


navigationLinks.forEach(link => {

    link.addEventListener("click", () => {

        closeMobileMenu();

    });

});


/* =====================================================
   CLOSE MENU WHEN CLICKING OUTSIDE
===================================================== */

document.addEventListener("click", event => {

    if (
        mainNavigation.classList.contains("open") &&
        !mainNavigation.contains(event.target) &&
        !mobileMenuButton.contains(event.target)
    ) {

        closeMobileMenu();

    }

});


/* =====================================================
   ACTIVE NAVIGATION
===================================================== */

const pageSections =
    document.querySelectorAll("section[id]");


function updateActiveNavigation() {

    const currentPosition =
        window.scrollY + 180;


    pageSections.forEach(section => {

        const sectionTop =
            section.offsetTop;

        const sectionHeight =
            section.offsetHeight;

        const sectionId =
            section.getAttribute("id");


        if (
            currentPosition >= sectionTop &&
            currentPosition < sectionTop + sectionHeight
        ) {

            navigationLinks.forEach(link => {

                link.classList.remove("active");

            });


            const currentLink =
                document.querySelector(
                    `.nav-link[href="#${sectionId}"]`
                );


            if (currentLink) {

                currentLink.classList.add("active");

            }

        }

    });

}


window.addEventListener(
    "scroll",
    updateActiveNavigation
);


/* =====================================================
   SCROLL REVEAL
===================================================== */

const revealElements =
    document.querySelectorAll(".reveal");


const revealObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.12
        }
    );


revealElements.forEach(element => {

    revealObserver.observe(element);

});


/* =====================================================
   SMOOTH SCROLL
===================================================== */

document.querySelectorAll(
    'a[href^="#"]'
).forEach(anchor => {

    anchor.addEventListener(
        "click",
        event => {

            const targetId =
                anchor.getAttribute("href");


            if (
                !targetId ||
                targetId === "#"
            ) {

                return;

            }


            const target =
                document.querySelector(targetId);


            if (!target) {

                return;

            }


            event.preventDefault();


            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }
    );

});


/* =====================================================
   CONTACT FORM
===================================================== */

const contactForm =
    document.getElementById("contactForm");


contactForm.addEventListener(
    "submit",
    event => {

        event.preventDefault();


        const name =
            document.getElementById("name")
                .value
                .trim();


        const email =
            document.getElementById("email")
                .value
                .trim();


        const subject =
            document.getElementById("subject")
                .value
                .trim();


        const message =
            document.getElementById("message")
                .value
                .trim();


        if (
            !name ||
            !email ||
            !subject ||
            !message
        ) {

            alert(
                "Please complete all required fields."
            );

            return;

        }


        alert(
            `Thank you, ${name}! Your message has been received.`
        );


        contactForm.reset();

    }
);


/* =====================================================
   CURRENT YEAR
===================================================== */

const currentYear =
    document.getElementById("currentYear");


if (currentYear) {

    currentYear.textContent =
        new Date().getFullYear();

}


/* =====================================================
   ESC KEY - CLOSE MOBILE MENU
===================================================== */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            mainNavigation.classList.contains("open")
        ) {

            closeMobileMenu();

        }

    }
);


/* =====================================================
   INITIAL ACTIVE NAV
===================================================== */

updateActiveNavigation();