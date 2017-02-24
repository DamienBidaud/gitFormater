/**
 * Created by bidaudd on 24/02/2017.
 */
const git = require('gift');
const prompt = require('prompt');
const readlineSync = require('readline-sync');

class Add {
  constructor() {
    this.repo = git('.');
    this.files = [];
  }

  execute(all, files) {
    return new Promise((resolve, reject)=> {
      const actions = [];
      actions[true] = this.addAll;
      actions[false] = this.addOneByOne;
      if(files['waiting'].length === 0) {
        console.log('Sorry nothing to commit');
        resolve(true);
      }else {
        this.files = actions[all](files['waiting']);
        this.repo.add(this.files, (err)=>{
          if(err) reject(err);
          resolve(true);
        });
      }
    });
  }

  addAll(files) {
    return (files);
  }



  addOneByOne(files) {
    let i = 0;
    let answer;
    let filesCommit = [];
    while (i < files.length) {
      answer = readlineSync.question(`Do you want to add ${files[i]}? (y/n)`);
      if(answer === 'y') filesCommit.push(files[i]);
      i++;
    }
    return filesCommit;
  }
}

module.exports = Add;