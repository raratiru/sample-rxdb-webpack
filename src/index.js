import { createRxDatabase, addRxPlugin } from 'rxdb';
addRxPlugin(require('pouchdb-adapter-idb'));

import { RxDBReplicationGraphQLPlugin } from 'rxdb/plugins/replication-graphql';
addRxPlugin(RxDBReplicationGraphQLPlugin);

const schemas = JSON.parse(document.getElementById("json-schema").text);
const message = document.getElementById("messages")

const pullQueryBuilder = doc => {
    if (!doc) {
        // the first pull does not have a start-document
        doc = {
            id: '0',
            modified: '0.0'
        };

    }
    const query = `query {
        schemas(leastDate: "${doc.modified}", lastId: "${doc.id}"){
            id
            nameEl
            nameEn
            inactive
            modified
        }
    }`;
    console.log(doc)
    return {
        query,
        variables: {}
    };
};

async function createDb() {
    message.innerHTML = "Creating the db"
    const db = await createRxDatabase({
        name: 'mydatabase',
        adapter: 'idb' // name of the adapter
    });

    message.innerHTML = "Creating the collections"
    const collections = await db.addCollections({
        schema: {
            schema: schemas[0]
            /* migrationStrategies: {
              // 1 means, this transforms data from version 0 to version 1
              1: function(oldDoc){
                return oldDoc;
              }
            }*/
        },
        test: {
            schema: schemas[1]
        }
    });

    message.innerHTML = "Synchronizing schema"
    const replicationState = db.schema.syncGraphQL({
        url: 'http://127.0.0.1:8000/inhouse/talkabout/', // url to the GraphQL endpoint
        pull: {
            queryBuilder: pullQueryBuilder, // the queryBuilder from above
            // modifier: doc => doc // (optional) modifies all pulled documents before they are handeled by RxDB. Returning null will skip the document.
        },
        deletedFlag: 'inactive', // the flag which indicates if a pulled document is deleted
        live: true // if this is true, rxdb will watch for ongoing changes and sync them, when false, a one-time-replication will be done
    });

    collections.schema.insert({
        id: "100000",
        nameEl: "Greek",
        nameEn: "English",
        inactive: false,
        modified: "12321234"
    });
    console.log("Yep, saved");
    message.innerHTML = collections.schema.find().exec();
    // return db;
}

// createDb().then((db) => console.dir(db))
createDb().catch(err => {
    console.log('createDb() threw an error:');
    console.error(err);
});
