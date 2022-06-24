const recipeContainer = document.querySelector(".recipe");
const search = document.querySelector(".search");
const search__field = document.getElementsByClassName("search__field")[0];
const results = document.querySelector(".results");
const _link = `https://forkify-api.herokuapp.com/api/v2/recipes`;
const timeout = function(s) {
    return new Promise(function(_, reject) {
        setTimeout(function() {
            reject(new Error(`Request took too long! Timeout after ${s} second`));
        }, s * 1000);
    });
};
// https://forkify-api.herokuapp.com/v2
///////////////////////////////////////
const _apiKey = `key=042b9cb9-4aaa-4276-9ec1-6c1721b751f9`;
//console.log()
// DISPLAY SEARCH RESULTS
const searchRecipes = async function(searchText) {
    return await fetch(`${_link}?search=${searchText}&${_apiKey}`).then((e)=>e.json()).catch((err)=>console.error(err));
};
const searchResult = function(recipe) {
    const html = `<li class="preview">
                  <a class="preview__link preview__link--active" href="#${recipe.id}">
                    <figure class="preview__fig">
                      <img src=${recipe.image_url}>
                    </figure>
                    <div class="preview__data">
                      <h4 class="preview__title">${recipe.title}</h4>
                      <p class="preview__publisher">${recipe.publisher}</p>
                    </div>
                  </a>
                </li>`;
    results.insertAdjacentHTML("beforeend", html);
};
const renderRecipes = function(e) {
    e.preventDefault(); //Prevents default submit event behaviour
    results.innerHTML = "";
    const fetched = searchRecipes(search__field.value);
    fetched.then((object)=>{
        object.data.recipes.map((recipe)=>{
            console.log(recipe);
            searchResult(recipe);
        });
    });
};
search.addEventListener("submit", renderRecipes);
// DISPLAY CLICKED RECIPE
const getRecipeDetail = async function(recipe_id) {
    try {
        let data;
        await fetch(`${_link}/${recipe_id}?${_apiKey}`).then((e)=>e.json()).then((e)=>e.data).then((e)=>data = e.recipe);
        return data;
    } catch  {
        console.error("Something went wrong fetching data of selected recipe");
        return;
    }
};
const renderRecipe = function(data) {
    const template1 = `<figure class="recipe__fig">
                      <img src="${data.image_url}" alt="Tomato" class="recipe__img" />
                      <h1 class="recipe__title">
                        <span>${data.title}</span>
                      </h1>
                    </figure>

                    <div class="recipe__details">
                      <div class="recipe__info">
                        <svg class="recipe__info-icon">
                          <use href="src/img/icons.svg#icon-clock"></use>
                        </svg>
                        <span class="recipe__info-data recipe__info-data--minutes">${data.cooking_time}</span>
                        <span class="recipe__info-text">minutes</span>
                      </div>
                      <div class="recipe__info">
                        <svg class="recipe__info-icon">
                          <use href="src/img/icons.svg#icon-users"></use>
                        </svg>
                        <span class="recipe__info-data recipe__info-data--people">${data.servings}</span>
                        <span class="recipe__info-text">servings</span>

                        <div class="recipe__info-buttons">
                          <button class="btn--tiny btn--increase-servings">
                            <svg>
                              <use href="src/img/icons.svg#icon-minus-circle"></use>
                            </svg>
                          </button>
                          <button class="btn--tiny btn--increase-servings">
                            <svg>
                              <use href="src/img/icons.svg#icon-plus-circle"></use>
                            </svg>
                          </button>
                        </div>
                      </div>
                      <button class="btn--round">
                        <svg class="">
                          <use href="src/img/icons.svg#icon-bookmark-fill"></use>
                        </svg>
                      </button>
                    </div>

                    <div class="recipe__ingredients">
                      <h2 class="heading--2">Recipe ingredients</h2>
                      <ul class="recipe__ingredient-list">`;
    const template3 = `</ul>
                    </div>

                    <div class="recipe__directions">
                      <h2 class="heading--2">How to cook it</h2>
                      <p class="recipe__directions-text">
                        This recipe was carefully designed and tested by
                        <span class="recipe__publisher">${data.publisher}</span>. Please check out
                        directions at their website.
                      </p>
                      <a
                        class="btn--small recipe__btn"
                        href=${data.source_url}
                        target="_blank"
                      >
                        <span>Directions</span>
                        <svg class="search__icon">
                          <use href="src/img/icons.svg#icon-arrow-right"></use>
                        </svg>
                      </a>
                    </div>`;
    let ingredients = ``;
    data.ingredients.forEach((ele)=>{
        ingredients = ingredients.concat(`<li class="recipe__ingredient">
    <svg class="recipe__icon">
      <use href="src/img/icons.svg#icon-check"></use>
    </svg>
    <div class="recipe__quantity">${ele.quantity ?? ``}</div>
    <div class="recipe__description">
      <span class="recipe__unit">${ele.unit}</span>
      ${ele.description}
    </div>
  </li>`);
    });
    recipeContainer.innerHTML = template1.concat(ingredients, template3);
};
const id = `5ed6604591c37cdc054bcd09`;
getRecipeDetail(id).then((e)=>renderRecipe(e)); // renderRecipeByID(`5ed6604591c37cdc054bcd09`)

//# sourceMappingURL=index.62406edb.js.map
