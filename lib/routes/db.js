module.exports = function( request, response ) {

  response.json( {
    success: true,
    statusCode: 200,
    statusText: "Success",
    projects: global.Storage.scan.db()
  } );

};