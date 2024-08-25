// objects gotta be imported this way
import { GitHubEvents } from "./event";

export default class FormatEvents {
    constructor() {
        this.eventFormatters = {
            [GitHubEvents.COMMIT_COMMENT]: this.formatCommitCommentEvent,
            [GitHubEvents.CREATE]: this.formatCreateEvent,
            [GitHubEvents.DELETE]: this.formatDeleteEvent,
            [GitHubEvents.FORK]: this.formatForkEvent,
            [GitHubEvents.GOLLUM]: this.formatGollumEvent,
            [GitHubEvents.ISSUE_COMMENT]: this.formatIssueCommentEvent,
            [GitHubEvents.ISSUE]: this.formatIssueEvent,
            [GitHubEvents.MEMBER]: this.formatMemberEvent,
            [GitHubEvents.MEMBER]: this.formatPublicEvent,
            [GitHubEvents.PULL_REQUEST]: this.formatPullRequestEvent,
            [GitHubEvents.PULL_REQUEST_REVIEW]:
                this.formatPullRequestReviewEvent,
            [GitHubEvents.PULL_REQUEST_REVIEW_COMMENT]:
                this.formatPullRequestReviewCommentEvent,
            [GitHubEvents.PULL_REQUEST_REVIEW_THREAD]:
                this.formatPullRequestReviewThreadEvent,
            [GitHubEvents.PUSH]: this.formatPushEvent,
            [GitHubEvents.RELEASE]: this.formatReleaseEvent,
            [GitHubEvents.SPONSORSHIP]: this.formatSponsorshipEvent,
            [GitHubEvents.WATCH]: this.formatWatchEvent,
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
        throw new Error("Not implemented");
    }

    formatPublicEvent(event) {
        throw new Error("Not implemented");
    }

    formatPullRequestReviewThreadEvent(event) {
        throw new Error("Not implemented");
    }

    formatReleaseEvent(event) {
        throw new Error("Not implemented");
    }

    formatSponsorshipEvent(event) {
        throw new Error("Not implemented");
    }

    //#endregion
}
