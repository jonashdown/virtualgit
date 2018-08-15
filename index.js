const app = require ('express')();
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

app.get('/images/:file', (req,res) => {
  let filename = req.params.file
  let options = {
    root: __dirname + '/public/images/',
    dotfiles: 'deny',
    headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
    }
  };

  res.sendFile(filename, options, (error) => {
    if (error) {
      console.error(error);
      res.status(500).send(error)
    } else {
      console.log(`GET images/${filename}`);
    }
  });
});

app.get('/src/:file', (req,res) => {
  let filename = req.params.file
  let options = {
    root: __dirname + '/public/src/',
    dotfiles: 'deny',
    headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
    }
  };

  res.sendFile(filename, options, (error) => {
    if (error) {
      console.error(error);
      res.status(500).send(error)
    } else {
      console.log(`GET src/${filename}`);
    }
  });
})

// app.get('/images/:file', (req, res) => {
//   let fileName = req.params.file;
//   res.sendFile('./images')
//   .then(() => {
//     console.log('GET index.html');
//   })
//   .catch((error) => {
//     console.error(error);
//     res.status(500).send(error)
//   });
app.listen(3000);