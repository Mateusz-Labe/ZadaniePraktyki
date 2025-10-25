import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const COLORS = [
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#ff8042",
  "#8dd1e1",
  "#a4de6c",
  "#d0ed57",
  "#ffc0cb",
  "#d88484",
  "#84d8d8",
];

const Metryki = () => {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [todos, setTodos] = useState([]);

  // Pobranie wszystkich danych
  useEffect(() => {
    Promise.all([
      fetch("https://jsonplaceholder.typicode.com/users").then((res) =>
        res.json()
      ),
      fetch("https://jsonplaceholder.typicode.com/posts").then((res) =>
        res.json()
      ),
      fetch("https://jsonplaceholder.typicode.com/comments").then((res) =>
        res.json()
      ),
      fetch("https://jsonplaceholder.typicode.com/todos").then((res) =>
        res.json()
      ),
    ])
      .then(([usersData, postsData, commentsData, todosData]) => {
        setUsers(usersData);
        setPosts(postsData);
        setComments(commentsData);
        setTodos(todosData);
      })
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  // Dane do wykresu słupkowego i kołowego
  const chartData = users.map((user) => {
    const userTodos = todos.filter((todo) => todo.userId === user.id);
    const completedTodos = userTodos.filter((todo) => todo.completed).length;
    const percentageCompleted =
      userTodos.length > 0 ? (completedTodos / userTodos.length) * 100 : 0;
    return { name: user.name, percentageCompleted: +percentageCompleted.toFixed(2) };
  });

  return (
    <div>
      <h1>Users and Posts</h1>
      <ul>
        {users.map((user) => {
            const userPosts = posts.filter((post) => post.userId === user.id);
            const totalUserComments = userPosts.reduce((sum, post) => {
                const commentsForPost = comments.filter(
                    (c) => c.postId === post.id
                );
                return sum + commentsForPost.length;
            }, 0);
            // Średnia liczba komentarzy na post
            const avgComments =
            userPosts.length > 0
            ? (totalUserComments / userPosts.length).toFixed(2)
            : 0;
            // Procent ukończonych TODOs
            const userTodos = todos.filter((todo) => todo.userId === user.id);
            const completedTodos = userTodos.filter((t) => t.completed).length;
            const percentage =
            userTodos.length > 0
            ? ((completedTodos / userTodos.length) * 100).toFixed(2)
            : 0;
            
           
            return (
                // Wyświetlanie informacji o użytkowniku
            <li key={user.id}>
              <h2>{user.name}</h2>
              <h3>User Posts:</h3>
              <ul>
                {/* Wyświetlanie nazwy postu wraz z komentarzami */}
                {userPosts.map((post) => {
                  const postComments = comments.filter(
                    (c) => c.postId === post.id
                  );
                  return (
                    <li key={post.id}>
                      <strong>{post.title}</strong>
                      <ul>
                        {postComments.map((comment) => (
                          <li key={comment.id}>{comment.body}</li>
                        ))}
                      </ul>
                    </li>
                  );
                })}
              </ul>
              {/* Wyświetlanie Statystyk użytkownika */}
              <strong>Total posts: {userPosts.length}</strong> <br />
              <strong>Avg comments per post: {avgComments}</strong> <br />
              <strong>
                Completed TODOs: {completedTodos}/{userTodos.length} (
                {percentage}%)
              </strong>
            </li>
          );
        })}
      </ul>
      {/* Wyświetlanie Ile ogólnie Zadań zostało wykonnanych z wszystkich istniejacych */}

            <strong>        {`Overall completed todos: ${(todos.filter(todo => todo.completed).length / todos.length) * 100}%`}</strong>

            {/* Wykres słupkowy % wykonanych zadań z ustalonych dla poszczególnego użytkownika */}

      <h1>TODO Completion Chart (Bar)</h1>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis unit="%" />
          <Tooltip />
          <Bar dataKey="percentageCompleted" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
        {/* Wykres kołowy % wykonanych zadań z ustalonych dla poszczególnego użytkownika */}
      <h1>TODO Completion Chart (Pie)</h1>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            dataKey="percentageCompleted"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label={(entry) => `${entry.name}: ${entry.percentageCompleted}%`}
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Legend />
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Metryki;
