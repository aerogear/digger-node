// Get build logs command
const conf = require("../util/config");
const logger = require("../util/logger");
const prompt = require('readline-sync');
const streamLogs = require("../api/streamLogs");

exports.command = 'log <job> <buildNumber>';
exports.describe = 'Stream jenkins logs for triggered build';
exports.builder = yargs => yargs.count('verbose').alias('v', 'verbose');

exports.handler = argv => {
  if (!argv.job) {
    argv.job = prompt.question('Jenkins job name: ');
  }
  streamLogs(conf.get("auth"), argv.job, argv.buildNumber, console, function(err) {
    if (err) {
      logger.error(`Cannot fetch build log for ${argv.job}`);
      if (argv.verbose) {
        logger.error(err);
      }
    }
  });
};

