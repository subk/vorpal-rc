import { expect } from 'chai';
import rc from '../src/rc';
import child from 'child_process';
import { join } from 'path';

describe('vorpal-rc', function() {
  this.timeout(10000);

  const spawn = rcfile => {
    const argv = [ 'run', 'example', join('examples', rcfile) ];
    return child.spawn('npm', argv, { stdio: 'pipe' });
  }

  describe('instantiate', () => {
    it('should be properly imported as a function', () => {
      expect(rc).to.be.instanceof(Function);
    });

    it('should throw an error if no .rc file is provided', () => {
      expect(rc).to.throw('Missing .rc filename');
    });
  });

  describe('loading', () => {
    it('should warn user about .foorc not found', done => {
      const p = spawn('.foorc');
      p.stderr.on('data', data => {
        p.kill();
        expect(data.toString()).to.match(/ENOENT/);
        done();
      });
    });
  });

  describe('execution', () => {
    it('should execute commands from .testrc', done => {
      const p = spawn('.testrc');
      const hello = 'Hi Billy !';
      const help = 'help [command...]  Provides help for a given command.';
      let output = '';
      p.stdout.on('data', data => {
        output += data.toString();
      });
      p.on('close', code => {
        p.kill();
        // hello Billy
        expect(output).to.have.string(hello);
        // Im sorry I dont exist
        expect(output).to.have.string(help);
        expect(code).to.equal(0);
        done();
      });
    });
  });
});
