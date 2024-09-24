let userName = document.getElementById("nameInput");
let userEmail = document.getElementById("emailInput");
let oaiUserToken = document.getElementById("openAiTokenInput");
let hfUserToken = document.getElementById("hfTokenInput");
function saveUserData(){
  let nameInput = userName.value;
  let emailInput = userEmail.value;
  let oaiToken = oaiUserToken.value;
  let hfToken = hfUserToken.value;
  localStorage.setItem("userName", nameInput);
  localStorage.setItem("userEmail", emailInput);
  localStorage.setItem("hfToken", hfToken);
  localStorage.setItem("oaiToken", oaiToken);
}

saveButton.addEventListener("click", saveUserData);