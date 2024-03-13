const repo = require("../repository")
const utils = require("../utils")
const axios = require("axios")
require("dotenv").config()

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
    const today = new Date()
    const targetDate = new Date(today)
    targetDate.setDate(today.getDate() + 7)

    const reminder = await repo.reminder.findReminder(today, targetDate)
    let i = 0
    while (i <= reminder.length - 1) {
        if (reminder[i].user.lineToken) {
            const daysLeft = utils.timeDifference(today, reminder[i].event.endDate)
            const flexMessage = {
                to: reminder[i].user.lineToken,
                messages: [
                    {
                        type: "template",
                        altText: "This is a buttons template",
                        template: {
                            type: "buttons",
                            thumbnailImageUrl: reminder[i].event.coverImage,
                            imageAspectRatio: "rectangle",
                            imageSize: "cover",
                            imageBackgroundColor: "#FFFFFF",
                            title: reminder[i].event.title,
                            text: `Your event will start in ${daysLeft} ${daysLeft > 1 ? "Days" : "Day"} `,
                            defaultAction: {
                                type: "uri",
                                label: "View detail",
                                uri: `http://localhost:5173/event/${reminder[i].event.id}`,
                            },
                            actions: [
                                {
                                    type: "uri",
                                    label: "visit Site",
                                    uri: `http://localhost:5173/event/${reminder[i].event.id}`,
                                },
                            ],
                        },
                    },
                ],
            }

            await axios.post("https://api.line.me/v2/bot/message/push", flexMessage, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${process.env.LINE_ACCESS_TOKEN}`,
                },
            })
        }
        i += 1
    }

    res.status(200).json({ message: "ok" })
})
