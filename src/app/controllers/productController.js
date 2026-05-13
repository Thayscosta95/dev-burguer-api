import * as Yup from 'yup';
import Product from '../models/Products.js';
import Category from '../models/category.js';

class ProductController {
  async store(request, response) {
    const schema = Yup.object({
      name: Yup.string().required(),
      price: Yup.number().required(),
      category_id: Yup.number().required(),
      offer: Yup.boolean(),
    });

    try {
      schema.validateSync(request.body, { abortEarly: false });
    } catch (err) {
      return response.status(400).json({ error: err.errors });
    }

    const { name, price, category_id, offer } = request.body;

    const categoryExists = await Category.findByPk(category_id);
    if (!categoryExists) {
      return response.status(400).json({ error: 'Category not found' });
    }

    const filename = request.file ? request.file.filename : null;

    const newProduct = await Product.create({
      name,
      price,
      category_id,
      offer,
      path: filename,
    });

    return response.status(201).json(newProduct);
  }

  async update(request, response) {
    const schema = Yup.object({
      name: Yup.string(),
      price: Yup.number(),
      category_id: Yup.number(),
      offer: Yup.boolean(),
    });

    try {
      schema.validateSync(request.body, { abortEarly: false });
    } catch (err) {
      return response.status(400).json({ error: err.errors });
    }

    
    const { name, price, category_id, offer } = request.body;
    const { id } = request.params;

    if (category_id !== undefined) {
      const categoryExists = await Category.findByPk(category_id);
      if (!categoryExists) {
        return response.status(400).json({ error: 'Category not found' });
      }
    }

    let path = null;
    if (request.file) {
      path = request.file.filename;
    }

    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (price !== undefined) updateData.price = price;
    if (category_id !== undefined) updateData.category_id = category_id;
    if (offer !== undefined) updateData.offer = offer;
    if (path !== null) updateData.path = path;

    await Product.update(updateData, {
      where: {
        id,
      },
    });

    const updatedProduct = await Product.findByPk(id);

    return response.status(201).json(updatedProduct);
  }

  async index(_request, response) {
    const products = await Product.findAll({
      include: {
        model: Category,
        as: 'category',
        attributes: ['id', 'name'],
      },
    });

    return response.status(200).json(products);
  }
}

export default new ProductController();
