import "./Hero.css";

function Hero() {
    return (
        <section className="hero">
            <div className="container hero-wrapper">
                <div className="hero-text">
                    <h1>  Bring The Nature <br /> Close To You</h1>
                    <p>   Discover a wide range of indoor plants to bring freshness
                        and beauty into your home.
                    </p>
                    <a href="#shop">
                        <button>Shop Now <span>➜</span></button>
                    </a>
                </div>
            </div>
        </section>
    );
}
export default Hero;