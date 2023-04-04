import React, { useState } from "react";
import ChevronDownIcon from "../assets/icons/ChevronDown.jsx";
import ChevronUpIcon from "../assets/icons/ChevronUp";
import { Link } from "react-router-dom";

const UsersTableRow = ({ user, id, posts }) => {
  const [isExpandRow, setIsExpandRow] = useState(false);
  const [userPosts, setUserPosts] = useState([]);

  const userClickHandler = (e) => {
    const selectedUserId = +e.target.id;
    const userPostsData = getUserIdPosts(posts, selectedUserId);
    setUserPosts(userPostsData);
    getIsExpandRow(id, selectedUserId);
  };

  const getIsExpandRow = (id, selectedUserId) => {
    if (selectedUserId === id) {
      setIsExpandRow(!isExpandRow);
    }
  };

  const getUserIdPosts = (posts, userId) => {
    return posts.filter((post) => post.userId === userId);
  };

  return (
    <tr
      className="grid grid-cols-3 bg-slate-600 hover:bg-slate-500 transition-all ease-in cursor-pointer border-collapse"
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
      <td className="border border-slate-400 p-1 line-clamp-2">
        {user.first_name} {user.last_name}
      </td>
      <td className="border border-slate-400 p-2">{user.gender}</td>
      {isExpandRow && (
        <td className="col-span-3 bg-slate-600 animate-moveDown">
          <h3 className="text-left px-4 py-2 text-xl">Posts:</h3>
          <ul className="flex flex-col p-2 justify-start items-start text-left overflow-hidden">
            {userPosts.map((post, i) => (
              <li
                key={post.id}
                className="m-1 p-1 hover:bg-slate-500 line-clamp-1"
              >
                <Link to={`/post/:${post.id}`} state={{ post }}>
                  {i + 1}. {post.title}
                </Link>
              </li>
            ))}
          </ul>
        </td>
      )}
    </tr>
  );
};

export default UsersTableRow;
