import test from "ava";
import preprocessCommitMessage from "../lib/preprocess-commit-message.js";

test("Extracts PR title from Azure DevOps squash commit", (t) => {
  const message = "Merged PR 12345: feat: add new feature";
  const result = preprocessCommitMessage(message);
  
  t.is(result, "feat: add new feature");
});

test("Leaves regular commit messages unchanged", (t) => {
  const message = "feat: add new feature";
  const result = preprocessCommitMessage(message);
  
  t.is(result, "feat: add new feature");
});

test("Handles complex PR title content", (t) => {
  const message = "Merged PR 7890: fix(core): resolve crash when parsing empty data";
  const result = preprocessCommitMessage(message);
  
  t.is(result, "fix(core): resolve crash when parsing empty data");
});
