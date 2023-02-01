const http = require('http') ; 
const app = require('./app')
const port = process.env.PORT || 3200 ; 

const server = http.createServer(app) ;

server.listen(port , ()=>
{
    console.log(`listening on ${port}`);
}) ; 