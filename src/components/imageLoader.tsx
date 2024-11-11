import React, { useState } from "react";
import imgSnowSrc from "@asset/images/snow1.jpg";
import Skeleton from "react-loading-skeleton";

export default function ImageLoader() {
  const [isLoaded, setIsLoaded] = useState(true);
  console.log("imgSnowSrc", imgSnowSrc);
  return (
    <div>
      {" "}
      image loader
      <div
        className="img"
        style={{
          width: "500px",
          height: "500px",
          padding: "20px",

          overflow: "hidden",
          border: "1px solid black",
        }}
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
          }}
        >
          {!isLoaded ? null : (
            <Skeleton
              style={{ width: "100%", height: "100%", position: "absolute" }}
              baseColor="#202020"
              highlightColor="#444"
            />
          )}
          <img
            style={{
              width: "100%",
              height: "100%",
              opacity: !isLoaded ? 1 : 0,
            }}
            src={imgSnowSrc}
            onLoad={() => setIsLoaded(false)}
          />
        </div>
      </div>
      {/* 
      <div
        style={{
          height: "2000px",
        }}
      ></div> */}
      <img src={"/public/image/christmas1.png"} alt="dd" />
    </div>
  );
}
