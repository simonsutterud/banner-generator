import logo from "./supporter.svg";
import demoLogo from "./demo_logo.png";
import "./App.css";
import { TwitterPicker } from "react-color";
import { useState } from "react";
import download from "downloadjs";

function App() {
  const [bgColor, setBgColor] = useState("#1963b3");
  const [clubName, setClubName] = useState("Demo FK");
  const [img, setImg] = useState("");
  const [imgSrc, setImgSrc] = useState(demoLogo);

  const colorIsBright = function (color) {
    const hex = color.replace("#", "");
    const c_r = parseInt(hex.substr(0, 2), 16);
    const c_g = parseInt(hex.substr(2, 2), 16);
    const c_b = parseInt(hex.substr(4, 2), 16);
    const brightness = (c_r * 299 + c_g * 587 + c_b * 114) / 1000;
    return brightness > 150;
  };

  const handleImageUpload = function (e) {
    if (e.target.files[0] !== undefined) {
      setImgSrc(URL.createObjectURL(e.target.files[0]));
      setImg(e.target.files[0]);
    }
  };

  const handleFormSubmit = function (e) {
    e.preventDefault();

    document.querySelector(".submit").disabled = true;
    document.querySelector(".submit").classList.add("disabled");

    let formData = new FormData();
    formData.append("clubName", clubName);
    formData.append("bgColor", bgColor);
    formData.append("logo", img);

    fetch("https://supporter-banner.herokuapp.com/create-banner", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (!response.ok) throw new Error(response.message);
        return response.blob();
      })
      .then((blob) => {
        download(blob, "banner");
      })
      .catch((err) => {
        alert(err);
        document.querySelector(".submit").disabled = false;
        document.querySelector(".submit").classList.remove("disabled");
      });
  };

  return (
    <div className="page-content">
      <div className="mobile hidden">
        <h2>For en bedre brukeropplevelse, besøk siden på din datamaskin.</h2>
      </div>
      <div className="vh100">
        <nav>
          <a href="http://supporter.no">
            <img src={logo} class="logo" alt="supporter logo" />
          </a>
        </nav>
        <div className="container">
          <div className="hero">
            <h1>
              Lag et <span>banner</span> til din nettbutikk på 1-2-3!
            </h1>
          </div>
          <div className="banner-section">
            <div className="form">
              <form onSubmit={handleFormSubmit}>
                <label for="clubName">1) Tast inn klubbnavn: </label>
                <input
                  type="text"
                  name="clubName"
                  id="clubName"
                  placeholder="Demo FK"
                  required
                  onChange={(e) => setClubName(e.target.value)}
                />

                <label for="logo" className="upload-logo">
                  2) Last opp logo:
                </label>
                <input
                  type="file"
                  accept="image/png, image/jpeg"
                  name="logo"
                  id="logo"
                  required
                  onChange={handleImageUpload}
                />
                <label for="bgColor">3) Velg bakgrunnsfarge: </label>
                <TwitterPicker
                  className="color-picker"
                  onChangeComplete={(e) => setBgColor(e.hex)}
                  /* onSwatchHover={handleColorChange} */
                  triangle="hide"
                />
                <button type="submit" class="submit">
                  LAST NED BANNER
                </button>
              </form>
            </div>
            <div className="preview">
              <div className="preview-bg" style={{ backgroundColor: bgColor }}>
                <img src={imgSrc} alt="" srcset="" />
                <h3
                  style={{
                    color: colorIsBright(bgColor) ? "#000000" : "#ffffff",
                  }}
                >
                  Velkommen til {clubName} sin nettbutikk!
                </h3>
              </div>
              <h2>Velkommen til nettbutikken til {clubName}</h2>
              <h4>
                Når du handler i denne nettbutikken vil en del av overskuddet gå
                tilbake til {clubName}.
              </h4>
            </div>
          </div>
          <div className="skew"></div>
        </div>
        <footer>
          <h4>&copy; Utviklet av SAAS</h4>
        </footer>
      </div>
    </div>
  );
}

export default App;
