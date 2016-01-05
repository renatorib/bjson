'use strict';

let bjson = require('../index'),
let file = bjson('my/deep/file');

file.foo = 'bar';
file.object = {
  deep: {
    bar: 'foo'
  }
}