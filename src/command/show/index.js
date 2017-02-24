/**
 * Created by bidaudd on 24/02/2017.
 */

const git = require('gift');

class Show {
  constructor() {
    this.repo = git('.');
  }

  execute() {
    return new Promise((resolve, reject) => {
      let files = [];
      this.repo.status((err, status) => {
        if(err) {
          reject(err);
        }
        Object.keys(status.files).map((k) => {
          files.push(k);
        });
        resolve(files);
      });
    });
  }

}

module.exports =  Show;