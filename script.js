/* =========================================================
   IMRAN PHARMACY
   Main JavaScript
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       LOADING SCREEN
    ===================================================== */

    const loader = document.getElementById("loader");

    window.addEventListener("load", () => {

        setTimeout(() => {
            loader.classList.add("hidden");
        }, 700);

    });



    /* =====================================================
       SCROLL REVEAL SYSTEM
    ===================================================== */

    const revealElements = document.querySelectorAll(
        ".intro-content, .category-card, .products-header, .product-card, .statement-content, .final-content"
    );

    revealElements.forEach((element) => {
        element.classList.add("reveal");
    });


    const revealObserver = new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    revealObserver.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -60px 0px"
        }
    );


    revealElements.forEach((element) => {
        revealObserver.observe(element);
    });



    /* =====================================================
       STAGGERED PRODUCT ANIMATIONS
    ===================================================== */

    const productCards = document.querySelectorAll(".product-card");

    productCards.forEach((card, index) => {

        card.style.transitionDelay = `${(index % 4) * 80}ms`;

    });



    /* =====================================================
       STAGGERED CATEGORY ANIMATIONS
    ===================================================== */

    const categoryCards = document.querySelectorAll(".category-card");

    categoryCards.forEach((card, index) => {

        card.style.transitionDelay = `${index * 100}ms`;

    });



    /* =====================================================
       SCROLL-DRIVEN HERO MOVEMENT
    ===================================================== */

    const hero = document.querySelector(".hero");
    const heroContent = document.querySelector(".hero-content");
    const heroGrid = document.querySelector(".medical-grid");
    const orbOne = document.querySelector(".orb-one");
    const orbTwo = document.querySelector(".orb-two");

    let ticking = false;


    function updateScrollEffects() {

        const scrollY = window.scrollY;

        if (!hero) return;


        const heroHeight = hero.offsetHeight;


        if (scrollY <= heroHeight) {

            const progress = Math.min(
                scrollY / heroHeight,
                1
            );


            /* Hero text slowly moves upward */

            if (heroContent) {

                heroContent.style.transform =
                    `translate3d(0, ${progress * -90}px, 0)`;

                heroContent.style.opacity =
                    `${1 - progress * 0.65}`;

            }


            /* Grid moves at a different speed */

            if (heroGrid) {

                heroGrid.style.transform =
                    `translate3d(0, ${scrollY * 0.12}px, 0)`;

            }


            /* Large background shape */

            if (orbOne) {

                orbOne.style.transform =
                    `translate3d(0, ${scrollY * 0.18}px, 0) scale(${1 + progress * 0.15})`;

            }


            if (orbTwo) {

                orbTwo.style.transform =
                    `translate3d(0, ${scrollY * -0.12}px, 0)`;

            }

        }


        ticking = false;

    }


    window.addEventListener("scroll", () => {

        if (!ticking) {

            window.requestAnimationFrame(updateScrollEffects);

            ticking = true;

        }

    }, { passive: true });



    /* =====================================================
       NAVBAR SCROLL BEHAVIOR
    ===================================================== */

    const navbar = document.querySelector(".navbar");

    let previousScroll = window.scrollY;


    window.addEventListener("scroll", () => {

        const currentScroll = window.scrollY;


        if (!navbar) return;


        if (currentScroll > previousScroll && currentScroll > 150) {

            navbar.style.transform = "translateY(-90px)";

        } else {

            navbar.style.transform = "translateY(0)";

        }


        previousScroll = currentScroll;

    }, { passive: true });



    /* =====================================================
       ACTIVE NAVIGATION
    ===================================================== */

    const sections = document.querySelectorAll("main section[id]");
    const navLinks = document.querySelectorAll(".nav-links a");


    const sectionObserver = new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    navLinks.forEach((link) => {

                        link.classList.remove("active");

                    });


                    const activeLink = document.querySelector(
                        `.nav-links a[href="#${entry.target.id}"]`
                    );


                    if (activeLink) {

                        activeLink.classList.add("active");

                    }

                }

            });

        },
        {
            threshold: 0.35
        }
    );


    sections.forEach((section) => {

        sectionObserver.observe(section);

    });



    /* =====================================================
       SMOOTH ANCHOR NAVIGATION
    ===================================================== */

    document.querySelectorAll('a[href^="#"]').forEach((link) => {

        link.addEventListener("click", (event) => {

            const targetID = link.getAttribute("href");

            if (!targetID || targetID === "#") return;


            const target = document.querySelector(targetID);

            if (!target) return;


            event.preventDefault();


            const headerOffset = 90;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                headerOffset;


            window.scrollTo({

                top: targetPosition,

                behavior: "smooth"

            });

        });

    });



    /* =====================================================
       MOBILE MENU
    ===================================================== */

    const menuButton = document.querySelector(".menu-button");
    const nav = document.querySelector(".nav-links");


    if (menuButton && nav) {

        menuButton.addEventListener("click", () => {

            nav.classList.toggle("mobile-open");

            menuButton.classList.toggle("open");

        });


        nav.querySelectorAll("a").forEach((link) => {

            link.addEventListener("click", () => {

                nav.classList.remove("mobile-open");

                menuButton.classList.remove("open");

            });

        });

    }



    /* =====================================================
       PRODUCT IMAGE FALLBACK
    ===================================================== */

    const productImages = document.querySelectorAll(
        ".product-image img"
    );


    productImages.forEach((image) => {

        image.addEventListener("error", () => {

            image.style.display = "none";

            const container = image.parentElement;


            if (!container.querySelector(".image-placeholder")) {

                const placeholder =
                    document.createElement("div");


                placeholder.className = "image-placeholder";


                placeholder.innerHTML = `
                    <span>+</span>
                    <small>IMRAN PHARMACY</small>
                `;


                container.appendChild(placeholder);

            }

        });

    });



    /* =====================================================
       PRODUCT CARD INTERACTION
    ===================================================== */

    productCards.forEach((card) => {

        const button = card.querySelector(
            ".product-footer button"
        );


        if (!button) return;


        button.addEventListener("click", () => {

            const productName =
                card.querySelector("h3")?.textContent;


            if (!productName) return;


            /*
             * Currently this is only a catalogue.
             * No ordering system is connected.
             */

            console.log(
                `Selected product: ${productName}`
            );

        });

    });



    /* =====================================================
       CATEGORY CARD SCROLL EFFECT
    ===================================================== */

    const categorySection =
        document.querySelector(".categories-section");


    if (categorySection) {

        window.addEventListener("scroll", () => {

            const rect =
                categorySection.getBoundingClientRect();


            const viewportHeight =
                window.innerHeight;


            const progress =
                1 -
                Math.min(
                    Math.max(
                        rect.top / viewportHeight,
                        0
                    ),
                    1
                );


            categoryCards.forEach((card, index) => {

                const movement =
                    (progress - 0.5) *
                    (index % 2 === 0 ? 18 : -18);


                card.style.setProperty(
                    "--scroll-movement",
                    `${movement}px`
                );

            });

        }, { passive: true });

    }



    /* =====================================================
       MOUSE PARALLAX
       Subtle desktop-only movement
    ===================================================== */

    const heroBackground =
        document.querySelector(".hero-background");


    if (
        heroBackground &&
        window.matchMedia("(pointer: fine)").matches
    ) {

        window.addEventListener("mousemove", (event) => {

            const x =
                (event.clientX / window.innerWidth - 0.5);

            const y =
                (event.clientY / window.innerHeight - 0.5);


            if (orbOne) {

                orbOne.style.marginLeft =
                    `${x * 20}px`;

            }


            if (orbTwo) {

                orbTwo.style.marginLeft =
                    `${x * -12}px`;

            }

        });

    }



    /* =====================================================
       SCROLL PROGRESS
    ===================================================== */

    const progressBar =
        document.createElement("div");


    progressBar.className =
        "scroll-progress";


    document.body.appendChild(progressBar);


    window.addEventListener("scroll", () => {

        const scrollTop =
            window.scrollY;


        const scrollHeight =
            document.documentElement.scrollHeight -
            window.innerHeight;


        const progress =
            scrollHeight > 0
                ? scrollTop / scrollHeight
                : 0;


        progressBar.style.transform =
            `scaleX(${progress})`;

    }, { passive: true });



    /* =====================================================
       INITIALIZE
    ===================================================== */

    updateScrollEffects();

});
/* =====================================================
   IMRAN PHARMACY — SHOPPING CART
===================================================== */

const cartButton = document.getElementById("cartButton");
const cartPanel = document.getElementById("cartPanel");
const cartOverlay = document.getElementById("cartOverlay");
const cartClose = document.getElementById("cartClose");
const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");
const clearCart = document.getElementById("clearCart");
const proceedButton = document.getElementById("proceedButton");

let cart = [];


/* OPEN CART */

function openCart() {
    cartPanel.classList.add("active");
    cartOverlay.classList.add("active");
    document.body.style.overflow = "hidden";
}


/* CLOSE CART */

function closeCart() {
    cartPanel.classList.remove("active");
    cartOverlay.classList.remove("active");
    document.body.style.overflow = "";
}


/* ADD TO CART */

function addToCart(name, category) {

    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            name: name,
            category: category,
            quantity: 1
        });
    }

    updateCart();
    openCart();
}


/* UPDATE CART */

function updateCart() {

    const totalQuantity = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    cartCount.textContent = totalQuantity;
    cartTotal.textContent = totalQuantity;


    if (cart.length === 0) {

        cartItems.innerHTML = `
            <div class="empty-cart">
                <span class="empty-cart-icon">+</span>
                <p>Your cart is empty.</p>
                <span>Add medicines to begin your order.</span>
            </div>
        `;

        return;
    }


    cartItems.innerHTML = cart.map((item, index) => `

        <div class="cart-item">

            <div class="cart-item-info">

                <div class="cart-item-category">
                    ${item.category}
                </div>

                <div class="cart-item-name">
                    ${item.name}
                </div>

            </div>

            <div class="quantity-control">

                <button
                    onclick="changeQuantity(${index}, -1)"
                    aria-label="Decrease quantity"
                >
                    −
                </button>

                <span>
                    ${item.quantity}
                </span>

                <button
                    onclick="changeQuantity(${index}, 1)"
                    aria-label="Increase quantity"
                >
                    +
                </button>

            </div>

            <button
                class="remove-item"
                onclick="removeFromCart(${index})"
                aria-label="Remove ${item.name}"
            >
                ×
            </button>

        </div>

    `).join("");
}


/* CHANGE QUANTITY */

function changeQuantity(index, amount) {

    cart[index].quantity += amount;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    updateCart();
}


/* REMOVE ITEM */

function removeFromCart(index) {

    cart.splice(index, 1);

    updateCart();
}


/* CLEAR CART */

clearCart.addEventListener("click", () => {

    cart = [];

    updateCart();

});


/* OPEN / CLOSE EVENTS */

cartButton.addEventListener("click", openCart);

cartClose.addEventListener("click", closeCart);

cartOverlay.addEventListener("click", closeCart);


/* ESCAPE KEY */

document.addEventListener("keydown", event => {

    if (event.key === "Escape") {
        closeCart();
    }

});


/* PRODUCT BUTTONS */

document.querySelectorAll(".product-card").forEach(card => {

    const button = card.querySelector("button");
    const name = card.querySelector("h3");
    const category = card.querySelector(".product-category");


    if (!button || !name) return;


    button.addEventListener("click", () => {

        addToCart(
            name.textContent.trim(),
            category
                ? category.textContent.trim()
                : "PHARMACEUTICAL"
        );

    });

});


/* PROCEED */

proceedButton.addEventListener("click", () => {

    if (cart.length === 0) {

        alert("Your cart is empty.");

        return;
    }

    alert(
        "Your order has been prepared. Ordering confirmation can be connected later."
    );

});