/**
 * Created by bidaudd on 24/02/2017.
 */
const Show = require('./show');
const Add = require('./add');
const Commit = require('./commit');
const Push = require('./push');
const valid = require('chalk').green.bold;
const green = require('chalk').green;
const red = require('chalk').red;
const title = require('chalk').bold.underline;

class Command {
  constructor(){
    this.showCommand = new Show();
    this.addCommand = new Add();
    this.commitCommand = new Commit();
    this.pushCommand = new Push();
    this.files = []
  }

  show() {
    return new Promise((resolve, reject) => {
      this.showCommand.execute()
        .then((data) => {
          this.files = data;
          this.displayFiles('Files Added', this.files['staged'], green);
          console.log('');
          this.displayFiles('Files non staged', this.files['waiting'], red);
          resolve(true);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  }

  displayFiles(titleLog, files, style) {
    if(files.length > 0) {
      console.log(title(titleLog));
      for (let i = 0; i < files.length; i++) {
        console.log('   ' + style(files[i]));
      }
    }
  }

  add(all) {
    this.showCommand.execute()
      .then((data) => {
        this.addCommand.execute(all, data).catch((err)=>{console.error(err)});
      })
      .catch((err) => {
        console.log(err);
      });
  }

  commit() {
    this.commitCommand.execute()
      .then(() => {
        console.log(valid('File commit'));
      })
      .catch((err)=>{console.error(err)});
  }

  push() {
    this.pushCommand.execute();
  }

  send(all) {
    this.showCommand.execute()
      .then((data) => {
        this.addCommand.execute(all, data)
          .then(()=>{
            console.log(valid('Files added to the commit'));
            this.commitCommand.execute()
              .then(()=>{
                console.log(valid('File commit'));
                this.pushCommand.execute();
              })
              .catch((err)=>{console.error(err)});
          })
          .catch((err)=> {
            console.error(err)
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

module.exports = Command;