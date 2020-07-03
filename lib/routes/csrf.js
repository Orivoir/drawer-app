module.exports = function( request, response, next ) {

  const userToken = request.params.token || request.body.token;

  if( userToken === request.session.csrfToken ) {

    next();

  } else {

    response.status( 401 );
    response.json( {
      statusCode: 401,
      statusText: "Unauthorized",
      details: "Token invalid",
      "@next": "/csrf"
    } );

  }

};
