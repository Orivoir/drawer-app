require('dotenv').config( {
  encoding: "utf-8"
} );

const
  Storage = require('storage-nosql-api'),

  app = require('express')(),

  server = require('http').Server( app ),

  session = require('express-session'),

  Memorystore = require('memorystore')( session ),

  sessionConfig = {

    resave: false,
    saveUninitialized: true,

    cookie: {
      maxAge: parseInt( process.env.SESSION_TIME ),
      httpOnly: true,
    },

    store: new Memorystore( {
      checkPeriod: parseInt( process.env.SESSION_TIME )
    } ),

    secret: "drawer-app-"

  },

  bodyParser = require('body-parser'),

  routes = require('./lib/routes/autoloader')
;

global.Storage = Storage;

if( process.env.NODE_ENV !== "dev" ) {

  sessionConfig.cookie.secure = true;
  sessionConfig.cookie.sameSite = true;

  app.use( function( request, response, next ) {

    response.removeHeader('X-Powered-By');
    next();

  } );
}

app
  .use( bodyParser.json() )
  .use( session( sessionConfig ) )
;

app
  .get('/', routes.home )

  .post( '/auth', routes.auth )

  .get('/csrf',
    routes.firewall,
    routes.getCsrf
  )


  .get(
    '/db',
    routes.firewall,
    routes.db
  )
  .get(
    '/project/:projectName',
    routes.firewall,
    routes.read.project
  )
  .get(
    '/collection/:projectName/:collectionName',
    routes.firewall,
    routes.read.collection
  )
  .get(
    '/doc/:projectName/:collectionName/:docId',
    routes.firewall,
    routes.read.doc
  )

  .post(
    "/project",
    routes.firewall,
    routes.post.project
  )
  .post(
    "/collection",
    routes.firewall,
    routes.post.collection
  )
  .post(
    "/doc",
    routes.firewall,
    routes.post.doc
  )

  .put(
    "/project",
    routes.firewall,
    routes.put.project
  )
  .put(
    "/collection",
    routes.firewall,
    routes.put.collection
  )
  .put(
    "/doc",
    routes.firewall,
    routes.put.doc
  )

  .delete(
    "/project",
    routes.firewall,
    routes.csrf,
    routes.delete.project
  )
  .delete(
    "/collection",
    routes.firewall,
    routes.csrf,
    routes.delete.collection
  )
  .delete(
    "/doc",
    routes.firewall,
    routes.csrf,
    routes.delete.doc
  )
  .delete(
    "/project/:token",
    routes.firewall,
    routes.csrf,
    routes.delete.project
  )
  .delete(
    "/collection/:token",
    routes.firewall,
    routes.csrf,
    routes.delete.collection
  )
  .delete(
    "/doc/:token",
    routes.firewall,
    routes.csrf,
    routes.delete.doc
  )

  .use( function( request, response ) {

    response.status( 404 );

    response.json( {
      statusCode: 404,
      statusText: "Not found",
      uri: request.url,
      method: request.method,
      "@next": "/"
    } );

  } )
;

server.listen( process.env.PORT, () => {

  console.log(
    `drawer:${process.env.DRAWER_ID} start at: ${process.env.PORT}`
  );

} );
