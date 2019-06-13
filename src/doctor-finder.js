export class DoctorFinder {
  constructor() {
    this.city = "";
    this.state = "";
  }

  setLocation(newCity, newState) {
    this.city = newCity;
    this.state = newState;
  }

  getDoctorBySpecialty(specialty) {
    let city = this.city;
    let state = this.state;
    return new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      let url = `https://api.betterdoctor.com/2016-03-01/doctors?specialty_uid=${specialty}&location=${state}-${city}&skip=0&limit=20&user_key=${process.env.DOC_KEY}`;
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
  }

  getDoctorByCondition(condition) {
    let city = this.city;
    let state = this.state;
    return new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      let url = `https://api.betterdoctor.com/2016-03-01/doctors?query=${condition}&location=${state}-${city}&skip=0&limit=20&user_key=${process.env.DOC_KEY}`;
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
  }
  getDoctorByName(firstName, lastName) {
    let city = this.city;
    let state = this.state;
    return new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      let url = `https://api.betterdoctor.com/2016-03-01/doctors?first_name=${firstName}&last_name=${lastName}&location=${state}-${city}&skip=0&limit=20&user_key=${process.env.DOC_KEY}`;
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
  }
}
