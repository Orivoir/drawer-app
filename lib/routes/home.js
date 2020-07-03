module.exports = function( request, response, next ) {

  response.status( 200 );

  response.json( {
    statusCode: 200,
    statusText: "Success",
    "Drawer API": process.env.DRAWER_ID,
  } );

};