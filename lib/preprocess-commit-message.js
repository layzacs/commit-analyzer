import debugFactory from "debug";

const debug = debugFactory("semantic-release:commit-analyzer:preprocess");

/**
 * Preprocesses commit messages to handle Azure DevOps squash commits.
 * 
 * Azure DevOps squash commits typically have the format:
 * "Merged PR 12345: feat: add new feature"
 * 
 * This function will extract "feat: add new feature" from the message
 * so that semantic-release can properly parse the type from the commit.
 *
 * @param {string} message The raw commit message to preprocess.
 * @return {string} The preprocessed commit message.
 */
export default (message) => {
  // Check for Azure DevOps squash commit pattern: "Merged PR 12345: actual message"
  const azureDevOpsPattern = /^Merged PR \d+: (.+)$/;
  const match = message.match(azureDevOpsPattern);
  
  if (match) {
    debug("Detected Azure DevOps squash commit pattern");
    return match[1]; // Return the actual PR title/message part
  }

  return message;
};
