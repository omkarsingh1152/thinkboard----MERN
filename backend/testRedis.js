import { Redis } from "@upstash/redis";
import dotenv from "dotenv";

dotenv.config();

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

try {
  await redis.set("hello", "world");

  const value = await redis.get("hello");

  console.log(value);
} catch (err) {
  console.error(err);
}