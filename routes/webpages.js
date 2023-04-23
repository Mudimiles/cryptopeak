const express = require('express');
const router = express.Router();
const sendEmail = require("../utils/sendEmail");
const nodemailer = require("nodemailer");
const fs = require("fs");
const ejs = require("ejs");
const axios = require("axios");

router.get('/about', (req, res) => {
    res.render('about');
});

// router.get('/mail', (req, res) => {
//     res.render('mail/openinvestment', {username: 'Yola', packagetype: 'Starter', investedamount: 1000});
// });

router.get('/terms', (req, res) => {
    res.render('terms');
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

        axios.request(options).then(function (response) {
            console.log(response);
            res.render('news', {newsdata: response.data});
        }).catch(function (error) {
            console.error(error);
            res.render('news');
        });

    // res.render('news', {newsdata: response.data});
});

router.get('/contact_us', (req, res) => {
    res.render('contact');
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
    res.render('faq');
});

router.get('/privacy_policy', (req, res) => {
    res.render('policy');
});

router.get('/store', (req, res) => {
    res.render('store');
});

router.get('/about', (req, res) => {
    res.render('about');
});

router.get('/blog1', (req, res) => {
    res.render('qa');
});

router.get('/blog2', (req, res) => {
    res.render('blog2');
});

router.get('/blog3', (req, res) => {
    res.render('blog3');
});



module.exports = router;