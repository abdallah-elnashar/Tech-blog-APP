import { useEffect, useState } from "react";
import Image from "./Image";
import { Link } from "react-router-dom";
import { SignedIn, SignedOut, useAuth, UserButton } from "@clerk/clerk-react";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const { getToken } = useAuth();
  useEffect(() => {
    getToken().then((token) => {
      console.log(token);
    });
  }, []);
  return (
    <div className=" w-full h-16 md:h-20 flex items-center justify-between">
      {/* logo */}
      <Link to="/" className="flex items-center gap-4 text-2xl font-bold">
        <Image src="/logo.png" alt="logo" w={32} h={32} />
        <span>techblog</span>
      </Link>
      {/* mobl menu */}
      <div className="md:hidden ">
        <div
          className=" cursor-pointer text-4xl"
          onClick={() => setOpen((prev) => !prev)}
        >
          {open ? "X" : "≡"}
        </div>
        {/* mobile link list */}
        <div
          className={`w-full h-screen flex flex-col gap-8 font-medium text-lg justify-center items-center fixed top-16 z-20 ${
            open ? "-right-0" : "-right-[100%]"
          } transition-all ease-in-out bg-[#e6e6ff]`}
        >
          <Link to="/">Home</Link>
          <Link to="/">Trending</Link>
          <Link to="/">Most Popular</Link>
          <Link to="/">About</Link>
          <Link to="/">
            <button className="py-2 px-4 rounded-3xl bg-blue-800 text-white">
              Login 👋
            </button>
          </Link>
        </div>
      </div>
      {/* desktop menu */}
      <div className="hidden md:flex items-center gap-8 xl:gap-12 font-medium">
        <Link to="/">Home</Link>
        <Link to="/">Trending</Link>
        <Link to="/">Most Popular</Link>
        <Link to="/">About</Link>
        <SignedOut>
          <Link to="/login">
            <button className="py-2 px-4 rounded-3xl bg-blue-800 text-white">
              Login 👋
            </button>
          </Link>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
};

export default Navbar;
