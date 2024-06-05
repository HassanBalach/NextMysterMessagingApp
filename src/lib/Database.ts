import { promises } from "dns";
import mongoose from "mongoose";

type ConnectionObject = {
  isConnected?: number;
};

const connection: ConnectionObject = {};
console.log("Connection:", connection);

async function dbConnection(): Promise<void> {
  if (connection.isConnected) {
    console.log("Already connected to the database");
    return;
  }
  try {
    const db = await mongoose.connect(process.env.DATABASE_URI || " ");
    connection.isConnected = db.connections[0].readyState;
    console.log("Database is connected successfully:");
  } catch (error) {
    console.log("Database connection is failed:");

    process.exit(1);
  }
}

export default dbConnection;