// Get build logs command
const conf = require("../util/config");
const logger = require("../util/logger");
const _ = require('underscore');
const prompt = require('readline-sync');
const fetchArtifact = require("../api/fetchArtifact.js");

exports.command = 'artifact <job> <buildNumber>';
exports.describe = 'Get job artifacts for specified build';
exports.builder = yargs => yargs.count('verbose').alias('v', 'verbose');

exports.handler = argv => {
  if (!argv.job) {
    argv.job = prompt.question('Jenkins job name: ');
  }
  if (!argv.buildNumber) {
    argv.buildNumber = prompt.question('Jenkins build number for the job: ');
  }
  fetchArtifact(conf.get("auth"), argv.job, argv.buildNumber, function(err, artifacts) {
    if (err) {
      logger.error(`Cannot fetch artifacts ${argv.job}`);
      if (argv.verbose) {
        logger.error(err);
      }
    } else if (artifacts) {
      logger.info("Build artifacts:");
      _.each(artifacts,(artifact) =>{
        console.log(artifact);
      });
    } else {
      logger.info("No build artifacts for the job and specified build");
    }
  });
};

