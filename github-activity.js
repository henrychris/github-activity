// import FormatEvents from "./format";
// import { GitHubEvents } from "./event";
const FormatEvents = require("./format");
const GitHubEvents = require("./event");

async function main() {
    const username = getUsername();
    const filter = getFilter();

    try {
        let events = await fetchEvents(username);
        events = filterEvents(events, filter);
        const formattedEvents = formatEvents(events);

        formattedEvents.forEach((event) => console.log(event));
    } catch (error) {
        console.error(error.message);
    }
}

function getUsername() {
    const username = process.argv[2];
    if (!username || username.length === 0) {
        console.error(
            `Please provide a username as a CLI argument. e.g: github-activity henrychris`
        );
        process.exit(1);
    }

    return username;
}

function getFilter() {
    const eventFilter = process.argv[3];
    if (eventFilter) {
        if (!GitHubEvents[eventFilter]) {
            throw new Error(
                "Invalid event filter. Please provide an existing Github Event, e.g.: github-activity <username> PushEvent"
            );
        }

        return eventFilter;
    }

    return "";
}

async function fetchEvents(username) {
    const URL = `https://api.github.com/users/${username}/events?per_page=10`;
    const response = await fetch(URL, {
        headers: {
            Accept: "application/vnd.github+json",
            "User-Agent": username,
        },
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
}

function filterEvents(events, filter) {
    if (filter.length === 0) {
        return events;
    }

    return events.filter((x) => x.type === filter);
}

function formatEvents(events) {
    var formatter = new FormatEvents();
    return formatter.formatAllEvents(events);
}

main().catch((error) => console.error(error));
