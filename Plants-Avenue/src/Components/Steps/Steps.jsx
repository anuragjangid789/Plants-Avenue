import "./Steps.css"

function Steps() {
    return (
        <section className="steps">
            <div className="container-steps">
                <h1 className="steps-title">
                    ⸺ Steps to start taking care of your plants ⸺
                </h1>

                <div className="steps-wrapper">


                    <div className="step-card">
                        <div className="icon">💧</div>
                        <h3>Humidity Control</h3>
                        <p>
                            Maintaining the right humidity level is essential for plant growth.
                            It helps leaves stay fresh and prevents dryness or damage.
                        </p>
                    </div>


                    <div className="step-card">
                        <div className="icon">🐛</div>
                        <h3>Pest Anticipation</h3>
                        <p>
                            Keep an eye on pests that can harm your plants.
                            Regular inspection helps you take action before damage spreads.
                        </p>
                    </div>


                    <div className="step-card">
                        <div className="icon">✂️</div>
                        <h3>Pruning Weeds</h3>
                        <p>
                            Trimming unwanted leaves and weeds helps plants grow better.
                            It improves shape and boosts overall plant health.
                        </p>
                    </div>

                </div>
            </div>
        </section>
    );
}

export default Steps;