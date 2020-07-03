const
  fs = require('fs'),
  path = require('path'),
  excludes = ['autoloader.js'],
  routes = {}
;

fs.readdirSync( __dirname, {
  withFileTypes: true,
  encoding: "utf-8"
} ).map( dirent => (
  typeof dirent === "object" ? dirent.name: dirent
) ).filter( elementName => {

  const pathElement = path.join( __dirname, elementName );

  const scanElement = fs.statSync( pathElement );

  return scanElement.isFile();

} ).filter( filename => {
  const ext = filename.split( '.' ).slice( -1 )[0];
  return ext.toLocaleLowerCase() === "js";
} ).filter( filename => (
  !excludes.includes(filename)
) ).forEach( filename => {

  const file = filename.split('.')[0];
  routes[ file ] = require( path.join( __dirname, filename ) );

} );

module.exports = routes;
