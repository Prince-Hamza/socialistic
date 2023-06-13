import NotificationModel from "../models/notificationModel";

export const notify = async (req, res) => {

    if (!req.body.text) return res.status(400).send({ error: 'text field required' })
    if (!req.body.id) return res.status(400).send({ error: 'id field required' })

    const notification = new NotificationModel({
        id: req.body.id,
        text: req.body.text
    })

    await notification.save()

    return res.send({ success: true })

}