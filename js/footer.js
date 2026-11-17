
document.addEventListener("DOMContentLoaded", function () {

    const footerContainer = document.getElementById("site-footer");

    if (!footerContainer) return;

    fetch("footer.html")
        .then(response => {
            if (!response.ok) {
                throw new Error("Не вдалося завантажити підвал");
            }

            return response.text();
        })
        .then(html => {
            footerContainer.innerHTML = html;
        })
        .catch(error => {
            console.error("Помилка завантаження підвалу:", error);
        });

});
