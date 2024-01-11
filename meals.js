const CATEGORY_URL_PREFIX = "https://www.themealdb.com/api/json/v1/1/filter.php?c=";

function menuClicked(event) {
    event.preventDefault();
    console.log(event.target.dataset.category, typeof event.target.dataset.category);
    if (typeof event.target.dataset.category === "string") {
        fetchCategories(event.target.dataset.category);
    }
}

function fetchCategories(category) {
    fetch(CATEGORY_URL_PREFIX + category)
        .then((x) => x.json())
        .then(renderCategories);
}

function renderCategories(response) {
    const meals = response.meals;
    let html = [];
    for (let meal of meals) {
        html.push(`
            <div data-id="${meal.idMeal}" class="meal-thumbnail-container col-12 col-md-6 col-lg-4 col-xxl-3">
                <img 
                    src="${meal.strMealThumb}" 
                    alt="${meal.strMeal}" 
                    data-id="${meal.idMeal}" 
                    class="w-100 meal-thumbnail-image" />
                <h4 data-id="${meal.idMeal}" class="meal-title">${meal.strMeal}</h4>
            </div>
        `);
    }
    document.querySelector(".js-search-results").innerHTML = html.join("");
}

document.querySelector(".js-nav-menu").addEventListener("click", menuClicked);

function recipeClicked(event) {
    event.preventDefault();
    console.log(event.target.dataset.id);
}

document.querySelector(".js-search-results").addEventListener("click", recipeClicked);
