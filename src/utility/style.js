/**
 * Created by bidaudd on 24/02/2017.
 */
'use strict';

const chalk = require('chalk')

class OutputStyle {
   static red(message) {
    console.log(chalk.red(message));
   }

   static valid(message) {
    console.log(chalk.green.bold(message));
   }

   static green(message) {
    console.log(chalk.green(message));
   }

  static title(message) {
   console.log(chalk.bold.underline(message));
  }

  static question(message) {
    return chalk.cyan.bold(message);
  }

  static warning(message) {
    console.log(chalk.yellow.bold(message));
  }
}


module.exports = OutputStyle;