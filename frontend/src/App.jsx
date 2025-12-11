import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Templates from './pages/Templates'
import SendMessage from './pages/SendMessage'
import PrivacyPolicy from './pages/PrivacyPolicy'
import ContactManagement from './pages/ContactManagement'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Header from './components/Header'
import Footer from './components/Footer'
import ProtectedRoute from './components/ProtectedRoute'

import { Toaster } from 'sonner'

const App = () => {
  return (
    <div className='bg-white'>
      <Routes>
        <Route path="/" element={
          <>
            <Header />
            <Home />
            <Footer />
          </>
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/dashboard/templates" element={
          <ProtectedRoute>
            <Templates />
          </ProtectedRoute>
        } />
        <Route path="/dashboard/send" element={
          <ProtectedRoute>
            <SendMessage />
          </ProtectedRoute>
        } />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/dashboard/contacts" element={
          <ProtectedRoute>
            <ContactManagement />
          </ProtectedRoute>
        } />
      </Routes>
      <Toaster position="top-center" richColors />
    </div>
  )
}

export default App