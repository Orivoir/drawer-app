module.exports = {

  project: function( request, response ) {

    const {projectName, newProjectName} = request.body;

    response.json(
      global.Storage.update.project( {
        projectName,
        newProjectName
      } )
    );

  },

  collection: function( request, response ) {

    const { projectName, collectionName, newCollectionName } = request.body;

    response.json(
      global.Storage.update.collection(
        { projectName, collectionName, newCollectionName }
      )
    );
  },

  doc: function( request, response ) {

    const { projectName, collectionName, docRef, newDoc } = request.body;

    response.json(
      global.Storage.update.doc(
        { projectName, collectionName, docRef, newDoc }
      )
    );

  }

};