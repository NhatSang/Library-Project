import User from '../models/User.js';

export const getUserById = async (req, res) => {
    try {
        const _user = req.user;
        const user = await User.findById(_user.userId)
        .populate('majors', '_id name');
        return res.status(200).json({
            status: true,
            message: 'Success',
            data: user,
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            status: false,
            message: err.message
        });
    }
}