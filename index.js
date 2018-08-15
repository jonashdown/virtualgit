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

app.listen(3000);