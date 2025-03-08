import { useAuth, useUser } from "@clerk/clerk-react";
import "react-quill-new/dist/quill.snow.css";
import ReactQuill from "react-quill-new";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Upload from "../components/Upload";

const Write = () => {
  const { isLoaded, isSignedIn } = useUser();
  const [value, setValue] = useState("");
  const [cover, setCover] = useState("");
  const [img, setImg] = useState("");
  const [video, setVideo] = useState("");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    img && setValue((prev) => prev + `<p><img src="${img}" alt="img" /></p>`);
  }, [img]);

  useEffect(() => {
    video &&
      setValue(
        (prev) =>
          prev + `<p><iframe class='ql-video' src="${video}" alt="img" /></p>`
      );
  }, [video]);

  const navigate = useNavigate();

  const { getToken } = useAuth();

  const mutation = useMutation({
    mutationFn: async (newPost) => {
      const token = await getToken();
      return axios.post(`${import.meta.env.VITE_API_URL}/posts`, newPost, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    onSuccess: (res) => {
      toast.success("Post has been created successfully!");
      navigate(`/${res.data.slug}`);
    },
  });

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (isLoaded && !isSignedIn) {
    return <div>You should login!</div>;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = {
      img: cover.filePath || "",
      title: formData.get("title"),
      category: formData.get("category"),
      desc: formData.get("desc"),
      content: value,
    };

    console.log(data);

    mutation.mutate(data);
  };

  return (
    <div className="h-[calc(100vh-64px)] md:h-[calc(100vh-80px)] flex flex-col gap-6">
      <h1 className="text-xl font-light">Create a New Post</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 flex-1 mb-6 "
      >
        <Upload type="image" setProgress={setProgress} setData={setCover}>
          <button className="p-2 shadow-md text-sm rounded-xl w-fit text-gray-500 bg-white">
            Add a cover image
          </button>
        </Upload>

        <input
          type="text"
          placeholder="My Awesome Story"
          name="title"
          className="bg-transparent text-4xl outline-none text-gray-500 font-semibold"
        />
        <div className="flex items-center gap-4">
          <label htmlFor="" className="text-sm">
            Choose a category:
          </label>
          <select
            name="category"
            className="p-2 shadow-md text-sm rounded-xl w-fit text-gray-500 bg-white"
          >
            <option value="general">General</option>
            <option value="web-design">Web Design</option>
            <option value="development">Development</option>
            <option value="databases">Databases</option>
            <option value="seo">Search Engines</option>
            <option value="marketing">Marketing</option>
          </select>
        </div>
        <textarea
          className="p-4 shadow-md text-sm rounded-xl"
          name="desc"
          placeholder="A Short Description"
        />
        <div className="flex flex-1">
          <div className="flex flex-col items-center gap-2 mr-2">
            <Upload type="image" setProgress={setProgress} setData={setImg}>
              📷
            </Upload>
            <Upload type="video" setProgress={setProgress} setData={setVideo}>
              ▶
            </Upload>
          </div>
          <ReactQuill
            theme="snow"
            value={value}
            onChange={setValue}
            className="flex-1  bg-white shadow-md text-sm rounded-xl"
            readOnly={0 < progress && progress < 100}
          />
        </div>
        <button
          disabled={mutation.isPending || (0 < progress && progress < 100)}
          className="bg-blue-800 text-white p-2 font-medium rounded-xl w-36 mt-4 disabled:bg-blue-400 disabled:cursor-not-allowed"
        >
          {mutation.isPending ? "Loading..." : "Send"}
        </button>
        {"progress : " + progress}
        {mutation.isError && <span>Error: {mutation.error.message}</span>}
      </form>
    </div>
  );
};

export default Write;
