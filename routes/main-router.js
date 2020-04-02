const express = require('express');
const router = express.Router();
const punycode = require('punycode');

const validateUserInput = str => {
    return str.trim().toLowerCase().replace(/^https?\:\/\/(www.)?|\/$/gmi, '');
}


router.get('/', (req, res) => {
    res.render('index', {
        clientIp: req.headers['x-real-ip']
    });
});

router.post('/', (req, res) => {
    console.log(req.body);

    const validUserInput = validateUserInput(req.body.domain);

    console.log(validUserInput);

    res.render('index');
});

module.exports = router;
