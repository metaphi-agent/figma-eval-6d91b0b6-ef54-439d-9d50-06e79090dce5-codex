import React, { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

const HomePage = React.lazy(() => import('./pages/Home'))

export default function App() {
  return (
    <Suspense fallback={<div className="min-h-dvh bg-white" />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  )
}
