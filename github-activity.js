// get username from argument
// make request to github api to get events
// handle errors like: invalid username, api failure, or any other
// nicely format the output. consider using different font colors for different events?
// *check the format of the data returned and see if we can pretty print the data.
import FormatEvents from "./format";

async function main() {
    const username = getUsername();

    try {
        const events = await fetchEvents(username);
        const formattedEvents = formatEvents(events);

        formattedEvents.forEach((event) => console.log(event));
    } catch (error) {
        console.error(error.message);
    }
}

function getUsername() {
    const username = process.argv.splice(2, 1);
    if (!username || username.length === 0) {
        console.error(
            `Please provide a username as a CLI argument. e.g: github-activity henrychris`
        );
        process.exit(1);
    }

    return username;
}

async function fetchEvents(username) {
    const URL = `https://api.github.com/users/${username}/events?per_page=10`;
    const response = await fetch(URL, {
        headers: {
            Accept: "application/vnd.github+json",
            "User-Agent": username,
        },
    });

    if (response.ok) {
        var resJson = await response.json();
        return resJson;
    }

    throw new Error("Request failed.");
}

function formatEvents(events) {
    var formatter = new FormatEvents();
    return formatter.formatAllEvents(events);
}

await main();
