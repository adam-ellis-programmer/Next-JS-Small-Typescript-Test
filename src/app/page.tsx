'use client'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import Nav from '@/components/nav/Nav'
import { Input } from '@/components/ui/input'
import { useState } from 'react'

// Types
type Role = 'Admin' | 'Manager' | 'Sales'
type Status = 'Active' | 'In Active'
type Access = 1 | 2 | 3

interface InputConfig {
  id: number
  type: 'text' | 'select'
  name: keyof FormData
  text: string
}

interface FormData {
  id: string
  firstName: string
  lastName: string
  company: string
  status: Status
  role: Role
  level: number
}

// Constants
const inputs: InputConfig[] = [
  { id: 1, type: 'text', name: 'firstName', text: 'First Name' },
  { id: 2, type: 'text', name: 'lastName', text: 'Last Name' },
  { id: 3, type: 'text', name: 'company', text: 'Company' },
  { id: 4, type: 'select', name: 'role', text: 'Role' },
]

const roles: Role[] = ['Admin', 'Manager', 'Sales']
const status: Status[] = ['Active', 'In Active'] // Fixed typo: 'Acvive' -> 'Active'

export default function Home() {
  const [formData, setFormData] = useState<Partial<FormData>>({
    firstName: '',
    lastName: '',
    company: '',
    role: 'Admin', // Default value
    status: 'Active', // Default value
    level: 1,
  })

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    console.log(`${name}: ${value}`)
  }

  const onSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    console.log(`${name}: ${value}`)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('Form submitted!')
    console.log(formData)
  }

  return (
    <div className='max-w-[500px] mx-auto p-5'>
      <Nav />
      <h1 className='text-center text-2xl my-5'>Test Data</h1>

      <form onSubmit={handleSubmit}>
        {inputs.slice(0, 3).map((input) => {
          return (
            <Input
              key={input.id}
              type={input.type}
              name={input.name}
              placeholder={`Enter ${input.text}`}
              value={formData[input.name] || ''}
              onChange={onChange}
              className='capitalize cursor-default mb-3'
            />
          )
        })}

        <div className='flex gap-2.5'>
          <select
            name='role'
            value={formData.role}
            onChange={onSelectChange}
            className='my-10 border border-rose-400 w-1/2 p-2 rounded'
          >
            {roles.map((item, i) => {
              return (
                <option key={i} value={item}>
                  {item}
                </option>
              )
            })}
          </select>

          <select
            name='status'
            value={formData.status}
            onChange={onSelectChange}
            className='my-10 border border-rose-400 w-1/2 p-2 rounded'
          >
            {status.map((item, i) => {
              return (
                <option key={i} value={item}>
                  {item}
                </option>
              )
            })}
          </select>
        </div>

        <Button type='submit' className='bg-red-400 block w-full'>
          Submit Form
        </Button>
      </form>
    </div>
  )
}
