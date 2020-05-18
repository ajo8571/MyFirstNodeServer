const http = require('http')
const fs = require('fs'); //This will aloow us read/write to files in our filesystem
const path = require('path')//This aloows us specify a file path 
const port = 3000
const hostname = 'localhost'


//Sets up the server 
//req => this is the request from client
//res => response sent to client
const server = http.createServer((req,res)=>{
    console.log('Request for '+ req. url+ ' by method '+ req.method )
    if(req.method == 'GET'){
        var fileUrl;
        if(req.url == '/'){
            fileUrl = '/index.html'
        }
        else{
            fileUrl = req.url
        } 
        
        var filePath = path.resolve('./public' +fileUrl)
        const fileExt = path.extname(filePath)
        if(fileExt == '.html'){
            fs.exists(filePath,(exists)=>{
                if(!exists){
                    res.statusCode = 404
                    res.setHeader('Content-Type', 'text/html')
                    res.end('<html<body><h1>Error 404: resource '+ fileUrl+' not found</h1></body></html>')
                }else{
                    res.statusCode = 200
                    res.setHeader('Content-Type', 'text/html')
                    fs.createReadStream(filePath).pipe(res);
                }
            })
        }
        else{
            res.statusCode = 404
            res.setHeader('Content-Type', 'text/html')
            res.end('<html<body><h1>Error 404: resource not a html file</h1></body></html>')
        }
    }else{
        res.statusCode = 404
        res.setHeader('Content-Type', 'text/html')
        res.end('<html<body><h1>Error 404: http method not supported</h1></body></html>')
    }
})

//starts up the server and defines it listening port
server.listen(port,hostname,() => {
    console.log(`Server up and running @ http//:${hostname}:${port}`)//we use back quotes so we can use variables in the string
})