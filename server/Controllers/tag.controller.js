const db = require("../models");
const Collection = db.collection;

// Method to get all tags for a specific collection
exports.getTagsForCollection = async (req, res) => {
  try {
    const { collectionId } = req.params;

    // Fetch the collection by ID and populate the dots (tags)
    const collection = await Collection.findById(collectionId).populate({
      path: "dots",
      select: "-__v", // Exclude the '__v' field from the populated documents
    });

    if (!collection) {
      return res.status(404).json({ message: "Collection not found" });
    }

    // Respond with the detailed tags (dots) of the collection
    res.status(200).json(collection.dots);
  } catch (error) {
    console.error("Error fetching tags for collection:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
