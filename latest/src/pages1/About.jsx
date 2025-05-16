import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faChartLine, faLightbulb, faHandshake } from '@fortawesome/free-solid-svg-icons';
import teamImage from '../assets/images/Timetable.jpeg';
import '../assets/styles/animations.css';

const About = () => {
  const features = [
    {
      icon: faUsers,
      title: "Collaborative Approach",
      description: "We work closely with universities to understand their unique scheduling needs."
    },
    {
      icon: faChartLine,
      title: "Data-Driven Solutions",
      description: "Our algorithms analyze multiple parameters to create optimal schedules."
    },
    {
      icon: faLightbulb,
      title: "Innovative Technology",
      description: "Combining CSP and genetic algorithms for the best possible timetables."
    },
    {
      icon: faHandshake,
      title: "User-Centric Design",
      description: "Intuitive interfaces that make timetable management effortless."
    }
  ];

  const stats = [
    { number: "50+", label: "Universities" },
    { number: "10K+", label: "Faculty Members" },
    { number: "1M+", label: "Classes Scheduled" },
    { number: "99%", label: "Satisfaction Rate" }
  ];

  return (
    <motion.div
      className="about-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-hero-content">
          <h1 className="about-hero-title">About Our Timetable Generator</h1>
          <p className="about-hero-text">
            Revolutionizing university scheduling through advanced algorithms and user-friendly design
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission-section">
        <div className="mission-container">
          <div className="mission-content">
            <h2 className="section-title">Our Mission</h2>
            <p className="mission-text">
              We aim to eliminate the headaches of manual timetable creation by providing an automated,
              intelligent solution that saves time, reduces conflicts, and optimizes resource utilization
              for educational institutions worldwide.
            </p>
            <p className="mission-text">
              Our platform combines years of academic scheduling expertise with cutting-edge technology
              to deliver a product that actually understands the complexities of university timetabling.
            </p>
          </div>
          <div className="mission-image">
            <img src={teamImage} alt="Our team working" className="team-photo" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="about-features">
        <div className="section-header">
          <h2 className="section-title">Why Choose Our Solution</h2>
          <p className="section-description">
            We stand out from traditional scheduling systems with these key advantages
          </p>
        </div>
        <div className="features-grid">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="feature-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="feature-icon">
                <FontAwesomeIcon icon={feature.icon} />
              </div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-container">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="stat-item"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="stat-number">{stat.number}</div>
              <div className="stat-label">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="section-header">
          <h2 className="section-title">Our Team</h2>
          <p className="section-description">
            Experts in education technology and algorithm design
          </p>
        </div>
        <div className="team-members">
          <motion.div
            className="team-member"
            whileHover={{ y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <div className="member-image"></div>
            <h3 className="member-name">Dr. Sarah Johnson</h3>
            <p className="member-role">Lead Algorithm Developer</p>
            <p className="member-bio">
              PhD in Computer Science with 10+ years in optimization algorithms
            </p>
          </motion.div>
          <motion.div
            className="team-member"
            whileHover={{ y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <div className="member-image"></div>
            <h3 className="member-name">Michael Chen</h3>
            <p className="member-role">Product Designer</p>
            <p className="member-bio">
              Specializes in creating intuitive educational interfaces
            </p>
          </motion.div>
          <motion.div
            className="team-member"
            whileHover={{ y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <div className="member-image"></div>
            <h3 className="member-name">David Wilson</h3>
            <p className="member-role">University Relations</p>
            <p className="member-bio">
              Former university administrator with scheduling expertise
            </p>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default About;