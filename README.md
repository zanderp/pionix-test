# pionix-test

## Node.js, Knex.js, Express.js, Passport.js, Redis Session

##To install the main app

After you've cloned the repository, navigate into the app folder and run the following commands:

```
npm install
npm install -g knex
knex migrate:latest --env development
knex seed:run --env development
```
To run the rabbitmq consumer navigate into the rabbitconsumer folder and run :

```
node index.js or npm test
```
You should be able to see messages regarding the newly added projects and the deletion of any project.

This is just for test purpose.

The tests are not completed and the SOAP part isn't done.
