import {openDB} from 'idb'

const dbName = 'suksesutbk'
const dbVersion = 1

export async function addData(payload, storeName, optionKey) {
  const db1 = await openDB(dbName, dbVersion, {
    upgrade: (db, oldVersion, newVersion, transaction) => {
      if (oldVersion === 0) {
        executedFunc()
      }

      function executedFunc() {
        db.createObjectStore(storeName, optionKey)
        payload.forEach(data => {
          transaction.objectStore(storeName).add(data)
        })
      }
    }
  })
  db1.close()
}

export async function getAllData(storeName) {
  const db1 = await openDB(dbName, dbVersion)
  return db1.getAll(storeName)
}
