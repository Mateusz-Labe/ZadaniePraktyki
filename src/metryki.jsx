import { useState, useEffect, use } from "react";

const Metryki = () => {
    const [users, setUsers] = useState([]);
    const [posts, setPosts] = useState([]);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        Promise.all([
            fetch("https://jsonplaceholder.typicode.com/users").then((res) => res.json()),
            fetch("https://jsonplaceholder.typicode.com/posts").then((res) => res.json()),
            fetch("https://jsonplaceholder.typicode.com/comments").then((res) => res.json()),
        ])
        .than(([usersData, postsData, commentsData]) => {
            setUsers(usersData);
            setPosts(postsData);
            setComments(commentsData);
        })
        .catch((err) => console.error("Error fetching data:", err));
    }, []);


    return(
        <div>Hello World</div>
    );
}

export default Metryki;