// const knex = require("../db/db");

exports.createCartItem = async (req, res) => {
    const { profile_id, order_id, quantity } = req.body;

    // Basic validation
    if (!profile_id || !order_id || !quantity) {
        return res.status(400).send({ error: "Profile ID, Order ID, and Quantity are required fields" });
    }

    try {
        const [order_cart_id] = await knex('order_batch').insert({
            profile_id,
            order_id,
            quantity
        });

        res.status(201).send({ message: "Cart item created", order_cart_id });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.getAllCartItems = async (req, res) => {
    try {
        const items = await knex('order_batch').select();
        res.status(200).send(items);
    } catch (error) {
        res.status(500).send({ error: 'Error fetching cart items' });
    }
};

exports.getCartItem = async (req, res) => {
    try {
        const item = await knex('order_batch').where('order_cart_id', req.params.id).first();
        if (!item) {
            return res.status(404).send({ error: 'Cart item not found' });
        }
        res.status(200).send(item);
    } catch (error) {
        res.status(500).send({ error: 'Error fetching cart item' });
    }
};

exports.updateCartItem = async (req, res) => {
    const { profile_id, order_id, quantity } = req.body;
    
    try {
        const updatedCount = await knex('order_batch')
            .where('order_cart_id', req.params.id)
            .update({
                profile_id,
                order_id,
                quantity
            });

        if (updatedCount === 0) {
            return res.status(404).send({ error: 'Cart item not found' });
        }

        res.status(200).send({ message: 'Cart item updated successfully' });
    } catch (error) {
        res.status(500).send({ error: 'Error updating cart item' });
    }
};

exports.deleteCartItem = async (req, res) => {
    try {
        const deleteCount = await knex('order_batch')
            .where('order_cart_id', req.params.id)
            .del();

        if (deleteCount === 0) {
            return res.status(404).send({ error: 'Cart item not found' });
        }

        res.status(200).send({ message: 'Cart item deleted successfully' });
    } catch (error) {
        res.status(500).send({ error: 'Error deleting cart item' });
    }
};