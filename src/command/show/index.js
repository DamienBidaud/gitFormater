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
      files['staged'] = [];
      files['waiting'] = [];
      this.repo.status((err, status) => {
        if(err) {
          reject(err);
        }
        Object.keys(status.files).map((k) => {
          if (status.files[k].staged)
            files['staged'].push(k);
          else
            files['waiting'].push(k);
        });
        resolve(files);
      });
    });
  }

}

module.exports =  Show;