vorpal-rc
=========

[![Travis](https://img.shields.io/travis/subk/vorpal-rc.svg)](https://travis-ci.org/subk/vorpal-rc)
[![Codecov](https://img.shields.io/codecov/c/github/subk/vorpal-rc.svg?maxAge=2592000)](https://codecov.io/github/subk/vorpal-rc)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

.rc file support for [Vorpal.js](http://vorpal.js.org/)

## Installation
```bash
$ npm i vorpal-rc
```

## Usage
```javascript
var vorpal = require('vorpal')();
var rc = require('vorpal-rc');

// first declare your commands
vorpal
  .command('hello <your-name>')
  .action(function (args, callback) {
    this.log('Hi %s !', args['your-name']);
    callback();
  });

// execute ~/.awesomerc then show command line
vorpal
  .use(rc, path.join(os.homedir(), '.awesomerc'))
  .delimiter('example>')
  .show();
```

## Example

Quick example :
```bash
$ npm i
$ cat ~/.awesomerc
hello Vorpal
exit
$ npm run example ~/.awesomerc
Hi Vorpal !
$
```

## License
MIT
