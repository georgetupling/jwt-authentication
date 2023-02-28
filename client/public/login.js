const form = document.querySelector(".form");
const signInButton = document.querySelector(".sign-in-button");

signInButton.addEventListener("click", () => {
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;

  axios
    .post("/user/login", {
      email: email,
      password: password,
    })
    .then((response) => {
      if (response.status === 200) {
        window.location = "/protected";
      }
    })
    .catch((err) => {
      console.log("");
      if (err.response) {
        document.querySelector("#error-message").innerText =
          err.response.data.message;
        document.querySelector("#error-alert").classList.remove("hidden");
      } else {
        console.error("Error occured: " + err);
      }
    });
});
