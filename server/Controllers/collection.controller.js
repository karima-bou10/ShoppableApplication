const db = require("../models");
const Tag = db.tag;
const Collection = db.collection;

// Create and Save a new Collection
exports.create = async (req, res) => {
  try {
    // Extract data from the request body
    const { imageUrl, dots } = req.body;

    // Create tags (dots) for the collection
    const createdTags = await Tag.create(dots);

    // Create a new collection and associate the created tags
    const collection = new Collection({
      imageUrl: imageUrl,
      dots: createdTags.map((tag) => tag._id), // Save only the IDs of the created tags
    });

    // Save the collection to the database
    const savedCollection = await collection.save();

    // Respond with the saved collection
    res.status(201).json(savedCollection);
  } catch (err) {
    // Handle errors
    console.error("Error creating collection:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
// Function to get all Collection
exports.getAllCollections = async (req, res) => {
  try {
    // Fetch all Collection from the database
    const collections = await Collection.find().populate({
      path: "dots",
      model: "Tag",
      populate: {
        path: "productID",
        model: "Product", // Make sure this matches your Product model name
        select: "-__v", // Exclude the '__v' field from the populated documents
      },
      select: "-__v", // Exclude the '__v' field from the populated documents
    });
    console.log("collection on back", collections.dots);
    // Respond with the collections
    res.status(200).json(collections);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.delete = async (req, res) => {
  const id = req.params.id;

  try {
    // Find the collection by id
    const collection = await Collection.findById(id);

    if (!collection) {
      return res.status(404).send({
        message: `Cannot delete Collection with id=${id}. Maybe Collection was not found!`,
      });
    }

    // Extract the associated tag IDs
    const tagIds = collection.dots;

    // Delete the associated tags
    await Tag.deleteMany({ _id: { $in: tagIds } });

    // Delete the collection
    await Collection.findByIdAndDelete(id);

    res.send({
      message: "Collection and associated tags were deleted successfully!",
    });
  } catch (err) {
    res.status(500).send({
      message: "Could not delete Collection with id=" + id,
    });
  }
};
// Update a Collection by ID
exports.update = async (req, res) => {
  const id = req.params.id;

  try {
    // Find the collection by ID
    const collection = await Collection.findById(id);

    if (!collection) {
      return res.status(404).send({
        message: `Cannot update Collection with id=${id}. Collection not found!`,
      });
    }

    // Extract dots from the request body
    console.log("Request Body:", req.body);
    const { dots } = req.body;

    if (dots) {
      console.log("dots ", dots);
      // Delete old tags
      await Tag.deleteMany({ _id: { $in: collection.dots } });

      // Create new tags
      const createdTags = await Tag.create(dots);

      // Update the collection with new tags
      collection.dots = createdTags.map((tag) => tag._id);
    }

    // Save the updated collection to the database
    const updatedCollection = await collection.save();

    // Respond with the updated collection
    res.status(200).json(updatedCollection);
  } catch (err) {
    // Handle errors
    console.error("Error updating collection:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
