import { Sequelize } from 'sequelize';
import databaseConfig from '../config/database.cjs';
import User from '../../src/app/models/User.js';
import Products from '../app/models/Products.js';
import Category from '../app/models/category.js';

const models = [User, Products, Category];


class Database {

    constructor() {
        this.init();
    }

    init(){
        this.conection = new Sequelize(databaseConfig);
        models
        .map((model) => model.init(this.conection))
        .map(model => model.associate && model.associate(this.conection.models),  
        ); 
    }

}

export default new Database();