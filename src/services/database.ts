import { Models } from 'appwrite'
import { Query } from 'appwrite'
import { tablesDB, ID } from './appwirte'

export interface Tracker {
  $id: string
  $createdAt: string
  $updatedAt: string
  $databaseId: string // Add this
  $tableId: string // Add this
  $permissions: string[] // Add this
  $sequence: number // Add this
  access: number
  company: string
  firstName: string
  lastName: string
  role: string
  status: string
}
// prettier-ignore
// Create a type for data that's sent to Appwrite (without the auto-generated fields)
export type CreateTrackerData = Omit<Tracker, '$id' | '$createdAt' | '$updatedAt' | '$databaseId' | '$tableId' | '$permissions' | '$sequence'>

const databaseId = 'company-tracker'
const tableId = 'tracker'

/**
    So yes, you can use res.data, but only after you've checked res.success to narrow the type. This is called type narrowing or type guards in TypeScript.
    hink of it like a security checkpoint - TypeScript won't let you access data until you prove (by checking success) that you're in the right branch of the union.
 */

// TypeScript performs type checking at the point of use,
export const databaseService = {
  async createDoc(
    data: CreateTrackerData
  ): Promise<
    { success: true; data: Tracker } | { success: false; error: unknown }
  > {
    /**
     * 
     *  When you call it:
        createRow<Tracker>({ ... })
                ^^^^^^^^
         You're saying: "T = Tracker"
         So it returns Promise<Tracker>
     */
    try {
      // // You're saying: "For THIS call, T = Tracker"
      // we are telling the SDK upfront to expect the <Tracker>
      const res = await tablesDB.createRow<Tracker>({
        //                                 ^^^^^^^^
        //                    Generic type parameter
        databaseId,
        tableId,
        rowId: ID.unique(),
        data,
      })
      console.log('RES FROM SERVER-->', res)

      // Now res is typed as Tracker, not DefaultRow
      // return { success: true, data: res }  // No assertion needed!
      // Double type assertion: DefaultRow -> unknown -> Tracker
      return { success: true, data: res as unknown as Tracker }
    } catch (error) {
      console.log(error)
      return { success: false, error }
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
