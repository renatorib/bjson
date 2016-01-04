# bjson
Bind Json: Reactive way to write json files.  

## How works
When you need to edit a json file, what you do?  
- Read json file.
- Deserialize json file.
- Edit parsed object.
- Serialize new object.
- Write back into file.

With bjson, you will do it:
- Read json file. (Will return parsed object)
- Edit object. (All changes are reactive. Will write it back into file)

## How to use

### Binding json
*settings.json*
```json
{}
```

*whatever.js*
```js
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

```

*settings.json:*
```json
{
    "prop": "foo",
    "otherprop": "bar",
}
```

### Observe events

```js
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
