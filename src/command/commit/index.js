/**
 * Created by bidaudd on 24/02/2017.
 */
const git = require('gift');
const prompt = require('prompt');

class Commit {
  constructor() {
    this.repo = git('.');
  }

  execute() {
    return new Promise((resolve, reject)=> {
      let message = "";
      this.repo.branch((err, head)=>{
        reject(err);
        console.log(head.name);
        message += head.name + ': ';
        prompt.get('message', (err, input)=>{
          message += input.message;
          this.repo.commit(message, (err)=>{
            reject(err);
            resolve(true);
          })
        })
      })
    });
  }
}

module.exports = Commit;