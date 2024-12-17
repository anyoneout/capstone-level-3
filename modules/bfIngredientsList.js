import { recipeChoice, hfUserTokenJs } from "../controllers/blackForestApi.js";

export async function fetchIngredientsList() {
  let userRecipe = recipeChoice.value;
  let url = "https://api-inference.huggingface.co/models/mistralai/Mixtral-8x7B-Instruct-v0.1/v1/chat/completions";
  let payload = {
    model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
    messages: [{ role: "user", content: `List only the individual ingredients in ${userRecipe} by order of importance to the recipe. omit any optional ingredients and description of the ingredients. ` }],
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
}
