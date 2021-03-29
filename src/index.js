import {
    createRxDatabase,
    addRxPlugin
} from 'rxdb';

addRxPlugin(require('pouchdb-adapter-idb'));

async function run() {
  const db = await createRxDatabase({
    name: 'heroesdb',           // <- name
    adapter: 'idb',          // <- storage-adapter
    password: 'myPassword',     // <- password (optional)
    multiInstance: true,         // <- multiInstance (optional, default: true)
    eventReduce: false // <- eventReduce (optional, default: true)
  });
  console.dir(db);
}
run();
