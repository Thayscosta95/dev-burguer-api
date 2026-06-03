import * as Yup from 'yup';
import { Op } from 'sequelize';
import Products from '../models/Products.js';
import Category from '../models/category.js';
import Order from '../schemas/Order.js';

class OrderController {
  async store(request, response) {
    const schema = Yup.object().shape({
      products: Yup.array()
        .of(
          Yup.object({
            id: Yup.number().required(),
            quantity: Yup.number().required(),
          }),
        )
        .required(),
    });

    try {
      schema.validateSync(request.body, { abortEarly: false, strict: true });
    } catch (err) {
      return response.status(400).json({ error: err.errors });
    }

    const { userId, userName } = request;
    const { products } = request.body;

    const productIds = products.map((product) => product.id);

    const findedProducts = await Products.findAll({
      where: {
        id: {
          [Op.in]: productIds,
        },
      },
      include: {
        model: Category,
        as: 'category',
        attributes: ['name'],
      },
    });

    const mapedProducts = findedProducts.map(product => {
      const requested = products.find(p => p.id === product.id) || {};
      const newProduct = {
        id: product.id,
        name: product.name,
        price: product.price,
        url: product.url || '',
        category: product.category && product.category.name ? product.category.name : 'Sem categoria',
        quantity: requested.quantity || 1,
      }

      return newProduct;
    })

    const order = {
      user: {
        id: userId,
        name: userName,
      },
      products: mapedProducts,
      status: 'pedido realizado',
    };

    const newOrder = await Order.create(order);

    return response.status(201).json(newOrder);
  }

  async update(request, response) {
    const schema = Yup.object({
      status: Yup.string().required(),
    });

    try {
      schema.validateSync(request.body, { abortEarly: false, strict: true });
    } catch (err) {
      return response.status(400).json({ error: err.errors });
    }

    const { status } = request.body;
    const { id } = request.params;

    await Order.updateOne({ status }, { id }); 

    return response.status(200).json(status);
  }
}

export default new OrderController();
