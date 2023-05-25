import React, { useEffect } from "react";
import { getTimelineComments } from "../../actions/CommentsAction";
import Comment from "../Comment/Comment";
import { useSelector, useDispatch } from "react-redux";
import "./Comments.css";
import { useParams } from "react-router-dom";

const Comments = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer.authData);
  let { posts, loading } = useSelector((state) => state.postReducer);
  useEffect(() => {
    dispatch(getTimelineComments(user._id));
  }, [dispatch, user._id]);
  if (!posts) return "No Posts";
  if (params.id) posts = posts.filter((post) => post.userId === params.id);
  return (
    <div className="Posts">
      {loading ? (
        "Fetching posts...."
      ) : (
        posts.map((post, id) => {
          return <Comment data={post} key={id} />;
        })
      )}
    </div>
  );
};

export default Comments;
