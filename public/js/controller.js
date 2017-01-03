/** controller.js
*  The primary controller of our system. Links the front-end angular with NodeJS.
*  To reference this script, declare ng-app="nodesConnect" in the html tag and then
*  declare ng-controller="X", where X is the controller definition found below, in a tag
*  containing the necessary components.
*/


var app = angular.module('profhacks', []);

app.controller('formCtrl', function($scope, $http) {
  var token = window.location.search.split('=')[1]

  if (typeof(token) === 'string') {
    token = token.replace(/%22/gi, '')
  } else {
    window.location = '/'
  }

  $scope.update = function(data) {
    $scope.data = angular.copy(data)
  }
  $http.put('/mlh/user', {"token": token}).
    success(function(data) {
      if (typeof(data.data.date_of_birth) !== "string" || !validateDate(data.data.date_of_birth)) {
        data.data.date_of_birth = "yyyy-MM-dd"
      }

      if (typeof(data.data.graduation) !== "string" || !validateDate(data.data.graduation)) {
        data.data.graduation = "yyyy-MM-dd"
      }

      data.data.school = data.data.school.name
      $scope.update(data.data)

      console.log(data)
    }).error(function(data) {
      window.location = '/'
      console.log(data);
    });

  $scope.submit = function(data) {
    //var modalBody = errorCheckForm(data);

    if (typeof(data.school) !== 'string') {
      data.school = data.school.name
    }

    var f = document.getElementById('file').files[0];
    var fileType = "null"
    if (typeof(f) !== "undefined") {
      fileType = f.name.split('.')[1]
    }

    if (errorCheckForm(data)) {
      $("#errorModal").modal("toggle");
      return;
    }

    data.phone = convertPhoneNumber(data.phone);

    var body = {data: data};
    body.token = token;

    if (fileType !== "null") {
      var r = new FileReader();
      r.onloadend = function(e){
        blobUtil.arrayBufferToBlob(e.target.result, "application/pdf").then(function (blob) {
          body.data.resume = blob;
          userSubmission(body);
        });
      }
      r.readAsArrayBuffer(f);
    } else {
      userSubmission(body);
    }

  }

  function userSubmission(data) {
    $http.put('/user/create', data).
      success(function(response) {
        window.location = '/thanks.html';
      }).error(function(err) {
        var errorBody = $($("#errorModal")[0]).find(".modal-body")[0];
        errorBody.innerHTML = err;
        $("#errorModal").modal("toggle");
      });
  }
});

function convertPhoneNumber(number) {
  if (typeof(number) === "undefined") {
    return number;
  }

  number = number.toString();
  if (number.length == 10) {
    number = number.substring(0,3) + "-" + number.substring(3,6) + "-" + number.substring(6,10)
  }

  return number
}

function errorCheckForm(data) {
  var toggle = false;
  var errorBody = $($("#errorModal")[0]).find(".modal-body")[0];

  errorBody.innerHTML = "";

  if (!/^[a-zA-Z]+$/.test(data.first_name)) {
    toggle = true;
    errorBody.innerHTML += "<li> Invalid First Name (Alphabetic Characters Only)</li>\n";
  }

  if (!/^[a-zA-Z ]+$/.test(data.last_name)) {
    toggle = true;
    errorBody.innerHTML += "<li> Invalid Last Name (Alphabetic Characters & Spaces Only)</li>\n";
  }

  if (!validateEmail(data.email)) {
    toggle = true;
    errorBody.innerHTML += "<li> Invalid Email Address</li>\n";
  }

  if (!validateDate(data.date_of_birth)) {
    toggle = true;
    errorBody.innerHTML += "<li> Invalid Birth Date or Date Format (yyyy-MM-dd)</li>\n";
  }

  if (!validateDate(data.graduation)) {
    toggle = true;
    errorBody.innerHTML += "<li> Invalid Graduation Date or Date Format (yyyy-MM-dd)</li>\n";
  }

  if (!/^[a-zA-Z ]+$/.test(data.school)) {
    toggle = true;
    errorBody.innerHTML += "<li> Invalid School (Alphabetic Characters & Spaces Only)</li>\n";
  }

  if (!/^[a-zA-Z ]+$/.test(data.major)) {
    toggle = true;
    errorBody.innerHTML += "<li> Invalid Major (Alphabetic Characters & Spaces Only)</li>\n";
  }

  if (!data.shirt_size) {
    toggle = true;
    errorBody.innerHTML += "<li> Please pick a shirt size.</li>\n";
  }

  if (!data.first_hack) {
    toggle = true;
    errorBody.innerHTML += "<li> Please let us know if this is your first hackathon.</li>\n";
  }

  if (typeof(data.phone) === "number" && (!/^\d+$/.test(data.phone) || data.phone.toString().length !== 10 || data.phone < 0)) {
    toggle = true;
    errorBody.innerHTML += "<li> Please give us a valid phone number (XXXXXXXXXX [10 digits]).</li>\n";
  }

  if (!!document.getElementById('file').files[0] && document.getElementById('file').files[0].type !== "application/pdf") {
    toggle = true;
    errorBody.innerHTML += "<li> Please submit a pdf for the resume.</li>\n";
  }

  if(data.sms_notify && !data.phone) {
    toggle = true;
    errorBody.innerHTML += "<li> Requires phone number for sms notifications.</li>\n";
  }

  if(data.travel && data.travel.length > 255) {
    toggle = true;
    errorBody.innerHTML += "<li> Please make sure travel reimbursement message is less than 256 characters.</li>\n";
  }

  if (toggle) {
      errorBody.innerHTML = "<ul>\n" + errorBody.innerHTML + "</ul>";
  }

  return toggle;
}

// https://stackoverflow.com/questions/46155/validate-email-address-in-javascript
function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

function validateDate(date) {
  var re = /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/;
  return re.test(date);
}
