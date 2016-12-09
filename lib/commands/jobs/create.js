// Create jenkins job command
const conf = require("../../util/config");
const logger = require("../../util/logger");
const prompt = require('readline-sync');
const createJobApi = require("../../api/createJob");

exports.command = 'create <name> [repository] [branch]';
exports.aliases = ["new"];
exports.describe = 'Create jenkins job for git repository with Jenkinsfile';
exports.builder = yargs =>
  yargs.count('verbose').alias('v', 'verbose')
  ;

exports.handler = argv => {
  if (!argv.repository) {
    argv.repository = prompt.question('Git repository to use: ');
    if (!argv.repository) {
      return logger.error(`Repository parameter is missing`);
    }
  }
  if (!argv.branch) {
    argv.branch = prompt.question('Git branch to checkout: ');
    if (!argv.branch) {
      return logger.error(`Repository branch name is missing`);
    }
  }

  createJobApi(conf.get("auth"), {
    name: argv.name,
    repository: argv.repository,
    branch: argv.branch
  }, function(err, data) {
    if (err) {
      logger.error(`Problem when creating ${argv.name} job`);
      if (argv.verbose) {
        logger.error(err);
      }
      return;
    }
    logger.info(`Job ${argv.name} created!`);
    if (argv.verbose) {
      logger.debug(data);
    }
  });
};

