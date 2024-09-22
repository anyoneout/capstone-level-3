let recipeChoice = document.getElementById("chosenRecipe");
let userTokenLs = localStorage.getItem("userToken");
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
        content: `List ingredients in ${userRecipe} by order of importance to the recipe`
      }
    ]
  };
  console.log(payload);
  let result = await fetch(url, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Authorization": `Bearer ${userTokenLs}`,
      "Content-Type": "application/json"
    }  
  });
  let data = await result.json();
/*   console.log(data); */
  let anything = data.choices[0].message.content;
 /*  console.log(ingredients); */
  recipeHTML.innerHTML = anything;
  return anything;
};


  async function fetchIngredientsImage(ingredients) {
    let userRecipe = recipeChoice.value;
  let url2 = "https://api.openai.com/v1/images/generations";
  let payload2 = {
    model: "dall-e-3",
    prompt: `  show each item once ${ingredients} against a white background.  omit any numbers, letters or words or multiple instances of the same item in the finished image.`,
    n: 1,
    size: "1024x1024"
  };
  let result2 = await fetch(url2, {
    method: "POST",
    body: JSON.stringify(payload2),
    headers: {
      "Authorization": `Bearer ${userTokenLs}`,
      "Content-Type": "application/json"
    }  
  });
  console.log(payload2);
  let data2 = await result2.json();
  console.log(payload2);
  aiHTML.src = data2.data[0].url;
  console.log(data2); 
};

async function fetchListImage() {
  let ingredients = await fetchIngredientsList();
  console.log(ingredients);

  fetchIngredientsImage(ingredients);
}

/* saveButton.addEventListener("click", fetchIngredientsList);
saveButton.addEventListener("click", fetchIngredientsImage);
 */
fetchButton.addEventListener("click", fetchListImage);