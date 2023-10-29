const User = require("../models/User");
require("dotenv").config();

// Signup Controller for Registering USers
exports.top5rank = async (req, res) => {
	try {

		const top5players = await User.find({rank:{$gte:1}}).limit(5)
		
		top5players.map((player)=>{player.password=undefined})

		return res.status(200).json({
			success: true,
			top5players,
			message: "Indexes found",
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			success: false,
			message: "Indexes cannot be found.",
		});
	}
};