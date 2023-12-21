const express = require('express')
const dotenv = require('dotenv')
const {graphqlHTTP} = require('express-graphql')
const cors = require('cors')

const db = require('./config/db')



dotenv.config({path:"./.env"})
const app= express()
const schema =require("./schema/schema")
const colors=require("colors")
app.use(cors())

app.get('/', (req, res) => {
    res.send('<h1>Welcome to My Express.js App!</h1>');
});
// connect db
db()
app.use("/graphql",graphqlHTTP({
schema,
graphiql:process.env.NODE_ENV==="devlopment"
}))


// app.use()
app.listen(process.env.PORT,()=>{
console.log(`port is listening to  ${process.env.PORT}`)
})