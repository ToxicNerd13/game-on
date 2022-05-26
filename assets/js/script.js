$(document).ready(function () {
    let signedIn = sessionStorage.getItem('signedIn')
    renderLogin(signedIn);

    function renderLogin (status) {
        if (status == 'true') {
            $("#sign-in").html("<a href='index.html' id='logout-btn'>Logout</a>");
        } else {
            $("#sign-in").html("<a href='signin.html'>Sign In</a>\
                                <br>\
                                <a href='signup.html'>Sign Up</a>");
        }
    }

    $("#logout-btn").on("click", function (event) {
        event.preventDefault();
        sessionStorage.setItem('signedIn', 'false');
        window.location.href = "index.html";
        signedIn = sessionStorage.getItem('signedIn');
        renderLogin(signedIn);
    })

    $("#game-search").submit(function (event) {
        event.preventDefault();
        let userInput = $("#search-bar").val().trim();
        sessionStorage.setItem("game", userInput);
        let savedInput = sessionStorage.getItem("game");
        console.log(savedInput);
        window.location.href = "results.html";
        $("#result-title").text("test");
    });

    $("#signin-btn").on("click", function (event) {
        event.preventDefault();
        sessionStorage.setItem('signedIn', 'true');
        window.location.href = "index.html";
        signedIn = sessionStorage.getItem('signedIn');
        renderLogin(signedIn);
    })

    $("#signup-btn").on("click", function (event) {
        event.preventDefault();
        sessionStorage.setItem('signedIn', 'true');
        window.location.href = "index.html";
        signedIn = sessionStorage.getItem('signedIn');
        renderLogin(signedIn);
    })
})