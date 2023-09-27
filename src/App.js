import { useEffect, useState } from "react";
import logo from "./assets/images/cover.png";
import "./App.css";
import Pagination from "@mui/material/Pagination";

import VideoPlayer from "./components/youtube/VideoPlayer";
import axios from "axios";

function App() {
  const [activeTab, setActiveTab] = useState(0);
  const [dark, setDark] = useState(false);
  const [url, setUrl] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function fetchVideoUrls() {
      const urls = await axios.get("http://localhost:3001/urls");
      setUrl(urls.data.videos);
    }

    fetchVideoUrls();
  }, []);

  const [currentUrl, setCurrentUrl] = useState(url.slice(0, 12));

  function handlePageChange(event, newPage) {
    setCurrentPage(newPage);
    console.log(event);
    setCurrentUrl(url.slice((newPage - 1) * 12, newPage * 12));
  }

  const handleTabClick = (tabIndex) => {
    setActiveTab(tabIndex);
  };

  return (
    <div
      className={` ${
        dark ? "bg-[#1F2122]" : "bg-white"
      } font-sans h-[100vh] overflow-scroll`}
    >
      <nav
        className={` ${
          dark ? "bg-[#1F2122]" : "bg-white"
        } border-b border-gray-300 p-4`}
      >
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex justify-center items-center">
            <img src={logo} alt="test" />
          </div>
        </div>
      </nav>
      <div className=" flex justify-end items-center mt-3  mx-3">
        <label className="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" value="" className="sr-only peer" />
          <div
            className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
            onClick={() => {
              setDark(!dark);
              console.log(dark);
            }}
          ></div>
        </label>
      </div>
      <div className="  flex justify-around w-full h-full ">
        <div
          className={`${
            dark ? "bg-[#1F2122]" : "bg-white"
          } p-4 sm:p-8 w-full h-[100%]`}
        >
          <div className="max-w-screen-xl mx-auto  w-full h-[80%]  ">
            <div
              className={`${
                dark ? "bg-[#202c32]" : "bg-gray-200"
              } rounded-lg shadow-lg w-full `}
            >
              <div className="flex w-full ">
                <div
                  className={`w-1/2 p-4 text-center cursor-pointer ${
                    activeTab === 0
                      ? "bg-red-500 text-white"
                      : "bg-white text-red-600"
                  }`}
                  onClick={() => handleTabClick(0)}
                >
                  <h2>Videos</h2>
                </div>
                <div
                  className={`w-1/2 p-4 text-center cursor-pointer ${
                    activeTab === 1
                      ? "bg-red-500 text-white"
                      : "bg-white text-red-600"
                  }`}
                  onClick={() => handleTabClick(1)}
                >
                  <h2>News</h2>
                </div>
              </div>
              <div className="p-4 h-full overflow-y-scroll w-full   ">
                <div
                  className={` tab-content ${activeTab === 0 ? "" : "hidden"}`}
                >
                  <VideoPlayer videoUrls={currentUrl} />
                  <div className="flex items-center justify-center mt-7">
                    <Pagination
                      count={Math.floor(url.length / 12 + 1)}
                      color="secondary"
                      page={currentPage} // Current page
                      onChange={handlePageChange} // Function to handle page changes
                      variant="outlined" // optional: outlined or rounded
                      shape="rounded" // optional: rounded or square
                    />
                  </div>
                </div>
                <div
                  className={` flex items-center justify-center tab-content ${activeTab === 1 ? "" : "hidden"}`}
                >
                  <h1>Comming Soon</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
