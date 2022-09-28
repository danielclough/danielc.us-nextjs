import siteData from "../site-info";
import Image from "next/image";

var Background = siteData["settings"].cover_image;

function Banner() {
  return (
    <>
      <div className="hero-bg">
        <img src={Background} className="hero-image" />

        <div className="hero-logo">
          <img src={siteData["settings"].logo} className="hero-logo" />
        </div>
      </div>
    </>
  );
}

export default Banner;
