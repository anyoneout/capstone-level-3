let recipeChoice = document.getElementById("chosenRecipe");
let oaiJsUserToken = localStorage.getItem("oaiToken");
let recipeHTML = document.getElementById("recipeIngredients");
let aiHTML = document.getElementById("imageAI");


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
/*   console.log(data); */
  let ingredients = data.choices[0].message.content;
 /*  console.log(ingredients); */
  recipeHTML.innerHTML = ingredients;
  return ingredients;
};


  async function fetchIngredientsImage(ingredients) {

  let url = "https://api.openai.com/v1/images/generations";
  let payload = {
    model: "dall-e-3",
    prompt: `  place each of the following items only once against a white background. limit the number of items to the length of the list of ingredients: ${ingredients}.  Omit any numbers, letters or words in the finished image.`,
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
  aiHTML.src = data.data[0].url;
  console.log(data); 
};

async function fetchListImage() {
  let ingredients = await fetchIngredientsList();
  console.log(ingredients);
  fetchIngredientsImage(ingredients);
}


fetchButton.addEventListener("click", fetchListImage);