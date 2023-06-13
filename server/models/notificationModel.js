import mongoose from "mongoose"

const NotificationSchema = new mongoose.Schema(
    {
        text: {
            type: String,
            required: true
        },
        id: {
            type: String,
            required: true
        },
        icon: String
    },
    {
        timestamps: true,
    }
)

const NotificationModel = mongoose.model("notifications", NotificationSchema);
export default NotificationModel;
