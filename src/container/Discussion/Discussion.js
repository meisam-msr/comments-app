import Comment from "../../components/Comment/Comment";
import FullComment from "../../components/FullComment/FullComment";
import NewComment from "../../components/NewComment/NewComment";
import "./discussion.css";
import { useEffect, useState } from "react";
import { getAllComments } from "../../services/getAllCommentsService";
import { toast } from "react-toastify";

const Discussion = () => {
  const [comments, setComments] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    // http
    //   .get("https://jsonplaceholder.typicode.com/comments")
    //   .then((response) => {
    //     // console.log(response.data);
    //     setComments(response.data.slice(0, 4));
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    const getComments = async () => {
      try {
        const { data } = await getAllComments();
        setComments(data);
      } catch (error) {
        // console.log(error);
        setError(true);
      }
    };

    getComments();
  }, []);

  const selectCommentHandler = (id) => {
    setSelectedId(id);
  };

  const renderComments = () => {
    let renderValue = <p>Loading ...</p>;

    if (error) {
      renderValue = <p>fetching data failed !</p>;
      toast.error("there is an error!");
    }

    if (comments && !error) {
      renderValue = comments.map((c) => (
        <Comment
          key={c.id}
          name={c.name}
          email={c.email}
          onClick={() => selectCommentHandler(c.id)}
        />
      ));
    }
    return renderValue;
  };

  return (
    <main>
      <section>{renderComments()}</section>
      <section>
        <FullComment
          commentId={selectedId}
          setComments={setComments}
          setSelectedId={setSelectedId}
        />
      </section>
      <section>
        <NewComment setComments={setComments} />
      </section>
    </main>
  );
};

export default Discussion;
