module.exports = {

  project: function( request, response ) {

    const {projectName} = request.body;

    response.json(
      global.Storage.create.project( projectName )
    );

  },

  collection: function( request, response ) {

    const {projectName, collectionName} = request.body;

    response.json(
      global.Storage.create.collection( {
        projectName,
        collectionName
      } )
    );

  },

  doc: function( request, response ) {

    const { projectName, collectionName, doc } = request.body;

    response.json(
      global.Storage.create.doc({
        projectName,
        collectionName,
        doc
      } )
    );

  }

};