import { useState, useEffect } from "react";

const Practice = () => {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error("Error fetching posts:", err));
  }, []);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/comments")
      .then((res) => res.json())
      .then((data) => setComments(data))
      .catch((err) => console.error("Error fetching comments:", err));
  }, []);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/albums")
      .then((res) => res.json())
      .then((data) => setAlbums(data))
      .catch((err) => console.error("Error fetching albums:", err));
  }, []);

  return (
    <>
    <div>
      <h1>Posts with Comments</h1>
      <ul>
        {posts.map((post) => {
          const postComments = comments.filter(
            (comment) => comment.postId === post.id
          );



          return (
            <li key={post.id}>
              <h2>Post ID: {post.id}</h2>
              <h3>Title: {post.title}</h3>
              <p>Content: {post.body}</p>

              <p>Comments count: {postComments.length}</p>

              <ul>
                {postComments.map((comment, index) => (
                  <li key={comment.id}>
                    Comment {index + 1}: {comment.body}
                  </li>
                ))}
              </ul>
            </li>
          );
        })}
      </ul>
    </div>
    <div>

    </div>
    </>
  );
};

export default Practice;
