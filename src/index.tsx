import { createRoot } from "react-dom/client";
import App from "@src/App";

const container = document.getElementById("react-root");

container
  ? createRoot(container).render(<App />)
  : (() => {
      throw new Error("react의 root 컨테이너가 없습니다");
    })();
