// ============================================================
// 1. MOBILE MENU TOGGLE
// ============================================================
const menu = document.querySelector(".phone__menu");
const menuBtn = document.querySelector(".hamberger__menu");
const menuBtnIcon = document.querySelector(".hamberger__menu img");

menuBtn.addEventListener("click", function () {
    if (menuBtnIcon.classList.contains("burgerocon")) {
        menu.style.right = "0";
        menuBtnIcon.classList = "hiden";
        document.body.style.overflow = "hidden";
    } else {
        menu.style.right = "-400px";
        menuBtnIcon.classList = "burgerocon";
        document.body.style.overflow = "auto";
    }
});

// Close menu when clicking on links
document.querySelectorAll(".phone__menu__link").forEach(link => {
    link.addEventListener("click", () => {
        menu.style.right = "-400px";
        menuBtnIcon.classList = "burgerocon";
        document.body.style.overflow = "auto";
    });
});

// ============================================================
// 2. ORDER COUNTER WITH PRICE UPDATE
// ============================================================
const addBtn = document.querySelector(".add");
const minesBtn = document.querySelector(".mines");
const numberSpan = document.querySelector(".number");
const totalPriceSpan = document.querySelector(".order__food p span:last-child");

let count = parseInt(numberSpan.innerText) || 0;
const BASE_PRICE = 5.39;

function updateCounter() {
    numberSpan.innerText = count < 10 ? "0" + count : count;
    minesBtn.disabled = count <= 0;

    // Update total price
    const total = (count * BASE_PRICE).toFixed(2);
    totalPriceSpan.textContent = total + "$";
}

addBtn.addEventListener("click", () => {
    count++;
    updateCounter();
});

minesBtn.addEventListener("click", () => {
    if (count > 0) {
        count--;
        updateCounter();
    }
});

// Initial setup
updateCounter();

// ============================================================
// 3. SOCIAL MEDIA LINKS
// ============================================================
const socialLinks = [
    { selector: ".x__page", url: "https://x.com/Khamenei_m" },
    { selector: ".youtube__page", url: "https://www.youtube.com/@Matarzak/community" },
    { selector: ".instagram__page", url: "https://www.instagram.com/elias_1d/" }
];

socialLinks.forEach(link => {
    document.querySelector(link.selector)?.addEventListener("click", () => {
        window.open(link.url, "_blank");
    });
});

// ============================================================
// 4. MENU FILTER SYSTEM
// ============================================================
const filterButtons = document.querySelectorAll(".row__button__category button");
const foodItems = document.querySelectorAll("#box");

// Map categories to food items
const categoryMap = {
    "Best seller": ["Cheese Beef Hamburger", "Combo funny"],
    "Hamberger": ["Cheese Beef Hamburger", "Chicken burger"],
    "Drink": ["Lipton"],
    "Dessert": ["Salad mixed vinegar"],
    "Fried chicken": ["Chicken with Spicy Sauce", "Combo funny", "Chicken burger"]
};

// Add data-category tags to items
foodItems.forEach((item) => {
    const title = item.querySelector(".box__detail h2")?.innerText || "";
    let category = "all";

    for (const [key, values] of Object.entries(categoryMap)) {
        if (values.some(v => title.includes(v))) {
            category = key.toLowerCase();
            break;
        }
    }
    // Special cases
    if (title.includes("Lipton")) category = "drink";
    if (title.includes("Salad")) category = "dessert";

    item.dataset.category = category;
});

filterButtons.forEach(btn => {
    btn.addEventListener("click", function () {
        // Remove active class from all buttons
        filterButtons.forEach(b => b.classList.remove("Best__seller"));

        // Add active class to clicked button
        if (!this.classList.contains("Best__seller")) {
            this.classList.add("Best__seller");
        }

        // Get category from button text
        const categoryText = this.innerText.trim().toLowerCase();

        // Map button text to categories
        const categoryMapping = {
            "best seller": "all",
            "hamberger": "hamberger",
            "drink": "drink",
            "dessert": "dessert",
            "fried chicken": "fried chicken"
        };

        const targetCategory = categoryMapping[categoryText] || "all";

        // Filter items
        foodItems.forEach(item => {
            const itemCategory = item.dataset.category || "all";
            if (targetCategory === "all" || itemCategory === targetCategory) {
                item.style.display = "grid";
            } else {
                item.style.display = "none";
            }
        });
    });
});

// ============================================================
// 5. LIVE SEARCH FUNCTIONALITY
// ============================================================
const searchInput = document.querySelector("#fsrch");

searchInput?.addEventListener("input", function () {
    const query = this.value.toLowerCase().trim();

    foodItems.forEach(item => {
        const title = item.querySelector(".box__detail h2")?.innerText?.toLowerCase() || "";
        const desc = item.querySelector(".box__detail h5")?.innerText?.toLowerCase() || "";

        if (title.includes(query) || desc.includes(query) || query === "") {
            item.style.display = "grid";
        } else {
            item.style.display = "none";
        }
    });
});

// ============================================================
// 6. SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        const href = this.getAttribute("href");
        if (href === "#") return;

        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    });
});

// ============================================================
// 7. DARK/LIGHT MODE
// ============================================================
// Create theme toggle button
const headerNav = document.querySelector(".navigation");
if (headerNav && !document.querySelector(".theme-toggle")) {
    const themeBtn = document.createElement("button");
    themeBtn.className = "theme-toggle";
    themeBtn.innerHTML = "🌙";
    themeBtn.style.cssText = `
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0.5rem;
        transition: 0.3s;
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 9999;
        background: var(--red, #c90000);
        color: white;
        border-radius: 50%;
        width: 55px;
        height: 55px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.8rem;
    `;
    document.body.appendChild(themeBtn);

    // Check saved theme
    const savedTheme = localStorage.getItem("theme") || "light";
    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
        themeBtn.innerHTML = "☀️";
    }

    themeBtn.addEventListener("click", function () {
        document.body.classList.toggle("dark-mode");
        const isDark = document.body.classList.contains("dark-mode");
        this.innerHTML = isDark ? "☀️" : "🌙";
        localStorage.setItem("theme", isDark ? "dark" : "light");
    });
}

// Dark mode styles
const darkStyles = `
.dark-mode {
    background: #1a1a1a !important;
    color: #f0f0f0 !important;
}
.dark-mode .main__header,
.dark-mode .section__food,
.dark-mode .section__off {
    background: #1a1a1a !important;
}
.dark-mode .navigation a,
.dark-mode .sign p,
.dark-mode .order__food p,
.dark-mode .box__button h5,
.dark-mode .food__preview a {
    color: #d0d0d0 !important;
}
.dark-mode #box {
    background: #2a2a2a !important;
    border-color: #444 !important;
}
.dark-mode .box__button h2 {
    color: #ff6b6b !important;
}
.dark-mode .back__box {
    background: #3a3a3a !important;
}
.dark-mode .right__offer,
.dark-mode .left__offer {
    background: #2a2a2a !important;
}
.dark-mode .mid__offer {
    background: #8b0000 !important;
}
.dark-mode .buttom__footer {
    background: #222 !important;
}
.dark-mode .buttom__footer h2,
.dark-mode .buttom__footer .shop__detail {
    color: #d0d0d0 !important;
}
.dark-mode .top__of__part1 h2 {
    color: #ff6b6b !important;
}
.dark-mode #pages svg {
    fill: #d0d0d0 !important;
}
.dark-mode .shop__search {
    background: #2a2a2a !important;
}
.dark-mode .detail__shop__search h2 {
    color: #ff6b6b !important;
}
.dark-mode .detail__shop__search h3 {
    color: #d0d0d0 !important;
}
.dark-mode .row__button__category button {
    background: #2a2a2a !important;
    border-color: #444 !important;
    color: #d0d0d0 !important;
}
.dark-mode .row__button__category button svg path {
    fill: #d0d0d0 !important;
}
.dark-mode .Best__seller {
    background: #ffc300 !important;
    color: #1a1a1a !important;
}
.dark-mode .Best__seller svg path {
    fill: #1a1a1a !important;
}
.dark-mode .sign h1,
.dark-mode #section__food__h2,
.dark-mode .sale__off {
    color: #ff6b6b !important;
}
.dark-mode .price__side__of__offer h2 {
    color: #ff6b6b !important;
}
.dark-mode .old__price {
    color: #888 !important;
}
.dark-mode .line__throw {
    background: #ff6b6b !important;
}
.dark-mode .delivery {
    filter: invert(1) !important;
}
`;

// Add dark styles to document
const styleSheet = document.createElement("style");
styleSheet.textContent = darkStyles;
document.head.appendChild(styleSheet);

// ============================================================
// 8. AUTO SLIDER FOR OFFERS (Mobile Only)
// ============================================================
const offersContainer = document.querySelector(".off__offers");
const offerItems = document.querySelectorAll(".off__offers > div");

if (offersContainer && offerItems.length > 0) {
    let currentSlide = 0;
    const totalSlides = offerItems.length;

    // Activate slider only on mobile
    if (window.innerWidth < 834) {
        offersContainer.style.overflow = "hidden";
        offersContainer.style.position = "relative";

        // Previous/Next buttons
        const prevBtn = document.createElement("button");
        const nextBtn = document.createElement("button");

        [prevBtn, nextBtn].forEach((btn, i) => {
            btn.innerHTML = i === 0 ? "❮" : "❯";
            btn.style.cssText = `
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                ${i === 0 ? "left: 5px;" : "right: 5px;"}
                z-index: 10;
                background: rgba(0,0,0,0.5);
                color: white;
                border: none;
                padding: 10px 15px;
                border-radius: 50%;
                cursor: pointer;
                font-size: 1.2rem;
                transition: 0.3s;
                display: none;
            `;
            offersContainer.appendChild(btn);
        });

        function showSlide(index) {
            offerItems.forEach((item, i) => {
                item.style.display = i === index ? "flex" : "none";
                item.style.flexDirection = "column";
                item.style.alignItems = "center";
            });
            prevBtn.style.display = "block";
            nextBtn.style.display = "block";
        }

        prevBtn.addEventListener("click", () => {
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            showSlide(currentSlide);
        });

        nextBtn.addEventListener("click", () => {
            currentSlide = (currentSlide + 1) % totalSlides;
            showSlide(currentSlide);
        });

        // Start slider
        showSlide(0);

        // Auto slide every 4 seconds
        let autoSlide = setInterval(() => {
            currentSlide = (currentSlide + 1) % totalSlides;
            showSlide(currentSlide);
        }, 4000);

        // Pause on hover
        offersContainer.addEventListener("mouseenter", () => clearInterval(autoSlide));
        offersContainer.addEventListener("mouseleave", () => {
            autoSlide = setInterval(() => {
                currentSlide = (currentSlide + 1) % totalSlides;
                showSlide(currentSlide);
            }, 4000);
        });
    }
}

// ============================================================
// 9. SHOPPING CART SYSTEM
// ============================================================
let cart = JSON.parse(localStorage.getItem("restaurant_cart")) || [];

// Create cart icon in header
const cartIcon = document.createElement("div");
cartIcon.className = "cart-icon";
cartIcon.style.cssText = `
    position: fixed;
    top: 70px;
    right: 80px;
    z-index: 9999;
    cursor: pointer;
    background: var(--red, #c90000);
    color: white;
    padding: 10px 15px;
    border-radius: 50px;
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: bold;
    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    transition: 0.3s;
`;
cartIcon.innerHTML = `
    🛒 <span class="cart-count">${cart.length}</span>
`;

// Show cart modal on click
cartIcon.addEventListener("click", function () {
    showCartModal();
});

document.body.appendChild(cartIcon);

// Show cart modal
function showCartModal() {
    const existingModal = document.querySelector(".cart-modal");
    if (existingModal) {
        existingModal.remove();
        return;
    }

    const modal = document.createElement("div");
    modal.className = "cart-modal";
    modal.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        padding: 2rem;
        border-radius: 20px;
        box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        z-index: 99999;
        max-width: 400px;
        width: 90%;
        max-height: 80vh;
        overflow-y: auto;
    `;

    if (document.body.classList.contains("dark-mode")) {
        modal.style.background = "#2a2a2a";
        modal.style.color = "#f0f0f0";
    }

    let cartHTML = `<h2 style="margin-bottom:1rem;color:var(--red, #c90000);">🛒 Shopping Cart</h2>`;

    if (cart.length === 0) {
        cartHTML += `<p style="text-align:center;padding:2rem 0;color:#888;">Your cart is empty 🍽️</p>`;
    } else {
        let total = 0;
        cart.forEach((item, index) => {
            const price = parseFloat(item.price.replace("$", ""));
            total += price * item.quantity;
            cartHTML += `
                <div style="display:flex;justify-content:space-between;align-items:center;padding:0.7rem 0;border-bottom:1px solid #eee;">
                    <div>
                        <strong>${item.name}</strong>
                        <span style="display:block;font-size:0.8rem;color:#888;">${item.quantity} × ${item.price}</span>
                    </div>
                    <button onclick="removeFromCart(${index})" style="background:#ff4444;color:white;border:none;border-radius:50%;width:30px;height:30px;cursor:pointer;font-weight:bold;">×</button>
                </div>
            `;
        });
        cartHTML += `
            <div style="display:flex;justify-content:space-between;padding:1rem 0;font-weight:bold;font-size:1.2rem;border-top:2px solid var(--red, #c90000);margin-top:0.5rem;">
                <span>Total:</span>
                <span style="color:var(--red, #c90000);">$${total.toFixed(2)}</span>
            </div>
            <button onclick="clearCart()" style="width:100%;padding:0.8rem;background:var(--red, #c90000);color:white;border:none;border-radius:10px;font-weight:bold;cursor:pointer;margin-top:0.5rem;font-size:1rem;">
                🗑️ Clear Cart
            </button>
        `;
    }

    cartHTML += `
        <button onclick="this.parentElement.remove()" style="width:100%;padding:0.8rem;background:#444;color:white;border:none;border-radius:10px;cursor:pointer;margin-top:0.5rem;font-size:1rem;">
            ✖ Close
        </button>
    `;

    modal.innerHTML = cartHTML;
    document.body.appendChild(modal);
}

// Add item to cart
function addToCart(name, price) {
    const existing = cart.find(item => item.name === name);
    if (existing) {
        existing.quantity++;
    } else {
        cart.push({ name, price, quantity: 1 });
    }
    localStorage.setItem("restaurant_cart", JSON.stringify(cart));
    document.querySelector(".cart-count").textContent = cart.length;

    // Animation
    const icon = document.querySelector(".cart-icon");
    icon.style.transform = "scale(1.2)";
    setTimeout(() => icon.style.transform = "scale(1)", 200);
}

// Remove item from cart
function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem("restaurant_cart", JSON.stringify(cart));
    document.querySelector(".cart-count").textContent = cart.length;
    showCartModal(); // Refresh modal
}

// Clear cart
function clearCart() {
    if (confirm("Are you sure you want to clear your cart?")) {
        cart = [];
        localStorage.setItem("restaurant_cart", JSON.stringify(cart));
        document.querySelector(".cart-count").textContent = 0;
        showCartModal();
    }
}

// Add to cart buttons - Menu items
document.querySelectorAll(".box__ordering button").forEach((btn) => {
    btn.addEventListener("click", function (e) {
        e.stopPropagation();
        const box = this.closest("#box");
        const name = box.querySelector(".box__detail h2")?.innerText || "Special Food";
        const priceText = box.querySelector(".box__ordering h3")?.innerText || "5.39$";

        addToCart(name, priceText);
        showToast(`${name} added to cart ✅`);
    });
});

// Add to cart buttons - Offer items
document.querySelectorAll("#secend__order__now").forEach(btn => {
    btn.addEventListener("click", function (e) {
        e.stopPropagation();
        const parent = this.closest(".right__offer, .mid__offer, .left__offer");
        const name = parent?.querySelector(".top__off__offer__side h4:last-child")?.innerText || "Special Offer";
        const priceText = parent?.querySelector(".price__side__of__offer h2:last-child")?.innerText || "8.3$";

        addToCart(name, priceText);
        showToast(`${name} added to cart ✅`);
    });
});

// Toast notification
function showToast(message) {
    const toast = document.createElement("div");
    toast.style.cssText = `
        position: fixed;
        bottom: 100px;
        left: 50%;
        transform: translateX(-50%);
        background: #00c853;
        color: white;
        padding: 15px 30px;
        border-radius: 50px;
        font-weight: bold;
        box-shadow: 0 4px 20px rgba(0,0,0,0.2);
        z-index: 999999;
        animation: slideUp 0.5s ease;
        font-size: 1rem;
    `;
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = "slideDown 0.5s ease";
        setTimeout(() => toast.remove(), 500);
    }, 2500);
}

// Toast animations
const toastStyles = document.createElement("style");
toastStyles.textContent = `
    @keyframes slideUp {
        from { opacity: 0; transform: translateX(-50%) translateY(50px); }
        to { opacity: 1; transform: translateX(-50%) translateY(0); }
    }
    @keyframes slideDown {
        from { opacity: 1; transform: translateX(-50%) translateY(0); }
        to { opacity: 0; transform: translateX(-50%) translateY(50px); }
    }
`;
document.head.appendChild(toastStyles);

// ============================================================
// 10. BACK TO TOP BUTTON
// ============================================================
const backToTopBtn = document.createElement("button");
backToTopBtn.innerHTML = "⬆";
backToTopBtn.style.cssText = `
    position: fixed;
    bottom: 90px;
    right: 20px;
    z-index: 9998;
    background: var(--red, #c90000);
    color: white;
    border: none;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    font-size: 1.5rem;
    cursor: pointer;
    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    transition: 0.3s;
    opacity: 0;
    transform: scale(0.8);
    pointer-events: none;
`;
document.body.appendChild(backToTopBtn);

window.addEventListener("scroll", function () {
    if (window.scrollY > 500) {
        backToTopBtn.style.opacity = "1";
        backToTopBtn.style.transform = "scale(1)";
        backToTopBtn.style.pointerEvents = "auto";
    } else {
        backToTopBtn.style.opacity = "0";
        backToTopBtn.style.transform = "scale(0.8)";
        backToTopBtn.style.pointerEvents = "none";
    }
});

backToTopBtn.addEventListener("click", function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

// ============================================================
// 11. SET DEFAULT FILTER
// ============================================================
// Show all items initially
foodItems.forEach(item => item.style.display = "grid");

// Activate Best Seller filter by default
const bestSellerBtn = document.querySelector(".Best__seller");
if (bestSellerBtn) {
    bestSellerBtn.click();
}

// ============================================================
// 12. RATING & REVIEWS SYSTEM
// ============================================================
const reviews = JSON.parse(localStorage.getItem("food_reviews")) || {};

// Add rating system to each food item
document.querySelectorAll("#box").forEach((box, index) => {
    const foodName = box.querySelector(".box__detail h2")?.innerText || `Food ${index + 1}`;
    const reviewContainer = document.createElement("div");
    reviewContainer.className = "review-container";
    reviewContainer.style.cssText = `
        margin-top: 8px;
        padding: 8px;
        background: rgba(0,0,0,0.05);
        border-radius: 8px;
        display: flex;
        align-items: center;
        gap: 8px;
        flex-wrap: wrap;
    `;

    // Star rating
    const starsDiv = document.createElement("div");
    starsDiv.style.cssText = `display: flex; gap: 2px; cursor: pointer;`;

    for (let i = 1; i <= 5; i++) {
        const star = document.createElement("span");
        star.innerHTML = "☆";
        star.style.cssText = `
            font-size: 1.2rem;
            color: #FFC300;
            transition: 0.3s;
        `;
        star.dataset.rating = i;

        star.addEventListener("click", function (e) {
            e.stopPropagation();
            const rating = parseInt(this.dataset.rating);
            reviews[foodName] = { rating, comment: "" };
            localStorage.setItem("food_reviews", JSON.stringify(reviews));
            updateStars(foodName);
            showToast(`⭐ You rated ${foodName} ${rating} stars!`);
        });

        star.addEventListener("mouseenter", function () {
            const rating = parseInt(this.dataset.rating);
            const allStars = this.parentElement.querySelectorAll("span");
            allStars.forEach((s, idx) => {
                s.innerHTML = idx < rating ? "★" : "☆";
                s.style.color = idx < rating ? "#FFC300" : "#ddd";
            });
        });

        star.addEventListener("mouseleave", function () {
            updateStars(foodName);
        });

        starsDiv.appendChild(star);
    }

    function updateStars(foodName) {
        const allStars = starsDiv.querySelectorAll("span");
        const rating = reviews[foodName]?.rating || 0;
        allStars.forEach((s, idx) => {
            s.innerHTML = idx < rating ? "★" : "☆";
            s.style.color = idx < rating ? "#FFC300" : "#ddd";
        });
    }

    // Show average rating
    const avgRating = document.createElement("span");
    avgRating.style.cssText = `
        font-size: 0.8rem;
        color: #666;
        margin-left: 5px;
    `;

    function updateAvgRating() {
        const allRatings = Object.values(reviews)
            .filter(r => r.rating)
            .map(r => r.rating);
        if (allRatings.length > 0) {
            const avg = (allRatings.reduce((a, b) => a + b, 0) / allRatings.length).toFixed(1);
            avgRating.textContent = `⭐ ${avg} (${allRatings.length} reviews)`;
        } else {
            avgRating.textContent = "⭐ No ratings yet";
        }
    }

    reviewContainer.appendChild(starsDiv);
    reviewContainer.appendChild(avgRating);
    box.querySelector(".box__button")?.appendChild(reviewContainer);

    // Initial setup
    updateStars(foodName);
    updateAvgRating();
});

// ============================================================
// 13. ORDER HISTORY
// ============================================================
let orderHistory = JSON.parse(localStorage.getItem("order_history")) || [];

// Save order to history when adding to cart
const originalAddToCart = addToCart;
addToCart = function (name, price) {
    originalAddToCart(name, price);

    // Save to history
    const order = {
        id: Date.now(),
        name,
        price,
        quantity: 1,
        date: new Date().toLocaleString("en-US"),
        status: "Pending"
    };
    orderHistory.push(order);
    localStorage.setItem("order_history", JSON.stringify(orderHistory));
};

// Create history button
const historyBtn = document.createElement("button");
historyBtn.innerHTML = "📋 Order History";
historyBtn.style.cssText = `
    position: fixed;
    bottom: 160px;
    right: 20px;
    z-index: 9998;
    background: #FFC300;
    color: #1a1a1a;
    border: none;
    border-radius: 50px;
    padding: 12px 20px;
    font-weight: bold;
    cursor: pointer;
    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    transition: 0.3s;
    font-size: 0.9rem;
`;
document.body.appendChild(historyBtn);

historyBtn.addEventListener("click", function () {
    if (orderHistory.length === 0) {
        showToast("📭 No orders yet!");
        return;
    }

    let historyHTML = `
        <div style="position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);
                    background:white;padding:2rem;border-radius:20px;z-index:999999;
                    max-width:500px;width:90%;max-height:80vh;overflow-y:auto;
                    box-shadow:0 20px 60px rgba(0,0,0,0.3);">
            <h2 style="margin-bottom:1rem;color:#c90000;">📋 Order History</h2>
    `;

    orderHistory.slice().reverse().forEach(order => {
        historyHTML += `
            <div style="display:flex;justify-content:space-between;align-items:center;
                        padding:0.8rem;border-bottom:1px solid #eee;">
                <div>
                    <strong>${order.name}</strong>
                    <div style="font-size:0.8rem;color:#888;">
                        ${order.price} • ${order.date}
                    </div>
                </div>
                <span style="background:#4CAF50;color:white;padding:4px 12px;border-radius:50px;font-size:0.7rem;">
                    ${order.status}
                </span>
            </div>
        `;
    });

    historyHTML += `
        <button onclick="this.parentElement.remove()" 
                style="width:100%;padding:0.8rem;background:#c90000;color:white;
                       border:none;border-radius:10px;cursor:pointer;margin-top:1rem;
                       font-weight:bold;">
            ✖ Close
        </button>
    </div>`;

    const modal = document.createElement("div");
    modal.innerHTML = historyHTML;
    document.body.appendChild(modal.firstElementChild);
});

// ============================================================
// 14. COUNTDOWN TIMER FOR OFFERS
// ============================================================
function createCountdown() {
    const targetDate = new Date();
    targetDate.setHours(targetDate.getHours() + 24); // 24 hours from now

    const timerContainer = document.createElement("div");
    timerContainer.style.cssText = `
        background: var(--red, #c90000);
        color: white;
        padding: 10px 20px;
        border-radius: 50px;
        text-align: center;
        font-weight: bold;
        margin: 10px auto;
        max-width: 300px;
        font-size: 1.1rem;
        box-shadow: 0 4px 15px rgba(201, 0, 0, 0.3);
    `;

    const timerDisplay = document.createElement("span");
    timerContainer.innerHTML = "⏳ Special offer ends in: ";
    timerContainer.appendChild(timerDisplay);

    // Add to top of offers section
    const saleSection = document.querySelector(".section__off");
    if (saleSection) {
        saleSection.insertBefore(timerContainer, saleSection.firstChild);
    }

    function updateTimer() {
        const now = new Date();
        const diff = targetDate - now;

        if (diff <= 0) {
            timerDisplay.textContent = "🎉 Offer expired!";
            return;
        }

        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        timerDisplay.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }

    updateTimer();
    setInterval(updateTimer, 1000);
}

createCountdown();

// ============================================================
// 15. WELCOME POPUP
// ============================================================
if (!localStorage.getItem("visited_before")) {
    setTimeout(() => {
        // Create overlay
        const overlay = document.createElement("div");
        overlay.className = "welcome-overlay";
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.75);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 999999;
            animation: fadeIn 0.5s ease;
            backdrop-filter: blur(8px);
        `;

        const popupBox = document.createElement("div");
        popupBox.className = "welcome-popup";
        popupBox.style.cssText = `
            background: white;
            padding: 2.5rem;
            border-radius: 24px;
            max-width: 450px;
            width: 90%;
            text-align: center;
            box-shadow: 0 30px 80px rgba(0,0,0,0.4);
            animation: slideUp 0.6s ease;
            position: relative;
        `;

        // Popup content
        popupBox.innerHTML = `
            <div style="font-size: 4.5rem; margin-bottom: 0.5rem;">🍔</div>
            <h2 style="color: #c90000; margin-bottom: 0.8rem; font-size: 1.8rem;">
                Welcome to Our Restaurant! 🎉
            </h2>
            <p style="color: #666; margin-bottom: 1.8rem; line-height: 1.8; font-size: 1.05rem;">
                Place your first order and get 
                <strong style="color: #FFC300; font-size: 1.3rem;">10% OFF</strong>!
            </p>
            <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;">
                <button id="startOrderBtn" 
                        style="background: #c90000; color: white; border: none; 
                               padding: 14px 35px; border-radius: 50px; 
                               cursor: pointer; font-weight: bold; font-size: 1.05rem;
                               transition: 0.3s; box-shadow: 0 4px 15px rgba(201,0,0,0.3);">
                    🛒 Start Order
                </button>
                <button id="laterBtn" 
                        style="background: #f0f0f0; color: #333; border: none; 
                               padding: 14px 35px; border-radius: 50px; 
                               cursor: pointer; font-weight: bold; font-size: 1.05rem;
                               transition: 0.3s;">
                    Later ⏰
                </button>
            </div>
        `;

        overlay.appendChild(popupBox);
        document.body.appendChild(overlay);

        // Close popup function
        function closePopup() {
            overlay.style.opacity = "0";
            overlay.style.transition = "opacity 0.3s ease";
            setTimeout(() => {
                overlay.remove();
                localStorage.setItem("visited_before", "true");
            }, 300);
        }

        // Start Order button
        document.getElementById("startOrderBtn")?.addEventListener("click", function (e) {
            e.preventDefault();
            closePopup();

            // Scroll to menu section
            const menuSection = document.querySelector(".section__food");
            if (menuSection) {
                setTimeout(() => {
                    menuSection.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });
                }, 400);
            }

            setTimeout(() => {
                showToast("🎉 Let's order! Pick your favorite food!");
            }, 600);
        });

        // Later button
        document.getElementById("laterBtn")?.addEventListener("click", function (e) {
            e.preventDefault();
            closePopup();

            setTimeout(() => {
                showToast("👋 Come back when you're ready! 😊");
            }, 400);
        });

        // Click outside to close
        overlay.addEventListener("click", function (e) {
            if (e.target === overlay) {
                closePopup();
            }
        });

        // Add animations
        const styleAnim = document.createElement("style");
        styleAnim.textContent = `
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            @keyframes slideUp {
                from { 
                    opacity: 0; 
                    transform: translateY(40px) scale(0.95); 
                }
                to { 
                    opacity: 1; 
                    transform: translateY(0) scale(1); 
                }
            }
            .welcome-popup {
                animation: slideUp 0.6s ease;
            }
            #startOrderBtn:hover {
                transform: scale(1.05);
                box-shadow: 0 6px 25px rgba(201,0,0,0.4);
            }
            #laterBtn:hover {
                background: #e0e0e0;
                transform: scale(1.02);
            }
        `;
        document.head.appendChild(styleAnim);

    }, 800);
}

// ============================================================
// 16. WHATSAPP ORDER
// ============================================================
const whatsappBtn = document.createElement("button");
whatsappBtn.innerHTML = "📱 Order on WhatsApp";
whatsappBtn.style.cssText = `
    position: fixed;
    bottom: 220px;
    right: 20px;
    z-index: 9998;
    background: #25D366;
    color: white;
    border: none;
    border-radius: 50px;
    padding: 12px 20px;
    font-weight: bold;
    cursor: pointer;
    box-shadow: 0 4px 15px rgba(37, 211, 102, 0.4);
    transition: 0.3s;
    font-size: 0.9rem;
`;
document.body.appendChild(whatsappBtn);

whatsappBtn.addEventListener("click", function () {
    if (cart.length === 0) {
        showToast("🛒 Add something to your cart first!");
        return;
    }

    let message = "🍔 *New Restaurant Order* 🍔\n\n";
    let total = 0;
    cart.forEach(item => {
        const price = parseFloat(item.price.replace("$", ""));
        total += price * item.quantity;
        message += `• ${item.name} × ${item.quantity} = ${(price * item.quantity).toFixed(2)}$\n`;
    });
    message += `\n💰 *Total:* $${total.toFixed(2)}`;
    message += `\n\n📅 Date: ${new Date().toLocaleString('en-US')}`;
    message += `\n\nPlease confirm my order 🙏`;

    // WhatsApp phone number (change this to your restaurant number)
    const phoneNumber = "989123456789";

    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, "_blank");
});

// ============================================================
// 17. SCROLL PROGRESS BAR
// ============================================================
const progressBar = document.createElement("div");
progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 4px;
    background: var(--red, #c90000);
    width: 0%;
    z-index: 999999;
    transition: width 0.1s ease;
    box-shadow: 0 2px 10px rgba(201, 0, 0, 0.3);
`;
document.body.appendChild(progressBar);

window.addEventListener("scroll", function () {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;
    progressBar.style.width = progress + "%";
});
