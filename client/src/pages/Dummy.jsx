import React from "react";
import { useSelector } from "react-redux";

const Dummy = [
  {
    title: "React Basics",
    author: "Jaimin Modi",
    content: "React is a JavaScript library for building UIs...",
  },
  {
    title: "Node.js Tips",
    author: "Jaimin Modi",
    content: "Node.js is great for building backend services...",
  },
];

const Index = () => {
  const user = useSelector((state) => state.user);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        {user.isLoggedIn ? "Welcome Back!" : "Welcome to Our Blog"}
      </h1>

      {user.isLoggedIn ? (
        <div className="grid gap-4">
          {dummyBlogs.map((blog, idx) => (
            <div key={idx} className="border p-4 rounded shadow">
              <h2 className="text-xl font-semibold">{blog.title}</h2>
              <p className="text-sm text-gray-600">By {blog.author}</p>
              <p className="mt-2">{blog.content}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">Please login to view the blogs.</p>
      )}
    </div>
  );
};

export default Dummy;
