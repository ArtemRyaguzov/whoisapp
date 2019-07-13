const express = require('express');
const router = express.Router();
const cp = require('child_process');
const punycode = require('punycode');
const fs = require('fs');
const path = require('path');
const moment = require('moment');


router.get('/', (req, res) => {
    res.render('index');
});

router.post('/', (req, res) => {

    // NOT Deploy, until validation with regexp is ready

    const target = req.body.domain.toLowerCase();
    const validatedTarget = punycode.toASCII(target);

    const operation = req.body.operation;

    // A little upgrade for logger middleware
    fs.appendFile(path.join(__dirname, '../logs', 'post-requests.log'),
     `${req.protocol}://${req.method}::requested operation is [${operation}] with original data transfered [${req.body.domain}],
     after validation: [${validatedTarget}]: ${moment().format()}\n`, err => {
        if(err) throw err;
    });

    if(operation === 'all'){
        cp.exec(`whois ${validatedTarget}`, (err, stdout, stderr) => {
            let outputArr = stdout.split('\n');

            cp.exec(`host ${validatedTarget}`, (err, stdout, stderr) => {
                let resultArr = stdout.split('\n');
                res.render('index', {
                    title: 'Ответ предоставлен ниже',
                    subTitle: 'Информация о доменной зоне',
                    subHeader: 'Преобразованный домен',
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
                    title: 'Ответ предоставлен ниже',
                    outputArr
                });
            });
    } else if(operation === 'punycode'){
        res.render('index', {
            title: 'Преобразованный домен',
            validatedTarget
        });
    } else if(operation === 'host'){
            cp.exec(`host ${validatedTarget}`, (err, stdout, stderr) => {
                let resultArr = stdout.split('\n');
                res.render('index', {
                    title: 'Ответ предоставлен ниже',
                    resultArr
                });
            });
    }

});

module.exports = router;
