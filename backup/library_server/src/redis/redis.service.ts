import { createClient, RedisClientType } from "redis";
import { Service } from "typedi";

@Service()
export class RedisService {
  redisClient: RedisClientType;

  constructor() {
    this.redisClient = createClient();
    this.redisClient.on("Error", () =>
      console.log("Error connect redis server")
    );
    this.redisClient.connect().catch(console.error);
  }
  hSet = async (
    key: string,
    field: string,
    value: string,
    expiration?: number
  ) => {
    await this.redisClient.hSet(key, field, value);
    if (expiration)
      await this.redisClient.expire(key + ":" + field, expiration);
  };

  saveToRedis = async (key: string, value: string, expiration: number) => {
    await this.redisClient.set(key, value, { EX: expiration });
  };

  deleteFromRedis = async (key: string) => {
    await this.redisClient.del(key);
  };

  getValueFromRedis = async (key: string) => {
    return await this.redisClient.get(key);
  };

  deleteAllKeyByUserId = async (id: number) => {
    await this.redisClient.del(`accessToken_${id}`);
    await this.redisClient.del(`refreshToken_${id}`);
  };

  getAllValueFromhSet = async (key: string) => {
    return await this.redisClient.hGetAll(key);
  };

  getValueFromhSet = async (key: string, field: string) => {
    return await this.redisClient.hGet(key, field);
  };

  deleteFromhSet = async (key: string, field: string) => {
    return await this.redisClient.hDel(key, field);
  };

  getTimeToLiveField = async (key: string, field: string) => {
    return await this.redisClient.hTTL(key, field);
  };
}
