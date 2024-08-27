// objects gotta be imported this way
const GitHubEvents = require("./event");

module.exports = class FormatEvents {
    constructor() {
        this.eventFormatters = {
            [GitHubEvents.CommitCommentEvent]: this.formatCommitCommentEvent,
            [GitHubEvents.CreateEvent]: this.formatCreateEvent,
            [GitHubEvents.DeleteEvent]: this.formatDeleteEvent,
            [GitHubEvents.ForkEvent]: this.formatForkEvent,
            [GitHubEvents.GollumEvent]: this.formatGollumEvent,
            [GitHubEvents.IssueCommentEvent]: this.formatIssueCommentEvent,
            [GitHubEvents.IssuesEvent]: this.formatIssueEvent,
            [GitHubEvents.MemberEvent]: this.formatMemberEvent,
            [GitHubEvents.MemberEvent]: this.formatPublicEvent,
            [GitHubEvents.PullRequestEvent]: this.formatPullRequestEvent,
            [GitHubEvents.PullRequestReviewEvent]:
                this.formatPullRequestReviewEvent,
            [GitHubEvents.PullRequestReviewCommentEvent]:
                this.formatPullRequestReviewCommentEvent,
            [GitHubEvents.PullRequestReviewThreadEvent]:
                this.formatPullRequestReviewThreadEvent,
            [GitHubEvents.PushEvent]: this.formatPushEvent,
            [GitHubEvents.ReleaseEvent]: this.formatReleaseEvent,
            [GitHubEvents.SponsorshipEvent]: this.formatSponsorshipEvent,
            [GitHubEvents.WatchEvent]: this.formatWatchEvent,
        };
    }
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

    // return an array of strings. each string is a formatted summary of a GitHub event
    formatAllEvents(events) {
        return events.map((event) => {
            const formatter = this.eventFormatters[event.type];
            return formatter ? formatter.call(this, event) : event;
        });
    }

    formatCommitCommentEvent(event) {
        const prefix = this.#getPrefix(event);
        return `${prefix} left a comment on ${event.repo.name}.\n\tComment: '${event.payload.comment.body}'`;
    }

    formatCreateEvent(event) {
        const prefix = this.#getPrefix(event);
        const obj_created = event.payload.ref_type;

        if (obj_created === "repository") {
            return `${prefix} created a ${obj_created}. Name: ${event.repo.name}. Repository URL: ${event.repo.url}`;
        }

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

    formatPushEvent(event) {
        const commitCount = event.payload.size;
        const commitLabel = commitCount === 1 ? "commit" : "commits";
        const prefix = this.#getPrefix(event);

        return `${prefix} pushed ${commitCount} ${commitLabel} to ${event.repo.name}.`;
    }

    formatWatchEvent(event) {
        const prefix = this.#getPrefix(event);
        return `${prefix} started watching ${event.repo.name}.`;
    }

    //#region NOT IMPLEMENTED

    formatMemberEvent(event) {
        // todo: implement this lol
        throw new Error("Not implemented");
    }

    formatPublicEvent(event) {
        // todo: implement this lol
        throw new Error("Not implemented");
    }

    formatPullRequestReviewThreadEvent(event) {
        // todo: implement this lol
        throw new Error("Not implemented");
    }

    formatReleaseEvent(event) {
        // todo: implement this lol
        throw new Error("Not implemented");
    }

    formatSponsorshipEvent(event) {
        // todo: implement this lol
        throw new Error("Not implemented");
    }

    //#endregion
};
