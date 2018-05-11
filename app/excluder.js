
'use strict';

const glob = require('glob');

module.exports = class ExcludeParser {
  constructor(exclusions, cwd) {
    this.globFiles = [];
    this.exclusions = exclusions;
    this.exclusions.forEach(pattern => {
      this.globFiles = [...this.globFiles, ...glob.sync(pattern, {cwd: cwd})];
    });
  }

  isExcluded(testedFile) {
    let result = false;

    for (let excludedFile of this.exclusions) {
      if (glob.hasMagic(excludedFile) && this.globFiles.length > 0) {
        let resultGlobSearch = this.globFiles.findIndex(element => {
          return testedFile === element;
        });
        result = resultGlobSearch !== -1;
      } else {
        result = testedFile === excludedFile;
      }
      if (result) {
        break;
      }
    }
    return result;
  }
};
