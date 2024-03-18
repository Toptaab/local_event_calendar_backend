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
                // ========================== highlight ================================//
                case "highlight":
                    const highlight = await repo.event.getHighlight()
                    const highlightMessage = []
                    highlight.some((value, index) => {
                        if (index > 8) {
                            highlightMessage.push({
                                thumbnailImageUrl: process.env.LOGOIMAGE,
                                imageBackgroundColor: "#FFFFFF",
                                title: `Happening Thailand`,
                                text: " please visit our site to view more",
                                defaultAction: {
                                    type: "uri",
                                    label: "View detail",
                                    uri: `${process.env.BASE_URL}`,
                                },
                                actions: [
                                    {
                                        type: "uri",
                                        label: "visit site",
                                        uri: `${process.env.BASE_URL}`,
                                    },
                                ],
                            })
                            return true
                        }
                        highlightMessage.push({
                            thumbnailImageUrl: value.event.coverImage,
                            imageBackgroundColor: "#FFFFFF",
                            title: value.event.title.slice(0,20) + "...",
                            text: value.event.description.slice(0, 20) + " ...view more",
                            defaultAction: {
                                type: "uri",
                                label: "View detail",
                                uri: `${process.env.BASE_URL}/event/${value.event.id}`,
                            },
                            actions: [
                                {
                                    type: "uri",
                                    label: "visit site",
                                    uri: `${process.env.BASE_URL}/event/${value.event.id}`,
                                },
                            ],
                        })
                    })
                    const highlightCarousel = {
                        type: "template",
                        altText: "Highlight Events carousel",
                        template: {
                            type: "carousel",
                            columns: highlightMessage,
                            imageAspectRatio: "rectangle",
                            imageSize: "cover",
                        },
                    }
                    const highlightFlexMessage = {
                        to: req.body.events[0].source.userId,
                        messages: [highlightCarousel],
                    }

                    console.log(highlightFlexMessage, "===================================================")
                    await axios.post("https://api.line.me/v2/bot/message/push", highlightFlexMessage, {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${process.env.LINE_ACCESS_TOKEN}`,
                        },
                    })
                    break
                // ========================== upcoming ================================//
                case "upcomming":
                    const upcoming = await repo.event.getAllUpcomimng()
                    const upcomingMessage = []
                    upcoming.some((value,index) =>{
                        if (index > 8) {
                            upcomingMessage.push({
                                thumbnailImageUrl: process.env.LOGOIMAGE,
                                imageBackgroundColor: "#FFFFFF",
                                title: `Happening Thailand`,
                                text: " please visit our site to view more",
                                defaultAction: {
                                    type: "uri",
                                    label: "View detail",
                                    uri: `${process.env.BASE_URL}`,
                                },
                                actions: [
                                    {
                                        type: "uri",
                                        label: "visit site",
                                        uri: `${process.env.BASE_URL}`,
                                    },
                                ],
                            })

                            return true
                        }
                        upcomingMessage.push({
                            thumbnailImageUrl: value.coverImage,
                            imageBackgroundColor: "#FFFFFF",
                            title: value.title.slice(0,20) + "...",
                            text: value.description.slice(0, 20) + "...",
                            defaultAction: {
                                type: "uri",
                                label: "View detail",
                                uri: `${process.env.BASE_URL}/event/${value.id}`,
                            },
                            actions: [
                                {
                                    type: "uri",
                                    label: "visit site",
                                    uri: `${process.env.BASE_URL}/event/${value.id}`,
                                },
                            ],
                        })}
                    )
                    const upcomingCarousel = {
                        type: "template",
                        altText: "upcoming events carousel",
                        template: {
                            type: "carousel",
                            columns: upcomingMessage,
                            imageAspectRatio: "rectangle",
                            imageSize: "cover",
                        },
                    }
                    const upcomingflexMessage = {
                        to: req.body.events[0].source.userId,
                        messages: [upcomingCarousel],
                    }
                    await axios.post("https://api.line.me/v2/bot/message/push", upcomingflexMessage, {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${process.env.LINE_ACCESS_TOKEN}`,
                        },
                    })
                    break
                // ========================== myevent ================================//
                case "myevent":
                    const myEvent = await repo.user.getUser({ lineToken: req.body.events[0].source.userId })
                    // ===================Guard not register or binding line user======================//
                    if (!myEvent) {
                        const inviteMessage = {
                            type: "template",
                            altText: "Register invite Card",
                            template: {
                                type: "buttons",
                                thumbnailImageUrl: "https://th.bing.com/th/id/OIP.UXGikObFpH0-hFMv4PqQ5AHaE8?rs=1&pid=ImgDetMain",
                                imageAspectRatio: "rectangle",
                                imageSize: "cover",
                                imageBackgroundColor: "#FFFFFF",
                                title: "Happening Thailand",
                                text: "Please Register and binding line for set your reminder",
                                defaultAction: {
                                    type: "uri",
                                    label: "View detail",
                                    uri: process.env.BASE_URL,
                                },
                                actions: [
                                    {
                                        type: "uri",
                                        label: "Register here",
                                        uri: `${process.env.BASE_URL}/register`,
                                    },
                                ],
                            },
                        }
                        const registrationInviteMessage = {
                            to: req.body.events[0].source.userId,
                            messages: [inviteMessage],
                        }
                        await axios.post("https://api.line.me/v2/bot/message/push", registrationInviteMessage, {
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${process.env.LINE_ACCESS_TOKEN}`,
                            },
                        })
                    }
                    const myEventMessage = []
                    myEvent.OrganizerInformation.Event.map((value,index) =>{
                        if (index > 8) {
                            myEventMessage.some({
                                thumbnailImageUrl: process.env.LOGOIMAGE,
                                imageBackgroundColor: "#FFFFFF",
                                title: `${myEvent.OrganizerInformation.Event.length - 9} more ${myEvent.OrganizerInformation.Event.length - 9 > 1? "evetns" : "event" }`,
                                text: " please visit our site to view more",
                                defaultAction: {
                                    type: "uri",
                                    label: "View detail",
                                    uri: `${process.env.BASE_URL}/profile`,
                                },
                                actions: [
                                    {
                                        type: "uri",
                                        label: "visit site",
                                        uri: `${process.env.BASE_URL}/profile`,
                                    },
                                ],
                            })

                            return true
                        }
                        myEventMessage.push({
                            thumbnailImageUrl: value.coverImage,
                            imageBackgroundColor: "#FFFFFF",
                            title: value.title.slice(0,20) + "...",
                            text: value.description.slice(0, 20) + "...",
                            defaultAction: {
                                type: "uri",
                                label: "View detail",
                                uri: `${process.env.BASE_URL}/event/${value.id}`,
                            },
                            actions: [
                                {
                                    type: "uri",
                                    label: "visit site",
                                    uri: `${process.env.BASE_URL}/event/${value.id}`,
                                },
                            ],
                        })}
                    )
                    const myEventMessageCarousel = {
                        type: "template",
                        altText: "this is a carousel template",
                        template: {
                            type: "carousel",
                            columns: myEventMessage,
                            imageAspectRatio: "rectangle",
                            imageSize: "cover",
                        },
                    }
                    const myEventflexMessage = {
                        to: req.body.events[0].source.userId,
                        messages: [myEventMessageCarousel],
                    }
                    await axios.post("https://api.line.me/v2/bot/message/push", myEventflexMessage, {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${process.env.LINE_ACCESS_TOKEN}`,
                        },
                    })

                    break
                // ========================== Reminder ================================//
                case "myreminder":
                    const myReminder = await repo.user.getUser({ lineToken: req.body.events[0].source.userId })

                    // ===================Guard not register or binding line user======================//
                    if (!myReminder) {
                        const inviteMessage = {
                            type: "template",
                            altText: "Register invite Card",
                            template: {
                                type: "buttons",
                                thumbnailImageUrl: "https://th.bing.com/th/id/OIP.UXGikObFpH0-hFMv4PqQ5AHaE8?rs=1&pid=ImgDetMain",
                                imageAspectRatio: "rectangle",
                                imageSize: "cover",
                                imageBackgroundColor: "#FFFFFF",
                                title: "Happening Thailand",
                                text: "Please Register and binding line for set your reminder",
                                defaultAction: {
                                    type: "uri",
                                    label: "View detail",
                                    uri: process.env.BASE_URL,
                                },
                                actions: [
                                    {
                                        type: "uri",
                                        label: "Register here",
                                        uri: `${process.env.BASE_URL}/register`,
                                    },
                                ],
                            },
                        }
                        const registrationInviteMessage = {
                            to: req.body.events[0].source.userId,
                            messages: [inviteMessage],
                        }
                        await axios.post("https://api.line.me/v2/bot/message/push", registrationInviteMessage, {
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${process.env.LINE_ACCESS_TOKEN}`,
                            },
                        })
                    }

                    const myReminderMessage = []
                    myReminder.Reminder.some((value,index) =>{
                        if (index > 8) {
                            myReminderMessage.push({
                                thumbnailImageUrl: process.env.LOGOIMAGE,
                                imageBackgroundColor: "#FFFFFF",
                                title: `${myReminder.Reminder.length - 9} more ${myReminder.Reminder.length - 9 > 1 ? "reminders" : "reminder"}`,
                                text: " please visit our site to view more",
                                defaultAction: {
                                    type: "uri",
                                    label: "View detail",
                                    uri: `${process.env.BASE_URL}/profile`,
                                },
                                actions: [
                                    {
                                        type: "uri",
                                        label: "visit site",
                                        uri: `${process.env.BASE_URL}/profile`,
                                    },
                                ],
                            })

                            return true
                        }

                        myReminderMessage.push({
                            thumbnailImageUrl: value.event.coverImage,
                            imageBackgroundColor: "#FFFFFF",
                            title: value.event.title.slice(0,20) + "...",
                            text: value.event.description.slice(0, 20) + "...",
                            defaultAction: {
                                type: "uri",
                                label: "View detail",
                                uri: `${process.env.BASE_URL}/event/${value.event.id}`,
                            },
                            actions: [
                                {
                                    type: "uri",
                                    label: "visit site",
                                    uri: `${process.env.BASE_URL}/event/${value.event.id}`,
                                },
                            ],
                        })}
                    )
                    const myReminderMessageCarousel = {
                        type: "template",
                        altText: "this is a carousel template",
                        template: {
                            type: "carousel",
                            columns: myReminderMessage,
                            imageAspectRatio: "rectangle",
                            imageSize: "cover",
                        },
                    }
                    const myReminderflexMessage = {
                        to: req.body.events[0].source.userId,
                        messages: [myReminderMessageCarousel],
                    }
                    await axios.post("https://api.line.me/v2/bot/message/push", myReminderflexMessage, {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${process.env.LINE_ACCESS_TOKEN}`,
                        },
                    })
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
                                uri: `${process.env.BASE_URL}/event/${reminder[i].event.id}`,
                            },
                            actions: [
                                {
                                    type: "uri",
                                    label: "visit Site",
                                    uri: `${process.env.BASE_URL}/event/${reminder[i].event.id}`,
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
