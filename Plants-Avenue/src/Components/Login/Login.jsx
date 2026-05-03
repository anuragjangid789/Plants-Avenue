import "./Login.css";
import loginimg from "../../assets/login-img.jpg";

function Login({ onClose }) {
    return (
        <div className="login-overlay">

            <div className="login-container">

                <button className="close-button" onClick={onClose}> &times;</button>
                <div className="login-left">
                    <img src={loginimg} alt="Login" />
                </div>

                <div className="login-right">
                    <h2>Login to Your Account</h2>
                    <form>
                        <input type="email" placeholder="Enter your Email" required />
                        <input type="password" placeholder="Enter your Password" required />

                        <button type="submit" className="submit-button">Login</button>

                        <p className="switch-text">
                            Don't have an account? <span>Register</span>
                        </p>
                    </form>
                </div>

            </div>

        </div>
    );
}
export default Login;   