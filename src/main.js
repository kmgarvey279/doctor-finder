import { DoctorFinder } from "./doctor-finder.js";
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

$(document).ready(function() {
  $("#doctorCondition").click(function() {
    let condition = $('#condition').val();
    $('#condition').val("");

    let doctorFinder = new DoctorFinder();
    let promise = doctorFinder.getDoctorByCondition(condition);

    promise.then(function(response) {
      let body = JSON.parse(response);
      for(let i = 0; i < body.data.length; i++) {
        let firstName = `${body.data[i].profile.first_name}`;
        let lastName = `${body.data[i].profile.last_name}`;
        $('#results').append(lastName + "," + firstName + "<br>");
      }
    }, function(error) {
      $('showErrors').text(`There was an error processing your request: ${error.message}`);
    });
  });

  // $("#doctorName").click(function() {
  //   let firstName = $('#first-name').val();
  //   let lastName = $('#last-name').val();
  //   $('#first-name').val("");
  //   $('#last-name').val("");
  //   let doctorFinder = new DoctorFinder();
  //   let promise = doctorFinder.getDoctorByName(firstName, lastName);
  //   promise.then(function(response) {
  //     let body = JSON.parse(response);
  //     $('.showName').text(`${body.main.name}`);
  //   }, function(error) {
  //     $('showErrors').text('There was an error processing your request: ${error.message}');
  //   });
  // });

});
