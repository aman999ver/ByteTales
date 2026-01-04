import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import StudentDashboard from './pages/student/Dashboard';
import Stories from './pages/student/Stories';
import Quizzes from './pages/student/Quizzes';
import Profile from './pages/student/Profile';
import TeacherDashboard from './pages/teacher/Dashboard';
import CreateLesson from './pages/teacher/CreateLesson';
import TeacherLessons from './pages/teacher/Lessons';
import TeacherStudents from './pages/teacher/Students';
import TeacherSettings from './pages/teacher/Settings';

import AdminDashboard from './pages/admin/Dashboard';
import AdminUsers from './pages/admin/Users';
import AdminContent from './pages/admin/Content';

import Landing from './pages/Landing';

function App() {
  return (
    <Routes>
      {/* Landing Page */}
      <Route path="/" element={<Landing />} />

      {/* Student Routes */}
      <Route path="/student" element={<MainLayout role="student" />}>
        <Route index element={<StudentDashboard />} />
        <Route path="stories" element={<Stories />} />
        <Route path="quizzes" element={<Quizzes />} />
        <Route path="profile" element={<Profile />} />
      </Route>

      {/* Teacher Routes */}
      <Route path="/teacher" element={<MainLayout role="teacher" />}>
        <Route index element={<TeacherDashboard />} />
        <Route path="create-lesson" element={<CreateLesson />} />
        <Route path="lessons" element={<TeacherLessons />} />
        <Route path="students" element={<TeacherStudents />} />
        <Route path="settings" element={<TeacherSettings />} />
      </Route>

      {/* Admin Routes */}
      <Route path="/admin" element={<MainLayout role="admin" />}>
        <Route index element={<AdminDashboard />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="content" element={<AdminContent />} />
      </Route>
    </Routes>
  );
}

export default App;
