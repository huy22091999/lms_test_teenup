import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import ParentManagement from './components/ParentManagement';
import StudentManagement from './components/StudentManagement';
import ClassManagement from './components/ClassManagement';
import SubscriptionManagement from './components/SubscriptionManagement';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/parents" element={<ParentManagement />} />
          <Route path="/students" element={<StudentManagement />} />
          <Route path="/classes" element={<ClassManagement />} />
          <Route path="/subscriptions" element={<SubscriptionManagement />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
