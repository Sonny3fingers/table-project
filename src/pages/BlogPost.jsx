import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Button from "../components/Button";

const BlogPost = () => {
  let { state } = useLocation();
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  useEffect(() => {
    setTitle(state.post.title);
    setText(state.post.body);
  }, [state]);

  const editPostHandler = () => {
    console.log("Edit");
  };

  const deletePostHandler = () => {
    console.log("Delete");
  };

  return (
    <div className="flex flex-col justify-center items-center bg-slate-200 sm:flex-row sm:flex-wrap sm:min-h-96">
      <div className="sm:w-1/2 w-full h-1/2 flex justify-center items-center bg-slate-200 p-4">
        <Link to="/">
          <Button style={{ backgroundColor: "orange" }}>Back</Button>
        </Link>
      </div>
      <div className="h-1/2 sm:w-1/2 sm:py-16 bg-slate-600">
        <h2 className="bg-slate-600 text-white m-2 p-2 rounded-lg text-xl md:w-3/4 text-center">
          {title}
        </h2>
      </div>
      <div className="sm:w-1/2 h-1/2 flex justify-end items-end sm:py-8 bg-slate-600">
        <p className="bg-slate-600 text-white m-2 mb-4 p-8 rounded-lg md:w-3/4 indent-8">
          {state.post.body}
        </p>
      </div>
      <div className="flex flex-col justify-center items-center gap-16 w-full sm:w-1/2 mb-4 p-16 bg-slate-200 sm:py-20">
        <button
          onClick={editPostHandler}
          className="w-24 h-24 bg-blue-500 transition-all ease-in hover:bg-blue-600 text-white rounded-full self-start"
        >
          Edit
        </button>
        <button
          onClick={deletePostHandler}
          className="w-24 h-24 bg-red-500 transition-all ease-in hover:bg-red-600 text-white rounded-full self-end"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default BlogPost;
