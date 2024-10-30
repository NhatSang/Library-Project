import View from "../models/View.js";

export const updateView = async (book) => {
    try {
        await View.updateOne({ book }, { $inc: { viewCount: 1 } }, { upsert: true });
    } catch (error) {
        console.log(error);
    }
};