import { useEffect, useState } from "react";
import "./fullComment.css";
import { deleteComment } from "../../services/deleteCommentService";
import { getOneComment } from "../../services/getOneCommentService";

const FullComment = ({ match, history }) => {
  const commentId = match.params.id;
  const [comment, setComment] = useState(null);

  useEffect(() => {
    if (commentId) {
      getOneComment(commentId)
        .then((res) => setComment(res.data))
        .catch();
    }
  }, [commentId]);

  const styles = {
    color: "444",
    backgroundColor: "#efefef",
    padding: "10px",
    borderRadius: "8px",
  };

  const deleteHandler = async () => {
    try {
      await deleteComment(commentId);
      setComment(null);
      history.push("/");
      // const { data } = await getAllComments();
      // setComments(data);
      // setSelectedId(null);
    } catch (error) {
      console.log(error);
    }
  };

  // then, catch
  // const deleteHandler = () => {
  //   axios
  //     .delete(`/comments/${commentId}`)
  //     .then((res) => axios.get("/comments/"))
  //     .then((res) => setComments(res.data))
  //     .catch((err) => console.log(err));
  // };

  let commentDetail = <p style={styles}> please select a comment !</p>;

  if (commentId) commentDetail = <p>loading ...</p>;

  if (comment) {
    commentDetail = (
      <div className="fullComment">
        <p>{comment.name}</p>
        <p>{comment.email}</p>
        <p>{comment.body}</p>
        <button onClick={deleteHandler} className="delete">
          Delete
        </button>
      </div>
    );
  }
  return commentDetail;
};

export default FullComment;
