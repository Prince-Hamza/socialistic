import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    userId: { type: String, required: true },
    desc: {type: String, required : true},
    likes: [],
    /*createdAt: {
      type: Date,
      default: new Date(),
    },*/
    image: String,
    video: String,
    comments: [{ type: mongoose.Types.ObjectId, ref: 'comment' }],
    /*image: {
      data: Buffer,
      contentType: String,
    },*/
    /*image: {data: 'Buffer',
      contentType: 'String'},*/
    /*video: String,
  },*/

  
    /*userId: { type: String, required: true },
    desc: { type: String, required: true },
    likes: [],
    image: {
      data: Buffer, // Stocke les données binaires de l'image
      contentType: String, // Stocke le type de contenu de l'image (par exemple, "image/jpeg")
    },
    video: {
      data: Buffer, // Stocke les données binaires de la vidéo
      contentType: String, // Stocke le type de contenu de la vidéo (par exemple, "video/mp4")
    },*/
  },

  {
    timestamps: true
  }

);

const PostModel = mongoose.model("Posts", postSchema);
export default PostModel;

/*const postSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  desc: { type: String, required: true },
  likes: [],
  image: {
    data: Buffer,
    contentType: String,
  },
  video: {
    data: Buffer,
    contentType: String,
  },
}, { timestamps: true });*/

/*const PostModel = mongoose.model("Posts", postSchema);
export default PostModel;*/

/*import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    userId: { type: String, required: true },
    desc: { type: String, required: true },
    likes: [],
    image: {
      data: Buffer, // Stocke les données binaires de l'image
      contentType: String, // Stocke le type de contenu de l'image (par exemple, "image/jpeg")
    },
    video: {
      data: Buffer, // Stocke les données binaires de la vidéo
      contentType: String, // Stocke le type de contenu de la vidéo (par exemple, "video/mp4")
    },
  },
  {
    timestamps: true,
  }
);

const PostModel = mongoose.model("Posts", postSchema);
export default PostModel;*/


