const myResult = (function () {
  /**
   * Gets an object and sets its content into the result card in the result page
   * If there's no content in the JSON object, makes sure to tell the user
   */
  return function result() {
    const resultCount = $("#result-count");
    if (window.localStorage) {
      if (localStorage.userObject) {
        var userObject = localStorage.getItem("userObject");
        retreivedObject = JSON.parse(userObject); //parses the retrieved object into an JSON object
        if (JSON.stringify(retreivedObject) == "[]") {
          resultCount.text("0 Results");
          $(".result-desc").text("Try starting a new search below");
        } else {
          resultCount.text("1 Result");
          $("#result-subtext").html(
            "Look at the result below to see the details of the person you’re searched for."
          );
          $(".name").append(
            retreivedObject.first_name + " " + retreivedObject.last_name
          );
          $(".user-description").append(retreivedObject.description);
          $("#address").append("<p>" + retreivedObject.address + "</p>");
          $(".email").append("<p>" + retreivedObject.email + "</p>");

          for (const phone_number in retreivedObject.phone_numbers) {
            phone = retreivedObject.phone_numbers[phone_number];
            formatted_phone =
              "(" +
              phone.substring(0, 3) +
              ") " +
              phone.substring(3, 6) +
              "-" +
              phone.substring(6, 10);

            $(".phone-num").append(
              "<a href=" +
                `tel:${phone}` +
                ' style="display: block;color: #004A80;">' +
                `${formatted_phone}` +
                "</a>"
            );
          }

          for (const relative in retreivedObject.relatives) {
            $(".relatives").append(
              '<p style="margin-bottom: 0">' +
                `${retreivedObject.relatives[relative]}` +
                "</p>"
            );
          }

          $(".result-wrap").show();
        }
      }
    }
  };
})();
myResult();
