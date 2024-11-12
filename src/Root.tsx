import Com1222 from "@public/image/com1222";
import "@src/asset/styles/app.css";
import "@src/asset/styles/app2.scss";
import { useState } from "react";
import example1 from "@src/asset/data/json/example1.json";
import ImageLoader from "@src/components/imageLoader";
import SVGLoader from "components/SVGLoader";
import FontLoader from "components/FontLoader";
import { Link, Outlet } from "react-router-dom";

function Root() {
  const [openImg, setOpenImg] = useState(false);
  const [openSvg, setOpenSvg] = useState(false);
  return (
    <div>
      <button onClick={() => setOpenImg((prev) => !prev)}>
        open ImageLoader
      </button>
      <button onClick={() => setOpenSvg((prev) => !prev)}>
        open SVGLoader
      </button>
      hello
      {!openImg ? null : <ImageLoader />}
      {!openSvg ? null : <SVGLoader />}
      <FontLoader />
      <Link to={`about`}>About</Link>
      <Outlet />
    </div>
  );
}

export default Root;
