let inputName = document.getElementById("nameInput");
let inputEmail = document.getElementById("emailInput");
let oaiUserToken = document.getElementById("openAiTokenInput");
let userNameHandle = document.getElementById("userNameHTML")
let userEmailHandle = document.getElementById("userEmailHTML")
let userNameJs = localStorage.getItem("userName");
let userEmailJs = localStorage.getItem("userEmail");

function saveUserData(){
  let handleName = inputName.value;
  let handleEmail = inputEmail.value;
  let oaiToken = oaiUserToken.value;
  localStorage.setItem("userName", handleName);
  localStorage.setItem("userEmail", handleEmail);
  localStorage.setItem("oaiToken", oaiToken);
  userNameHandle.innerHTML = userNameJs;
  userEmailHandle.innerHTML = userEmailJs;
};
