$(document).ready(function() {
  // Getting references to our form and inputs
  var loginForm = $("form.login");
  var emailInput = $("input#email-input");
  var passwordInput = $("input#password-input");
  // When the form is submitted, we validate there's an email and password entered
  loginForm.on("submit", function(event) {
    event.preventDefault();
    var userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim()
    };
    if (!userData.email || !userData.password) {
      showErrorModal("Please provide an email or password.");
      return;
    }
    // If we have an email and password we run the loginUser function and clear the form
    loginUser(userData.email, userData.password);
    emailInput.val("");
    passwordInput.val("");
  });
  // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
  function loginUser(email, password) {
    $.post("/api/login", {
      email: email,
      password: password
    })
      .then(function(data) {
        window.location.replace(data);
        // If there's an error, show the error in a modal.
      })
      .catch(function(err) {
        showErrorModal("We had trouble logging you in. Please try again.");
        // console.log(err);
      });
  }
  // Function takes in an error (array or single string) and displays it in a modal.
  function showErrorModal(error) {
    if (Array.isArray(error)) {
      var $ul = $("<ul>");
      error.forEach(function(element) {
        $ul.append("<li>" + element + "</li>");
      });
      $("#error-text").append($ul);
    } else {
      $("#error-text").text(error);
    }

    // Show the modal. Clear it 500mils after it's been dismissed.
    $("#error").modal("show");
    $("button[data-dismiss='modal']").on("click", function() {
      setTimeout(function() {
        $("#error-text").text("");
      }, 500);
    });
  }
});
