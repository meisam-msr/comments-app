import { useState } from "react";
import "./newComment.css";
import { addNewComment } from "../../services/addNewCommentService";
import { getAllComments } from "../../services/getAllCommentsService";

const NewComment = ({ setComments }) => {
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
      const { data } = await getAllComments();
      setComments(data);
    } catch (error) {}
  };

  // then,catch
  // const postCommentHandler = () => {
  //   axios
  //     .post("/comments/", {
  //       ...comment,
  //       postId: 100,
  //     })
  //     .then((res) => axios.get("/comments/"))
  //     .then((res) => setComments(res.data))
  //     .catch();
  // };

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
