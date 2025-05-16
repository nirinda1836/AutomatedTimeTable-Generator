import React, { useState, useEffect } from 'react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('teachers');
  const [generatedTimetable, setGeneratedTimetable] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [timeSlots, setTimeSlots] = useState([]);

  // Initialize time slots
  useEffect(() => {
    const slots = [];
    for (let hour = 8; hour <= 17; hour++) {
      slots.push(`${hour}:00-${hour + 1}:00`);
    }
    setTimeSlots(slots);
  }, []);

  // Teachers state
  const [teachers, setTeachers] = useState([]);
  const [newTeacher, setNewTeacher] = useState({
    name: '',
    subject: '',
    availability: ''
  });

  // Rooms state
  const [rooms, setRooms] = useState([]);
  const [newRoom, setNewRoom] = useState({
    number: '',
    capacity: '',
    type: 'Lecture'
  });

  // Courses state
  const [courses, setCourses] = useState([]);
  const [newCourse, setNewCourse] = useState({
    code: '',
    name: '',
    credits: '',
    duration: 1
  });

  // Departments state
  const [departments, setDepartments] = useState([]);
  const [newDepartment, setNewDepartment] = useState({
    name: '',
    head: ''
  });

  // Navigation handlers
  const handleGetStarted = () => navigate('/auth');
  const handleContactUs = () => navigate('/contact');

  // Teacher functions
  const handleAddTeacher = () => {
    if (newTeacher.name && newTeacher.subject) {
      setTeachers([...teachers, newTeacher]);
      setNewTeacher({ name: '', subject: '', availability: '' });
    }
  };

  const handleRemoveTeacher = (index) => {
    setTeachers(teachers.filter((_, i) => i !== index));
  };

  // Room functions
  const handleAddRoom = () => {
    if (newRoom.number && newRoom.capacity) {
      setRooms([...rooms, newRoom]);
      setNewRoom({ number: '', capacity: '', type: 'Lecture' });
    }
  };

  const handleRemoveRoom = (index) => {
    setRooms(rooms.filter((_, i) => i !== index));
  };

  // Course functions
  const handleAddCourse = () => {
    if (newCourse.code && newCourse.name) {
      setCourses([...courses, newCourse]);
      setNewCourse({ code: '', name: '', credits: '', duration: 1 });
    }
  };

  const handleRemoveCourse = (index) => {
    setCourses(courses.filter((_, i) => i !== index));
  };

  // Department functions
  const handleAddDepartment = () => {
    if (newDepartment.name) {
      setDepartments([...departments, newDepartment]);
      setNewDepartment({ name: '', head: '' });
    }
  };

  const handleRemoveDepartment = (index) => {
    setDepartments(departments.filter((_, i) => i !== index));
  };

  // Timetable generation
  const generateTimetable = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
      const timetable = [];
      
      if (teachers.length > 0 && rooms.length > 0 && courses.length > 0) {
        days.forEach(day => {
          timeSlots.forEach(time => {
            const availableTeachers = teachers.filter(teacher => 
              !teacher.availability || teacher.availability.includes(day.substring(0, 3))
            ).sort(() => 0.5 - Math.random());
            
            const availableRooms = rooms.sort(() => 0.5 - Math.random());
            const randomCourse = courses[Math.floor(Math.random() * courses.length)];
            
            if (availableTeachers.length > 0 && availableRooms.length > 0 && randomCourse) {
              timetable.push({
                day,
                time,
                course: randomCourse.name,
                code: randomCourse.code,
                teacher: availableTeachers[0].name,
                teacherSubject: availableTeachers[0].subject,
                room: availableRooms[0].number,
                type: availableRooms[0].type,
                capacity: availableRooms[0].capacity
              });
            }
          });
        });
      }
      setGeneratedTimetable(timetable);
      setIsGenerating(false);
    }, 1500);
  };

  // Export to PDF
  const exportToPDF = () => {
    if (!generatedTimetable) return;

    const doc = new jsPDF({ orientation: 'landscape' });
    doc.setFontSize(20);
    doc.setTextColor(41, 128, 185);
    doc.text('University Timetable', 148, 15, { align: 'center' });
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 148, 22, { align: 'center' });

    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    days.forEach((day, dayIndex) => {
      const daySlots = generatedTimetable.filter(slot => slot.day === day);
      if (daySlots.length > 0) {
        if (dayIndex > 0) doc.addPage();
        doc.setFontSize(16);
        doc.setTextColor(41, 128, 185);
        doc.text(day, 14, 30);
        
        const tableData = daySlots.map(slot => [
          slot.time,
          `${slot.code} - ${slot.course}`,
          slot.teacher,
          `Room ${slot.room} (${slot.type})`
        ]);
        
        doc.autoTable({
          head: [['Time', 'Course', 'Teacher', 'Room']],
          body: tableData,
          startY: 35,
          styles: { fontSize: 10, cellPadding: 3, valign: 'middle' },
          headStyles: { fillColor: [41, 128, 185], textColor: 255, fontStyle: 'bold' },
          alternateRowStyles: { fillColor: [245, 245, 245] },
          columnStyles: {
            0: { cellWidth: 25 },
            1: { cellWidth: 80 },
            2: { cellWidth: 50 },
            3: { cellWidth: 40 }
          }
        });
      }
    });
    doc.save('university_timetable.pdf');
  };

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>TIMETABLE GENERATOR</h1>
        <div className="header-actions">
          <button className="get-started-btn" onClick={handleGetStarted}>
            Get Started
          </button>
          <button className="contact-us-btn" onClick={handleContactUs}>
            Contact Us
          </button>
          <button
            className="generate-btn"
            onClick={generateTimetable}
            disabled={isGenerating || teachers.length === 0 || rooms.length === 0 || courses.length === 0}
          >
            {isGenerating ? (
              <>
                <span className="spinner"></span> Generating...
              </>
            ) : 'Generate Timetable'}
          </button>
          {generatedTimetable && (
            <button className="export-btn" onClick={exportToPDF}>
              Export as PDF
            </button>
          )}
        </div>
      </header>

      <div className="management-tabs">
        <button className={`tab-btn ${activeTab === 'teachers' ? 'active' : ''}`} onClick={() => setActiveTab('teachers')}>
          Teachers
        </button>
        <button className={`tab-btn ${activeTab === 'rooms' ? 'active' : ''}`} onClick={() => setActiveTab('rooms')}>
          Rooms
        </button>
        <button className={`tab-btn ${activeTab === 'courses' ? 'active' : ''}`} onClick={() => setActiveTab('courses')}>
          Courses
        </button>
        <button className={`tab-btn ${activeTab === 'departments' ? 'active' : ''}`} onClick={() => setActiveTab('departments')}>
          Departments
        </button>
        <button 
          className={`tab-btn ${activeTab === 'timetable' ? 'active' : ''}`} 
          onClick={() => setActiveTab('timetable')}
          disabled={!generatedTimetable}
        >
          View Timetable
        </button>
      </div>

      <div className="management-content">
        {/* Teachers Management */}
        {activeTab === 'teachers' && (
          <div className="management-section">
            <h2>Manage Teachers</h2>
            <div className="add-form">
              <input
                type="text"
                placeholder="Teacher Name"
                value={newTeacher.name}
                onChange={(e) => setNewTeacher({...newTeacher, name: e.target.value})}
              />
              <input
                type="text"
                placeholder="Subject"
                value={newTeacher.subject}
                onChange={(e) => setNewTeacher({...newTeacher, subject: e.target.value})}
              />
              <input
                type="text"
                placeholder="Availability (e.g., Mon-Wed-Fri)"
                value={newTeacher.availability}
                onChange={(e) => setNewTeacher({...newTeacher, availability: e.target.value})}
              />
              <button onClick={handleAddTeacher}>Add Teacher</button>
            </div>

            <div className="items-list">
              <h3>Teachers List</h3>
              {teachers.length === 0 ? (
                <p>No teachers added yet</p>
              ) : (
                <ul>
                  {teachers.map((teacher, index) => (
                    <li key={index}>
                      <span>
                        <strong>{teacher.name}</strong> - {teacher.subject}
                        {teacher.availability && ` (${teacher.availability})`}
                      </span>
                      <button className="remove-btn" onClick={() => handleRemoveTeacher(index)}>
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}

        {/* Rooms Management */}
        {activeTab === 'rooms' && (
          <div className="management-section">
            <h2>Manage Rooms</h2>
            <div className="add-form">
              <input
                type="text"
                placeholder="Room Number"
                value={newRoom.number}
                onChange={(e) => setNewRoom({...newRoom, number: e.target.value})}
              />
              <input
                type="number"
                placeholder="Capacity"
                value={newRoom.capacity}
                onChange={(e) => setNewRoom({...newRoom, capacity: e.target.value})}
              />
              <select
                value={newRoom.type}
                onChange={(e) => setNewRoom({...newRoom, type: e.target.value})}
              >
                <option value="Lecture">Lecture Hall</option>
                <option value="Lab">Laboratory</option>
                <option value="Seminar">Seminar Room</option>
              </select>
              <button onClick={handleAddRoom}>Add Room</button>
            </div>

            <div className="items-list">
              <h3>Rooms List</h3>
              {rooms.length === 0 ? (
                <p>No rooms added yet</p>
              ) : (
                <ul>
                  {rooms.map((room, index) => (
                    <li key={index}>
                      <span>
                        <strong>Room {room.number}</strong> - {room.type} ({room.capacity} seats)
                      </span>
                      <button className="remove-btn" onClick={() => handleRemoveRoom(index)}>
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}

        {/* Courses Management */}
        {activeTab === 'courses' && (
          <div className="management-section">
            <h2>Manage Courses</h2>
            <div className="add-form">
              <input
                type="text"
                placeholder="Course Code"
                value={newCourse.code}
                onChange={(e) => setNewCourse({...newCourse, code: e.target.value})}
              />
              <input
                type="text"
                placeholder="Course Name"
                value={newCourse.name}
                onChange={(e) => setNewCourse({...newCourse, name: e.target.value})}
              />
              <input
                type="number"
                placeholder="Credits"
                value={newCourse.credits}
                onChange={(e) => setNewCourse({...newCourse, credits: e.target.value})}
              />
              <select
                value={newCourse.duration}
                onChange={(e) => setNewCourse({...newCourse, duration: parseInt(e.target.value)})}
              >
                <option value="1">1 hour</option>
                <option value="2">2 hours</option>
                <option value="3">3 hours</option>
              </select>
              <button onClick={handleAddCourse}>Add Course</button>
            </div>

            <div className="items-list">
              <h3>Courses List</h3>
              {courses.length === 0 ? (
                <p>No courses added yet</p>
              ) : (
                <ul>
                  {courses.map((course, index) => (
                    <li key={index}>
                      <span>
                        <strong>{course.code}</strong> - {course.name}
                        {course.credits && ` (${course.credits} credits)`}
                        {` - Duration: ${course.duration} hour${course.duration > 1 ? 's' : ''}`}
                      </span>
                      <button className="remove-btn" onClick={() => handleRemoveCourse(index)}>
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}

        {/* Departments Management */}
        {activeTab === 'departments' && (
          <div className="management-section">
            <h2>Manage Departments</h2>
            <div className="add-form">
              <input
                type="text"
                placeholder="Department Name"
                value={newDepartment.name}
                onChange={(e) => setNewDepartment({...newDepartment, name: e.target.value})}
              />
              <input
                type="text"
                placeholder="Department Head"
                value={newDepartment.head}
                onChange={(e) => setNewDepartment({...newDepartment, head: e.target.value})}
              />
              <button onClick={handleAddDepartment}>Add Department</button>
            </div>

            <div className="items-list">
              <h3>Departments List</h3>
              {departments.length === 0 ? (
                <p>No departments added yet</p>
              ) : (
                <ul>
                  {departments.map((department, index) => (
                    <li key={index}>
                      <span>
                        <strong>{department.name}</strong>
                        {department.head && ` - Head: ${department.head}`}
                      </span>
                      <button className="remove-btn" onClick={() => handleRemoveDepartment(index)}>
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}

        {/* Timetable View */}
        {activeTab === 'timetable' && generatedTimetable && (
          <div className="timetable-section">
            <h2>Generated Timetable</h2>
            <div className="timetable-actions">
              <button className="export-btn" onClick={exportToPDF}>
                Export as PDF
              </button>
            </div>
            
            <div className="timetable-container">
              <table className="timetable-table">
                <thead>
                  <tr>
                    <th>Day</th>
                    <th>Time</th>
                    <th>Course</th>
                    <th>Teacher</th>
                    <th>Room</th>
                  </tr>
                </thead>
                <tbody>
                  {generatedTimetable.map((slot, index) => (
                    <tr key={index}>
                      <td>{slot.day}</td>
                      <td>{slot.time}</td>
                      <td>{slot.code} - {slot.course}</td>
                      <td>{slot.teacher}</td>
                      <td>Room {slot.room} ({slot.type})</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;