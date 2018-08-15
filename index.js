const app = require ('express')();
const express = require('express');
const gitClient = require ('@octokit/rest')();

gitClient.authenticate({
  type: 'token',
  token: process.env.github_token
});

app.get('/projects', (req,res) => {
  gitClient.projects.getRepoProjects({owner: 'saralk', repo: 'virtualgit', state: 'all'})
  .then((result) => {
    res.json({projects: result.data});
  })
  .catch((error) => {
    console.error(error);
    res.status(500).send(error);
  })
});

app.get('/', (req, res) => {
  let options = {
    root: __dirname + '/public/',
    dotfiles: 'deny',
    headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
    }
  };

  res.sendFile('index.html', options, (error) => {
    if (error) {
      console.error(error);
      res.status(500).send(error)
    } else {
      console.log('GET index.html');
    }
  });
});

app.use('/images', express.static(__dirname + '/public/images'));
app.use('/src', express.static(__dirname + '/public/src'));

app.listen(3000);
