'use client'

import React, { useEffect, useState } from 'react'

interface ClientWrapperProps {
  children: React.ReactNode
}

const ClientWrapper: React.FC<ClientWrapperProps> = ({ children }) => {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return <div className="animate-pulse bg-gray-200 h-96 rounded-lg"></div>
  }

  return <>{children}</>
}

export default ClientWrapper
