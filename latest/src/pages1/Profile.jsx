import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUser, 
  faEnvelope, 
  faUniversity, 
  faCalendarAlt, 
  faEdit, 
  faSave,
  faPhone // Add this import
} from '@fortawesome/free-solid-svg-icons';
import profileImage from '../assets/images/Jon.jpeg';
import '../assets/styles/animations.css';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: 'Dr. Sarah Johnson',
    email: 's.johnson@university.edu',
    department: 'Computer Science',
    position: 'Associate Professor',
    office: 'Building A, Room 305',
    phone: '+1 (555) 123-4567',
    availability: 'Mon-Wed-Fri: 9AM-12PM'
  });
  const [tempData, setTempData] = useState({});

  useEffect(() => {
    // Simulate fetching user data
    setTempData({ ...userData });
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
    setTempData({ ...userData });
  };

  const handleSave = () => {
    setIsEditing(false);
    setUserData({ ...tempData });
    // Here you would typically send the updated data to your backend
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTempData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const upcomingClasses = [
    { day: 'Monday', time: '9:00 AM', course: 'CS101 - Introduction to Programming', room: 'A101' },
    { day: 'Tuesday', time: '11:00 AM', course: 'CS301 - Data Structures', room: 'B205' },
    { day: 'Wednesday', time: '2:00 PM', course: 'CS405 - Algorithms', room: 'A101' },
    { day: 'Friday', time: '10:00 AM', course: 'CS101 - Introduction to Programming', room: 'A101' }
  ];

  return (
    <motion.div
      className="profile-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Profile Header */}
      <section className="profile-header">
        <div className="profile-header-content">
          <h1 className="profile-title">My Profile</h1>
          <p className="profile-subtitle">Manage your account and timetable preferences</p>
        </div>
      </section>

      {/* Profile Content */}
      <section className="profile-content">
        <div className="profile-container">
          {/* Profile Card */}
          <motion.div
            className="profile-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="profile-image-container">
              <img src={profileImage} alt="Profile" className="profile-image" />
              {isEditing ? (
                <button className="edit-btn save" onClick={handleSave}>
                  <FontAwesomeIcon icon={faSave} /> Save
                </button>
              ) : (
                <button className="edit-btn" onClick={handleEdit}>
                  <FontAwesomeIcon icon={faEdit} /> Edit Profile
                </button>
              )}
            </div>

            <div className="profile-info">
              <h2 className="profile-name">{userData.name}</h2>
              <p className="profile-position">{userData.position}</p>
              <p className="profile-department">{userData.department}</p>

              <div className="profile-details">
                <div className="detail-item">
                  <FontAwesomeIcon icon={faEnvelope} className="detail-icon" />
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value={tempData.email}
                      onChange={handleChange}
                      className="edit-input"
                    />
                  ) : (
                    <span>{userData.email}</span>
                  )}
                </div>

                <div className="detail-item">
                  <FontAwesomeIcon icon={faUniversity} className="detail-icon" />
                  {isEditing ? (
                    <input
                      type="text"
                      name="office"
                      value={tempData.office}
                      onChange={handleChange}
                      className="edit-input"
                    />
                  ) : (
                    <span>{userData.office}</span>
                  )}
                </div>

                <div className="detail-item">
                  <FontAwesomeIcon icon={faPhone} className="detail-icon" />
                  {isEditing ? (
                    <input
                      type="text"
                      name="phone"
                      value={tempData.phone}
                      onChange={handleChange}
                      className="edit-input"
                    />
                  ) : (
                    <span>{userData.phone}</span>
                  )}
                </div>

                <div className="detail-item">
                  <FontAwesomeIcon icon={faCalendarAlt} className="detail-icon" />
                  {isEditing ? (
                    <input
                      type="text"
                      name="availability"
                      value={tempData.availability}
                      onChange={handleChange}
                      className="edit-input"
                    />
                  ) : (
                    <span>{userData.availability}</span>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Upcoming Classes */}
          <motion.div
            className="upcoming-classes"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="classes-title">Upcoming Classes</h2>
            <div className="classes-list">
              {upcomingClasses.map((classItem, index) => (
                <motion.div
                  key={index}
                  className="class-item"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="class-day">{classItem.day}</div>
                  <div className="class-time">{classItem.time}</div>
                  <div className="class-course">{classItem.course}</div>
                  <div className="class-room">{classItem.room}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default Profile;