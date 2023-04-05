import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Edit = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [editedPost, setEditedPost] = useState(state.post);

  const changeHandler = (e) => {
    if (e.target.name === "title") {
      setEditedPost({ ...editedPost, title: e.target.value });
    } else if (e.target.name === "text") {
      setEditedPost({ ...editedPost, body: e.target.value });
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const { id, title, body } = editedPost;

    try {
      const response = await fetch("/data/blog-posts.json", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedPost),
      });
      const data = await response.json();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center p-8">
      <h2 className="text-xl p-2 text-bold">Edit Post</h2>
      <Link to={`/post/${state.post.id}`} state={state}>
        <button className="w-16 h-16 bg-orange-400 text-white rounded-full hover:bg-orange-500 transition ease-in">
          Back
        </button>
      </Link>

      <form
        onSubmit={submitHandler}
        className="flex flex-col justify-center items-center gap-2"
      >
        <div className="flex flex-col">
          <label htmlFor="title">Title</label>
          <textarea
            name="title"
            id="title"
            cols="40"
            rows="10"
            className="border-4 border-slate-500 p-4"
            value={editedPost.title}
            onChange={changeHandler}
          ></textarea>
        </div>
        <div className="flex flex-col">
          <label htmlFor="text">Post Body</label>
          <textarea
            name="text"
            id="text"
            cols="40"
            rows="10"
            className="border-4 border-slate-500 p-4"
            value={editedPost.body}
            onChange={changeHandler}
          ></textarea>
        </div>
        <button className="w-16 h-8 rounded-md bg-blue-500 transition ease-in hover:bg-blue-600 text-white">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Edit;
