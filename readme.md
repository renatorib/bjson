# Bind Json - "bjson"
Bind Json: Reactive way to read/write json files. 

**ABANDONED 4/22/2016** Object.observe has been [removed from future versions of V8](https://github.com/v8/v8/commit/6a370a6f01b004f0b359aa0e0ce4aa90d40773d0). Therefore, this module is no longer being maintained.

> **Note:**  
> Bind Json, called as "bjson", don't have ANY RELATIONS with [Binary Json](http://bjson.org), also called as "bjson".  
> These are two different projects with same abbreviation name. Sorry for this.

## How it works
**When you need to edit a json file, what you do?**  

| Without bjson                  | With bjson                                         |
| ------------------------------ | -------------------------------------------------- |
| Create json file if not exists |                                                    |
| Read json file.                | Read json file   _(Will create if not exists)_     |
| Deserialize json file.         |                                                    |
| Edit parsed object.            | Edit object  _(Will reactively save in json file)_ |
| Serialize new object.          |                                                    |
| Write back into file.          |                                                    |


### Examples

**Editing .json file without bjson**
```js
var fs = require('fs');
if(!fs.existsSync('settings.json')){
  fs.writeFileSync('settings.json', '{}');
}
var settingsJson = fs.readFileSync('settings.json');
var settings = JSON.parse(settingsJson);
settings.foo = 'bar';
var settingsJson = JSON.stringify(settings, null, 2);
fs.writeFileSync('settings.json', settingsJson);
```

**Editing .json file with bjson**
```js
var bjson = require('bjson');
var settings = bjson('settings.json');
settings.foo = 'bar'; 
```
  
## Getting started
### Binding json
*settings.json*
```json
{}
```

*whatever.js*
```js
var bjson = require('bjson');
var settings = bjson('settings'); // will read or create settings.json
settings.prop = 'bar';
```

*settings.json:*
```json
{
    "prop": "bar"
}
```

### Watching changes with observe

You can watch changes with a instance of `Object.observe` passed as callback argument.  

*settings.json:*
```json
{
    "prop": "bar"
}
```

whatever.js
```js
var bjson = require('bjson');
var settings = bjson('settings', function(observe){
    observe.on('change', function(changes){
        console.log('Path:', changes.path);
        console.log('Old Value:', changes.oldValue);
        console.log('New Value:', changes.value);
        console.log('-----');
    });
});

settings.prop = 'foo';
settings.otherprop = 'bar';
```

Log output:
```
Path: prop
Old Value: bar
New Value: foo
-----
Path: otherprop
Old Value: undefined
New Value: bar
-----
```

*settings.json:*
```json
{
    "prop": "foo",
    "otherprop": "bar"
}
```

### Observe events

```js
var bjson = require('bjson');
var settings = bjson('settings', function(observe){
    observe.on('add', function(changes){});
    observe.on('update', function(changes){});
    observe.on('delete', function(changes){});
    observe.on('reconfigure', function(changes){});
    observe.on('change', function(changes){}); // fired when any of the above events are emitted
});

```

### Observe events callback `changes`

`path`: full path to the property, including nesting  
`name`: name of the path  
`type`: name of the event  
`object`: object  
`value`: current value for the given path. same as object[name]  
`oldValue`: previous value of the property  

Example:
```js
var bjson = require('bjson');
var settings = bjson('settings', function(observe){
    observe.on('change', function(changes){
        console.log(changes);
    });
});

settings.foo = 'bar'

//log:
// { path: 'foo',
//   name: 'foo',
//   type: 'add',
//   object: { foo: 'bar' },
//   value: 'bar',
//   oldValue: undefined }
```
