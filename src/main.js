import { DoctorFinder } from "./doctor-finder.js";
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

function showResults(body) {
  $('#results').empty();
  if(body.data.length == 0) {
    $('#results').append("No doctors matched your search. Please update your criteria and try again.");
  }
  for(let i = 0; i < body.data.length; i++) {
    let firstName = `${body.data[i].profile.first_name}`;
    let lastName = `${body.data[i].profile.last_name}`;
    let addressStreet = `${body.data[i].practices[0].visit_address.street}`;
    let addressCity = `${body.data[i].practices[0].visit_address.city}`;
    let addressState = `${body.data[i].practices[0].visit_address.state}`;
    let phone = `${body.data[i].practices[0].phones[0].number}`;
    let website = `${body.data[i].practices[0].website}`;
    if(website == "undefined") {
      website = "n/a";
    }
    let newPatientsBool = `${body.data[i].practices[0].accepts_new_patients}`;
    console.log(newPatientsBool);
    let newPatientsStr = "";
    if(newPatientsBool === "true") {
      newPatientsStr = "This doctor is currently accepting new patients."
    } else {
      newPatientsStr = "This doctor is not currently accepting new patients."
    }
    $('#results').append("Name: " + lastName + ", " + firstName + "<br>" + "Address: " + addressStreet + "<br>" + addressCity + "," + addressState + "<br>" + "Phone Number: " + phone + "<br>" + "Website: " + website + "<br>" + newPatientsStr + "<br><br>");
  }
}
$(document).ready(function() {
  $("#doctorCondition").click(function() {
    let condition = $('#condition').val();
    $('#condition').val("");

    let doctorFinder = new DoctorFinder();
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

    let doctorFinder = new DoctorFinder();
    let promise = doctorFinder.getDoctorByName(firstName, lastName);

    promise.then(function(response) {
      let body = JSON.parse(response);
      showResults(body);
    }, function(error) {
      $('showErrors').text(`There was an error processing your request: ${error.message}`);
    });
  });

});
