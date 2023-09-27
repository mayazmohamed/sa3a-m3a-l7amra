import ReactPlayer from "react-player";


const VideoList = ({ videoUrls }) => {
  

  const getVideo = async (url) => {
    window.location.href = `http://localhost:3001/download?URL=${url}`;
  };

  console.log({ videoUrls });

  return (
    <div className="grid grid-cols-1 h-full md:grid-cols-2 lg:grid-cols-3 gap-4">
      {videoUrls.map((url, index) => (
        <div key={index} className="bg-white p-4 rounded-lg shadow-md">
          <ReactPlayer
            url={url}
            width="100%"
            height="20rem"
            className=""
          />
          <div className="flex justify-center mt-2">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
              onClick={() => {
                getVideo(url);
              }}
            >
              Download
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VideoList;
