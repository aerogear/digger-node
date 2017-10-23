const _ = require('underscore');
const authHelper = require("../util/auth");
const Jenkins = require('jenkins');

/**
 * Fetches the URLS of the artifacts from a job in Jenkins.
 *
 * @module api/fetchArtifact
 *
 * @param {JenkinsAuth} auth - The authentication object to pass
 * @param {string} jobName - Name of the Jenkins Job
 * @param {number} buildNumber - Build number to fetch artifacts
 * @param {module:api/fetchArtifact.fetchArtifactCallback} callback - Callback to call
 *
 */
module.exports = (auth, jobName, buildNumber, callback) => {
    const options = authHelper.createJenkinsOptions(auth.url, auth.user, auth.password);
    const jenkins = Jenkins(options);
    jenkins.build.get(jobName, buildNumber, (err, data) => {
        if (err) {
            return callback(err);
        }
        if (!data && !data.artifacts) {
            return callback();
        }
        const baseURL = auth.url;
        const artifactUrl = `${baseURL}/job/${jobName}/${buildNumber}/artifact/`;
        var artifactList = [];
        _.each(data.artifacts, artifact => {
            artifactList.push(artifactUrl + artifact.relativePath);
        });
        if (artifactList.length > 0) {
            return callback(err, artifactList);
        }
        callback(err);
    });
};

/**
 * @callback module:api/fetchArtifact.fetchArtifactCallback
 * @param {*} error Error, or null if no error
 * @param {string[]} data - an array containing the URLs of the artifacts
 */