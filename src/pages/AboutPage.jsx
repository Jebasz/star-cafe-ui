import React from "react";
import Header from "../layout/Header";

import "../styles/pages/about-page.css";

function AboutPage() {

  return (

    <div className="about-page">

      <Header />

      <div className="about-container">

        <h2 className="about-title">
          About STAR Tea Park
        </h2>

        <p className="about-text">
          STAR Tea Park is a premium coffee and snack destination
          delivering quality beverages and quick service experience.
        </p>

        <p className="about-text">
          Our POS system is designed for speed, reliability,
          and modern SaaS performance with scalable architecture.
        </p>

        <h4 className="about-section-title">
          Our Mission
        </h4>

        <p className="about-text">
          Deliver premium quality products with modern technology
          integration and seamless customer experience.
        </p>

      </div>

    </div>

  );

}

export default AboutPage;