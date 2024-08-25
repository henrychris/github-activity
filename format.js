export default class FormatEvents {
    COMMIT_COMMENT = "CommitCommentEvent";
    CREATE = "CreateEvent";
    DELETE = "DeleteEvent";
    FORK = "ForkEvent";
    GOLLUM = "GollumEvent";
    ISSUE_COMMENT = "IssueCommentEvent";
    ISSUE = "IssuesEvent";
    MEMBER = "MemberEvent";
    PUBLIC = "PublicEvent";
    PULL_REQUEST = "PullRequestEvent";
    PULL_REQUEST_REVIEW = "PullRequestReviewEvent";
    PULL_REQUEST_REVIEW_COMMENT = "PullRequestReviewCommentEvent";
    PULL_REQUEST_REVIEW_THREAD = "PullRequestReviewThreadEvent";
    PUSH = "PushEvent";
    RELEASE = "ReleaseEvent";
    SPONSORSHIP = "SponsorshipEvent";
    WATCH = "WatchEvent";

    #getDate(dateString) {
        var date = new Date(dateString);
        return date.toLocaleString("en-UK", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: true,
        });
    }

    #getPrefix(event) {
        const formattedDate = this.#getDate(event.created_at);
        return `- [${formattedDate}]: ${event.actor.login}`;
    }

    formatAllEvents(events) {
        events.forEach((event, index) => {
            switch (event.type) {
                case this.COMMIT_COMMENT:
                    events[index] = this.formatCommitCommentEvent(event);
                    break;
                case this.CREATE:
                    events[index] = this.formatCreateEvent(event);
                    break;
                case this.DELETE:
                    events[index] = this.formatDeleteEvent(event);
                    break;
                case this.FORK:
                    events[index] = this.formatForkEvent(event);
                    break;
                case this.GOLLUM:
                    events[index] = this.formatGollumEvent(event);
                    break;
                case this.ISSUE_COMMENT:
                    events[index] = this.formatIssueCommentEvent(event);
                    break;
                case this.ISSUE:
                    events[index] = this.formatIssueEvent(event);
                    break;
                case this.MEMBER:
                    events[index] = this.formatMemberEvent(event);
                    break;
                case this.PUBLIC:
                    events[index] = this.formatPublicEvent(event);
                    break;
                case this.PULL_REQUEST:
                    events[index] = this.formatPullRequestEvent(event);
                    break;
                case this.PULL_REQUEST_REVIEW:
                    events[index] = this.formatPullRequestReviewEvent(event);
                    break;
                case this.PULL_REQUEST_REVIEW_COMMENT:
                    events[index] =
                        this.formatPullRequestReviewCommentEvent(event);
                    break;
                case this.PULL_REQUEST_REVIEW_THREAD:
                    events[index] =
                        this.formatPullRequestReviewThreadEvent(event);
                    break;
                case this.PUSH:
                    events[index] = this.formatPushEvent(event);
                    break;
                case this.RELEASE:
                    events[index] = this.formatReleaseEvent(event);
                    break;
                case this.SPONSORSHIP:
                    events[index] = this.formatSponsorshipEvent(event);
                    break;
                case this.WATCH:
                    events[index] = this.formatWatchEvent(event);
                    break;
                default:
                    break;
            }
        });

        return events;
    }

    formatCommitCommentEvent(event) {
        const prefix = this.#getPrefix(event);
        return `${prefix} left a comment on ${event.repo.name}.\n\tComment: '${event.payload.comment.body}'`;
    }

    formatCreateEvent(event) {
        const prefix = this.#getPrefix(event);
        const obj_created = event.payload.ref_type;
        return `${prefix} created a ${obj_created} in ${event.repo.name}. Repository URL: ${event.repo.url}`;
    }

    formatDeleteEvent(event) {
        const prefix = this.#getPrefix(event);
        const obj_created = event.payload.ref_type;
        return `${prefix} deleted a ${obj_created} in ${event.repo.name}. Repository URL: ${event.repo.url}`;
    }

    formatForkEvent(event) {
        const prefix = this.#getPrefix(event);
        return `${prefix} forked a a repository. Repository name: ${event.repo.name}. Repository URL: ${event.repo.url}`;
    }

    formatGollumEvent(event) {
        const prefix = this.#getPrefix(event);
        const createdCount = this.#countPageActions(gollumEvent, "created");
        const createdText = createdCount === 1 ? "page" : "pages";

        const editedCount = this.#countPageActions(gollumEvent, "edited");
        const editedText = editedCount === 1 ? "page" : "pages";

        return `${prefix} created or edited a repositories' wiki. Created ${createdCount} ${createdText}. Edited ${editedCount} ${editedText}.`;
    }

    #countPageActions(gollumEvent, actionType) {
        return gollumEvent.pages.filter((page) => page.action === actionType)
            .length;
    }

    formatIssueCommentEvent(event) {
        const prefix = this.#getPrefix(event);
        const action = event.payload.action;

        return `${prefix} ${action} a comment on issue #${event.payload.issue.number} in repository ${event.repo.name}. Issue URL: ${event.payload.issue.html_url}`;
    }

    formatIssueEvent(event) {
        const prefix = this.#getPrefix(event);
        const action = event.payload.action;

        return `${prefix} ${action} issue #${event.payload.issue.number} in repository ${event.repo.name}. Issue URL: ${event.payload.issue.html_url}`;
    }

    formatMemberEvent(event) {
        throw new Error("Not implemented");
    }

    formatPublicEvent(event) {
        throw new Error("Not implemented");
    }

    formatPullRequestEvent(event) {
        const prefix = this.#getPrefix(event);
        const action = event.payload.action;

        return `${prefix} ${action} PR #${event.payload.number} in repository ${event.repo.name}. PR URL: ${event.payload.pull_request.html_url}`;
    }

    formatPullRequestReviewEvent(event) {
        const prefix = this.#getPrefix(event);
        const action = event.payload.action;

        return `${prefix} ${action} a review on PR #${event.payload.number} in repository ${event.repo.name}. PR URL: ${event.payload.pull_request.html_url}`;
    }

    formatPullRequestReviewCommentEvent(event) {
        const prefix = this.#getPrefix(event);
        const action = event.payload.action;

        return `${prefix} ${action} a review comment on PR #${event.payload.number} in repository ${event.repo.name}. PR URL: ${event.payload.pull_request.html_url}`;
    }

    formatPullRequestReviewThreadEvent(event) {
        throw new Error("Not implemented");
    }

    formatPushEvent(event) {
        const commitCount = event.payload.size;
        const commitLabel = commitCount === 1 ? "commit" : "commits";
        const prefix = this.#getPrefix(event);

        return `${prefix} pushed ${commitCount} ${commitLabel} to ${event.repo.name}.`;
    }

    formatReleaseEvent(event) {
        throw new Error("Not implemented");
    }

    formatSponsorshipEvent(event) {
        throw new Error("Not implemented");
    }

    formatWatchEvent(event) {
        const prefix = this.#getPrefix(event);
        return `${prefix} started watching ${event.repo.name}.`;
    }
}
