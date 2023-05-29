import React from "react";
import Posts from "../Posts/Posts";
import PostShare from "../PostShare/PostShare";
import "./PostSide.css";
import CommentSide from "../CommentSide/CommentSide";

const PostSide = () => {
  return (
    <div className="PostSide">
      <PostShare/>
      <Posts/>
      <CommentSide />
    </div>
  );
};

export default PostSide;
