import {openDB} from 'idb'

const dbName = 'suksesutbk'
const dbVersion = 1

// const db = function () {  
//   return openDB(dbName, dbVersion, {
//     upgrade: (db, oldVersion) => {
//       if (oldVersion === 0) {
//         executedFunc()
//       }
  
//       function executedFunc() {
//         db.createObjectStore('pilihan_ptn', { keyPath: 'id_prodi' });
//         db.createObjectStore('soal');        
//       }
//     }
//   });
// }

export async function addData(storeName) {
  const db1 = await openDB(dbName, dbVersion)
  // payload.forEach(data => {
  //   db1.put(storeName, data)
  // })
  db1.put(storeName, false, 'del')
  db1.close()
}

export async function getAllData(storeName) {
  const db1 = await openDB(dbName, dbVersion)
  return db1.getAll(storeName)
}

export async function demo6() {
  // set db1/store1/delivered to be false:
  const db1 = await openDB('db1', 1);
  db1.put('store1', false, 'delivered');
  db1.close();
  // replace cat001 with a supercat:
  const db2 = await openDB('db2', 1);
  db2.put('store3', { id: 'cat001', strength: 99, speed: 99 });
  db2.close();
}
