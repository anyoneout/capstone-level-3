
export async function oaIngredientsList(recipeChoice, oaUserToken) {

  let url = "https://api.openai.com/v1/chat/completions";

  let payload = {
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: `List individual ingredients in ${recipeChoice.value} by order of importance to the recipe`
      }
    ]
  };

  let result = await fetch(url, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Authorization": `Bearer ${oaUserToken}`,
      "Content-Type": "application/json"
    }
  });

  let data = await result.json();
  let ingredients = data.choices[0].message.content;

  return ingredients;
};
