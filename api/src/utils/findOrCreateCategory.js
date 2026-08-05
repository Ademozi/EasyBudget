const Category = require("../models/Category");

const findOrCreateCategory = async (userId, categoryName) => {

    const normalizedName = categoryName.trim().toLowerCase();

    let category = await Category.findOne({
        user: userId,
        name: normalizedName
    });

    if (!category) {
        category = await Category.create({
            user: userId,
            name: normalizedName
        });
    }

    return category;
};

module.exports = findOrCreateCategory;