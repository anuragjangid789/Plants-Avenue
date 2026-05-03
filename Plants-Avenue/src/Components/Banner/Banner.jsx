import "./Banner.css"
import pic1 from "../../assets/banner-pic1.jpg"
import pic2 from "../../assets/banner-pic2.jpg"

function Banner() {
    return (
        <section className="banner">
            <div className="container banner-wrapper">
                <div className="banner-title">
                    <h2>Grow Plant For <br /> A Better Life</h2>
                </div>

                <div className="banner-img">
                    <img className="img1" src={pic1} alt="" />
                    <img className="img2" src={pic2} alt="" />
                </div>


                <div className="banner-desc">
                    <p>Plant More, Worry Less <br /> Nature Will Take Care Of The Rest</p>
                </div>
            </div>
        </section>
    );
}

export default Banner;