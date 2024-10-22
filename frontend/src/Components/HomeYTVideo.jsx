
const HomeYTVideo = () => {
  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-left text-gray-600 mb-8">Featured Videos</h1>

      {/* Videos in a Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* First Video */}
        <div className="w-full h-[50vh]">
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/nluC2CSfE9s"
            title="YouTube video 1"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        {/* Second Video */}
        <div className="w-full h-[50vh]">
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/Or6x1YAmWpE"
            title="YouTube video 2"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default HomeYTVideo;
