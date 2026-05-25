import * as Yup from 'yup';

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
      schema.validateSync(request.body, { abortEarly: false });
    } catch (err) {
      return response.status(400).json({ error: err.errors });
    }

    const { userId, userName } = request;
    const { products } = request.body;

    const order = {
      user: {
        id: userId,
        name: userName,
      },
      products,
    };

    return response.status(201).json(order);
  }
}

export default new OrderController();
