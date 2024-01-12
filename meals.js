const CATEGORY_URL_PREFIX = "https://www.themealdb.com/api/json/v1/1/filter.php?c=";
const RECIPE_URL_PREFIX = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=";

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
    fetchRecipe(event.target.dataset.id);
}

function fetchRecipe(id) {
    fetch(RECIPE_URL_PREFIX + id)
        .then((x) => x.json())
        .then(renderRecipe);
}

function renderRecipe(response) {
    document.querySelector(".js-selected-recipe-content").innerHTML = JSON.stringify(response);
    document.querySelector(".js-selected-recipe-container").classList.remove("hidden");
    document.querySelector(".js-search-results").classList.add("hidden");
}

document.querySelector(".js-search-results").addEventListener("click", recipeClicked);

function hideRecipe(event) {
    event.preventDefault();
    document.querySelector(".js-selected-recipe-container").classList.add("hidden");
    document.querySelector(".js-search-results").classList.remove("hidden");
    document.querySelector(".js-selected-recipe-content").innerHTML = "";
}

document.querySelector(".js-hide-recipe").addEventListener("click", hideRecipe);

function showRecipe(event) {
    event.preventDefault();
    // ... Homework (+1)
    // Steps: get the item name
    // Validate the name
    // Fetch recipe by name
    // Show recipe(s)
}

document.querySelector(".js-search-bar-button").addEventListener("click", showRecipe);
