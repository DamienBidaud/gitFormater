/**
 * Created by bidaudd on 24/02/2017.
 */
const git = require('gift');

class Push {
  constructor() {
    this.repo = git('.');
  }

  execute() {
    this.repo.branch((err, head)=>{
      if(err) console.error(err);
      console.log('k');
      this.repo.remote_push(`origin ${head.name}`, (err)=>{
        if(err) console.error(err);
      })
    })
  }
}

module.exports = Push;