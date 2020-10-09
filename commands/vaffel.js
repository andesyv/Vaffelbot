// Command for placing a waffle order
module.exports = {
    name: "vaffel",
    description:
        "Command for placing a order, you will recieve a dm when the waffle is ready",
    async execute(message, args) {
        const {
            addToQueue,
            getNumWaffles,
            decWaffles,
            userInQueue,
            addToRequestBuffer,
            userInBuffer,
        } = require("../api/spreadsheet.js");

        const regOrder = async (message) => {
            message.channel.send(
                `Takk for bestillingen ${message.author.username}! Du får en dm når du kan komme og hente vaffelen din :)`
            );

            if ((await getNumWaffles()) > 0) {
                await decWaffles(1);
                message.author.send(
                    "Vi har en vaffel klar til deg! Kom og hent den :)"
                );
                return;
            } else {
                const row = {
                    name: message.author.username,
                    discord_id: message.author.id,
                    date: message.createdAt.toDateString(),
                };

                await addToQueue(row);
            }
        };

        if (await userInBuffer(message.author.id)) {
            message.author.send(
                "Du har nylig brukt vaffel-kommandoen. Vent litt før du sender ny bestilling."
            );
            return;
        } else if (await userInQueue(message.author.id)) {
            await addToRequestBuffer(message.author.id);
            message.author.send(
                "Du har allerede en registrert bestilling. Vær tolmodig så sender vi deg en dm når vaffelen din er klar :)"
            );
            return;
        } else {
            await regOrder(message);
            await addToRequestBuffer(message.author.id);
        }
    },
};
