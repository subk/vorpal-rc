import { expect } from 'chai';
import rc from '../src/rc';
import { join } from 'path';
import Vorpal from 'vorpal';
import { stdout, stderr } from 'test-console';

function getInstance() {
  const vorpal = new Vorpal();
  vorpal
    .command('hello <your-name>')
    .action(function (args, callback) {
      this.log('Hi %s !', args['your-name']);
      callback();
    });
  return vorpal;
}

describe('vorpal-rc', function() {
  this.timeout(10000);

  describe('instantiate', () => {
    it('should be properly imported as a function', () => {
      expect(rc).to.be.instanceof(Function);
    });

    it('should throw an error if no .rc file is provided', () => {
      expect(rc).to.throw('Missing .rc filename');
    });

    it('should be imported by Vorpal', () => {
      // just mute stderr
      const output = stderr.inspectSync(() => {
        expect(() => {
          getInstance().use(rc, '.rcfile');
        }).to.not.throw();
      });
    });
  });

  describe('loading', () => {
    it('should warn user about .foorc not found', () => {
      const output = stderr.inspectSync(() => {
        getInstance().use(rc, '.foorc');
      });
      expect(output).to.match(/ENOENT/);
    });
  });

  describe('execution', () => {
    it('should execute commands from .testrc', () => {
      const output = stdout.inspectSync(() => {
        getInstance().use(rc, __dirname + '/../examples/.testrc');
      });
      const hello = 'Hi Billy !';
      const help = 'help [command...]  Provides help for a given command.';
      // hello Billy
      expect(output[0]).to.have.string(hello);
      // Im sorry I dont exist
      expect(output[1]).to.have.string(help);
    });
  });
});
