/**
 * Created by bidaudd on 24/02/2017.
 */
const Show = require('./show');
const Add = require('./add');
const Commit = require('./commit');
const Push = require('./push');
const Send = require('./send');

class Command {
  constructor(){
    this.showCommand = new Show();
    this.addCommand = new Add();
    this.commitCommand = new Commit();
    this.pushCommand = new Push();
    this.sendCommand = new Send();
    this.files = []
  }

  show() {
    return new Promise((resolve, reject) => {
      this.showCommand.execute()
        .then((data) => {
          this.files = data;
          for(let i = 0; i < this.files.length; i++) {
            console.log(this.files[i]);
          }
          resolve(true);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
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
        console.log('File commit');
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
          .then((data)=>{
            console.log('Files added to the commit');
            this.commitCommand.execute().then((data)=>{
              console.log('File commit');
              this.pushCommand.execute();
            }).catch((err)=>{console.error(err)});
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