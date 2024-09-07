import Majors from "../models/Majors.js";

export const createMajor = async (req, res) => {
    const { name } = req.body;
    try {
      const newMajors = new Majors({ name: name });
      await newMajors.save();
      return res.status(201).json({ 
        status: true,
        data: newMajors
       });
    } catch (err) {
      return res.status(500).json({ 
        status: false,
        message: " Error addMajors: " + err.message
       });
    }
  };

 export const getAllMajors = async (req, res) => {
    try {
      const majors = await Majors.find();
      return res.status(200).json({ 
        status: true,
        data: majors
       });
    } catch (err) {
      return res.status(500).json({ 
        status: false,
        message: " Error getAllMajors: " + err.message
       });
    }
  };