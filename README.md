* Clone the repo
* yarn install
* yarn dev
* open 127.0.0.1:8080

This setup, is a working example to understand the logic. 

Versions follow the `package.json` in the [rxdb repository](https://github.com/pubkey/rxdb/blob/master/package.json), while webpack configuration is inspired from the [relevant configuration example](https://github.com/pubkey/rxdb/blob/master/config/webpack.config.js).

It uses [replication-graphql](https://rxdb.info/replication-graphql.html) based on [the example](https://github.com/pubkey/rxdb/blob/master/examples/graphql/client/index.js).


 A schema has to be provided in the template that contains the fields: `id`, `nameEl`, `nameEn`, `inactive`, `modified`.
