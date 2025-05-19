import test from "ava";
import { analyzeCommits } from "../index.js";

test("Parse Azure DevOps squash commit and determine release type", async (t) => {
  // Mock a release with a feature
  const commits = [
    {
      hash: "123",
      message: "Merged PR 12345: feat: add new feature",
    },
  ];
  
  const releaseType = await analyzeCommits(
    {},
    { commits, logger: { log: () => {} } }
  );
  
  t.is(releaseType, "minor");
});

test("Parse normal commit and determine release type", async (t) => {
  // Standard commit message
  const commits = [
    {
      hash: "456",
      message: "feat: add another feature",
    },
  ];
  
  const releaseType = await analyzeCommits(
    {},
    { commits, logger: { log: () => {} } }
  );
  
  t.is(releaseType, "minor");
});

test("Parse Azure DevOps squash commit with fix and determine release type", async (t) => {
  // Mock a release with a bugfix
  const commits = [
    {
      hash: "789",
      message: "Merged PR 54321: fix: resolve critical bug",
    },
  ];
  
  const releaseType = await analyzeCommits(
    {},
    { commits, logger: { log: () => {} } }
  );
  
  t.is(releaseType, "patch");
});
