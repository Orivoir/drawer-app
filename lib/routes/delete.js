module.exports = {

  project: function( request, response ) {

    const {projectName} = request.body;

    response.json(
      global.Storage.delete.project( projectName )
    );

  },

  collection: function( request, response ) {

    const { projectName, collectionName } = request.body;

    response.json(
      global.Storage.delete.collection(
        { projectName, collectionName }
      )
    );

  },

  doc: function( request, response ) {

    const { projectName, collectionName, docId } = request.body;

    response.json(
      global.Storage.delete.doc(
        { projectName, collectionName, docRef: docId }
      )
    )

  }

};