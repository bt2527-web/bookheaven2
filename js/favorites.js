
// ==========================================
// ФОТОГРАФІЇ МЕРЧУ BOOK HEAVEN
// ==========================================

const favoritesMerchImages = {
    52: "images/zakladka-kvitkova-istoriia.jpg",
    53: "images/nabir-zakladok.jpg",
    54: "images/shoper-book-heaven.jpg",
    55: "images/chashka-chas-dlia-chytannia.jpg",
    56: "images/bloknot-chytacha.jpg",
    57: "images/knyzhkovi-nalipky.jpg",
    58: "images/chytatskyi-planer.jpg",
    59: "images/podarunkovyi-nabir.jpg"
};


// ==========================================
// ОКРЕМА СТОРІНКА ОБРАНОГО BOOK HEAVEN
// ==========================================


// ==========================================
// БЕЗПЕЧНЕ ВІДОБРАЖЕННЯ ТЕКСТУ
// ==========================================

function safeFavoritesText(value) {
    if (typeof safeText === "function") {
        return safeText(value ?? "");
    }

    return String(value ?? "").replace(/[&<>"']/g, char => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
    })[char]);
}


// ==========================================
// ВІДОБРАЖЕННЯ ЗБЕРЕЖЕНИХ ТОВАРІВ
// ==========================================

function renderFavoritesPage() {
    const container = document.getElementById("favorites-page-items");

    if (!container) return;

    const allProducts = [
        ...(typeof books !== "undefined" ? books : []),
        ...(typeof merch !== "undefined" ? merch : [])
    ];

    const favoriteProducts = allProducts.filter(product =>
        favorites.includes(Number(product.id))
    );

    // ЯКЩО ОБРАНЕ ПОРОЖНЄ

    if (favoriteProducts.length === 0) {
        container.innerHTML = `
            <div class="cart-empty favorites-empty">
                <div class="cart-empty-icon">♡</div>
                <h3>Тут поки немає обраних товарів</h3>
                <p>
                    Зберігай книги та мерч, які тобі сподобалися,
                    щоб легко знайти їх пізніше.
                </p>
                <a href="catalog.html" class="primary-button">
                    Перейти до каталогу →
                </a>
            </div>
        `;

        return;
    }

    // СТВОРЮЄМО КАРТКИ ТОВАРІВ

    container.innerHTML = favoriteProducts.map(product => {

        const productId = Number(product.id);

        // ВИЗНАЧАЄМО, ЧИ ЦЕ МЕРЧ

        const isMerch = Object.prototype.hasOwnProperty.call(
            favoritesMerchImages,
            productId
        ) || (
            typeof merch !== "undefined" &&
            merch.some(item => Number(item.id) === productId)
        );

        // ВИЗНАЧАЄМО ФОТОГРАФІЮ

        const productImage =
            favoritesMerchImages[productId] ||
            product.image ||
            "";

        // ПЕРЕВІРКА АКЦІЇ

        const isOnSale = Number(product.salePrice) > 0 &&
                         Number(product.salePrice) < Number(product.price);

        // РОЗРАХУНОК ЗНИЖКИ

        const discount = isOnSale
            ? Math.round(
                (Number(product.price) - Number(product.salePrice)) /
                Number(product.price) * 100
            )
            : 0;

        // ЦІНИ

        const priceHTML = isOnSale
            ? `
                <div class="book-prices">
                    <span class="old-price">${product.price} грн</span>
                    <strong class="sale-price">${product.salePrice} грн</strong>
                </div>
            `
            : `<strong>${product.price} грн</strong>`;

        return `
            <article class="book-card ${isOnSale ? "on-sale" : ""} ${isMerch ? "merch-card" : ""}">

                ${isOnSale
                    ? `<span class="sale-badge">−${discount}%</span>`
                    : ""
                }

                <div class="book-cover">
                    <a href="product.html?id=${productId}"
                       class="product-card-link">

                        <img
                            src="${safeFavoritesText(productImage)}"
                            alt="${safeFavoritesText(product.title)}"
                            onerror="this.style.display='none';this.parentElement.parentElement.classList.add('no-image')"
                        >

                    </a>
                </div>

                <div class="book-info">

                    <h3>
                        <a href="product.html?id=${productId}"
                           class="product-card-link">
                            ${safeFavoritesText(product.title)}
                        </a>
                    </h3>

                    <p>${safeFavoritesText(product.author || "Book Heaven")}</p>

                    ${priceHTML}

                    <div class="book-actions">

                        <button onclick="addFavoriteProductToCart(${productId})">
                            До кошика
                        </button>

                        <button onclick="removeFromFavorites(${productId})">
                            Видалити з обраного
                        </button>

                        <button onclick="openBook(${productId})">
                            Детальніше
                        </button>

                    </div>

                </div>
            </article>
        `;

    }).join("");
}


// ==========================================
// ДОДАВАННЯ ТОВАРУ З ОБРАНОГО ДО КОШИКА
// ==========================================

function addFavoriteProductToCart(id) {

    const productId = Number(id);

    const allProducts = [
        ...(typeof books !== "undefined" ? books : []),
        ...(typeof merch !== "undefined" ? merch : [])
    ];

    const product = allProducts.find(item =>
        Number(item.id) === productId
    );

    if (!product) {
        alert("Не вдалося знайти цей товар.");
        return;
    }

    cart.push(productId);

    saveCart();

    alert(`«${product.title}» додано до кошика.`);
}


// ==========================================
// СТАРА НАЗВА ФУНКЦІЇ ДЛЯ СУМІСНОСТІ
// ==========================================

function addFavoriteBookToCart(id) {
    addFavoriteProductToCart(id);
}


// ==========================================
// ВИДАЛЕННЯ ТОВАРУ З ОБРАНОГО
// ==========================================

function removeFromFavorites(id) {

    const productId = Number(id);

    favorites = favorites.filter(item =>
        Number(item) !== productId
    );

    saveFavorites();

    renderFavoritesPage();

    updateCounters();
}


// ==========================================
// ЗАПУСК СТОРІНКИ
// ==========================================

document.addEventListener("DOMContentLoaded", function() {

    renderFavoritesPage();

    updateCounters();
    updateUserButton();

});
