'use strict';

let fs = require('fs'),
    observed = require('observed'),
    steno = require('steno'),
    path = require('path'),
    mkdirp = require('mkdirp'),
    helpers = require('./lib/helpers');

let keepExtension = helpers.keepExtension,
    existsSync = helpers.existsSync,
    tmp = {};

let write = function(file, parsed){
  // steno is used to prevent race condition
  steno.writeFile(file, JSON.stringify(parsed, null, '\t'));
}

let parseJson = (file) => {
  return JSON.parse(fs.readFileSync(file));
}

let bjson = (file, cb) => {
  let parsed,
      observe;

  file = keepExtension(file, '.json');
  if(tmp[file]) {
      return tmp[file];
  }

  if(!existsSync(file)){
      mkdirp.sync(path.dirname(file));
      fs.writeFileSync(file, '{}');
  }

  parsed = parseJson(file);
  observe = observed(parsed);

  observe.on('change', () => {
    write(file, parsed);
  });

  if(typeof cb === "function") {
    cb(observe);
  }
  
  return tmp[file] = parsed;
}

module.exports = bjson;