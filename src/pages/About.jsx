import "./style/webpage.css";
import Footer from '../components/Footer';
import Header from "../components/Header";
import logo from "../assets/nest_marketing.svg";

function About() {
  return (
    <div className="home-wrapper">
      <Header /> 

      <main>
        <section className="about-section">
          <div className="about-header">
            <h1 className="section-title">
              About <span className="highlight">Nest</span>
            </h1>
            <p className="about-subtitle">Your Trusted Fashion Partner</p>
          </div>

          <div className="about-content">
            <div className="about-image">
              <img src={logo} alt="About Nest" />
            </div>
            
            <div className="about-text">
              <h2>Our Story</h2>
              <p>
                Founded in 2020, Nest has grown from a small startup to one of the leading
                fashion retailers in the region. We believe in providing quality fashion
                that is accessible to everyone.
              </p>
              
              <h2>Our Mission</h2>
              <p>
                To revolutionize online shopping by providing a seamless experience
                with our innovative BLF (Blacklist Filter) technology, ensuring secure
                and reliable transactions for all our customers.
              </p>

              <div className="stats-grid">
                <div className="stat-item">
                  <span className="stat-number">10K+</span>
                  <span className="stat-label">Happy Customers</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">5K+</span>
                  <span className="stat-label">Products</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">99%</span>
                  <span className="stat-label">Satisfaction Rate</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default About; 