module.exports = {

  project: function( request, response ) {

    const {projectName} = request.params;

    const isExistsProject = global.Storage.isExists.project( projectName );

    const content = {
      data: {
        projectName,
        isExistsProject
      }
    };

    if( !isExistsProject ) {

      content.success = false;
      content.details = "project not exists";

    } else {

      content.success = true;
      content.collections = global.Storage.read.projects( projectName );
    }

    response.json( content );

  },

  collection: function( request, response ) {

    const {projectName, collectionName} = request.params;

    const isExistsProject = global.Storage.isExists.project( projectName );
    const isExistsCollection = global.Storage.isExists.collection( {
      projectName,
      collectionName
    } );

    const content = {
      data: {
        projectName,
        collectionName,
        isExistsProject,
        isExistsCollection
      }
    };

    if( !isExistsCollection ) {

      response.status( 404 );

      content.success = false;
      content.statusCode = 404;
      content.statusText = "Not found";

    } else {

      content.success = true;
      content.docs = global.Storage.read.docs( {
        projectName,
        collectionName
      } );

      content.statusCode = 200;
      content.statusText = "Success";

    }

    response.json( content );

  },

  doc: function( request, response ) {

    const {collectionName, projectName, docId} = request.params;

    const isExistsProject = global.Storage.isExists.project( projectName );

    const isExistsCollection = global.Storage.isExists.collection( {
      projectName,
      collectionName
    } );

    const isExistsDoc = global.Storage.isExists.doc( {
      projectName,
      collectionName,
      docRef: docId
    } );

    const content = {
      data: {
        projectName,
        collectionName,
        docId,
        isExistsProject,
        isExistsCollection,
        isExistsDoc
      }
    };

    if( isExistsDoc ) {

      content.success = true;
      content.statusCode = 200;
      content.statusText = "Success";

      content.docs = global.Storage.read.docs( {
        projectName,
        collectionName
      } );

    } else {

      content.success = false;

      response.status( 404 );

      content.statusCode = 404;
      content.statusText = "Not found";
    }

    response.json( content );

  }

};