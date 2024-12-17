
export async function oaRecipeImage(recipeChoice, oaUserToken) {

  let url = "https://api.openai.com/v1/images/generations";

  let payload = {
    model: "dall-e-3",
    prompt: `  Create a photo realistic image of the following recipe against a black background: ${recipeChoice.value}.  Omit any numbers, letters or words in the finished image.`,
    n: 1,
    size: "1024x1024"
  };

  let result = await fetch(url, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Authorization": `Bearer ${oaUserToken}`,
      "Content-Type": "application/json"
    }
  });

  let dataRecipeImage = await result.json();
  return dataRecipeImage;

};