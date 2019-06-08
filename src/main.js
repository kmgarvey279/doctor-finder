import { DoctorFinder } from "./doctor-finder.js";
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

function showResults(body) {
  $('#results').empty();
  if(body.data.length == 0) {
    $('#results').append("No doctors were found. Please update your criteria and try again.");
  }
  for(let i = 0; i < body.data.length; i++) {
    let firstName = `${body.data[i].profile.first_name}`;
    let lastName = `${body.data[i].profile.last_name}`;
    for(let j = 0; j < body.data[i].practices.length; j++){
      let practiceName = `${body.data[i].practices[j].name}`;
      let addressStreet = `${body.data[i].practices[j].visit_address.street}`;
      let addressCity = `${body.data[i].practices[j].visit_address.city}`;
      let addressState = `${body.data[i].practices[j].visit_address.state}`;
      let phone = `${body.data[i].practices[j].phones[j].number}`;
      let website = `${body.data[i].practices[j].website}`;
      if(website == "undefined") {
        website = "n/a";
      }
    }
    let newPatientsBool = `${body.data[i].practices[0].accepts_new_patients}`;
    console.log(newPatientsBool);
    let newPatientsStr = "";
    if(newPatientsBool === "true") {
      newPatientsStr = "This doctor is currently accepting new patients."
    } else {
      newPatientsStr = "This doctor is not currently accepting new patients."
    }
    $('#results').append("Name: " + lastName + ", " + firstName + "<br>" + "Practice: " + practiceName + "<br>" + "Address: " + addressStreet + "<br>" + addressCity + "," + addressState + "<br>" + "Phone Number: " + phone + "<br>" + "Website: " + website + "<br>" + newPatientsStr + "<br><br>");
  }
}

function populateSpecialties() {
  let promise = new Promise(function(resolve, reject) {
    let request = new XMLHttpRequest();
    let url = `https://api.betterdoctor.com/2016-03-01/specialties?user_key=${process.env.DOC_KEY}`;
    request.onload = function() {
      if (this.status === 200) {
        resolve(request.response);
      } else {
        reject(Error(request.statusText));
      }
    }
    request.open("GET", url, true);
    request.send();
  });
  promise.then(function(response) {
    let body = JSON.parse(response);
    for(let i = 0; i < body.data.length; i++){
      $("#dropdown-specialties").append('<option value="' + body.data[i].uid + '">' + body.data[i].name + '</option>');
    }
  }, function(error) {
    $('showErrors').text(`There was an error processing your request: ${error.message}`);
  });
}

let doctorFinder = new DoctorFinder();

$(document).ready(function() {
  $("#user-location").click(function() {
    let state = $('#location-state').val();
    let city $('#location-city').val().toLowerCase();
    let location = state + "-" + city
    $('#location-state').val("");
    $('#location-city').val("");
    doctorFinder.setLocation(location);
    populateSpecialties();
  });

  $("#doctorSpecialty").click(function() {
    let specialty = $('#specialty').val();
    $('#specialty').val("");
    let promise = doctorFinder.getDoctorBySpecialty(specialty);
    promise.then(function(response) {
      let body = JSON.parse(response);
      showResults(body);
    }, function(error) {
      $('showErrors').text(`There was an error processing your request: ${error.message}`);
    });
  });

  $("#doctorCondition").click(function() {
    let condition = $('#condition').val();
    $('#condition').val("");
    let promise = doctorFinder.getDoctorByCondition(condition);
    promise.then(function(response) {
      let body = JSON.parse(response);
      showResults(body);
    }, function(error) {
      $('showErrors').text(`There was an error processing your request: ${error.message}`);
    });
  });

  $("#doctorName").click(function() {
    let firstName = $('#first-name').val();
    let lastName = $('#last-name').val();
    $('#first-name').val("");
    $('#last-name').val("");
    let promise = doctorFinder.getDoctorByName(firstName, lastName);
    promise.then(function(response) {
      let body = JSON.parse(response);
      showResults(body);
    }, function(error) {
      $('showErrors').text(`There was an error processing your request: ${error.message}`);
    });
  });

});
