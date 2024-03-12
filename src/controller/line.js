const repo = require("../repository")
const utils = require("../utils")
const axios = require("axios")
require('dotenv').config()

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

 const Reminder = await repo.reminder.getAll()

    const flexMessage = {
        to: "U2293b8a9d37350fa9e6690f592b7c8a5",
        messages: [
            {
                "type": "template",
                "altText": "This is a buttons template",
                "template": {
                  "type": "buttons",
                  "thumbnailImageUrl": "https://res.cloudinary.com/dxhpdgd6k/image/upload/v1710256886/local_event_path/cover-image/1710256882363221991454_tg5tid.png",
                  "imageAspectRatio": "rectangle",
                  "imageSize": "cover",
                  "imageBackgroundColor": "#FFFFFF",
                  "title": "Menu",
                  "text": "Please select",
                  "defaultAction": {
                    "type": "uri",
                    "label": "View detail",
                    "uri": "http://example.com/page/123"
                  },
                  "actions": [
                    {
                      "type": "postback",
                      "label": "Buy",
                      "data": "action=buy&itemid=123"
                    },
                    {
                      "type": "postback",
                      "label": "Add to cart",
                      "data": "action=add&itemid=123"
                    },
                    {
                      "type": "uri",
                      "label": "View detail",
                      "uri": "http://example.com/page/123"
                    }
                  ]
                }
              }
        ],
    }

    const result = await axios.post("https://api.line.me/v2/bot/message/push", flexMessage, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.LINE_ACCESS_TOKEN}`,
        },
    })

    res.status(200).json(result)
})
