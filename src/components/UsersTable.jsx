import React, { useState, useEffect, useRef } from "react";
import ChevronDownIcon from "../assets/icons/ChevronDown.jsx";
import ChevronUpIcon from "../assets/icons/ChevronUp";

const UsersTable = () => {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [userPosts, setUserPosts] = useState([]);
  const [isExpandRow, setIsExpandRow] = useState(false);

  const rowRef = useRef();

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
    setIsExpandRow(!isExpandRow);
  };

  const getUserIdPosts = (posts, userId) => {
    return posts.filter((post) => post.userId === userId);
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
            <tr
              className="bg-slate-600 hover:bg-slate-500 transition-all ease-in cursor-pointer"
              ref={rowRef}
              key={user.id}
              id={user.id}
            >
              <td
                className="border border-b-0 border-slate-400 p-2 flex justify-center"
                id={user.id}
                onClick={userClickHandler}
              >
                {!isExpandRow ? (
                  <ChevronDownIcon className="pointer-events-none" />
                ) : (
                  <ChevronUpIcon className="pointer-events-none" />
                )}
              </td>
              <td className="border border-slate-400 p-2">
                {user.first_name} {user.last_name}
              </td>
              <td className="border border-slate-400 p-2">{user.gender}</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default UsersTable;
