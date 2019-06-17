_Doctor Finder_

### _***Kevin Garvey***_

### _Description:_
##### _The program takes either a first and last name or a particular condition/specialty as input and returns a list of matching doctors in the Seattle area along with their contact information and whether they are accepting new patients 05/07/2019_

### _Specs_
The user enters a first and last name and the program returns a list of full and partial matches.
input: John Smith
output: John Jones + {contact info}, Sarah Smith + {contact info}, John Smith + {contact info}

The user enters a specialty or medical problem and the program returns a list of matching doctors.
input: stomach
output: Jim Stomachdoctor + {contact info}

### Setup/Installation
Clone ``https://github.com/kmgarvey279/doctor-finder``

If [node.js](http://nodejs.org/) and node package manager are not yet installed on your local device, install them before continuing.

You will need your own API from https://developer.betterdoctor.com/. After creating an account and getting one, create a new .env file in the main directory and add ``API_KEY = {your API key here} ``
Navigate to the top level of the 'doctor finder' folder and run the following commands:
``$ npm install``<br>    
``$ npm run start``<br>

### Known Bugs
None at this time.
### Support and contact details

_Please contact me at kmgarvey279@gmail.com if you have any questions or comments._

### Technologies Used

_- ES6_
_- Jasmine_
_- Karma_
_- Webpack_
### License

_This software is licensed under the MIT license._
Copyright (c) 2019 **_{Kevin Garvey}_**
