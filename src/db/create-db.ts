import { Client } from "pg"
import { config } from "dotenv"

config()

const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT) || 5432,
})

async function main() {
    try {
        await client.connect()
        const query = await client.query(`SELECT 1 FROM pg_database WHERE datname=$1`, [String(process.env.DB_NAME)])
        if (query.rows.length > 0) {
            console.log(`Database ${process.env.DB_NAME} already exists.`)
            return
        } else {
            await client.query(`CREATE DATABASE ${process.env.DB_NAME}`)
            console.log(`Database ${process.env.DB_NAME} created successfully.`)
        }
    } catch (error: any) {
        throw new Error(`Failed to create database ${process.env.DB_NAME}: ${error.stack}`)
    } finally {
        console.log('Closing database connection...')
        await client.end()
    }
}

main()
    .then(() => console.log('Database created successfully'))
    .catch(err => {console.error('Error during database creation:', err) })