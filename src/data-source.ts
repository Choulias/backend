/*
 *   Copyright (c) 2023 
 *   All rights reserved.
 */
import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import {Item} from "./entity/Item";
import {Basket} from "./entity/Basket";
import {BasketItem} from "./entity/BasketItem";

export const AppDataSource = new DataSource({
    name: "default",
    type: "postgres",
    host: process.env.DB_HOST,
    port: 5432,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: false,
    entities: [User, Basket, BasketItem, Item],
    migrations: [__dirname + '/migrations/**/*.ts'],
    migrationsTableName: "migration_versions",
    subscribers: [],
})
