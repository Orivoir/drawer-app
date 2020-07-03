module.exports = function( request, response ) {

  response.json( {
    statusCode: 200,
    statusText: "Success",
    token: request.session.csrfToken
  } )
}