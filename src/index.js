import { createRxDatabase } from 'rxdb';

addRxPlugin(require('pouchdb-adapter-idb'));

// const db = await createRxDatabase({
//   name: 'mydatabase',
//   adapter: 'idb' // name of the adapter
// });
// console.dir(db)
