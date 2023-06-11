import  { useEffect, useState } from "react";

const Banner = () => {
  const images = [
    "https://img.freepik.com/free-photo/young-english-teacher-doing-her-lessons-online_23-2149019775.jpg?w=1380&t=st=1686197573~exp=1686198173~hmac=d4b7617163c7ca883ef0a212b03fe2c20bf0c69353003a697d7620c36ee5ee44",
    "https://img.freepik.com/premium-photo/teenager-people-national-flags-board_53876-22200.jpg?w=1380",
    "https://img.freepik.com/free-photo/people-learning-new-language-work_23-2149300768.jpg?w=1380&t=st=1686197615~exp=1686198215~hmac=564fb96a8579dbd2b9f332b6789b11e767dd55c06a924c164083d83fedc5b1e0",
    "https://img.freepik.com/premium-photo/classmates-helping-student-finish-task_274679-36052.jpg?w=1380",
    "https://img.freepik.com/free-photo/side-view-teacher-watching-kids_23-2149455191.jpg?w=1380&t=st=1686198941~exp=1686199541~hmac=dece84181b99a64dae16390c3b4e2b9a9fbcfa96d9f24b5dd4171b1bfbfc92fd"
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) =>
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
        setIsTransitioning(false);
      }, 1000);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full">
      <div className="carousel w-full overflow-hidden relative">
        <div
          className="flex transition-transform ease-in-out duration-1000"
          style={{
            transform: `translateX(-${currentImageIndex * 100}%)`,
          }}
        >
          {images.map((image, index) => (
            <div key={index} className="w-full flex-shrink-0 relative max-h-screen">
              <img src={image} alt={`Slide ${index + 1}`} className="w-full max-h-[calc(100vh-150px)]" />
              {index === currentImageIndex && (
                <div
                  className={`absolute inset-0 flex flex-col justify-center items-center transition-opacity duration-500 ${
                    isTransitioning ? "opacity-0" : "opacity-100"
                  }`}
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7))",
                  }}
                >
                  <h2 className="text-white text-4xl font-bold mb-2">
                    Admit to our Foreign Language Training School
                  </h2>
                  <p className="text-white text-sm">
                    Join our summer camp and learn a new language!
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Banner;
