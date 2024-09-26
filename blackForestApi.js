console.log("hello from api.js");


let hfUserTokenJs = localStorage.getItem("hfToken");
let recipeChoice = document.getElementById("chosenRecipe");
let recipeHTML = document.getElementById("recipeIngredients");
let ingredientsImgHTML = document.getElementById("ingredientsAI");
let recipeImgHTML = document.getElementById("recipeAI");
let firstArrow = document.getElementById("firstArrowHTML");
let secondArrow = document.getElementById("secondArrowHTML");


async function fetchRecipeImage() {
  let userRecipe = recipeChoice.value;
  let url = "https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-dev";
  let payload = 
    {inputs: ` create a photo realistic image of the following dish against a black background: ${userRecipe}.  Omit any numbers, letters or words in the finished image.`};
  let result = await fetch(url, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Authorization": `Bearer ${hfUserTokenJs}`,
      "Content-Type": "application/json"
    }  
  });
  console.log(result);
  let blob = await result.blob();
  firstArrow.style.visibility = "visible";
  console.log(blob);
  let imgUrl = URL.createObjectURL(blob);
  console.log(imgUrl);
  recipeImgHTML.src = imgUrl;
  recipeImgHTML.classList.add("borderImage");
};


async function fetchIngredientsList() {
  let userRecipe = recipeChoice.value;
  let url = "https://api-inference.huggingface.co/models/mistralai/Mixtral-8x7B-Instruct-v0.1/v1/chat/completions";
  let payload = {
    model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
    messages: [{role: "user", content: `List only the individual ingredients in ${userRecipe} by order of importance to the recipe. omit any optional ingredients and description of the ingredients. `}],
    max_tokens: 500,
    stream: false
  };
  console.log(payload);
  let result = await fetch(url, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Authorization": `Bearer ${hfUserTokenJs}`,
      "Content-Type": "application/json"
    }  
  });
  let data = await result.json();
  console.log(data);
  let ingredients = data.choices[0].message.content;
  return ingredients;
};


async function fetchIngredientsImage(ingredients) {
  let url = "https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-dev";
  let payload = 
    {inputs: `place each of the following items: ${ingredients} in order against a black background. space the individual ingredients out evenly across the image horizontally from left to right. do not add any numbers, letters, words in the finished image.`};
  let result = await fetch(url, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Authorization": `Bearer ${hfUserTokenJs}`,
      "Content-Type": "application/json"
    }  
  });
  console.log(result);
  let blob = await result.blob();
  secondArrow.style.visibility = "visible";
  console.log(blob);
  let imgUrl = URL.createObjectURL(blob);
  console.log(imgUrl);
  ingredientsImgHTML.classList.add("borderImage");
  recipeHTML.innerHTML = ingredients;
};


async function fetchListImage() {
  saveUserData();
  let userNameHandle = document.getElementById("userNameHTML")
  let userEmailHandle = document.getElementById("userEmailHTML")
  let userNameJs = localStorage.getItem("userName");
  let userEmailJs = localStorage.getItem("userEmail");
  userNameHandle.innerHTML = userNameJs;
  userEmailHandle.innerHTML = userEmailJs;
  fetchRecipeImage();
  let ingredients = await fetchIngredientsList();
  console.log(ingredients);
  fetchIngredientsImage(ingredients);
  
};


fetchButton.addEventListener("click", fetchListImage);