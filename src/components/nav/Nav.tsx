import React from 'react'
import { Button } from '@/components/ui/button'

const Nav = () => {
  return (
    <nav className="flex items-center space-x-4 p-4 border-b">
      <Button variant="ghost">Home</Button>
      <Button variant="ghost">About</Button>
      <Button variant="ghost">Services</Button>
      <Button variant="ghost">Contact</Button>
    </nav>
  )
}

export default Nav