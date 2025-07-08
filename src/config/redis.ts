import {Redis} from "ioredis";
import dotenv from 'dotenv'

dotenv.config()

export const connection = new Redis({
    host: '127.0.0.1',
    port: 6379,
    maxRetriesPerRequest: null
})