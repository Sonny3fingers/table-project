import React, { useState, useEffect } from "react";
import UsersTableRow from "./UsersTableRow.jsx";

const UsersTable = () => {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const responseUsers = fetch("/data/users.json");
      const responsePosts = fetch("/data/blog-posts.json");

      const [dataUsers, dataPosts] = await Promise.all([
        responseUsers,
        responsePosts,
      ]).then((responses) =>
        Promise.all(responses.map((response) => response.json()))
      );
      setUsers(dataUsers.slice(0, 10));
      setPosts(dataPosts);
    };
    fetchData();
  }, []);

  const userClickHandler = (e) => {
    const selectedUserId = +e.target.id;
    const userPostsData = getUserIdPosts(posts, selectedUserId);
    setUserPosts(userPostsData);
  };

  return (
    <table className="table-auto text-center bg-slate-700 text-white p-4 rounded-3xl">
      <thead>
        <tr>
          <th className="border border-collapse border-slate-300 border-t-0 border-l-0 p-3 rounded-t-3xl ">
            Expand
          </th>
          <th className="border border-collapse border-t-0 border-slate-300 p-3">
            Name
          </th>
          <th className="border border-collapse border-slate-300 border-t-0 border-r-0 p-3">
            Gender
          </th>
        </tr>
      </thead>
      <tbody>
        {users &&
          users.length !== 0 &&
          users.map((user) => (
            <UsersTableRow
              user={user}
              key={user.id}
              id={user.id}
              posts={posts}
            />
          ))}
      </tbody>
    </table>
  );
};

export default UsersTable;
