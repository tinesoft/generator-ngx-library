const os = require('os');
const path = require('path');
const exec = require('child_process').exec;

const _root = path.resolve(__dirname, '..');

var exports = module.exports = {};

/**
 * Plaform independant path to an executable cmd
 * @param {string} path 
 */
exports.platformPath = function (path) {
    return /^win/.test(os.platform()) ? `${path}.cmd` : path;
};

/**
 * 
 * @param {string[]} args 
 */
exports.root = function (args) {
    args = Array.prototype.slice.call(arguments, 0);
    return path.join.apply(path, [_root].concat(args));
};

/**
 * Promisified child_process.exec
 *
 * @param cmd
 * @param opts See child_process.exec node docs
 * @returns {Promise<number>}
 */
exports.execp = function (cmd, opts) {
    opts || (opts = {});
    return new Promise((resolve, reject) => {
        const child = exec(cmd, opts,
			(err, stdout, stderr) => err ? reject(err.code) : resolve(0));

        if (opts.stdout) {
            child.stdout.pipe(opts.stdout);
        }
        if (opts.stderr) {
            child.stderr.pipe(opts.stderr);
        }
    });
};