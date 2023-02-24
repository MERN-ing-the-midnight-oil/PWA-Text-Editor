import { openDB } from "idb";

const initdb = async () =>
	openDB("content", 1, {
		upgrade(db) {
			if (db.objectStoreNames.contains("content")) {
				console.log("jate database already exists");
				return;
			}
			db.createObjectStore("content", { keyPath: "id", autoIncrement: true });
			console.log("jate database created");
		},
	});

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (id, content) => {
	console.log("PUT to the database");
	//putDb opens the database, waits...
	const contentDb = await openDB("content", 1);
	//it creates a transaction
	const tx = contentDb.transaction("content", "readwrite");
	//the transaction makes sure there is an object store
	const store = tx.objectStore("content");
	//once there is a store, we can do the actual work
	const request = store.put({ id: id, todo: content });
	const result = await request;
	console.log(" content  has been put to the database", result);
};

// TODO: Add logic for a method that gets all the content from the database
//export const getDb = async () => console.error("getDb not implemented"); //and a get (miniproject)
export const getDb = async () => {
	console.log("GET all from the database");
	const contentDb = await openDB("content", 1);
	const tx = contentDb.transaction("content", "readonly");
	const store = tx.objectStore("content");
	const request = store.getAll();
	const result = await request;
	console.log("result.value", result);
	return result?.content;
};
initdb();
