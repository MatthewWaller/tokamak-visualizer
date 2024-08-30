# Removing tokamak_data.csv from Git History using git-filter-repo

Follow these steps to remove `tokamak_data.csv` from your Git history and add it to `.gitignore`:

1. First, install `git-filter-repo`. It's not included in Git by default:

   ```bash
   # For pip (Python package manager)
   pip install git-filter-repo

   # For Homebrew on macOS
   brew install git-filter-repo

   # For other systems, check the official documentation
   ```

2. Add `tokamak_data.csv` to your `.gitignore` file:

   ```bash
   echo "tokamak_data.csv" >> .gitignore
   git add .gitignore
   git commit -m "Add tokamak_data.csv to .gitignore"
   ```

3. Now, use `git-filter-repo` to remove the file from the entire Git history:

   ```bash
   git-filter-repo --path data/tokamak_data.csv --invert-paths
   ```

   This command removes `data/tokamak_data.csv` from all commits in the repository's history.

4. Force push the changes to your remote repository:

   ```bash
   git push origin --force --all
   ```

   If you have any tags that you want to update as well:

   ```bash
   git push origin --force --tags
   ```

5. It's recommended that all other team members delete their local repositories and re-clone:

   ```bash
   git clone <repository-url>
   ```

**Important Notes:**
- This process rewrites Git history. Make sure all team members are aware of this change.
- Rewriting history can cause issues with open pull requests. It's best to do this when there are no open PRs.
- Always back up your repository before performing these operations.
- If you're using GitHub, be aware that forks of your repository may still contain the file in their history.

Remember, once you've done this, the `tokamak_data.csv` file will no longer be tracked by Git, and it will be ignored in future commits due to its presence in `.gitignore`.

## Additional git-filter-repo Features

`git-filter-repo` is a powerful tool with many features. Here are a few additional use cases:

- To remove multiple files: List the files in a text file and use `--paths-from-file`
- To remove a directory: Use `--path directory_name/ --invert-paths`
- To replace sensitive information: Use the `--replace-text` option

For more advanced usage, refer to the [git-filter-repo documentation](https://github.com/newren/git-filter-repo/blob/main/Documentation/git-filter-repo.txt).