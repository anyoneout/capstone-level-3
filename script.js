let userName = document.getElementById("nameInput");
let userEmail = document.getElementById("emailInput");
let userToken = document.getElementById("tokenInput");
function saveUserData(){
  let nameInput = userName.value;
  let emailInput = userEmail.value;
  let tokenInput = userToken.value;
  localStorage.setItem("userName", nameInput);
  localStorage.setItem("userEmail", emailInput);
  localStorage.setItem("userToken", tokenInput);
}

saveButton.addEventListener("click", saveUserData);