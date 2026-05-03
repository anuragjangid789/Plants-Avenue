import "./About.css"
import pic from "../../assets/about-pic.jpg"

function About() {
    return (
        <section className="about">
            <div className="container about-wrapper">

                <img className="img" src={pic} alt="aboutpic" />


                <div className="about-content">
                    <h2>
                        We Help You Grow Your Plants Better
                    </h2>

                    <p>
                        Our goal is to provide you with the best quality plants and care tips.
                        We believe that plants make life more beautiful and peaceful.
                    </p>

                    <p>
                        Whether you are a beginner or an expert, our plants and guidance
                        will help you grow a healthy green environment at your home.
                    </p>

                    <a href="https://en.wikipedia.org/wiki/Houseplant"><button>Explore More</button></a>

                </div>
            </div>
        </section>
    );
}
export default About;