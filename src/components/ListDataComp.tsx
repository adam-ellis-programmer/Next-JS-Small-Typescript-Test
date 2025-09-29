import React, { useState, useEffect } from 'react'

import { ListData } from '@/types/dataTypes'

// prettier-ignore
const ListDataComp = ({
  listData,
  // title,
  // otherData,
}: 
{
  listData: ListData[]
  // otherData: string
  // title: string
}) => {
  useEffect(() => {
    // ....
    return () => {}
  }, [])
  return (
    <>
      <div className='grid grid-cols-3 border-b p-2 mt-10'>
        <div className='capitalize font-bold'>name</div>
        <div className='capitalize font-bold'>company</div>
        <div className='capitalize font-bold'>access</div>
      </div>
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
    </>
  )
}

export default ListDataComp
