console.log("hello from api.js");


let recipeChoice = document.getElementById("chosenRecipe");
let hfUserTokenJs = localStorage.getItem("hfToken");
let oaiUserTokenJs = localStorage.getItem("oaiToken");
let recipeHTML = document.getElementById("recipeIngredients");
let aiHTML = document.getElementById("imageAI");




async function fetchIngredientsList() {
  let userRecipe = recipeChoice.value;
  let url = "https://api-inference.huggingface.co/models/mistralai/Mixtral-8x7B-Instruct-v0.1/v1/chat/completions";
  let payload = {
    model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
    messages: [{role: "user", content: `List individual ingredients in ${userRecipe} by order of importance to the recipe`}],
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
  let data = await result.blob();
/*   console.log(data); */
  let ingredients = data.choices[0].messages.content;
 /*  console.log(ingredients); */
  recipeHTML.innerHTML = ingredients;
  return ingredients;
};


async function fetchIngredientsImage(ingredients) {
/*   let userRecipe = recipeChoice.value; */
/*   let prompt = `show the separated ingredients of the dish ${userRecipe} against a white background with each ingredient labeled with the name of the ingredient. Put the most commonly used ingredients in the center slightly larger than the less commonly used ingredients`; */
  let url = "https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-dev";
  let payload = 
    {inputs: `place each of the following items: ${ingredients} only once against a white background. Omit any numbers, letters or words in the finished image.`};
 /*    console.log(url);
    console.log(token); */
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
  console.log(blob);
  let imgUrl = URL.createObjectURL(blob);
  console.log(imgUrl);
  aiHTML.src = imgUrl;


}


async function fetchListImage() {
  let ingredients = await fetchIngredientsList();
  console.log(ingredients);
  fetchIngredientsImage(ingredients);
}


fetchButton.addEventListener("click", fetchListImage);