import Genre from '../models/Genre.js';

const addGenre = async (req, res) => {
    try {
        const { name } = req.body;
        const genre = new Genre({ name });
        await genre.save();
        return res.status(200).json({
            status: true,
            message: "Success",
            data: genre,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            status: false,
            message: err.message,
        });
    }
}

const getGenres = async (req, res) => {
    try {
        const genres = await Genre.find();
        return res.status(200).json({
            status: true,
            message: "Success",
            data: genres,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            status: false,
            message: err.message,
        });
    }
}

export { addGenre, getGenres };
