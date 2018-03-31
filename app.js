const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb://daniel:dan876@ds014118.mlab.com:14118/gql-ninja');
mongoose.connection.once('open',()=>{
    console.log('connected to the database');
});

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(4000, ()=>{
    console.log('now listining for requests on port 4000');
});