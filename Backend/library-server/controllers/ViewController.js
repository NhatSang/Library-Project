import View from "../models/View.js";

export const addViewByBookId = async (req, res) => {
    try {
        const bookId = req.query.bookId;
        const today = new Date();
        today.setUTCHours(0, 0, 0, 0);

        const view = await View.findOne({
            book: bookId,
            viewDate: today,
        })
        if (view) {
            await View.updateOne({ _id: view._id }, { $inc: { count: 1 } });
        }else {
            await View.create({
                book: bookId,
                viewDate: today,
                count: 1,
            });
        }
        return res.status(200).json({
            status:true,
            message: "Success",
        });

    } catch (error) {
        return res.status(500).json({ 
            status: false,
            message: error.message
         });
    }
};