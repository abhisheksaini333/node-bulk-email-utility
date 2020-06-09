# Bulk Email sending utility Using Node.js (Nodemailer and Mailgun) #

This is a bulk email sending utility with following features:

* It is a node application which sends bulk emails, available as micro-service REST API
* It uses two mail sending providers (one primary and other one secondary as a fallback) nodemailer and mailgun.
* It sends email irrespective of one provider going down, the other one works as a fallback.
* You can get a complete summary of failed and successfull emails sent.
* Sends emails through a secure end point with `jwt`.
* Ability to send user specific Subject and mail body for each user.
* You can easily clone / download it and start modifying it as per your needs.
* Flexibility to add multiplte email providers in future.


### Steps for run & modify this code locally ###

* Clone this code/repo: `git clone https://github.com/abhisheksaini333/node-bulk-email-utility.git`
* Install the packages: `npm install`
* To run the utility: `npm start`
* You will see a message on the console: `Server up and running on port 5000 !`
* Wonderful! your utility is up and running locally and ready to use.
* The APIs can be accessed at: `localhost:5000`
* To test if the server is up and running, hit the following URL: `http://localhost:5000/message`
* You must get the following response: `{"message":"This is the test message"}`
* That means your local server is running fine.
* To run the test cases: `npm test`
* I have tried to do the basic test coverage.
* Now you are all set to modify this code according to your needs.
* For development puposes, you can start the server with nodemon using: `npm run server`


### Steps for run the hosted version of this utility ###

* The utility is hosted at : <a href="https://thawing-crag-85603.herokuapp.com" target="_blank">`https://thawing-crag-85603.herokuapp.com`</a>
* Use any API client like `Postman` to start using the APIs


### Supported End points ###

* GET `/message`: to test if the server is up and running.

* POST `/api/users/login`: to fetch the `token` which will be used in the subsequent request to send bulk email. 
NOTE: for the hosted version you need to use the following username and password to get the token. This username and password is hardcoded in the login functionality for the hosted version.
```json
{
	"username": "abhishek_saini@live.com",
	"password": "nL2G9s$T&@jqZ_GjX3}=yZS2/5-h8+7W"
}
```
But you can definitly add your custom logic to authenticate the user from your DB once you start modifying the code. I have added appropriate comments in the login end point. If you still need help, feel free to reach out to me at `abhishek_saini@live.com`

* POST `api/users/sendMail`: after fetching the `token` in the above step, you can start sending the bulk emails using the following sample request object:
NOTE: you need to set the `authorization` header with the token recieved in the login step. I have mentioned the significance and required fields below against each property of the request object.
```json5 jsonc
{
    "providers": {   // Required field
        "mailgun": {   // Required field
            "apiKey": "<api_key>",   // Required field, your mailgun API Key
            "domain": "<XXXXX.mailgun.org>"   // Required field, your mailgun domain
        },
        "nodemailer": {   // Required field
            "mailSevice": "<any mail service supported by nodemailer>",   // Required field, e.g. Outlook365
            "authUser": "XXXXXX@live.com",   // Required field, your mail id
            "authPass": "XXXXXXXXXXX"   // Required field, password for your mail account
        }
    },
    "detailsRequiredInResponse": false,   // if set to true, you will get a complete summary of failures and successfull mails sent
    "fromEmail": "XXXXXXXX@live.com",   // Required field, your mail id
    "genericSubject": "Generic Subject",   // Required field, generic fallback subject incase you dont specify with each recepient
    "genericMailBody": "Generic Mail Body",   // Required field, it can contain HTML tags as well,  generic fallback mail body incase you dont specify with each recepient
    "recipients": [   // Required field
        {
            "name": "Abhishek",
            "email": "abhishek_saini@live.com",   // Required field
            "subject": "Indiviual subject 1",    // it will override the generic mail subject for this user
            "mailBody": "User Specific mail Body 1"    // it will override the generic mail body for this user, it can contain HTML
        },
        {
            "name": "Abhishek",
            "email": "abhishek.tellius@gmail.com"   // Required field
        },
        {
            "name": "Pioleena",
            "email": "sekhar.pioleena@gmail.com",   // Required field
            "mailBody": "User Specific mail Body 2"    // it will override the generic mail body for this user, it can contain HTML
        },
        {
            "name": "Pioleena",
            "email": "pioleena.saini@gmail.com",   // Required field
            "subject": "Indiviual subject 2",   // it will override the generic mail subject for this user
        }
    ]
}
```



### Steps for Sending bulk emails

* Once everything is set wether you are running it locally or accessing the hosted version.
* use `Postman` client to access the APIs
* Fetch Authentication token as mentioned above using the `/api/users/login` end point
* Set `authorization` header with the token received from the above response, for the subsequent request
* Trigger bulk emails as mentioned above using the `api/users/sendMail` end point and the request object.


### Support (Help/Customization) ###

* You can use any API client like `Postman` to build / test / run the APIs locally or to access the hosted version.
* If you want any changes and customization, please feel free to reach me `abhishek_saini@live.com`
* You might need <a href="https://accounts.google.com/DisplayUnlockCaptcha" target="_blank">`https://accounts.google.com/DisplayUnlockCaptcha`</a> if you are using Gmail as one of the providers for nodemailer