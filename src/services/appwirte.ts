import { Client, ID, TablesDB } from 'appwrite'

const client = new Client()
  .setEndpoint('https://fra.cloud.appwrite.io/v1')
  .setProject('typescript-todo')

export const tablesDB = new TablesDB(client)

export { ID }
