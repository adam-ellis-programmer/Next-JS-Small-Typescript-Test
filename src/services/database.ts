import { Query } from 'appwrite'
import { tablesDB, ID } from './appwirte'

export interface Tracker {
  $id: string
  access: number
  company: string
  firstName: string
  lastName: string
  role: string
  status: string
  $createdAt: string
  $updatedAt: string
}

// prettier-ignore
// Create a type for data that's sent to Appwrite (without the auto-generated fields)
export type CreateTrackerData = Omit<Tracker, '$id' | '$createdAt' | '$updatedAt'>

const databaseId = 'company-tracker'
const tableId = 'tracker'

// TypeScript performs type checking at the point of use,
export const databaseService = {
  async createDoc(data: CreateTrackerData) {
    // ← Changed from Tracker to CreateTrackerData
    try {
      const res = await tablesDB.createRow({
        databaseId,
        tableId,
        rowId: ID.unique(),
        data,
      })
      return { success: true, data: res }
    } catch (error) {
      console.log(error)
    }
  },

  async getDocs() {
    return await tablesDB.listRows({
      databaseId,
      tableId,
      //   queries: [
      //     Query.equal('title', ['Avatar', 'Lord of the Rings']),
      //     Query.greaterThan('year', 1999),
      //   ],
    })
  },
}
