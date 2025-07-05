const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
  try {
    // Get token from environment variable
    const token = process.env.GITHUB_TOKEN;
    if (!token) {
      core.setFailed('GITHUB_TOKEN environment variable is required');
      return;
    }
    
    // Initialize GitHub client
    const octokit = github.getOctokit(token);
    
    // Get context
    const context = github.context;
    const repo = context.repo;
    
    // Check if we're in a PR context
    let prNumber;
    
    if (context.payload.pull_request) {
      // Direct PR event
      prNumber = context.payload.pull_request.number;
    } else if (context.payload.issue && context.payload.issue.pull_request) {
      // Issue comment on a PR
      prNumber = context.payload.issue.number;
    } else if (process.env.PR_NUMBER) {
      // From environment variable (set in workflow)
      prNumber = process.env.PR_NUMBER;
    } else {
      // Try to extract from ref (e.g., refs/pull/123/merge)
      const prMatch = context.ref.match(/refs\/pull\/(\d+)\/merge/);
      if (prMatch) {
        prNumber = prMatch[1];
      }
    }
    
    if (!prNumber) {
      core.warning('Could not determine PR number. Skipping comment posting.');
      return;
    }
    
    // Construct the GitHub Pages URL
    const pagesUrl = `https://${repo.owner}.github.io/${repo.repo}/pr-${prNumber}/`;
    
    // Create comment message
    const message = `🧪 TestivAI Report Ready — View at: [${pagesUrl}](${pagesUrl}) — Comment \`/approve-visuals\` to accept changes.`;
    
    // Post comment to PR
    await octokit.rest.issues.createComment({
      ...repo,
      issue_number: prNumber,
      body: message
    });
    
    core.info(`Posted comment to PR #${prNumber} with report link: ${pagesUrl}`);
    
  } catch (error) {
    core.setFailed(`Action failed: ${error.message}`);
  }
}

run();
