import { recipeChoice, spinnerOneHTML, hfUserTokenJs, recipeImgHTML, recipeNameHTML, secondArrow } from "../controllers/blackForestApi.js";

export async function fetchRecipeImage() {
  let userRecipe = recipeChoice.value;
  let url = "https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-dev";
  spinnerOneHTML.style.visibility = "visible";
  let payload = { inputs: ` create a photo realistic image of the following dish against a black background: ${userRecipe}.  Omit any numbers, letters or words in the finished image.` };
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
  recipeImgHTML.src = imgUrl;
  recipeNameHTML.innerHTML = userRecipe;
  recipeImgHTML.classList.add("borderImage");
  secondArrow.style.visibility = "visible";
  spinnerOneHTML.style.visibility = "hidden";

}
;
