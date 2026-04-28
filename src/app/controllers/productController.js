import * as Yup from 'yup';
import Product from '../models/Products.js';

class ProductController {
    async store(request, response) {
        const schema = Yup.object({
            name: Yup.string().required(),
            price: Yup.number().required(),
            category: Yup.string().required(),
        });

        try{
            schema.validateSync(request.body, { abortEarly: false });
        }catch(err){
           
            return response.status(400).json({error: err.errors});
        }

        const { name, price, category } = request.body;
        const { filename } = request.file;

       const newProduct = await Product.create({
            name,
            price,
            category,
            image: filename,
        });
       
        return response.status(201).json(newProduct);
    }
}

export default new ProductController();