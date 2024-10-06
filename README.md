# Sobrecaray_backend_exercise_midterms
Password of all users in mock database: test123


### Getting started
1. Clone the repo.
2. In the terminal window of the project, type `npm install` and hit enter.
3. In the same terminal, type `node app.js` and hit enter.

### Testing the API
I recommend using Postman to simulate http requests and responses. 

#### For registration:

http://localhost:3000/api/register  | POST

Send request as a raw JSON. Sample below:

```
{
    "username": "ralph",
    "email":"ralph@test.com",
    "password": "test123"
}
```

#### For login:

http://localhost:3000/api/login  | POST

Send request as a raw JSON. Sample below (use exact format):

```
{
    "email":"ian@test.com",
    "password":"test123"
}
```


#### For profile details:

http://localhost:3000/api/profile  | GET

Under 'Authorization'/'Auth' tab use auth type "Bearer Token" and copy-paste the token received from the login to the Token field.

