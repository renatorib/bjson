var fs = require('fs'),
    observed = require('observed'),
    steno = require('steno'),
    path = require('path'),
    mkdirp = require('mkdirp'),
    tmp = {};

var h = require('./lib/helpers'),
    keepExtension = h.keepExtension,
    existsSync = h.existsSync;

var bjson = function(file, cb){
    file = keepExtension(file, '.json');
    if(tmp[file]) {
        return tmp[file];
    }
    if(!existsSync(file)){
        mkdirp.sync(path.dirname(file));
        fs.writeFileSync(file, '{}');
    }
    var parsed = JSON.parse(fs.readFileSync(file));
    var observe = observed(parsed);
    var write = function(){
        // steno is used to prevent race condition
        steno.writeFile(file, JSON.stringify(parsed, null, '\t'));
    }
    observe.on('change', function(){
        write();
    });
    if(typeof cb === "function") {
        cb(observe);
    }
    return tmp[file] = parsed;
}

module.exports = bjson;
