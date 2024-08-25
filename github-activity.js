// get username from argument
// make request to github api to get events
// handle errors like: invalid username, api failure, or any other
// nicely format the output. consider using different font colors for different events?
// *check the format of the data returned and see if we can pretty print the data.

async function main() {
    const username = getUsername();

    const events = await fetchEvents(username);
    events.forEach((event) => console.log(`Event: ${event}.`));
}

function getUsername() {
    const username = process.argv.splice(2, 1);
    if (!username || username.length === 0) {
        console.error(
            `Please provide a username as a CLI argument. e.g: github-activity henrychris`
        );
        process.exit(1);
    }
    console.log(`Username: ${username}`);
}

async function fetchEvents(username) {
    const URL = `https://api.github.com/users/${username}/events`;
    return ["committed some stuff"];
}

await main();
