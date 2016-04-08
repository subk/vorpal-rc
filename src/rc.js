import { readFileSync } from 'fs';
import { EOL } from 'os';
import trim from 'trim';

export default function (vorpal, rcfile) {
  if (typeof rcfile !== 'string') {
    throw new Error('Missing .rc filename');
  }

  try {
    readFileSync(rcfile, 'utf-8')
      .split(EOL)
      .filter(cmd => trim(cmd).length)
      .forEach(cmd => vorpal.exec(cmd));
  }
  catch (err) {
    console.warn(err.message);
  }
}
