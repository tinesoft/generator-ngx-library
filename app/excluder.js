
'use strict';

const path = require('path');
const glob = require('glob');

module.exports = class ExcludeParser {

  constructor(exclusions, cwd) {
    this.globFiles = [];
    this.exclusions = exclusions;
    this.exclusions.forEach(pattern => {
      this.globFiles = [...this.globFiles, ...glob.sync(pattern, {cwd: cwd})];
    });
  }

  isExcluded(file) {
    let fileBasename = path.basename(file);
    let result = false;

    for (let file of this.exclusions) {
      if (glob.hasMagic(file) && this.globFiles.length > 0) {
        let resultGlobSearch = this.globFiles.findIndex(element => {
          return path.basename(element) === fileBasename;
        });
        result = resultGlobSearch !== -1;
      } else {
        result = fileBasename === path.basename(file);
      }
      if (result) {
        break;
      }
    }
    return result;
  }
};
