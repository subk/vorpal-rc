vorpal-rc
=========

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
