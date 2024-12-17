
export async function oaIngredientsImage(ingredientsFetched, oaUserToken) {

  let url = "https://api.openai.com/v1/images/generations";

  let payload = {
    model: "dall-e-3",
    prompt: `place each of the following items: ${ingredientsFetched} in order against a black background. space the individual ingredients out evenly across the image horizontally from left to right. do not add any numbers, letters, words or images. Omit anything that look like words, letters or numbers in the finished image.`,
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

  let dataIngredientsImage = await result.json();

  return dataIngredientsImage;


};