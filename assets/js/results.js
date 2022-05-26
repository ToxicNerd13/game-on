$(document).ready(function () {
  const regEx = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}", "g");
  // Target email input for Sign In/Up so I can change the color
  const emailInput = $("#email-input");
  // Save signed-in status to variable
  let signedIn = sessionStorage.getItem("signedIn");
  // Save searched game title to variable
  let savedInput = sessionStorage.getItem("game");
  // Target the h5 in results.html and set it to whatever the user searched for
  const resultTitle = document.getElementById("result-title");
  resultTitle.innerHTML = `<span>${savedInput}</span>`;
  // Target the empty table
  const resultsTable = document.getElementById("results-table");
  // Create temporary div to add new table rows to
  const fragment = document.createDocumentFragment();

  // Display Logout or Sign In/Up, depending on the user's login status
  renderLogin(signedIn);

  // Hard coded array of review data since I was too lazy to use an API
  const reviews = [
    {
      reviewer: "IGN",
      url: "https://www.ign.com/",
      date: "March 7, 2021",
      score: "8.2",
    },
    {
      reviewer: "GameSpot",
      url: "https://www.gamespot.com/",
      date: "July 12, 2021",
      score: "8.7",
    },
    {
      reviewer: "Metacritic",
      url: "https://www.metacritic.com/",
      date: "January 22, 2022",
      score: "8.1",
    },
  ];

  // Loop through reviews array. For each object, create a row for each property/value. Then append those to the table.
  for (let i = 0; i < reviews.length; i++) {
    const reviewRow = document.createElement("tr");
    const reviewerTd = document.createElement("td");
    const dateTd = document.createElement("td");
    dateTd.textContent = `${reviews[i].date}`;
    const scoreTd = document.createElement("td");
    scoreTd.textContent = `${reviews[i].score}`;
    const link = document.createElement("a");
    link.href = `${reviews[i].url}`;
    link.target = "_blank";
    link.textContent = `${reviews[i].reviewer}`;
    reviewerTd.append(link);
    reviewRow.append(reviewerTd);
    reviewRow.append(dateTd);
    reviewRow.append(scoreTd);
    fragment.append(reviewRow);
  }

  resultsTable.append(fragment);

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
});
