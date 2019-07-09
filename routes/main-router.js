const express = require('express');
const router = express.Router();
const cp = require('child_process');
const punycode = require('punycode');

router.get('/', (req, res) => {
    res.render('index');
});

router.post('/', (req, res) => {

    const target = req.body.domain.toLowerCase();
    const validatedTarget = punycode.toASCII(target);

    const operation = req.body.operation;

    if(operation === 'all'){
        cp.exec(`whois ${validatedTarget}`, (err, stdout, stderr) => {
            let outputArr = stdout.split('\n');

            cp.exec(`host ${validatedTarget}`, (err, stdout, stderr) => {
                let resultArr = stdout.split('\n');
                res.render('index', {
                    outputArr,
                    validatedTarget,
                    resultArr
                });
            });
        });
    } else if(operation === 'whois'){
        cp.exec(`whois ${validatedTarget}`, (err, stdout, stderr) => {
            let outputArr = stdout.split('\n');
                res.render('index', {
                    outputArr
                });
            });
    } else if(operation === 'punycode'){
        res.render('index', {
            validatedTarget
        });
    } else if(operation === 'host'){
            cp.exec(`host ${validatedTarget}`, (err, stdout, stderr) => {
                let resultArr = stdout.split('\n');
                res.render('index', {
                    resultArr
                });
            });
    }

});

module.exports = router;
