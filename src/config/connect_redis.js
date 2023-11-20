import { createClient } from 'redis';
import dotenv from 'dotenv';
dotenv.config();

const redisClient = createClient({
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT || '6379', 10)
    }
});

redisClient.on("error", error => {
    console.error(error);
    return;
})

redisClient.on("connect", error => {
    if (error) {
        console.error(error);
        return;
    }
    console.log("Connected to redis");
})

redisClient.on("ready", error => {
    if (error) {
        console.error(error);
        return;
    }
    console.log("Redis is ready to use");
})

export default redisClient;