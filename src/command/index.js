/**
 * Created by bidaudd on 24/02/2017.
 */
const Show = require('./show');
const Add = require('./add');
const Commit = require('./commit');
const Push = require('./push');
const output = require('../utility/style');

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
          this.displayFiles('Files Added', this.files['staged'], output.green);
          console.log('');
          this.displayFiles('Files non staged', this.files['waiting'], output.red);
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
      output.title(titleLog);
      for (let i = 0; i < files.length; i++) {
        style('   ' + files[i]);
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
        output.valid('Files commit');
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
            output.valid('Files added to the commit');
            this.commitCommand.execute()
              .then(()=>{
                output.valid('Files commit');
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