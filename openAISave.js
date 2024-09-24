let userName = document.getElementById("nameInput");
let userEmail = document.getElementById("emailInput");
let oaiUserToken = document.getElementById("openAiTokenInput");
function saveUserData(){
  let nameInput = userName.value;
  let emailInput = userEmail.value;
  let oaiToken = oaiUserToken.value;
  localStorage.setItem("userName", nameInput);
  localStorage.setItem("userEmail", emailInput);
  localStorage.setItem("oaiToken", oaiToken);
}

saveButton.addEventListener("click", saveUserData);