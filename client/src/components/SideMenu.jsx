import { Link, useSearchParams } from "react-router-dom";
import Search from "./Search";

const SideMenu = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleFilterChange = (e) => {
    if (searchParams.get("sort") !== e.target.value) {
      setSearchParams({
        ...Object.fromEntries(searchParams.entries()),
        sort: e.target.value,
      });
    }
  };

  const handleCategoryChange = (category) => {
    if (searchParams.get("cat") !== category) {
      setSearchParams({
        ...Object.fromEntries(searchParams.entries()),
        cat: category,
      });
    }
  };

  return (
    <div className="px-4 h-max sticky top-8">
      <h1 className="mb-4 text-sm font-medium">Search</h1>
      <Search />
      <h1 className="mt-8 mb-4 text-sm font-medium">Filter</h1>
      <div className="flex flex-col gap-2 text-sm">
        <label htmlFor="" className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="sort"
            onChange={handleFilterChange}
            value="newest"
            className="appearance-none bg-white rounded-sm w-4 h-4 border border-blue-800 cursor-pointer checked:bg-blue-800"
          />
          Newest
        </label>
        <label htmlFor="" className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="sort"
            onChange={handleFilterChange}
            value="popular"
            className="appearance-none bg-white rounded-sm w-4 h-4 border border-blue-800 cursor-pointer checked:bg-blue-800"
          />
          Most Popular
        </label>
        <label htmlFor="" className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="sort"
            onChange={handleFilterChange}
            value="trending"
            className="appearance-none bg-white rounded-sm w-4 h-4 border border-blue-800 cursor-pointer checked:bg-blue-800"
          />
          Trending
        </label>
        <label htmlFor="" className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="sort"
            onChange={handleFilterChange}
            value="oldest"
            className="appearance-none bg-white rounded-sm w-4 h-4 border border-blue-800 cursor-pointer checked:bg-blue-800"
          />
          Oldest
        </label>
      </div>
      <h1 className="mt-8 mb-4 text-sm font-medium">Category</h1>
      <div className=" flex flex-col gap-2 text-sm">
        <Link
          to="/posts"
          className="underlinepx-4"
          onClick={() => handleCategoryChange("general")}
        >
          All Posts
        </Link>
        <Link
          to="/posts?cat=web-design"
          onClick={() => handleCategoryChange("web-design")}
          className="underline"
        >
          Web Design
        </Link>
        <Link
          to="/posts?cat=development"
          onClick={() => handleCategoryChange("development")}
          className="underline"
        >
          Development
        </Link>
        <Link
          to="/posts?cat=databases"
          onClick={() => handleCategoryChange("databases")}
          className="underline"
        >
          Databases
        </Link>
        <Link
          to="/posts?cat=seo"
          onClick={() => handleCategoryChange("seo")}
          className="underline"
        >
          Search Engine
        </Link>
        <Link
          to="/posts?cat=marketing"
          onClick={() => handleCategoryChange("marketing")}
          className="underline"
        >
          Marketing
        </Link>
      </div>
    </div>
  );
};

export default SideMenu;
