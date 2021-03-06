/**
* Modified to browser usage from https://github.com/broofa/node-mime
*/
define(function (require) {
  var types = require('./types')

  function Mime() {
    // Map of extension -> mime type
    this.types = Object.create(null);

    // Map of mime type -> extension
    this.extensions = Object.create(null);
  }


  /**
   * Define mimetype -> extension mappings.  Each key is a mime-type that maps
   * to an array of extensions associated with the type.  The first extension is
   * used as the default extension for the type.
   *
   * e.g. mime.define({'audio/ogg', ['oga', 'ogg', 'spx']});
   *
   * @param map (Object) type definitions
   */
  Mime.prototype.define = function (map) {
    for (var type in map) {
      var exts = map[type];
      for (var i = 0; i < exts.length; i++) {
        this.types[exts[i]] = type;
      }

      // Default extension is the first one we encounter
      if (!this.extensions[type]) {
        this.extensions[type] = exts[0];
      }
    }
  };

  /**
   * Return file extension associated with a mime type
   */
  Mime.prototype.extension = function(mimeType) {
    var type = mimeType.match(/^\s*([^;\s]*)(?:;|\s|$)/)[1].toLowerCase();
    return this.extensions[type];
  };

  Mime.prototype.lookup = function(path, fallback) {
    var ext = path.replace(/.*[\.\/\\]/, '').toLowerCase();

    return this.types[ext] || fallback || this.default_type;
  };

  // Default instance
  var mime = new Mime();

  // Define built-in types
  mime.define(types);

  // Default type
  mime.default_type = mime.lookup('bin');

  return mime
})