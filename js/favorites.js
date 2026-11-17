
// ОКРЕМА СТОРІНКА ОБРАНОГО BOOK HEAVEN

// ВІДОБРАЖЕННЯ ЗБЕРЕЖЕНИХ ТОВАРІВ
function renderFavoritesPage() {
    const container = document.getElementById("favorites-page-items");

    if (!container) return;

    // ЗНАХОДИМО КНИГИ ТА МЕРЧ, ЯКІ Є В ОБРАНОМУ
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

        // КАТЕГОРІЯ МЕРЧУ
        const isMerch = product.type === "merch";

        return `
            <article class="book-card ${isOnSale ? "on-sale" : ""} ${isMerch ? "merch-card" : ""}">

                ${isOnSale
                    ? `<span class="sale-badge">−${discount}%</span>`
                    : ""
                }

                <div class="book-cover">
                    <a href="product.html?id=${Number(product.id)}"
                       class="product-card-link">

                        <img src="${safeText(product.image)}"
                             alt="${safeText(product.title)}"
                             onerror="this.style.display='none';this.parentElement.parentElement.classList.add('no-image')">

                    </a>
                </div>

                <div class="book-info">

                    <h3>
                        <a href="product.html?id=${Number(product.id)}"
                           class="product-card-link">
                            ${safeText(product.title)}
                        </a>
                    </h3>

                    <p>${safeText(product.author || "Book Heaven")}</p>

                    ${priceHTML}

                    <div class="book-actions">

                        <button onclick="addFavoriteProductToCart(${Number(product.id)})">
                            До кошика
                        </button>

                        <button onclick="removeFromFavorites(${Number(product.id)})">
                            Видалити з обраного
                        </button>

                        <button onclick="openBook(${Number(product.id)})">
                            Детальніше
                        </button>

                    </div>

                </div>
            </article>
        `;

    }).join("");
}


// ДОДАВАННЯ ТОВАРУ З ОБРАНОГО ДО КОШИКА
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


// СТАРА НАЗВА ФУНКЦІЇ ДЛЯ СУМІСНОСТІ
function addFavoriteBookToCart(id) {
    addFavoriteProductToCart(id);
}


// ВИДАЛЕННЯ ТОВАРУ З ОБРАНОГО
function removeFromFavorites(id) {

    const productId = Number(id);

    favorites = favorites.filter(item =>
        Number(item) !== productId
    );

    saveFavorites();

    renderFavoritesPage();

    updateCounters();
}


// ЗАПУСК СТОРІНКИ
document.addEventListener("DOMContentLoaded", function() {

    renderFavoritesPage();

    updateCounters();
    updateUserButton();

});
