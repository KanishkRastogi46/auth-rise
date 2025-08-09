import 'dotenv/config';
import { migrate } from 'drizzle-orm/node-postgres/migrator'; // Or appropriate dialect
import path from 'path';
import { db } from '.';

async function runMigrations() {
    try {
        await migrate(db, { migrationsFolder: path.resolve(__dirname, 'migrations') }); // Adjust path as needed
        console.log('Migrations completed successfully!');
    } catch (error) {
        console.error('Migration failed:', error);
        process.exit(1);
    }
}

runMigrations()
    .then(() => console.log('Migration script executed successfully'))
    .catch(err => console.error('Error during migration:', err));