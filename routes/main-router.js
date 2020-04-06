const express = require('express');
const router = express.Router();
const punycode = require('punycode');
const whois = require('whois');
const dns = require('dns').promises;

const validateUserInput = str => {
    return str.trim().toLowerCase().replace(/^https?\:\/\/(www.)?|\/$/gmi, '');
}


router.get('/', (req, res) => {
    res.render('index', {
        clientIp: req.headers['x-real-ip']
    });
});

router.post('/', (req, res) => {

    const { target, operation } = req.body;

    const validUserInput = validateUserInput(target);

    const validTarget = punycode.toASCII(validUserInput);


    let result;
    let output;
    let errorMessage;

    if(operation === 'punycode'){
        return res.render('index', {
            clientIp: req.headers['x-real-ip'],
            title: 'Преобразованный домен',
            validTarget
        });
    }

    whois.lookup(validTarget, (err, data) => {
        if(err){
            console.error(err);
            errorMessage = 'Request failed';
        } else {
            output = data.split('\n');
        }

        if(operation === 'whois'){
            return res.render('index', {
                clientIp: req.headers['x-real-ip'],
                title: 'Ответ предоставлен ниже',
                errorMessage,
                output
            });
        }

        dns.resolve(validTarget, 'ANY')
        .then(addresses => {
    
            result = addresses.map(i => JSON.stringify(i));

            res.render('index', {
                clientIp: req.headers['x-real-ip'],
                title: 'Ответ предоставлен ниже',
                result,
                subTitle: operation === 'dns' ? undefined : 'Информация о доменной зоне',
                subHeader: operation === 'dns' ? undefined : 'Преобразованный домен',
                output: operation === 'dns' ? undefined : output,
                validTarget: operation === 'dns' ? undefined : validTarget,
                errorMessage: operation === 'dns' ? undefined : errorMessage
            });
        })
        .catch(err => {
            console.error(err);

            if(err.code === 'ENOTFOUND'){
                return dns.reverse(validTarget)
                    .then(hostnames => {
                        
                        result = hostnames;

                        res.render('index', {
                            clientIp: req.headers['x-real-ip'],
                            title: 'Ответ предоставлен ниже',
                            result,
                            subTitle: operation === 'dns' ? undefined : 'Информация о доменной зоне',
                            subHeader: operation === 'dns' ? undefined : 'Преобразованный домен',
                            output: operation === 'dns' ? undefined : output,
                            validTarget: operation === 'dns' ? undefined : validTarget,
                            errorMessage: operation === 'dns' ? undefined : errorMessage
                        });
                    })
                    .catch(err => {
                        console.error(err);

                        res.render('index', {
                            clientIp: req.headers['x-real-ip'],
                            errorMessage: `Request Failed: ${err.code}`,
                            output: operation === 'dns' ? undefined : output
                        });
                    });
            }

            res.render('index', {
                clientIp: req.headers['x-real-ip'],
                errorMessage: `Request Failed: ${err.code}`,
                subHeader: operation === 'dns' ? undefined : 'Преобразованный домен',
                output: operation === 'dns' ? undefined : output,
                validTarget: operation === 'dns' ? undefined : validTarget
            });
        });
    });

});

module.exports = router;
