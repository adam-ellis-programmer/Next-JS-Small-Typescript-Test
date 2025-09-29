'use client'
import {
  ChangeEvent, // For input/select/textarea changes
  FormEvent, // For form submissions
  MouseEvent, // For clicks
  KeyboardEvent, // For key presses
  FocusEvent, // For focus/blur
  DragEvent, // For drag and drop
} from 'react'
//
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import Nav from '@/components/nav/Nav'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { databaseService, Tracker } from '@/services/database'

// Types
type Role = 'Admin' | 'Manager' | 'Sales'
type Status = 'Active' | 'In Active'
type Access = 1 | 2 | 3 | 4 | 5

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
  access: number
}

interface ListData {
  id: number
  name: string
  roleAccess: number
  pos: string
  company: string
}

// imputs
const inputs: InputConfig[] = [
  { id: 1, type: 'text', name: 'firstName', text: 'First Name' },
  { id: 2, type: 'text', name: 'lastName', text: 'Last Name' },
  { id: 3, type: 'text', name: 'company', text: 'Company' },
  { id: 4, type: 'select', name: 'role', text: 'Role' },
]

const roles: Role[] = ['Admin', 'Manager', 'Sales']
const status: Status[] = ['Active', 'In Active'] // Fixed typo: 'Acvive' -> 'Active'
const access: Access[] = [1, 2, 3, 4, 5]

// ======================
// add in typeScript check
// ======================
const ld: ListData[] = [
  { id: 1, name: 'Sally', company: 'Microsoft', roleAccess: 5, pos: 'CEO' },
  { id: 2, name: 'Su', company: 'Apple', roleAccess: 3, pos: 'Manager' },
  { id: 3, name: 'Lisa', company: 'Apple', roleAccess: 2, pos: 'Sales' },
  { id: 4, name: 'Denise', company: 'Microsoft', roleAccess: 1, pos: 'Temp' },
]

// USE FORM DATA
const data = new FormData()
// const formData = new FormData(someFormElement);
export default function Home() {
  const [formData, setFormData] = useState<Partial<FormData>>({
    firstName: '',
    lastName: '',
    company: '',
    role: 'Admin', // Default value
    status: 'Active', // Default value
    access: 1,
  })

  const [listData, setListData] = useState<ListData[]>(ld)

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    console.log(`${name}: ${value}`)
  }

  const onSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target

    // Convert access to number since select returns strings
    const processedValue = name === 'access' ? Number(value) : value

    setFormData((prev) => ({
      ...prev,
      [name]: processedValue,
    }))
    console.log(`${name}: ${processedValue}`)
  }

  //   const onSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
  //   const { name, value } = e.target

  //   let processedValue: string | number = value

  //   // Convert numeric fields
  //   if (name === 'access') {
  //     processedValue = Number(value)
  //   }

  //   setFormData((prev) => ({
  //     ...prev,
  //     [name]: processedValue,
  //   }))
  //   console.log(`${name}: ${processedValue}`)
  // }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('Form submitted!')
    console.log(formData)

    // Validate that all required fields are present
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.company ||
      !formData.role ||
      !formData.status ||
      !formData.access
    ) {
      console.error('All fields are required')
      return
    }

    // Create a properly typed object
    const dataToSubmit = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      company: formData.company,
      role: formData.role,
      status: formData.status,
      access: Number(formData.access), // Convert to string if your DB expects string
    }

    // TypeScript performs type checking at the point of use,
    const res = await databaseService.createDoc(dataToSubmit)
    console.log(res)
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

          <select
            name='access'
            value={formData.access}
            onChange={onSelectChange}
            className='my-10 border border-rose-400 w-1/2 p-2 rounded'
          >
            {access.map((item, i) => {
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

      {/* TODO: TABLE TO DISPLAY THE RESULTS  */}

      <div className='grid grid-cols-3 border-b p-2 mt-10'>
        <div className='capitalize font-bold'>name</div>
        <div className='capitalize font-bold'>company</div>
        <div className='capitalize font-bold'>access</div>
      </div>

      {/* =========  LIST DATA  ========= */}
      <ul>
        {listData.map((data) => {
          return (
            <li className='grid grid-cols-3 border-b p-2' key={data.id}>
              <div>{data.name}</div>
              <div>{data.company}</div>
              <div>
                ({data.roleAccess}) | {data.pos}
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
