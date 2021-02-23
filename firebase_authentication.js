const DOMSelectors = {
  usernameInput: document.getElementById("username"),
  passwordInput: document.getElementById("password"),
  signInButton: document.querySelector(".sign-in-btn"),
  createAccountDisplayButton: document.querySelector(
    ".create-account-display-btn"
  ),
  usernameCreate: document.getElementById("username-create"),
  passwordCreate: document.getElementById("password-create"),
  createAccountButton: document.querySelector(".create-account-btn"),
};

DOMSelectors.usernameCreate.style.display = "none";
DOMSelectors.passwordCreate.style.display = "none";
DOMSelectors.createAccountButton.style.display = "none";

function main() {
  DOMSelectors.signInButton.addEventListener("click", function () {
    username = DOMSelectors.usernameInput.value;
    password = DOMSelectors.passwordInput.value;
    console.log(username);
    console.log(password);
  });
  DOMSelectors.createAccountDisplayButton.addEventListener(
    "click",
    function () {
      DOMSelectors.usernameCreate.style.display = "inline";
      DOMSelectors.passwordCreate.style.display = "inline";
      DOMSelectors.createAccountButton.style.display = "inline";
      DOMSelectors.usernameInput.style.display = "none";
      DOMSelectors.passwordInput.style.display = "none";
      DOMSelectors.signInButton.style.display = "none";
      DOMSelectors.createAccountDisplayButton.style.display = "none";
    }
  );
  DOMSelectors.createAccountButton.addEventListener("click", function () {
    createaccount();
  });
  DOMSelectors.signInButton.addEventListener("click", function () {
    signin();
  });
}

function createaccount() {
  username_create = DOMSelectors.usernameCreate.value;
  password_create = DOMSelectors.passwordCreate.value;
  firebase
    .auth()
    .createUserWithEmailAndPassword(username_create, password_create)
    .catch((error) => {
      errorMessage = error.message;
      alert(errorMessage);
    });
  console.log("account sucessfully created");
}

function signin() {
  username = DOMSelectors.usernameInput.value;
  password = DOMSelectors.passwordInput.value;
  firebase
    .auth()
    .signInWithEmailAndPassword(username, password)
    .then((userCredential) => {
      var user = userCredential.user;
    })
    .catch((error) => {
      var errorMessage = error.message;
    });
}

main();
