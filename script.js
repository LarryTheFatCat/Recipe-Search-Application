function getRecipe() {
  const userInput = document.getElementById("recipe_input").value;
  const recipeName = (document.getElementById("recipe_name").innerHTML =
    userInput);
  const apiUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${userInput}`;

  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      recipe(data);
      console.log(data)
    })
    .catch((error) => {
      console.error(
        "There was a problem with the fetch operation:",
        error
      );
    });
}

function recipe(data) {
  const instructions = document.getElementById("instructions");
  const ingredientsList = document.getElementById("ingredients");
  const measureList = document.getElementById("measure")
  if (data.meals && data.meals.length > 0) {
    instructions.textContent = data.meals[0].strInstructions;

    // Clear previous ingredients
    ingredientsList.innerHTML = "";

    // Loop through ingredients and measures
    for (let i = 1; i <= 20; i++) {
      const ingredient = data.meals[0][`strIngredient${i}`];
      const measure = data.meals[0][`strMeasure${i}`];
      if (ingredient && ingredient.trim() !== "") {
        const li = document.createElement("li");
        li.textContent = `${ingredient}: ${measure}`;
        ingredientsList.appendChild(li);
      }
    }
  } else {
    instructions.textContent = "Recipe not found";
  }
}