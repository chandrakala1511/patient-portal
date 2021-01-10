const axios = require('axios');

axios.post('http://localhost:3001/patients', {
    "id": 5,
    "salutation": "Mr",
    "name": "John",
    "gender": "Male",
    "dateofbirth": "2014-08-18T21:11:54",
    "age": "24",
    "agetype": "Years",
    "appointmentDate": "2021-08-18T21:11:54",
    "phoneNumber": "+1 (817) 463-3365",
    "address1": "516 Doughty Street, Devon, New Jersey, 5748",
    "address2": "657 Eldert Street, Wakarusa, Kentucky, 6332",
    "city": "murraycole@marketoid.com",
    "state": "+1 (823) 595-3136",
    "zipcode": 252311,
    "country": "United States"
  }).then(resp => {
    console.log(resp.data);
}).catch(error => {
    console.log(error);
});   

axios.put('http://localhost:3001/patients/5', {
    
    "balanceamount": 100,
    "discount": "10"
  }).then(resp => {
    console.log(resp.data);
}).catch(error => {
    console.log(error);
});   