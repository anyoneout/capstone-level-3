let inputName = document.getElementById("nameInput");
let inputEmail = document.getElementById("emailInput");
let oaiUserToken = document.getElementById("openAiTokenInput");

function saveUserData(){
  let handleName = inputName.value;
  let handleEmail = inputEmail.value;
  let oaiToken = oaiUserToken.value;
  localStorage.setItem("userName", handleName);
  localStorage.setItem("userEmail", handleEmail);
  localStorage.setItem("oaiToken", oaiToken);

};
