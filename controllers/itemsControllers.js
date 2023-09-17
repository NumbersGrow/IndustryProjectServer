// const knex = require("../db/db");

exports.createItem = async (req, res) => {
    const { category, description, scent, price, image, ingredients } = req.body;

    // Basic validation
    if (!category || price == null) {
        return res.status(400).send({ error: "Category and Price are required fields" });
    }

    try {
        const [id] = await knex('items').insert({
            category,
            description,
            scent,
            price,
            image,
            ingredients
        });

        res.status(201).send({ message: "Item created", id });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.getAllItems = async (req, res) => {
    try {
        const items = await knex('items').select();
        res.status(200).send(items);
    } catch (error) {
        res.status(500).send({ error: 'Error fetching items' });
    }
};

exports.getItem = async (req, res) => {
    try {
        const item = await knex('items').where('item_id', req.params.id).first();
        if (!item) {
            return res.status(404).send({ error: 'Item not found' });
        }
        res.status(200).send(item);
    } catch (error) {
        res.status(500).send({ error: 'Error fetching item' });
    }
};

exports.updateItem = async (req, res) => {
    const { category, description, scent, price, image, ingredients } = req.body;
    
    try {
        const updatedCount = await knex('items')
            .where('item_id', req.params.id)
            .update({
                category,
                description,
                scent,
                price,
                image,
                ingredients
            });

        if (updatedCount === 0) {
            return res.status(404).send({ error: 'Item not found' });
        }

        res.status(200).send({ message: 'Item updated successfully' });
    } catch (error) {
        res.status(500).send({ error: 'Error updating item' });
    }
};

exports.deleteItem = async (req, res) => {
    try {
        const deleteCount = await knex('items')
            .where('item_id', req.params.id)
            .del();

        if (deleteCount === 0) {
            return res.status(404).send({ error: 'Item not found' });
        }

        res.status(200).send({ message: 'Item deleted successfully' });
    } catch (error) {
        res.status(500).send({ error: 'Error deleting item' });
    }
};
