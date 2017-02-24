/**
 * Created by bidaudd on 24/02/2017.
 */
const git = require('gift');
const prompt = require('prompt');
class Add {
  constructor() {
    this.repo = git('.');
    this.files = [];
  }

  execute(all, files) {
    const actions = [];
    actions[true] = this.addAll;
    actions[false] = this.addOneByOne;
    if(files.length === 0) {
      console.log('Sorry nothing to commit');
    }else {
      this.files = actions[all](files, 0);
      this.repo.add(this.files, (err)=>{
        if(err) console.error(err);
      });
    }
  }

  addAll(files) {
    return (files);
  }

  addOneByOne(files, i) {
    const self = this;
    console.log(`Do you want to add ${files[i]}?`);
    prompt.get(['answer'], (err, input) => {
      let tmps = [];
      if(input.answer === 'o') {


        if (i+1 < files.length)
          tmps = this.addOneByOne(files, i++);
        return tmps.push(files[i]);
      }
    });
  }
}

module.exports = Add;