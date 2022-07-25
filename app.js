const express = require('express');
const { engine } = require('express-handlebars');
const myconnection = require('express-myconnection');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const tasksRoutes = require('./scr/routes/tasks');


const app = express();
app.set('port', 3000);

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.set('views', __dirname + '/scr/views');
app.engine('.hbs', engine({
  extname: '.hbs',
}));
app.set('view engine', 'hbs');

app.use(myconnection(mysql, {
  host: 'ec2-54-86-97-252.compute-1.amazonaws.com',
  user: 'beruon',
  password: 'Beruon3710.',
  port: 3306,
  database: 'primerlabnube'
}, 'single'));

app.listen(app.get('port'), () => {
  console.log('Listening on port ', app.get('port'));
});

app.use('/', tasksRoutes);

app.get('/', (req, res) => {
  res.render('home');
});  