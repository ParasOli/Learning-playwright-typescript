# Git & GitHub Team Workflow Cheat Sheet

## The Golden Rule
**Nobody pushes directly to `main`.** `main` is the protected, always-working
branch. Everyone works on their own branch and gets changes into `main` **only**
through a reviewed Pull Request (PR).

```
main = sacred, always green
  → branch off main
  → commit on your branch
  → push branch
  → open PR
  → teammate reviews (read diff on GitHub OR pull & run locally)
  → approve
  → merge to main
  → everyone pulls main
repeat
```

---

## The 3 Biggest Gotchas
1. **add → commit → push are 3 separate saves.** Staged ≠ committed ≠ on GitHub.
2. **push ≠ merge.** Pushing puts your branch on GitHub; merging (via PR) is what gets it into `main`.
3. **Merging on GitHub does NOT update your laptop.** You must `git pull` on `main` afterward.

> Rule of thumb: `git merge X` merges X **into the branch you're currently on**.
> To put your work into main, you must be standing on `main` first.
> Check where you are with `git branch` — the `*` shows your current branch.

---

## 1. Start fresh from main
```bash
git checkout main      # go to main
git pull               # download everyone's latest merged work
```
- ✅ Pulls new commits from GitHub and merges them into the current branch.
- ❌ Does NOT touch other branches — only the one you're standing on.

## 2. Create your branch
```bash
git checkout -b paras/login-tests   # create + switch (name: yourname/what-you-do)
```
- ✅ Creates a new branch AND switches onto it (copy of current branch).
- ❌ Does NOT exist on GitHub until you push. Does NOT discard uncommitted changes — they come with you.

## 3. Do work & commit
```bash
git status                    # see what changed
git add .                     # stage ALL changes
git add tests/login.spec.ts   # OR stage one specific file
git commit -m "add login tests"
```
- `git add` ✅ marks changes "ready to commit". ❌ saves nothing permanently, sends nothing to GitHub.
- `git commit` ✅ records staged changes into LOCAL history. ❌ does NOT upload to GitHub; ignores unstaged changes.

## 4. Push your branch to GitHub
```bash
git push -u origin paras/login-tests   # first push (-u links local↔remote)
git push                               # every push after that
```
- ✅ Uploads your committed branch to GitHub.
- ❌ Does NOT create a PR. Does NOT merge into main. push ≠ merge.

## 5. Open a Pull Request
On GitHub: push the branch → click the **"Compare & pull request"** banner.

Or with the `gh` CLI:
```bash
gh pr create --base main --head paras/login-tests \
  --title "Add login tests" --body "Adds tests for login dropdown"
gh pr create --web          # OR just open the PR form in the browser
```
- ✅ Opens a *request* to merge — a review page with diff + comments.
- ❌ Does NOT merge anything. Nothing changes in main until someone clicks Merge.

## 6. Review a teammate's PR
```bash
gh pr list                  # list open PRs
gh pr view 12               # view PR #12 details
gh pr diff 12               # see the code diff in terminal
```
Pull their branch to actually run the tests:
```bash
git fetch origin
git checkout paras/their-branch    # OR the easy way:
gh pr checkout 12                  # auto-fetches by PR number
npx playwright test                # run their tests yourself
```
Approve / request changes:
```bash
gh pr review 12 --approve
gh pr review 12 --request-changes --body "Selector looks flaky on line 20"
gh pr review 12 --comment --body "Looks good overall"
```
- `gh pr checkout` ✅ lets you look/run locally. ❌ does NOT approve or affect main.
- `npx playwright test` ✅ runs tests on current branch. ❌ changes no git state.
- `gh pr review --approve` ✅ records approval. ❌ does NOT merge — separate step.

## 7. Merge the PR
On GitHub: click **Merge pull request**. Or:
```bash
gh pr merge 12 --squash --delete-branch   # merge & clean up the branch
```
- ✅ Combines the PR branch into main ON GITHUB.
- ❌ Does NOT update YOUR laptop's main — GitHub's main is now ahead until you pull.

## 8. Everyone syncs main
```bash
git checkout main
git pull
```

## 9. Clean up old local branch (optional)
```bash
git branch -d paras/login-tests          # delete LOCAL branch (safe)
git push origin --delete paras/login-tests   # delete the GitHub copy
```
- `git branch -d` ❌ does NOT delete the GitHub copy (needs the second command, or `--delete-branch` at merge time did it).

---

## Resolving Merge Conflicts (when two people edit the same lines)
```bash
git checkout main
git pull
git checkout your-branch
git merge main        # conflicts appear here, if any
```
Then in VS Code:
1. **Source Control** panel (`Ctrl+Shift+G`) → conflicted files under "Merge Changes".
2. Click a file → **3-way Merge Editor** opens.
3. Use **Accept Current / Accept Incoming / Accept Both**, or edit the Result panel.
4. Click **Complete Merge**.
5. Run tests, then `git add .` → `git commit` → `git push`.

> Conflicts only happen when two people edit the **same lines of the same file**.
> Different files = clean automatic merge.

---

## Handy Extras
```bash
git branch                   # list local branches (* = current)
git branch -a                # list local + remote branches
git log --oneline            # short commit history
git checkout main            # switch back to main
git stash                    # temporarily shelve uncommitted changes
git stash pop                # bring those changes back
git merge main               # pull main's updates INTO your branch
git log --oneline main..your-branch   # commits on your branch NOT in main
```

## Setting up `gh` (GitHub CLI — optional)
```bash
gh --version            # check if installed
brew install gh         # install on macOS
gh auth login           # connect your GitHub account (one time)
```
