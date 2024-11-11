import Com1222 from "@public/image/com1222";
import "@src/asset/styles/app.css";
import "@src/asset/styles/app2.scss";
import { useState } from "react";
import example1 from "@src/asset/data/json/example1.json";
import ImageLoader from "@src/components/imageLoader";

function App() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button onClick={() => setOpen((prev) => !prev)}>click</button>
      hello
      {!open ? null : <ImageLoader />}
    </div>
  );
}

export default App;
