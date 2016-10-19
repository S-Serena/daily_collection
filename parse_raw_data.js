var fs = require('fs');
var _ = require('lodash');

var filename = './business.csv';

fs.readFile(filename, 'utf8', (err, data) => {
  var lines = _.filter(_.split(data, '\n'), (line) => !_.isEmpty(_.trim(line)));
  var result = _.reduce(lines, reducer, {});
  // console.log(JSON.stringify(result, null, '    '));
  fs.writeFile('output1.json', JSON.stringify(result, null, '    '), (err, data) => {
    console.log('done');
  });
});

function reducer(acc, line) {
  var items = _.split(line, ',');
  // if (items.length !== 4){
  //   console.log('[err length !== 4]' + line);
  //   return acc;
  // }
  
  var key = items[items.length - 1];
  var regex = /B\d{3}|\d{3}/g;
  var part = null;
  var path = [];
  while ((part = regex.exec(key)) !== null) {
    path.push(part[0]);
  }

  for (var i = 0; i < path.length; i++) {
    if (i > 0) {
      path[i] = path[i-1] + path[i];
    }
  }
  
  var value = items[path.length - 1];
  _.set(acc, path, value);
  
  return acc;
}
