/*

padrão de controller:
store: cria usuario/recurso
index: lista todos os dados
show: listar um dado especifico 
update: atualizar um dado especifico
delete: deletar um dado especifico

nunca esses métodos podem se repetir, ou seja, não pode ter mais de um store, index, show, update ou delete em um controller. 
Se precisar criar outro método, tem que ser com outro nome.
*/ 
import { response } from 'express';
import User from '../models/User.js';
import { v4 } from 'uuid';

class UserController {

    async store( request, response) {
       
        const {name, email, password_hash, admin}= request.body;
        
    const user = await User.create({
        id: v4(),
        name,
        email,
        password_hash,
        admin,
    });

    return response.status(201).json({
        id: user.id,
        name: user.name,
        email: user.email,
        admin: user.admin,
    });
    }
}

export default new UserController();