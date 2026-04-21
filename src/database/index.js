import { Sequelize } from 'sequelize';
import databaseConfig from '../config/database.cjs';
import User from '../../src/app/models/User.js';

const models = [User];


class Database {

    constructor() {
        this.init();
    }

    init(){
        this.conection = new Sequelize(databaseConfig);
        models.map((model) => model.init(this.conection)); 
    }

}

export default new Database();