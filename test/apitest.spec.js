let chai = require('chai');
let chaiHttp = require('chai-http');
var should = chai.should();
chai.use(chaiHttp);
let server = require('../server');

describe('API Test', () => {
    describe('/GET message', () => {
        it('it should GET a message', (done) => {
            chai.request(server)
                .get('/message')
                .end((err, res) => {
                    (res).should.have.status(200);
                    (res.body).should.be.a('object');
                    done();
                });
        });
    });
    describe('/POST api/users/login', () => {
        it('it should POST empty credentials', (done) => {
            chai.request(server)
                .post('/api/users/login')
                .send({})
                .end((err, res) => {
                    (res).should.have.status(400);
                    (res.body).should.be.a('object');
                    done();
                });
        });
    });
    describe('/POST api/users/login', () => {
        it('it should POST wrong credentials', (done) => {
            chai.request(server)
                .post('/api/users/login')
                .send({
                    "username": "abhishek_saini",
                    "password": ""
                })
                .end((err, res) => {
                    (res).should.have.status(400);
                    (res.body).should.be.a('object');
                    done();
                });
        });
    });
    describe('/POST api/users/login', () => {
        it('it should POST correct credentials', (done) => {
            chai.request(server)
                .post('/api/users/login')
                .send({
                    "username": "abhishek_saini@live.com",
                    "password": "nL2G9s$T&@jqZ_GjX3}=yZS2/5-h8+7W"
                })
                .end((err, res) => {
                    (res).should.have.status(200);
                    (res.body).should.be.a('object');
                    done();
                });
        });
    });
    describe('/POST api/users/sendMail', () => {
        it('it should POST without auth token', (done) => {
            chai.request(server)
                .post('/api/users/sendMail')
                .send({
                    "providers": {
                        "mailgun": {
                            "apiKey": "key-1234123412341234",
                            "domain": "sandbox3249234.mailgun.org"
                        },
                        "nodemailer": {
                            "mailSevice": "Gmail",
                            "authUser": "abhishek.tellius@gmail.com",
                            "authPass": "Ninthedit@333"
                        }
                    },
                    "fromEmail": "abhishek_saini@live.com",
                    "genericSubject": "Generic Mail Subject",
                    "genericMailBody": "Generic Mail Body",
                    "detailsRequiredInResponse": true,
                    "recipients": [
                        {
                            "name": "Abhishek",
                            "email": "abhishek_saini@live.com",
                            "subject": "Indiviual subject 1",
                            "mailBody": "User Specific mail Body 1"
                        },
                        {
                            "name": "Abhishek",
                            "email": "abhishek.tellius@gmail.com"
                        },
                        {
                            "name": "Pioleena",
                            "email": "sekhar.pioleena@gmail.com",
                            "mailBody": "User Specific mail Body 1"
                        },
                        {
                            "name": "Pioleena",
                            "email": "pioleena.saini@",
                            "subject": "Indiviual subject 2"
                        }
                    ]
                })
                .end((err, res) => {
                    (res).should.have.status(401);
                    (res.body).should.be.a('object');
                    done();
                });
        });
    });
    describe('/POST api/users/login', () => {
        it('it should POST correct credentials and then INCORRECT mailing details', (done) => {
            chai.request(server)
                .post('/api/users/login')
                .send({
                    "username": "abhishek_saini@live.com",
                    "password": "nL2G9s$T&@jqZ_GjX3}=yZS2/5-h8+7W"
                })
                .end((err, res) => {
                    (res).should.have.status(200);
                    (res.body).should.be.a('object');
                    done();
                    describe('/POST api/users/sendMail', () => {
                        it('it should POST with token', (done) => {
                            chai.request(server)
                                .post('/api/users/sendMail')
                                .set({ "Authorization": res.body.token })
                                .send({
                                    "providers": {
                                        "mailgun": {
                                            "apiKey": "key-1234123412341234",
                                            "domain": "sandbox3249234.mailgun.org"
                                        },
                                        "nodemailer": {
                                            "mailSevice": "Gmail",
                                            "authUser": "abhishek.tellius@gmail.com",
                                            "authPass": "Ninthedit@333"
                                        }
                                    },
                                    "fromEmail": "abhishek_saini@live.com",
                                    //"genericSubject": "Generic Mail Subject",
                                    //"genericMailBody": "Generic Mail Body",
                                    "detailsRequiredInResponse": true,
                                    "recipients": [
                                        {
                                            "name": "Abhishek",
                                            "email": "abhishek_saini@live.com",
                                            "subject": "Indiviual subject 1",
                                            "mailBody": "User Specific mail Body 1"
                                        },
                                        {
                                            "name": "Abhishek",
                                            "email": "abhishek.tellius@gmail.com"
                                        },
                                        {
                                            "name": "Pioleena",
                                            "email": "sekhar.pioleena@gmail.com",
                                            "mailBody": "User Specific mail Body 1"
                                        },
                                        {
                                            "name": "Pioleena",
                                            "email": "pioleena.saini@",
                                            "subject": "Indiviual subject 2"
                                        }
                                    ]
                                })
                                .end((err, res) => {
                                    (res).should.have.status(400);
                                    (res.body).should.be.a('object');
                                    done();
                                });
                        });
                    });
                });
        });
    });
    describe('/POST api/users/login', () => {
        it('it should POST correct credentials and then CORRECT mailing details', (done) => {
            chai.request(server)
                .post('/api/users/login')
                .send({
                    "username": "abhishek_saini@live.com",
                    "password": "nL2G9s$T&@jqZ_GjX3}=yZS2/5-h8+7W"
                })
                .end((err, res) => {
                    (res).should.have.status(200);
                    (res.body).should.be.a('object');
                    done();
                    describe('/POST api/users/sendMail', () => {
                        it('it should POST with token', (done) => {
                            chai.request(server)
                                .post('/api/users/sendMail')
                                .set({ "Authorization": res.body.token })
                                .send({
                                    "providers": {
                                        "mailgun": {
                                            "apiKey": "key-1234123412341234",
                                            "domain": "sandbox3249234.mailgun.org"
                                        },
                                        "nodemailer": {
                                            "mailSevice": "Gmail",
                                            "authUser": "abhishek.tellius@gmail.com",
                                            "authPass": "Ninthedit@333"
                                        }
                                    },
                                    "fromEmail": "abhishek_saini@live.com",
                                    "genericSubject": "TEST Mail Subject",
                                    "genericMailBody": "TEST Mail Body",
                                    "detailsRequiredInResponse": false,
                                    "recipients": [
                                        {
                                            "name": "Abhishek",
                                            "email": "abhishek.tellius@gmail.com"
                                        }
                                    ]
                                })
                                .end((err, res) => {
                                    (res).should.have.status(200);
                                    (res.body).should.be.a('object');
                                    done();
                                });
                        });
                    });
                });
        });
    });
});