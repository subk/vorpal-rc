'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (vorpal, rcfile) {
  if (typeof rcfile !== 'string') {
    throw new Error('Missing .rc filename');
  }

  try {
    (0, _fs.readFileSync)(rcfile, 'utf-8').split(_os.EOL).filter(function (cmd) {
      return (0, _trim2.default)(cmd).length;
    }).forEach(function (cmd) {
      return vorpal.exec(cmd);
    });
  } catch (err) {
    console.warn(err.message);
  }
};

var _fs = require('fs');

var _os = require('os');

var _trim = require('trim');

var _trim2 = _interopRequireDefault(_trim);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }