import React from "react";

const About = () => {
  return (
    <div className="container py-5">
      <div className="row align-items-center">
        {/* Left Section – Image */}
        <div className="col-md-6 mb-4 mb-md-0">
          <img
            src="https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg"
            alt="About us"
            className="img-fluid rounded shadow"
          />
        </div>

        {/* Right Section – Text */}
        <div className="col-md-6">
          <h2 className="fw-bold mb-3">About Us</h2>
          <p className="text-muted">
            Our platform empowers citizens to report local issues such as road
            damage, streetlight faults, waste management problems, and other
            community concerns directly to local authorities.
          </p>

          <p className="text-muted">
            We aim to bridge the communication gap between residents and
            government bodies by providing a simple, transparent, and real-time
            reporting system. Citizens can submit complaints, track progress,
            add comments, and stay informed while officials can efficiently
            manage, update, and resolve issues.
          </p>

          <button className="btn btn-primary mt-2">Be a part of us</button>
        </div>
      </div>
    </div>
  );
};

export default About;
