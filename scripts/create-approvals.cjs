const fs = require('fs-extra');
const path = require('path');

/**
 * Create an approvals.json file with the specified structure
 * 
 * @param {Object} options - Options for creating the approvals file
 * @param {string} options.author - GitHub username of the commenter
 * @param {string} options.prNumber - PR number
 * @param {string} options.repoOwner - Repository owner
 * @param {string} options.repoName - Repository name
 * @param {string} options.commitSha - Commit SHA
 * @param {string} options.outputPath - Path to write the approvals.json file
 * @returns {Promise<string>} - Path to the created approvals file
 */
async function createApprovalsFile({
  author,
  prNumber,
  repoOwner,
  repoName,
  commitSha,
  outputPath = '.testivai/visual-regression/approvals.json'
}) {
  // Create the approvals data structure
  const approvalsData = {
    approved: ['ALL'],
    rejected: [],
    new: [],
    deleted: [],
    meta: {
      author,
      timestamp: new Date().toISOString(),
      source: `GitHub PR #${prNumber}`,
      pr_url: `https://github.com/${repoOwner}/${repoName}/pull/${prNumber}`,
      commit_sha: commitSha,
      commit_url: `https://github.com/${repoOwner}/${repoName}/commit/${commitSha}`
    }
  };

  // Ensure the directory exists
  await fs.ensureDir(path.dirname(outputPath));

  // Write the approvals file
  await fs.writeJson(outputPath, approvalsData, { spaces: 2 });

  console.log(`Created approvals file at ${outputPath}`);
  return outputPath;
}

// If this script is run directly from the command line
if (require.main === module) {
  const author = process.env.GITHUB_COMMENTER || process.argv[2];
  const prNumber = process.env.PR_NUMBER || process.argv[3];
  const repoOwner = process.env.REPO_OWNER || process.argv[4];
  const repoName = process.env.REPO_NAME || process.argv[5];
  const commitSha = process.env.COMMIT_SHA || process.argv[6];
  const outputPath = process.env.APPROVALS_PATH || process.argv[7] || '.testivai/visual-regression/approvals.json';

  if (!author || !prNumber || !repoOwner || !repoName || !commitSha) {
    console.error('Missing required parameters.');
    process.exit(1);
  }

  createApprovalsFile({
    author,
    prNumber,
    repoOwner,
    repoName,
    commitSha,
    outputPath
  }).catch(error => {
    console.error(`Error creating approvals file: ${error.message}`);
    process.exit(1);
  });
}

module.exports = { createApprovalsFile };
