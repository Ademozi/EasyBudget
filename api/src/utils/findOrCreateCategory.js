const category = await findOrCreateCategory(
    req.user._id,
    categoryName
);