$(document).ready(function () {
  // Save signed-in status to variable
  let signedIn = sessionStorage.getItem("signedIn");
  const regEx = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}", "g");
  // Target email input for Sign In/Up so I can change the color
  const emailInput = $("#email-input");

  renderLogin(signedIn);

  // Test email against the regex to make sure it fits the pattern. If so, signedIn status will be set to true and user will be redirected to the home page. If not, the input will turn red and the user will be alerted to enter a valid email.
  function validate(email) {
    if (regEx.test(email)) {
      sessionStorage.setItem("signedIn", "true");
      signedIn = sessionStorage.getItem("signedIn");
      window.location.href = "index.html";
      renderLogin(signedIn);
    } else {
      emailInput.removeClass("bg-black").addClass("bg-red");
      alert(`Please enter a valid email!`);
    }
  }

  // Check the session storage for login status
  function renderLogin(status) {
    if (status == "true") {
      $("#sign-in").html("<a href='index.html' id='logout-btn'>Logout</a>");
    } else {
      $("#sign-in").html(
        "<a href='signin.html'>Sign In</a>\
                                <br>\
                                <a href='signup.html'>Sign Up</a>"
      );
    }
  }

  // When logging out, change signedIn value to false, redirect to home page, and change Logout to Sign In/Up
  $("#logout-btn").on("click", function (event) {
    event.preventDefault();
    sessionStorage.setItem("signedIn", "false");
    window.location.href = "index.html";
    signedIn = sessionStorage.getItem("signedIn");
    renderLogin(signedIn);
  });

  // When user searches for a game, save the input to a variable, save to session storage, and send user to results page
  $("#search-btn").on("click", function (event) {
    event.preventDefault();
    let userInput = $("#search-bar").val().trim();
    sessionStorage.setItem("game", userInput);
    window.location.href = "results.html";
  });

  // When signing in, save the user email input to a variable and send it to validate() as an argument
  $("#signin-btn").on("click", function (event) {
    event.preventDefault();
    let email = $("#email-input").val().trim();
    validate(email);
  });

  //When signing up, save the user email input to a variable and send it to validate() as an argument
  $("#signup-btn").on("click", function (event) {
    event.preventDefault();
    let email = $("#email-input").val().trim();
    validate(email);
  });
});
