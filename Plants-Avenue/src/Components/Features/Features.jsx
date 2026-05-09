import "./Features.css"

function Features() {
    return (
        <section className="features">
            <div className="container features-wrapper">
                <div className="feature">
                    <span>🚚</span>
                    <h4>Free Shipping</h4>
                    <p>On all orders</p>
                </div>

                <div className="feature">
                    <span>🔄</span>
                    <h4>Easy Returns</h4>
                    <p>30 days return</p>
                </div>

                <div className="feature">
                    <span>🌱</span>
                    <h4>Plants  Care</h4>
                    <p>Expert guidance</p>
                </div>

                <div className="feature">
                    <span>📞</span>
                    <h4>24/7 Support</h4>
                    <p>Always available</p>
                </div>

            </div>
        </section>
    );
}
export default Features;