const OrderSchema = require("../models/order-model");
const ItemSchema = require("../models/item-model");

class OrderService {
  async createOrder(numbers, container) {
    try {
      const orders = numbers.map(async (order) => {
        const doc = new OrderSchema({
          number: order.number,
          container,
        });
        const docs = await doc.save();
        return docs;
      });

      return Promise.all(orders).then((res) => {
        return res;
      });
    } catch (error) {
      console.log(error);
    }
  }

  async getOrders(items) {
    try {
      const orders = items.map(async (order) => {
        return await OrderSchema.find({ container: order.container });
      });

      return Promise.all(orders).then((res) => {
        return res;
      });
    } catch (error) {
      console.log(error);
    }
  }

  async updateOrders(item, req) {
    try {
      const doc = await ItemSchema.findOne({ _id: item._id });

      if (req.body.order_number) {
        await this.deleteOrders(item);

        const orders = await this.createOrder(
          req.body.order_number,
          item.container
        );

        doc.order_number = orders;
        await doc.save();
      } else {
        doc.order_number = [];
        await doc.save();
      }
    } catch (error) {
      console.log(error);
    }
  }

  async deleteOrders(item) {
    try {
      await OrderSchema.deleteMany({ container: item.container });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new OrderService();
