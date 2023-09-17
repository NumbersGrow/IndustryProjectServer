const { profile } = require("console");
// const knex = require("../db/db");

const SALT_ROUNDS = 10;

exports.createProfile = async (req, res) => {
    const { userName, email, password, date_created } = req.body;

    // Validation 
    if (!userName || !email || !password || !date_created) {
        return res.status(400).send({ error: "Missing fields" });
    }

    try {
        //Passowrd protection
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
        const createDate = date_created || new Date().toISOString().slice(0, 19).replace('T', ' ');

        const [id] = await knex('profiles').insert({
            userName,
            email,
            password: hashedPassword,
            date_created: createDate
        });

        res.status(201).send({ message: "Profile created", id });

    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

exports.getAllProfiles = async (req, res) => {

    try {
        const profile = await knex('profiles').select();
        res.status(200).send(profile);
    } catch (error) {
        res.status(500).send({error:'Error fetching profile'});
    }
};

exports.getProfile = async (req, res) => {
    try {
        const profile = await knex('profiles').where('profile_id', req.params.id).first();
        if (!profile) {
            return res.status(404).send({ error: 'Profile not found' });
        }
        res.status(200).send(profile);
    } catch (error) {
        res.status(500).send({ error: 'Error fetching profile' });
    }
};

exports.updateProfile = async (req, res) => {
    const { userName, email, password, date_created } = req.body;

    try {
        let updatedProfile = {
            userName,
            email,
            date_created
        };
        // If there is option to update password
        if (password) {  
            updatedProfile.password = await bcrypt.hash(password, SALT_ROUNDS);
        }

        const updatedCount = await knex('profiles')
            .where('profile_id', req.params.id)
            .update(updatedProfile);

        if (updatedCount === 0) {
            return res.status(404).send({ error: 'Profile not found' });
        }

        res.status(200).send({ message: 'Profile updated successfully' });

    } catch (error) {
        res.status(500).send({ error: 'Error updating profile' });
    }
};

exports.deleteProfile = async (req, res) => {
    try {
        const deleteCount = await knex('profiles')
            .where('profile_id', req.params.id)
            .del();

        if (deleteCount === 0) {
            return res.status(404).send({ error: 'Profile not found' });
        }

        res.status(200).send({ message: 'Profile deleted successfully' });
    } catch (error) {
        res.status(500).send({ error: 'Error deleting profile' });
    }
};
