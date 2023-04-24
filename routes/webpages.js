const express = require('express');
const router = express.Router();
const sendEmail = require("../utils/sendEmail");
const nodemailer = require("nodemailer");
const fs = require("fs");
const ejs = require("ejs");
const axios = require("axios");
const request = require('request');

router.get('/about', (req, res) => {
    try {
        request('https://blockchain.info/de/ticker', (error, response, body) => { 
          const data = JSON.parse(body); 
          value = (parseInt(data.USD.buy, 10) + parseInt(data.USD.sell, 10)) / 2; 

          res.render("about", {btcprice: value})
          
          console.log(value); 
        }); 
  } catch (error) {
    res.render("about", {btcprice: 0})
  }
});

// router.get('/mail', (req, res) => {
//     res.render('mail/openinvestment', {username: 'Yola', packagetype: 'Starter', investedamount: 1000});
// });

router.get('/terms', (req, res) => {
    try {
        request('https://blockchain.info/de/ticker', (error, response, body) => { 
          const data = JSON.parse(body); 
          value = (parseInt(data.USD.buy, 10) + parseInt(data.USD.sell, 10)) / 2; 

          res.render("terms", {btcprice: value})
          
          console.log(value); 
        }); 
  } catch (error) {
    res.render("terms", {btcprice: 0})
  }
});

router.get('/news', (req, res) => {
    // const key = "8967d6df52ca4d4ea96078b35bf4dbae"
    // const newsurl = `https://newsapi.org/v2/everything?q=crypto&language=en&sortBy=publishedAt&pageSize=40&apiKey=${key}`
    // const fetchednews = fetch(newsurl)
    // console.log(fetchednews)
    // const fetchednews = 'https://api.newscatcherapi.com/v2/search?q=Tesla' -H 'oM_vJRkbk5vvd6-LB2Fx5n70ugXx6L8AnouOP8bko7E'
    

        const options = {
        method: 'GET',
        url: 'https://crypto-news16.p.rapidapi.com/news/top/40',
        headers: {
            'X-RapidAPI-Key': 'faa3a80a7amsh3fd97e3ceebb673p181cb8jsn37b22cadb0cc',
            'X-RapidAPI-Host': 'crypto-news16.p.rapidapi.com'
        }
        };

        const getnews = axios.request(options)

        try {
            request('https://blockchain.info/de/ticker', (error, response, body) => { 
              const data = JSON.parse(body); 
              value = (parseInt(data.USD.buy, 10) + parseInt(data.USD.sell, 10)) / 2; 
    
              
                axios.request(options).then(function (response) {
                    console.log(response);
                    res.render('news', {newsdata: response.data, btcprice: value});
                }).catch(function (error) {
                    console.error(error);
                    res.render('news', {btcprice: value});
                });
            }); 
      } catch (error) {
        axios.request(options).then(function (response) {
            console.log(response);
            res.render('news', {newsdata: response.data, btcprice: value});
        }).catch(function (error) {
            console.error(error);
            res.render('news', {btcprice: value});
        });
      }

        // axios.request(options).then(function (response) {
        //     console.log(response);
        //     res.render('news', {newsdata: response.data});
        // }).catch(function (error) {
        //     console.error(error);
        //     res.render('news');
        // });

    // res.render('news', {newsdata: response.data});
});

router.get('/contact_us', (req, res) => {
    try {
        request('https://blockchain.info/de/ticker', (error, response, body) => { 
          const data = JSON.parse(body); 
          value = (parseInt(data.USD.buy, 10) + parseInt(data.USD.sell, 10)) / 2; 

          res.render("contact", {btcprice: value})
          
          console.log(value); 
        }); 
  } catch (error) {
    res.render("contact", {btcprice: 0})
  }
});

router.post('/contactus', async (req, res)  => {
    const { email, name, subject, message} = req.body;
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.HOST,
            service: process.env.SERVICE,
            port: 587,
            secure: true,
            auth: {
                user: process.env.USER,
                pass: process.env.PASS,
            },
        });

        ejs.renderFile("views/contactmail.ejs", {mail: email, name: name, message: message, subject: subject},function (err, data) {
            if (err) {
                console.log(err);
            } else {
                var mainOptions = {
                    from: email,
                    to: process.env.CUSTOMMAIL,
                    subject: subject,
                    html: data
                };
                console.log("html data ======================>", mainOptions.html);
                transporter.sendMail(mainOptions, function (err, info) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log('Message sent: ' + info.response);
                    }
                });
            }
            });
    } catch (error) {
        console.log(error, "email not sent");
    }
    req.flash('success', 'Message Sent. A reply will be sent to your email shortly.')
    res.redirect('/contactus')
})

router.get('/faq', (req, res) => {
    try {
        request('https://blockchain.info/de/ticker', (error, response, body) => { 
          const data = JSON.parse(body); 
          value = (parseInt(data.USD.buy, 10) + parseInt(data.USD.sell, 10)) / 2; 

          res.render("faq", {btcprice: value})
          
          console.log(value); 
        }); 
  } catch (error) {
    res.render("faq", {btcprice: 0})
  }
});

router.get('/privacy_policy', (req, res) => {
    try {
        request('https://blockchain.info/de/ticker', (error, response, body) => { 
          const data = JSON.parse(body); 
          value = (parseInt(data.USD.buy, 10) + parseInt(data.USD.sell, 10)) / 2; 

          res.render("policy", {btcprice: value})
          
          console.log(value); 
        }); 
  } catch (error) {
    res.render("policy", {btcprice: 0})
  }
});

router.get('/store', (req, res) => {
    try {
        request('https://blockchain.info/de/ticker', (error, response, body) => { 
          const data = JSON.parse(body); 
          value = (parseInt(data.USD.buy, 10) + parseInt(data.USD.sell, 10)) / 2; 

          res.render("store", {btcprice: value})
          
          console.log(value); 
        }); 
  } catch (error) {
    res.render("store", {btcprice: 0})
  }
});

// router.get('/about', (req, res) => {
//     res.render('about');
// });

router.get('/blog1', (req, res) => {
    try {
        request('https://blockchain.info/de/ticker', (error, response, body) => { 
          const data = JSON.parse(body); 
          value = (parseInt(data.USD.buy, 10) + parseInt(data.USD.sell, 10)) / 2; 

          res.render("qa", {btcprice: value})
          
          console.log(value); 
        }); 
  } catch (error) {
    res.render("qa", {btcprice: 0})
  }
});

router.get('/blog2', (req, res) => {
    try {
        request('https://blockchain.info/de/ticker', (error, response, body) => { 
          const data = JSON.parse(body); 
          value = (parseInt(data.USD.buy, 10) + parseInt(data.USD.sell, 10)) / 2; 

          res.render("blog2", {btcprice: value})
          
          console.log(value); 
        }); 
  } catch (error) {
    res.render("blog2", {btcprice: 0})
  }
});

router.get('/blog3', (req, res) => {
    try {
        request('https://blockchain.info/de/ticker', (error, response, body) => { 
          const data = JSON.parse(body); 
          value = (parseInt(data.USD.buy, 10) + parseInt(data.USD.sell, 10)) / 2; 

          res.render("blog3", {btcprice: value})
          
          console.log(value); 
        }); 
  } catch (error) {
    res.render("blog3", {btcprice: 0})
  }
});



module.exports = router;