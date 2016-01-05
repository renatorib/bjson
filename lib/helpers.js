'use strict';

const fs = require('fs');

module.exports = {
  keepExtension: (file, ext) => {
    return (file.indexOf(ext, file.length - ext.length) !== -1)
      ? file
      : file + ext;
  },
  existsSync: (file) => {
    /**
     * We need this function since 
     * fs.existsSync is deprecated.
     */
    try {
      fs.accessSync(file);
      return true;
    } catch(ex) {
      return false;
    }
  }
}
