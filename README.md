# SC-XW1 [![Build Status](https://travis-ci.org/SivanMehta/SC-XW1.svg?branch=master)](https://travis-ci.org/SivanMehta/SC-XW1)
CMU/Swiftceipt Collaborative Project.

## Tests

```
$ npm test
```

## Setup

Upon a fresh clone of the repo, you will be missing 2 files that ensure that the application can start:
* `config/cert.pem`
* `config/key.pem`

You will need to set up these `.pem` files for HTTPS. The following commands adapted from [here](http://blog.mgechev.com/2014/02/19/create-https-tls-ssl-application-with-express-nodejs/) will create 2 self-signed certificates to start the server. If you are deploying this application publicly, just put your appropriately-named certificates into `config/`.

```
$ git clone git@github.com:swiftceipt/SC-XW1.git
  ...
$ npm install
  ...
$ npm start
fs.js:427
  return binding.open(pathModule._makeLong(path), stringToFlags(flags), mode);
                 ^
Error: ENOENT, no such file or directory './config/key.pem'
    at Object.fs.openSync (fs.js:427:18)
    at Object.fs.readFileSync (fs.js:284:15)
    at Object.<anonymous> (./SC-XW1/server.js:38:15)
    at Module._compile (module.js:456:26)
    at Object.Module._extensions..js (module.js:474:10)
    at Module.load (module.js:356:32)
    at Function.Module._load (module.js:312:12)
    at Function.Module.runMain (module.js:497:10)
    at startup (node.js:119:16)
    at node.js:902:3

$ openssl req -nodes -x509 -newkey rsa:2048 -keyout config/key.pem -out config/cert.pem -days 365
  ...
$ npm start
Mon Apr 18 2016 00:14:44 GMT-0400 (EDT): Server started on https://localhost:50000 ...
```