
const express = require('express')
const fs = require('fs')
const app = express()
const URLData = JSON.parse(fs.readFileSync(`${__dirname}/data/URL.json`));

app.set('view engine', 'ejs')
app.use(express.static(`/public`))
app.use(express.json())
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))



app.get('/', (req, res) => {
    // res.status(200).json({
    //   status:"success",
    //   data:{URLData}
    // })
    res.render('index', { links: URLData })
})

app.post('/', (req, res) => {
  console.log(req.body)
  const newId = URLData[URLData.length - 1].id + 1
  const link = new URL(req.body.link)
  const shortURL = link.hostname
  const newURL ={
    id:newId,
    link:req.body.link,
    short:shortURL
  } 
  URLData.push(newURL)

  if(link){
  fs.writeFile(`${__dirname}/data/URL.json`, JSON.stringify(URLData), (err) => {
   // res.status(201).json({
   //   status: 'success',
   //   data:{
   //     newURL,
   //   },
   // })
   res.render('index', { links: URLData })
 })
  }else{
    res.status(400).send('Invalid URL')
  }
 
})

app.listen(process.env.Port || 5000, '127.0.0.1', () => {
  console.log('successful')
})
