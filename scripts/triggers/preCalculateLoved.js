exports = function (changeEvent) {
    const fullDocument = changeEvent.fullDocument;
    const incAmount = (fullDocument.loved === 1) ? 1 : -1;

    const collection = context.services.get("monsta-c0").db("monsta").collection("posts");
    collection.findOneAndUpdate(
        { _id: BSON.ObjectId(fullDocument.postId) },
        { $inc: { lovedCount: incAmount } }
    );
};