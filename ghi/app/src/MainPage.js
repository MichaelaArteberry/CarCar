import videoBG from "./assets/stock-dealership-vid.mp4";
import "./mainPage.css";

function MainPage() {
  return (
    <div className="main">
      <div className="overlay"></div>
    <video src={videoBG} autoPlay loop muted />
    <div className="content">
      <h1>CarCar</h1>
      <p>The premiere solution for automobile dealership management!</p>
    </div>
  </div>
  );
}

export default MainPage;
