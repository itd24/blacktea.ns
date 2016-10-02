"use strict"

var path = require('path');

/**
 * the default root used as the starting point
 * @type {string}
 */
var root = process.cwd();

/**
 * some private functions
 * @type {Object}
 */
var privateFunctions = {
  /**
   * helper function to require a library by path
   * @param  {string} rootDir the root directory
   * @param  {string} dotPath the namespace we are searching for
   * @return {mixed}         the required module, if it exists. 
   */
    requireByPath: function(rootDir,dotPath){
          var splittedPaths = dotPath.split("..");
          splittedPaths.forEach(function(value,index){
             splittedPaths[index] = value.replace(/\./g,path.sep);
          });
          
          let relativePath = splittedPaths.join(".");
          let realPath = path.resolve(rootDir,relativePath);
          return require(realPath);
    }
}

var Ns = {
  /**
   * sets/gets the root
   * @return {string} only returns the root, if there are no arguments
   */
  root:function(){
      var args = Array.prototype.slice.call(arguments);
      if(args.length == 0)
        return root;
      root = path.resolve.apply(this,args);
  },
  /**
   * adds a namespace root. For example, if we add a root with
   * keyword "modules" and a path, then all files under that path will be available from that particular keyword (ns.modules)
   * @param {string} keyword the keyword to add
   * @param {string} dir     the directory this keyword will point to
   */
  addPath:function(keyword,dir){
      if(!keyword)
        return;
        var rootDir = dir;
      if(dir.constructor === Array){
          rootDir = path.resolve.apply(this,dir);
      }
      this[keyword] = {
          _root:rootDir,
          root:function(){
              var args = Array.prototype.slice.call(arguments);
              if(args.length == 0)
                return this._root;
              this._root = path.resolve.apply(this,args);
          },
          require:function(dotPath){
              return privateFunctions.requireByPath(this._root,dotPath);
          }
      }
  },
  /**
   * requires a file based on a namespace
   * @param  {string} dotPath the namespace
   * @return {mixed}         the required module
   */
  require: function(dotPath){
      return privateFunctions.requireByPath(root,dotPath);
  }
};

module.exports = Ns;