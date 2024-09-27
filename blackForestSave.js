let inputName = document.getElementById("nameInput");
let inputEmail = document.getElementById("emailInput");
let hfUserToken = document.getElementById("hfTokenInput");

function saveUserData(){
  let handleName = inputName.value;
  let handleEmail = inputEmail.value;
  let hfToken = hfUserToken.value;
  localStorage.setItem("userName", handleName);
  localStorage.setItem("userEmail", handleEmail);
  localStorage.setItem("hfToken", hfToken);

}

