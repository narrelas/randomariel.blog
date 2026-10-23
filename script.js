
const searchInput = document.querySelector("#search");
const filters = document.querySelectorAll(".filter");
const articles = document.querySelectorAll(".article");
const emptyMessage = document.querySelector("#empty-message");

let selectedCategory = "all";

function updateArticles() {
    const query = searchInput.value.trim().toLocaleLowerCase("fr");
    let visibleArticles = 0;

    articles.forEach((article) => {
        const category = article.dataset.category;
        const content = article.textContent.toLocaleLowerCase("fr");

        const matchesCategory =
            selectedCategory === "all" ||
            category === selectedCategory;

        const matchesSearch = content.includes(query);
        const visible = matchesCategory && matchesSearch;

        article.hidden = !visible;

        if (visible) {
            visibleArticles++;
        }
    });

    emptyMessage.hidden = visibleArticles > 0;
}

// Recherche pendant la saisie
searchInput.addEventListener("input", updateArticles);

// Sélection d'une catégorie
filters.forEach((button) => {
    button.addEventListener("click", () => {
        selectedCategory = button.dataset.filter;

        filters.forEach((filter) => {
            const active = filter === button;

            filter.classList.toggle("active", active);
            filter.setAttribute("aria-pressed", String(active));
        });

        updateArticles();
    });
});

// État initial
filters.forEach((filter) => {
    filter.setAttribute(
        "aria-pressed",
        String(filter.dataset.filter === "all")
    );
});

updateArticles();
