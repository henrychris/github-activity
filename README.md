# github-activity

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run github-activity.js <username>
```

This project was created using `bun init` in bun v1.1.21. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.

## Description

This is a small CLI project with instructions found here: [roadmap.sh](https://roadmap.sh/projects/github-user-activity).

## Usage

Usage is simple.

1. Ensure you have the GitHub CLI installed. You can get it here: [here](https://github.com/cli/cli).
2. Open a terminal and run `gh auth login`. This will authenticate your system with GitHub.
3. In the root directory of this project, run `bun github-activity.js <username>` or `node github-activity.js <username>`. Replace `<username>` with be your GitHub username.

## Output

```bash
$ bun github-activity.js henrychris
- [08/25/2024, 10:13:15 PM]: henrychris pushed 1 commit to henrychris/github-activity.
- [08/25/2024, 10:09:57 PM]: henrychris pushed 1 commit to henrychris/github-activity.
- [08/25/2024, 10:07:55 PM]: henrychris pushed 1 commit to henrychris/github-activity.
- [08/25/2024, 10:05:07 PM]: henrychris created a branch in henrychris/github-activity. Repository URL: https://api.github.com/repos/henrychris/github-activity
- [08/25/2024, 10:05:04 PM]: henrychris created a repository. Name: henrychris/github-activity. Repository URL: https://api.github.com/repos/henrychris/github-activity
- [08/23/2024, 09:33:38 PM]: henrychris started watching max-mapper/art-of-node.
- [08/23/2024, 09:38:26 AM]: henrychris pushed 1 commit to henrychris/obsidian-softwareeng.
- [08/22/2024, 11:31:35 PM]: henrychris pushed 1 commit to henrychris/obsidian-softwareeng.
- [08/22/2024, 09:21:22 PM]: henrychris pushed 1 commit to henrychris/obsidian-softwareeng.
- [08/22/2024, 06:53:59 PM]: henrychris started watching amantinband/clean-architecture.
```
