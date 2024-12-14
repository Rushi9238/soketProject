import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const connectionDB = await mongoose.connect(process.env.MONOG_DB_URI,);
        console.log(`MongoDB connected: ${connectionDB.connection.host}`);
    } catch (error) {
        console.error('Error connecting to the database:', error);
        process.exit(1);
    }
};

export default connectDB;
