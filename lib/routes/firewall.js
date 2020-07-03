module.exports = function( request, response, next ) {

  if( !!request.session.isLogged ) {
    next();
  } else {

    response.status( 401 );
    response.json( {
      statusCode: 401,
      statusText: "Unauthorized",
      details: "Authentication required",
      "@next": "/auth"
    } );

  }

};