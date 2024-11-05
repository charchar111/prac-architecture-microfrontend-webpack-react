import Com1222 from "@public/image/com1222";
import "@src/asset/styles/app.css";
import "@src/asset/styles/app2.scss";
// import logo from "@public/image/logo.png";
function App() {
  const a: number = 1;
  console.log("a", process.env.API_KEY);
  return (
    <div>
      hello22
      {/* <img src={logo} className="App-logo" alt="logo" /> */}
      <Com1222 />
    </div>
  );
}

export default App;
