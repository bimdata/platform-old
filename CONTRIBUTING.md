# Contributing

## How do I... <a name="toc"></a>

* [Use This Guide](#introduction)?
* Ask or Say Something? 🤔🐛😱
  * [Request Support](#request-support)
  * [Report an Error or Bug](#report-an-error-or-bug)
  * [Request a Feature](#request-a-feature)
* Make Something? 🤓👩🏽‍💻📜🍳
  * [Project Setup](#project-setup)
  * [Contribute Documentation](#contribute-documentation)
  * [Contribute Code](#contribute-code)
* Manage Something ✅🙆🏼💃👔
  * [Provide Support on Issues](#provide-support-on-issues)
  * [Clean Up Issues and PRs](#clean-up-issues-and-prs)
  * [Review Pull Requests](#review-pull-requests)
  * [Join the Project Team](#join-the-project-team)
* Add a Guide Like This One [To My Project](#attribution)? 🤖😻👻

## Introduction

📝 Thank you so much for your interest in contributing!

All types of contributions are encouraged and valued. See the [table of contents](#toc) for different ways to help and details about how this project handles them!

Please make sure to read the relevant section before making your contribution.
It will make it a lot easier for us maintainers to make the most of it and smooth out the experience for all involved.

The [BIMData Platform Team](#join-the-project-team) looks forward to your contributions.

## Request Support

If you have a question about this project, how to use it, or just need clarification about something:

* Contact us: support@bimdata.io

## Report an Issue

If you run into an error or bug with the project:

* Contact us: support@bimdata.io


If the project doesn't do something you need or want it to do:

* Open an Issue at https://github.com/bimdata/platform/issues
* Provide as much context as you can about what you're running into.
* Please try and be clear about why existing features and alternatives would not work for you.

Once it's filed:

* The dev team will evaluate the feature request, possibly asking you more questions to understand its purpose and any relevant requirements. If the issue is closed, the team will convey their reasoning and suggest an alternative path forward.
* If the feature request is accepted, it will be marked for implementation with `feature-accepted`, which can then be done by either by a core team member or by anyone in the community who wants to [contribute code](#contribute-code).

Note: The team is unlikely to be able to accept every single feature request that is filed. Please understand if they need to say no.

## Project Setup

So you wanna contribute some code! That's great! 

This project uses GitHub Pull Requests to manage contributions, so [read up on how to fork a GitHub project and file a PR](https://guides.github.com/activities/forking) if you've never done it before.

If this seems like a lot or you aren't able to do all this setup, you might also be able to [edit the files directly](https://help.github.com/articles/editing-files-in-another-user-s-repository/) without having to do any of this setup.

If you want to go the usual route and run the project locally, though:

* [Install BIMData Platform](https://)
* [Fork the project](https://guides.github.com/activities/forking/#fork)

Then [look at the README for the frontend](https://github.com/bimdata/platform/blob/master/README.md) and [the README for the backend](https://github.com/bimdata/platform-back/blob/master/README.md)

And you should be ready to go!


## Contribute Code

We like code commits a lot! They're super handy, and they keep the project going and doing the work it needs to do to be useful to others.

Code contributions of just about any size are acceptable.

To contribute code:

* [Set up the project](#project-setup).
* Make any necessary changes to the source code.
* Include any [additional documentation](#contribute-documentation) the changes might need.
* Run tests: 
  * unit tests: `npm run unit`
  * e2e tests: `npm run e2e`
  * all tests: `npm run test`
* Let the Docker build pass (that verify that your contribution works as expected).
* Write clear, concise commit message(s).
* Dependency updates, additions, or removals must be in individual commits.
* Go to https://github.com/bimdata/platform/pulls and open a new pull request with your changes.
* If your PR is connected to an open issue, add a line in your PR's description that says `Fixes: #123`, where `#123` is the number of the issue you're fixing.

Once you've filed the PR:

* Maintainers will not review PRs until all checks pass (it means "until CircleCI builds").
* One or more maintainers will use GitHub's review feature to review your PR.
* If the maintainer asks for any changes, then edit your changes, push, and ask for another review.
* If the maintainer decides to pass on your PR, they will thank you for the contribution and explain why they won't be accepting the changes. That's ok! We still really appreciate you taking the time to do it, and we don't take that lightly.
* If your PR gets accepted, it will be marked as such, and merged into the `dev` branch soon after. Your contribution will be distributed to the masses as soon as the maintainer trigger a deployment process.


## Contribute Documentation

Documentation is a super important, critical part of this project. Docs are how we keep track of what we're doing, how, and why. It's how we stay on the same page about our policies. And it's how we tell others everything they need in order to be able to use this project -- or contribute to it. So thank you in advance.

Documentation contributions of any size are welcome! Feel free to file a PR even if you're just rewording a sentence to be more clear, or fixing a spelling mistake!

To contribute documentation:

* Go to the Documentation repository to set up the project.
* Edit or add any relevant documentation.
* Make sure your changes are formatted correctly and consistently with the rest of the documentation.
* Re-read what you wrote, and run a spellchecker on it to make sure you didn't miss anything.
* Write clear, concise commit message(s)
* Go to https://github.com/bimdata/documentation/pulls and open a new pull request with your changes.
* If your PR is connected to an open issue, add a line in your PR's description that says `Fixes: #123`, where `#123` is the number of the issue you're fixing.

Once you've filed the PR:

* One or more maintainers will use GitHub's review feature to review your PR.
* If the maintainer asks for any changes, edit your changes, push, and ask for another review.
* If the maintainer decides to pass on your PR, they will thank you for the contribution and explain why they won't be accepting the changes. That's ok! We still really appreciate you taking the time to do it, and we don't take that lightly.
* If your PR gets accepted, it will be marked as such, and merged into the `dev` branch soon after. Your contribution will be distributed to the masses as soon as the maintainer trigger a deployment process.

## Provide Support on Issues

[Needs Collaborator](#join-the-project-team): none

Helping out other users with their questions is a really awesome way of contributing to any community. It's not uncommon for most of the issues on an open source projects being support-related questions by users trying to understand something they ran into, or find their way around a known bug.

Sometimes, the `support` label will be added to things that turn out to actually be other things, like bugs or feature requests. In that case, suss out the details with the person who filed the original issue, add a comment explaining what the bug is, and change the label from `support` to `bug` or `feature`. If you can't do this yourself, @mention a maintainer so they can do it.

In order to help other folks out with their questions:

* Go to the issue tracker and [filter open issues by the `support` label](https://github.com/bimdata/platform/issues?q=is%3Aopen+is%3Aissue+label%3Asupport).
* Read through the list until you find something that you're familiar enough with to give an answer to.
* Respond to the issue with whatever details are needed to clarify the question, or get more details about what's going on.
* Once the discussion wraps up and things are clarified, either close the issue, or ask the original issue filer (or a maintainer) to close it for you.

Some notes on picking up support issues:

* Avoid responding to issues you don't know you can answer accurately.
* As much as possible, try to refer to past issues with accepted answers. Link to them from your replies with the `#123` format.
* Be kind and patient with users -- often, folks who have run into confusing things might be upset or impatient. This is ok. Try to understand where they're coming from, and if you're too uncomfortable with the tone, feel free to stay away or withdraw from the issue. 


## Clean Up Issues and PRs

[Needs Collaborator](#join-the-project-team): Issue Tracker

Issues and PRs can go stale after a while. Maybe they're abandoned. Maybe the team will just plain not have time to address them any time soon.

In these cases, they should be closed until they're brought up again or the interaction starts over.

To clean up issues and PRs:

* Search the issue tracker for issues or PRs, and add the term `updated:<=YYYY-MM-DD`, where the date is 30 days before today.
* Go through each issue *from oldest to newest*, and close them if **all of the following are true**:
  * not opened by a maintainer
  * no explicit messages in the comments asking for it to be left open
  * does not belong to a milestone
* Leave a message when closing saying "Cleaning up stale issue. Please reopen or ping us if and when you're ready to resume this."

## Review Pull Requests

[Needs Collaborator](#join-the-project-team): Issue Tracker

While anyone can comment on a PR, add feedback, etc, PRs are only *approved* by team members with Issue Tracker or higher permissions.

PR reviews use [GitHub's own review feature](https://help.github.com/articles/about-pull-request-reviews/), which manages comments, approval, and review iteration.

Some notes:

* You may ask for minor changes ("nitpicks"), but consider whether they are really blockers to merging: try to err on the side of "approve, with comments".
* *ALL PULL REQUESTS* should be let the CircleCI build pass.
* Please make sure you're familiar with the code or documentation being updated, unless it's a minor change (spellchecking, minor formatting, etc). You may @mention another project member who you think is better suited for the review, but still provide a non-approving review of your own.
* Be extra kind💛: people who submit code/doc contributions are putting themselves in a pretty vulnerable position, and have put time and care into what they've done (even if that's not obvious to you!) -- always respond with respect, be understanding, but don't feel like you need to sacrifice your standards for their sake, either. Just don't be a jerk about it?


## Join the Project Team

### Ways to Join

There are many ways to contribute! Most of them don't require any official status unless otherwise noted. 

That said, there's a couple of positions that grant special repository abilities.

All of the positions are granted based on the project team's needs, as well as their consensus opinion about whether they would like to work with the person and think that they would fit well into that position. The process is relatively informal, and it's likely that people who express interest in participating can just be granted the permissions they'd like.

You can spot a collaborator on the repo by looking for the `[Collaborator]` or `[Owner]` tags next to their names.


## Attribution

This guide was created using the WeAllJS `CONTRIBUTING.md` generator. Thanks to them!
[Make your own](https://npm.im/weallcontribute)!
