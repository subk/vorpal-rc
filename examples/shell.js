import vorpal from 'vorpal';
import rc from '../src/rc';

const shell = new vorpal();
const rcfile = process.argv[2];

// declare your commands first
shell
  .command('hello <your-name>')
  .action(function (args, callback) {
    this.log('Hi %s !', args['your-name']);
    callback();
  });

// execute .rcfile
if (rcfile) {
  shell.use(rc, rcfile)
}

// show cli
shell
  .delimiter('shell>')
  .show();
