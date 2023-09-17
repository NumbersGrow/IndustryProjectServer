// const knex = require("../db/db");

exports.createOrder = async (req, res) => {
    const { profile_id, item_id, price, quantity, order_date } = req.body;

    // Validation 
    if (!profile_id || !item_id || !price || !quantity || !order_date) {
        return res.status(400).send({ error: "Missing required fields" });
    }

    try {
        const [order_id] = await knex('orders').insert({
            profile_id,
            item_id,
            price,
            quantity,
            order_date
        });

        res.status(201).send({ message: "Order created", order_id });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.getAllOrders = async (req, res) => {
    try {
        const orders = await knex('orders').select();
        res.status(200).send(orders);
    } catch (error) {
        res.status(500).send({ error: 'Error fetching orders' });
    }
};

exports.getOrder = async (req, res) => {
    try {
        const order = await knex('orders').where('order_id', req.params.id).first();
        if (!order) {
            return res.status(404).send({ error: 'Order not found' });
        }
        res.status(200).send(order);
    } catch (error) {
        res.status(500).send({ error: 'Error fetching order' });
    }
};

exports.updateOrder = async (req, res) => {
    const { profile_id, item_id, price, quantity, order_date } = req.body;
    
    try {
        const updatedCount = await knex('orders')
            .where('order_id', req.params.id)
            .update({
                profile_id,
                item_id,
                price,
                quantity,
                order_date
            });

        if (updatedCount === 0) {
            return res.status(404).send({ error: 'Order not found' });
        }

        res.status(200).send({ message: 'Order updated successfully' });
    } catch (error) {
        res.status(500).send({ error: 'Error updating order' });
    }
};

exports.deleteOrder = async (req, res) => {
    try {
        const deleteCount = await knex('orders')
            .where('order_id', req.params.id)
            .del();

        if (deleteCount === 0) {
            return res.status(404).send({ error: 'Order not found' });
        }

        res.status(200).send({ message: 'Order deleted successfully' });
    } catch (error) {
        res.status(500).send({ error: 'Error deleting order' });
    }
};
