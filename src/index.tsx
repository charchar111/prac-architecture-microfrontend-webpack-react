import { createRoot } from "react-dom/client";
import App from "@src/App";
import "react-loading-skeleton/dist/skeleton.css";

const container = document.getElementById("react-root");

console.log("실행");

container
  ? createRoot(container).render(<App />)
  : (() => {
      throw new Error("react의 root 컨테이너가 없습니다");
    })();
