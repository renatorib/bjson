var bjson = require('../index');

var file = bjson('my/deep/file');

file.foo = 'bar';
file.object = {
    deep: {
        bar: 'foo'
    }
}
