import { Sequelize } from 'sequelize';
import mongose from 'mongoose';
import databaseConfig from '../config/database.cjs';
import User from '../../src/app/models/User.js';
import Products from '../app/models/Products.js';
import Category from '../app/models/category.js';


const models = [User, Products, Category];


class Database {

    constructor() {
        this.init();
        this.mongo();
    }

    init(){
        this.conection = new Sequelize(databaseConfig);
        models
        .map((model) => model.init(this.conection))
        .map(model => model.associate && model.associate(this.conection.models),  
        ); 
    }

    mongo(){
        this.mongooseConnection = mongose.connect(
            'mongodb://localhost:27017/devburguer'
        );
    }

}

export default new Database();