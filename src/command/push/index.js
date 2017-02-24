/**
 * Created by bidaudd on 24/02/2017.
 */
const git = require('gift');
const valid = require('chalk').green.bold;

class Push {
  constructor() {
    this.repo = git('.');
  }

  execute() {
    this.repo.branch((err, head)=>{
      if(err) console.error(err);
      this.repo.remote_push(`origin ${head.name}`, (err)=>{
        if(err) console.error(err);
        console.log(valid('Push to origin'));
      })
    })
  }
}

module.exports = Push;