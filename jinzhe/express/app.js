const path = require('path')
const express = require('express')
var csv = require("csvtojson")

const app = express()
const port = 3000

app.get('/', (request, response) => {
  response.render('index.ejs')
})

app.get('/test', (request, response) => {
  response.render('test.ejs')
})

app.get('/data/sg_map.json', (request, response) => {
  response.send(require(__dirname + '/data/sg_map.json'))
})

app.get('/data/segmentation.json', (request, response) => {
  csv().fromFile(__dirname + '/data/segmentation.csv')
    .then(json => response.send(json))
})

app.get('/data/stage_1/weekday_evening.json', (request, response) => {
  csv().fromFile(__dirname + '/data/stage_1/weekday_evening_merged_objects_plot.csv')
    .then(json => response.send(json))
})

app.get('/data/stage_1/weekday_morning.json', (request, response) => {
  csv().fromFile(__dirname + '/data/stage_1/weekday_morning_merged_objects_plot.csv')
    .then(json => response.send(json))
})

app.get('/data/stage_1/weekend_evening.json', (request, response) => {
  csv().fromFile(__dirname + '/data/stage_1/weekend_evening_merged_objects_plot.csv')
    .then(json => response.send(json))
})

app.get('/data/stage_1/weekend_morning.json', (request, response) => {
  csv().fromFile(__dirname + '/data/stage_1/weekday_morning_merged_objects_plot.csv')
    .then(json => response.send(json))
})

app.use('/static', express.static("public"));

app.use((err, request, response, next) => {
  console.log(err)
  response.status(500).send('Something broke!')
})

app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})