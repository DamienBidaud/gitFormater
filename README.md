

# Git Formater
**(Beta version)**

Formater is a npm module who can add all your file uncommit
to your next commit and format your commit message with this format:
 ``<name-of-branch>: <your message>``
 
 Usage: formater <command>
 
 
   Commands:
 
     show        show the last updateed files
     add [all]   add file to the commit
     commit      commit files
     push        push files
     send [all]  add commit and push files
 
   Options:
 
     -h, --help     output usage information
     -V, --version  output the version number
     
 Road map:
 
 For the moment the add and send commands works only with the all option
 I have to update the function for available the chose of the file the user want to commit
 