import "@src/asset/styles/app.css";
import "@src/asset/styles/app2.scss";
import { RouterProvider } from "react-router-dom";
import router from "routes/Main-Router";

// 탑 레벨의 주요 인스턴스 및 훅 세팅
// 글로벌 css
function App() {
  return <RouterProvider router={router} />;
}

export default App;
