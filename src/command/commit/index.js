/**
 * Created by bidaudd on 24/02/2017.
 */
const git = require('gift');
const readLineSync = require('readline-sync');
const output = require('../../utility/style');

class Commit {
  constructor() {
    this.repo = git('.');
  }

  execute() {
    return new Promise((resolve, reject)=> {
      let message = "";
      this.repo.branch((err, head)=>{
        if(err) reject(err);
        message += head.name + ': ';
        message += readLineSync.question(output.question('What is the commit message ? '));
        this.repo.commit(message, (err)=>{
          if(err) reject(err);
          resolve(true);
        })
      })
    });
  }
}

module.exports = Commit;