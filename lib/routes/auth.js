module.exports = function( request, response ) {

  const {auth} = request.body;
  const {AUTH} = process.env;

  if( auth === AUTH ) {

    request.session.isLogged = true;
    request.session.csrfToken = `csrf-${Date.now().toString()}${Math.random().toString().replace( '.', ( '-' + ( Date.now() / 2 * Math.random() ).toString().replace( '.', '-unicorn' ) ) )}`;

    response.json( {
      success: true,
      statusCode: 200,
      statusText: "Success",
      isLogged: true
    } );

  } else {

    response.json({
      success: false,
      statusCode: 200,
      statusText: "Success",
      isLogged: false,
      details: "Credentials error"
    });

  }

};