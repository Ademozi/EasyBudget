const Category = require("../models/Category");

const getCategories = async (req, res) => {

    try {

        const categories = await Category.find({ user: req.user._id });
        
        res.status(200).json({
            success: true,
            categories
        }); 
    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

module.exports = {
    getCategories
};