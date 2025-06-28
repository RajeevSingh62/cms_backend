const Post = require("../models/Post");
const User = require("../models/UserModel");

//data neded recentBlogs,recentUsers,totalBlogs,totalUsers,

exports.getAdminDashboardData = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalBlogs = await Post.countDocuments();
    const recentUser = await User.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select("Username email createdAt");
    const recentBlogs = await Post.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("author")
      .select("title author category");
    const usersByRoleAggregation = await User.aggregate([
      {
        $group: {
          _id: "$role",
          count: { $sum: 1 },
        },
      },
    ]);

    const userByRole = {};
    usersByRoleAggregation.forEach((item) => {
      userByRole[item._id] = item.count;
    })

    res.status(200).json({
      sucess: true,
      data: {
        totalUsers,
        totalBlogs,
        recentUser,

        recentBlogs,
        userByRole,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
