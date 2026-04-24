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
import bcrypt from 'bcrypt';
import { response } from 'express';
import User from '../models/User.js';
import { v4 } from 'uuid';
import * as Yup from 'yup';


class UserController {

    async store( request, response) {

        const schema = Yup.object({
            name: Yup.string().required(),
            email: Yup.string().email().required(),
            password: Yup.string().min(6).required(),
            admin: Yup.boolean().required()
        })

        try{
            schema.validateSync(request.body, { abortEarly: false, strict: true });
        }catch(err){
           
            return response.status(400).json({error: err.errors});
        }
      
       
        const {name, email, password, admin}= request.body;

        const existingUser = await User.findOne({
            where: { 
                email }
        })
        if(existingUser){
            return response
            .status(400)
            .json({message: 'Email already taken!'})
        }

        const password_hash = await bcrypt.hash(password, 10);
        
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