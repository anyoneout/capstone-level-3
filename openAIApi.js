
let oaiJsUserToken = localStorage.getItem("oaiToken");
let recipeChoice = document.getElementById("chosenRecipe");
let recipeIngredientsHTML = document.getElementById("recipeIngredients");
let recipeNameHTML = document.getElementById("recipeName");
let ingredientsImgHTML = document.getElementById("ingredientsAI");
let recipeImgHTML = document.getElementById("recipeAI");
let secondArrow = document.getElementById("secondArrowHTML");
let dallEImageHTML = document.getElementById("dallEImage");
let spinnerOneHTML = document.getElementById("spinnerOne");
let spinnerTwoHTML = document.getElementById("spinnerTwo");

async function fetchRecipeImage() {
  let userRecipe = recipeChoice.value;
  let url = "https://api.openai.com/v1/images/generations";
  let payload = {
    model: "dall-e-3",
    prompt: `  Create a photo realistic image of the following recipe against a black background: ${userRecipe}.  Omit any numbers, letters or words in the finished image.`,
    n: 1,
    size: "1024x1024"
  };
  let result = await fetch(url, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Authorization": `Bearer ${oaiJsUserToken}`,
      "Content-Type": "application/json"
    }  
  });
  console.log(payload);
  let data = await result.json();
  console.log(payload);
  recipeNameHTML.innerHTML = userRecipe;
  recipeImgHTML.src = data.data[0].url;
  recipeImgHTML.classList.add("borderImage");
  secondArrow.style.visibility = "visible";
  spinnerOneHTML.style.visibility = "hidden";
  spinnerTwoHTML.style.visibility = "visible";
};


async function fetchIngredientsList() {
  let userRecipe = recipeChoice.value;
  let url = "https://api.openai.com/v1/chat/completions";
  let payload = {
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: `List individual ingredients in ${userRecipe} by order of importance to the recipe`
      }
    ]
  };
  console.log(payload);
  let result = await fetch(url, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Authorization": `Bearer ${oaiJsUserToken}`,
      "Content-Type": "application/json"
    }  
  });
  let data = await result.json();
  let ingredients = data.choices[0].message.content;
  return ingredients;
};


  async function fetchIngredientsImage(ingredients) {
  let url = "https://api.openai.com/v1/images/generations";
  let payload = {
    model: "dall-e-3",
    prompt: `  Create a photo realistic image of the following ingredients against a black background: ${ingredients}. @pace the individual ingredients out evenly across the image. Omit any numbers, letters, words or repetition of ingredients in the finished image.`,
    n: 1,
    size: "1024x1024"
  };
  let result = await fetch(url, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Authorization": `Bearer ${oaiJsUserToken}`,
      "Content-Type": "application/json"
    }  
  });
  let data = await result.json();
  spinnerTwoHTML.style.visibility = "hidden";
  ingredientsImgHTML.src = data.data[0].url;
  ingredientsImgHTML.classList.add("borderImage");
  recipeIngredientsHTML.innerHTML = ingredients;
  console.log(data); 
};

async function fetchListImage() {
  saveUserData();
  let userNameHandle = document.getElementById("userNameHTML")
  let userEmailHandle = document.getElementById("userEmailHTML")
  let userNameJs = localStorage.getItem("userName");
  let userEmailJs = localStorage.getItem("userEmail");
  userNameHandle.innerHTML = userNameJs;
  userEmailHandle.innerHTML = userEmailJs;
  dallEImageHTML.style.visibility = "visible";
  spinnerOneHTML.style.visibility = "visible";
  
  await fetchRecipeImage();
  let ingredients = await fetchIngredientsList();
  console.log(ingredients);
  fetchIngredientsImage(ingredients);
};


fetchButton.addEventListener("click", fetchListImage);