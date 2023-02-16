module.exports = {
  apps : [{
    script: 'npm start'
  }],

  deploy : {
    production : {
      key: 'key.pem',
      user : 'ubuntu',
      host : '18.235.233.206',
      ref  : 'origin/main',
      repo : 'git@github.com:pictoreal/PICSOREEL2K23.git',
      path : '/home/ubuntu/PICSOREEL2K23',
      'pre-deploy-local': '',
      'post-deploy' : 'source ~/.nvm/nvm.sh && npm install --force && npm run build && pm2 reload ecosystem.config.js --env production',
      'pre-setup': '',
      'ssh_options': 'ForwardAgent=yes'
    }
  }
};
