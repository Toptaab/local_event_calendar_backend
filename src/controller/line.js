const repo = require("../repository")
const utils = require("../utils")
const axios = require("axios")
require("dotenv").config()

module.exports.lineWebhook = utils.catchError(async (req, res, next) => {
    console.log(req.body)
    console.log("==============================================================")
    console.log(req.body.events[0].source)
    console.log(req.body.events[0].message)
    console.log(req.body.events[0].message.text)
    switch (req.body.events[0].message.type) {
        case "text":
            switch (req.body.events[0].message.text) {
                case "highlight":
                    // const highlight = repo.event.getHighlight()

                    const flexMessage = {
                        to: req.body.events[0].source.userId,
                        messages: [
                            {
                                "type": "template",
                                "altText": "this is a carousel template",
                                "template": {
                                  "type": "carousel",
                                  "columns": [
                                    {
                                      "thumbnailImageUrl": "https://example.com/bot/images/item1.jpg",
                                      "imageBackgroundColor": "#FFFFFF",
                                      "title": "this is menu",
                                      "text": "description",
                                      "defaultAction": {
                                        "type": "uri",
                                        "label": "View detail",
                                        "uri": "http://example.com/page/123"
                                      },
                                      "actions": [
                                        {
                                          "type": "postback",
                                          "label": "Buy",
                                          "data": "action=buy&itemid=111"
                                        },
                                        {
                                          "type": "postback",
                                          "label": "Add to cart",
                                          "data": "action=add&itemid=111"
                                        },
                                        {
                                          "type": "uri",
                                          "label": "View detail",
                                          "uri": "http://example.com/page/111"
                                        }
                                      ]
                                    },
                                    {
                                      "thumbnailImageUrl": "https://example.com/bot/images/item2.jpg",
                                      "imageBackgroundColor": "#000000",
                                      "title": "this is menu",
                                      "text": "description",
                                      "defaultAction": {
                                        "type": "uri",
                                        "label": "View detail",
                                        "uri": "http://example.com/page/222"
                                      },
                                      "actions": [
                                        {
                                          "type": "postback",
                                          "label": "Buy",
                                          "data": "action=buy&itemid=222"
                                        },
                                        {
                                          "type": "postback",
                                          "label": "Add to cart",
                                          "data": "action=add&itemid=222"
                                        },
                                        {
                                          "type": "uri",
                                          "label": "View detail",
                                          "uri": "http://example.com/page/222"
                                        }
                                      ]
                                    }
                                  ],
                                  "imageAspectRatio": "rectangle",
                                  "imageSize": "cover"
                                }
                              }
                        ],
                    }

                    await axios.post("https://api.line.me/v2/bot/message/push", flexMessage, {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${process.env.LINE_ACCESS_TOKEN}`,
                        },
                    })

                    break
                case "my event":
                    console.log("my event===========================")
                    break
                case "upcomming":
                    console.log("upcomming===========================")
                    break
                case "my reminder":
                    console.log("upcomming===========================")
                    break
                default:
                    break
            }

            break

        default:
            break
    }

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



