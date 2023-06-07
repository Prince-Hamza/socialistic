import mongoose from "mongoose"

const postSchema = mongoose.Schema(
  {
    userId: { type: String, required: true },
    text: { type: String},
    likes: [],
    createdAt: {
      type: Date,
      default: new Date(),
    },
    images: [],
    videos: [],
    locations: [],
    comments: []
  },
  {
    timestamps: true
  }
)

const PostModel = mongoose.model("Posts", postSchema);
export default PostModel

