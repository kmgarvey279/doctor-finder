import { DoctorFinder } from './../src/doctor-finder.js';

describe('DoctorFinder', function() {
  let doctorFinder = new DoctorFinder();

  it('should return a list of doctors in Seattle that match the inputted medical issue', function() {
    expect(doctorFinder.getDoctorByCondition()).toEqual("");
  });
  it('should return a list of doctors in Seattle that match the inputted name', function() {
    expect().toEqual("");
  });
  it('should include the first and last name, address, phone number, website, and whether a doctor is accepting new patients for each result', function() {
    expect().toEqual("");
  });
  it('should return an error message describing the error if the request returns something other than a 200 OK', function() {
    expect().toEqual("");
  });
  it('should return a message informing the user if the request succeeds but no doctors match their search criteria', function() {
    expect().toEqual("");
  });
});
