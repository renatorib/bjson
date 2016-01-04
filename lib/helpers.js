var fs = require('fs');
module.exports = {
    keepExtension: function(file, ext){
        return (file.indexOf(ext, file.length - ext.length) !== -1)
            ? file
            : file + ext;
    },
    existsSync: function(file){
        // we need this function
        // since fs.existsSync is
        // deprecated.
        try {
            fs.accessSync(file);
            return true;
        } catch(ex) {
            return false;
        }
    }
}
