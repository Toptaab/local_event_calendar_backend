const repo = require("../repository")
const utils = require("../utils")
const axios = require("axios")

module.exports.lineWebhook = utils.catchError(async (req, res, next) => {
    console.log(req.body)
    console.log(req.body.events[0].source)
    console.log(req.params)

    res.status(200).json({ message: "ok" })
})

module.exports.login = utils.catchError(async (req, res, next) => {
    const { ...lineAccess } = req.body
    const { id } = req.user

    const user = utils.jwt.decode(lineAccess.id_token)

    const result = await repo.user.update({ id: +id }, { lineToken: user.sub })

    res.status(200).json(result)
})

module.exports.pushContent = utils.catchError(async (req, res, next) => {
    const channelAccessToken =
        "sSlNPbokPnM2SywPy5TQ6zuqUXgKIchpatQWnNBvD0VdFeqI3T0K6mxapEP4Ul4oJ9WyQA4FB0qKPJnL3Sq1vR4Adpd4xnzPMvYuJfQZ1CKEssid4I90Hsku51sJKfeY/40JQgvjGlQ4fE4+av0lbwdB04t89/1O/w1cDnyilFU="

    const flexMessage = {
        to: "U4d8e3980a1b5d60bdaec6acefb49249d",
        messages: [
            {
                type: "flex",
                altText: "This is a Flex Message",
                contents: {
                    type: "bubble",
                    body: {
                        type: "box",
                        layout: "horizontal",
                        contents: [
                            {
                                type: "text",
                                text: "Hello,",
                            },
                            {
                                type: "text",
                                text: "World!",
                            },
                        ],
                    },
                }, 
            },
        ],
    }

    const result = await axios.post("https://api.line.me/v2/bot/message/push", flexMessage, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${channelAccessToken}`,
        },
    })

    res.status(200).json(result)
})
