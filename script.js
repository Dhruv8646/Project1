// Select DOM elements
const recipeForm = document.getElementById('recipe-form');
const recipeNameInput = document.getElementById('recipe-name');
const recipeIngredientsInput = document.getElementById('recipe-ingredients');
const recipeImageInput = document.getElementById('recipe-image');
const recipeList = document.getElementById('recipe-list');

// Load recipes from local storage when page loads
document.addEventListener('DOMContentLoaded', loadRecipes);

// Event listener for adding a recipe
recipeForm.addEventListener('submit', function (e) {
  e.preventDefault();

  // Get form values
  const name = recipeNameInput.value;
  const ingredients = recipeIngredientsInput.value.split(',');
  const image = recipeImageInput.value;

  // Create recipe object
  const recipe = {
    name,
    ingredients,
    image,
  };

  // Add recipe to local storage
  addRecipeToLocalStorage(recipe);

  // Display the recipe in the UI
  displayRecipe(recipe);

  // Clear the form
  recipeForm.reset();
});

// Function to add a recipe to local storage
function addRecipeToLocalStorage(recipe) {
  let recipes = getRecipesFromLocalStorage();
  recipes.push(recipe);
  localStorage.setItem('recipes', JSON.stringify(recipes));
}

// Function to get recipes from local storage
function getRecipesFromLocalStorage() {
  let recipes = localStorage.getItem('recipes');
  return recipes ? JSON.parse(recipes) : [];
}

// Function to display all recipes from local storage
function loadRecipes() {
  let recipes = getRecipesFromLocalStorage();
  recipes.forEach(displayRecipe);
}

// Function to display a single recipe in the UI
function displayRecipe(recipe) {
  const recipeCard = document.createElement('div');
  recipeCard.classList.add('recipe-card');

  recipeCard.innerHTML = `
    <img src="${recipe.image}" alt="${recipe.name}">
    <h3>${recipe.name}</h3>
    <p>Ingredients: ${recipe.ingredients.join(', ')}</p>
    <button class="delete-btn">Delete</button>
  `;

  // Add event listener for the delete button
  recipeCard.querySelector('.delete-btn').addEventListener('click', function () {
    recipeCard.remove();
    deleteRecipeFromLocalStorage(recipe.name);
  });

  recipeList.appendChild(recipeCard);
}

// Function to delete a recipe from local storage
function deleteRecipeFromLocalStorage(recipeName) {
  let recipes = getRecipesFromLocalStorage();
  recipes = recipes.filter(recipe => recipe.name !== recipeName);
  localStorage.setItem('recipes', JSON.stringify(recipes));
}
