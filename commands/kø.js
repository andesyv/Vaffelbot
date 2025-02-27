module.exports = {
    name: "kø",
    description: "show current queue",
    execute(message, args, botState) {
        const { saleOngoing, saleData } = botState
        const { queue } = saleData

        if (!saleOngoing) {
            message.channel.send("Salget er ikke startet");
            return;
        }

        message.channel.send(`${queue.size()} stk i kø.`);
    },
};
