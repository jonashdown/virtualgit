const express = require('express');
const app = express();
const gitClient = require ('@octokit/rest')();

gitClient.authenticate({
  type: 'token',
  token: process.env.github_token
});

app.get('/projects', (req,res) => {
  gitClient.projects.getRepoProjects({owner: 'saralk', repo: 'virtualgit', state: 'all'})
  .then((result) => {
    console.log('GET projects');
    res.json({projects: result.data});
  })
  .catch((error) => {
    console.error(error);
    res.status(error.code || 500).send(error);
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

app.get('/project/:id', (req,res) => {
  let project_id = req.params.id
  gitClient.projects.getProject({project_id})
  .then((result) => {
    console.log(`GET project/${project_id}`);
    res.json({project: result.data})
  })
  .catch((error) => {
    console.error(error);
    res.status(error.code).send(error);
  })
});

app.listen(3000);
