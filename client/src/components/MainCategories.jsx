import React from "react";
import { Link } from "react-router-dom";
import Search from "./Search";

function MainCategories() {
  return (
    <div className="hidden md:flex bg-white rounded-3xl xl:rounded-full justify-center p-4 shadow-lg items-center  gap-8">
      {/* LINKS */}
      <div className="flex-1 flex items-center justify-between flex-wrap gap-1">
        <Link
          to="/posts"
          className="bg-blue-800 text-white rounded-full py-2 px-4"
        >
          All Posts
        </Link>
        <Link
          to="/posts?cat=web-design"
          className="hover:bg-blue-50   rounded-full py-2 px-4"
        >
          Web Design
        </Link>
        <Link
          to="/posts?cat=development"
          className="hover:bg-blue-50   rounded-full py-2 px-4"
        >
          Development
        </Link>
        <Link
          to="/posts?cat=databases"
          className="hover:bg-blue-50   rounded-full py-2 px-4"
        >
          Databases
        </Link>
        <Link
          to="/posts?cat=seo"
          className="hover:bg-blue-50   rounded-full py-2 px-4"
        >
          Search Engine
        </Link>
        <Link
          to="/posts?cat=marketing"
          className="hover:bg-blue-50   rounded-full py-2 px-4"
        >
          Marketing
        </Link>
      </div>
      <span className="text-xl font-medium">|</span>
      {/* search */}
      <Search />
    </div>
  );
}

export default MainCategories;
