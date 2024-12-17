import { spinnerTwoHTML, hfUserTokenJs, ingredientsImgHTML, recipeIngredientsHTML } from "../controllers/blackForestApi.js";

export async function fetchIngredientsImage(ingredients) {
  let url = "https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-dev";
  spinnerTwoHTML.style.visibility = "visible";
  let payload = { inputs: `place each of the following items: ${ingredients} in order against a black background. space the individual ingredients out evenly across the image horizontally from left to right. do not add any numbers, letters, words or images. Omit anything that look like words, letters or numbers in the finished image.` };
  let result = await fetch(url, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Authorization": `Bearer ${hfUserTokenJs}`,
      "Content-Type": "application/json"
    }
  });
  let blob = await result.blob();
  spinnerTwoHTML.style.visibility = "hidden";
  let imgUrl = URL.createObjectURL(blob);
  ingredientsImgHTML.src = imgUrl;
  ingredientsImgHTML.classList.add("borderImage");
  recipeIngredientsHTML.innerHTML = ingredients;
}
;
