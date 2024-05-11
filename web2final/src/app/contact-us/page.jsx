import React from 'react';
import "./about.css"
const AboutUs = () => {
    return (
        <main style={{maxWidth: "90%", margin: "0 auto"}} >
            <section className="about-us-container">
                <section className="team-info">
                    <h1>About Our Team</h1>
                    <p>We are a team of Computer Science students at Qatar University, deeply immersed in the world of web development as part of our academic journey. Our passion for technology and innovation drives us as we navigate through the intricacies of HTML, CSS, JavaScript, and beyond.</p>
                    <p>As aspiring developers, we strive to merge creativity with technical proficiency in crafting captivating digital experiences. Our journey in web development is not merely about mastering languages and frameworks but also about understanding user experience, optimizing performance, and embracing best practices.</p>
                    <p>With each project, we delve into the art of building responsive and visually appealing websites, enhancing our skills in frontend design, backend development, and everything in between. Collaborating seamlessly, we leverage our diverse perspectives and expertise to tackle challenges and bring ideas to life.</p>
                    <p>At the heart of our endeavor lies a commitment to excellence and a thirst for knowledge. Through our collective efforts, we aim to not only create impactful web solutions but also to continuously evolve as developers, contributing to the ever-growing landscape of technology.</p>
                    <p>Join us as we embark on this exciting journey, fueled by curiosity, determination, and the relentless pursuit of innovation.</p>
                </section>
                <section className="map-container">
                    <h1>Our Headquarter</h1>
                    <iframe
                        id="mapFrame"
                        className="google-map"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3604.7690972443297!2d51.485534149219106!3d25.37905403038381!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e45dd1a7e555553%3A0x61f3df230682dfad!2sCollege%20Of%20Engineering%20(H07)!5e0!3m2!1sen!2sqa!4v1710266163836!5m2!1sen!2sqa"
                        width="600"
                        height="450"
                        style={{ border: "0" }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </section>
            </section>
            <section id="contact-us" className="contact-us">
                <h2>Contact Us</h2>
                <form action="submit_contact_form.php" method="POST">
                    <div>
                        <label htmlFor="name">Name:</label>
                        <input type="text" id="name" name="name" required />
                    </div>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" name="email" required />
                    </div>
                    <div>
                        <label htmlFor="message">Message:</label>
                        <textarea id="message" name="message" rows="4" required></textarea>
                    </div>
                    <button type="submit">Send Message</button>
                </form>
            </section>
        </main>
    );
};

export default AboutUs;
