require('dotenv').config();
const {createServer} = require('http');
let express = require('express');
const compression = require('compression');
const morgan = require('morgan');
const path = require('path');
let port = process.env.PORT || 8888
let request = require('request');
let querystring = require('querystring');

var client_id = process.env.REACT_APP_CLIENT_ID; // Your client id
var client_secret = process.env.REACT_APP_CLIENT_SECRET; // Your secret
var redirect_uri = 'http://localhost:8888/callback'; // Your redirect uri

let app = express()
const dev = app.get('env') !== 'production';

if (!dev) {
  app.disable('x-powered-by');
  app.use(compression());
  app.use(morgan('common'));
  console.log(path)
  app.use(express.static(path.resolve('../', 'build')));
  
  app.get('/login', function(req, res) {
    res.redirect('https://accounts.spotify.com/authorize?' +
      querystring.stringify({
        response_type: 'code',
        client_id: client_id,
        scope: scope,
        redirect_uri
      }))
  })

  app.get('/callback', function(req, res) {
    let code = req.query.code || null
    let authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri,
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + (new Buffer(
          client_id + ':' + client_secret
        ).toString('base64'))
      },
      json: true
    }
    request.post(authOptions, function(error, response, body) {
      var access_token = body.access_token
      let uri = process.env.FRONTEND_URI || 'http://localhost:8888/token/#'
      res.redirect(uri + 'access_token=' + access_token)
    })
  })

  app.get('*', (req, res) => {
    res.sendFile(path.resolve('../', 'build', 'index.html'));
  })

}



var scope = 'user-read-private user-read-email user-read-playback-state playlist-modify-public user-read-recently-played user-top-read';

// app.use(express.static('../'));
// app.use(express.static(path.join('../', 'build')));
// app.get('/ping', function (req, res) {
//   return res.send('pong');
//  });

app.get('/login', function(req, res) {
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri
    }))
})

app.get('/callback', function(req, res) {
  let code = req.query.code || null
  let authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    form: {
      code: code,
      redirect_uri,
      grant_type: 'authorization_code'
    },
    headers: {
      'Authorization': 'Basic ' + (new Buffer(
        client_id + ':' + client_secret
      ).toString('base64'))
    },
    json: true
  }
  request.post(authOptions, function(error, response, body) {
    var access_token = body.access_token
    let uri = process.env.FRONTEND_URI || 'http://localhost:3000/token/#'
    res.redirect(uri + 'access_token=' + access_token)
  })
})

const server = createServer(app);

server.listen(port, err => {
  if (err) throw err;
  console.log('Server started');
})

// console.log(`Listening on port ${port}. Go /login to initiate authentication flow.`)
// app.listen(port)