
// СТОРІНКА КОШИКА BOOK HEAVEN

// ПОШУК ТОВАРУ СЕРЕД КНИГ І МЕРЧУ
function findCartProduct(id) {
    const productId = Number(id);

    const allProducts = [
        ...(typeof books !== "undefined" ? books : []),
        ...(typeof merch !== "undefined" ? merch : [])
    ];

    return allProducts.find(item => Number(item.id) === productId);
}

// ОТРИМАННЯ КІЛЬКОСТІ ТОВАРУ
function getCartQuantity(id) {
    return cart.filter(item => Number(item) === Number(id)).length;
}

// ВІДОБРАЖЕННЯ КОШИКА
function renderCartPage() {
    const container = document.getElementById("cart-page-items");
    const totalElement = document.getElementById("cart-page-total");
    const countElement = document.getElementById("cart-page-count");
    const checkoutButton = document.getElementById("checkout-button");

    if (!container || !totalElement || !countElement) return;

    let total = 0;
    let totalCount = 0;

    const groupedProducts = [...new Set(cart.map(Number))];

    if (groupedProducts.length === 0) {
        container.innerHTML = `
            <div class="cart-empty">
                <div class="cart-empty-icon">♡</div>
                <h3>Твій кошик поки порожній</h3>
                <p>Знайди книгу або приємний аксесуар для своєї наступної історії.</p>
                <a href="catalog.html" class="primary-button">
                    Перейти до каталогу →
                </a>
            </div>
        `;

        totalElement.textContent = "0 грн";
        countElement.textContent = "0";

        if (checkoutButton) checkoutButton.disabled = true;

        return;
    }

    if (checkoutButton) checkoutButton.disabled = false;

    container.innerHTML = groupedProducts.map(id => {
        const product = findCartProduct(id);

        if (!product) return "";

        const quantity = getCartQuantity(id);

        const price = typeof getBookPrice === "function"
            ? getBookPrice(product)
            : Number(product.salePrice || product.price || 0);

        const subtotal = price * quantity;

        total += subtotal;
        totalCount += quantity;

        const priceHTML = product.salePrice
            ? `
                <div class="cart-product-prices">
                    <del>${product.price} грн</del>
                    <strong>${price} грн</strong>
                </div>
            `
            : `<strong class="cart-product-price">${price} грн</strong>`;

        return `
            <article class="cart-page-item">
                <div class="cart-product-image">
                    <img src="${safeText(product.image)}"
                         alt="${safeText(product.title)}"
                         onerror="this.style.display='none'">
                </div>

                <div class="cart-product-info">
                    <h3>${safeText(product.title)}</h3>
                    <p>${safeText(product.author || "Book Heaven")}</p>

                    ${priceHTML}

                    <div class="cart-quantity">
                        <button type="button"
                                onclick="changeCartQuantity(${id}, -1)"
                                aria-label="Зменшити кількість">−</button>

                        <span>${quantity}</span>

                        <button type="button"
                                onclick="changeCartQuantity(${id}, 1)"
                                aria-label="Збільшити кількість">+</button>
                    </div>
                </div>

                <div class="cart-product-end">
                    <strong class="cart-subtotal">${subtotal} грн</strong>

                    <button type="button" class="cart-remove"
                            onclick="deleteCartItem(${id})">
                        Видалити
                    </button>
                </div>
            </article>
        `;
    }).join("");

    totalElement.textContent = total + " грн";
    countElement.textContent = totalCount;
}

// ЗМІНА КІЛЬКОСТІ ТОВАРУ
function changeCartQuantity(id, change) {
    const productId = Number(id);

    if (change > 0) {
        cart.push(productId);
    } else {
        const index = cart.findIndex(item => Number(item) === productId);

        if (index !== -1) {
            cart.splice(index, 1);
        }
    }

    saveCart();
    renderCartPage();
}

// ПОВНЕ ВИДАЛЕННЯ ТОВАРУ
function deleteCartItem(id) {
    const productId = Number(id);

    cart = cart.filter(item => Number(item) !== productId);

    saveCart();
    renderCartPage();
}

// ВІДКРИТТЯ ФОРМИ ОФОРМЛЕННЯ
function openCheckout() {
    if (cart.length === 0) {
        alert("Спочатку додай до кошика хоча б один товар.");
        return;
    }

    document.getElementById("checkout-modal").classList.add("open");
}

// ЗАКРИТТЯ ФОРМИ
function closeCheckout() {
    document.getElementById("checkout-modal").classList.remove("open");
}

// ПІДТВЕРДЖЕННЯ ЗАМОВЛЕННЯ
function submitOrder(event) {
    event.preventDefault();

    if (cart.length === 0) {
        alert("Кошик порожній.");
        closeCheckout();
        renderCartPage();
        return;
    }

    const order = {
        firstName: document.getElementById("first-name").value.trim(),
        lastName: document.getElementById("last-name").value.trim(),
        phone: document.getElementById("phone").value.trim(),
        email: document.getElementById("email").value.trim(),
        city: document.getElementById("city").value.trim(),
        postalCode: document.getElementById("postal-code").value.trim(),
        street: document.getElementById("street").value.trim(),
        comment: document.getElementById("comment").value.trim(),
        books: [...cart],
        date: new Date().toLocaleString("uk-UA")
    };

    // ЗБЕРЕЖЕННЯ ДЕМОЗАМОВЛЕННЯ У БРАУЗЕРІ
    const orders = JSON.parse(localStorage.getItem("bookspace-orders") || "[]");
    orders.push(order);
    localStorage.setItem("bookspace-orders", JSON.stringify(orders));

    // ОЧИЩЕННЯ КОШИКА
    cart = [];
    saveCart();

    // ЗАКРИТТЯ ФОРМИ
    closeCheckout();

    // ПОВІДОМЛЕННЯ ПРО УСПІХ
    document.querySelector(".cart-layout").hidden = true;

    const success = document.getElementById("order-success");
    success.hidden = false;

    success.scrollIntoView({ behavior: "smooth", block: "center" });
}

// УКРАЇНСЬКІ ПОВІДОМЛЕННЯ ДЛЯ ОБОВ'ЯЗКОВИХ ПОЛІВ
document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector("#checkout-modal form");

    if (form) {
        const fields = form.querySelectorAll(
            "input[required], textarea[required], select[required]"
        );

        fields.forEach(function(field) {

            field.addEventListener("invalid", function() {
                if (field.validity.valueMissing) {
                    field.setCustomValidity("Будь ласка, заповніть це поле.");
                } else if (
                    field.validity.typeMismatch &&
                    field.type === "email"
                ) {
                    field.setCustomValidity(
                        "Будь ласка, введіть правильну електронну пошту."
                    );
                } else {
                    field.setCustomValidity(
                        "Будь ласка, перевірте правильність введених даних."
                    );
                }
            });

            field.addEventListener("input", function() {
                field.setCustomValidity("");
            });

            field.addEventListener("change", function() {
                field.setCustomValidity("");
            });
        });
    }

    renderCartPage();

    const checkoutModal = document.getElementById("checkout-modal");

    if (checkoutModal) {
        checkoutModal.addEventListener("click", function(event) {
            if (event.target === checkoutModal) {
                closeCheckout();
            }
        });
    }
});

