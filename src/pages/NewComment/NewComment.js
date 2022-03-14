import { useState } from "react";
import "./newComment.css";
import { addNewComment } from "../../services/addNewCommentService";

const NewComment = ({ history }) => {
  const [comment, setComment] = useState({
    name: "",
    email: "",
    content: "",
  });

  const changeHandler = (e) => {
    setComment({ ...comment, [e.target.name]: e.target.value });
  };

  // async,await
  const postCommentHandler = async () => {
    try {
      await addNewComment({ ...comment, postId: 10 });
      history.push("/");
    } catch (error) {}
  };

  return (
    <div className="newComment">
      <h2>Add New Comment</h2>
      <div>
        <label>name</label>
        <input type="text" name="name" onChange={changeHandler} />
      </div>
      <div>
        <label>email</label>
        <input type="email" name="email" onChange={changeHandler} />
      </div>
      <div>
        <label>body</label>
        <input type="textarea" name="content" onChange={changeHandler} />
      </div>
      <button onClick={postCommentHandler}>Add New Comment</button>
    </div>
  );
};

export default NewComment;
