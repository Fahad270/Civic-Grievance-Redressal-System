const express = require("express");
const router = express.Router();
const User = require("../Model/User");

// CREATE USER
router.post("/", async (req, res) => {
  try {
    const { uid, email, role } = req.body;

    const existing = await User.findOne({ uid });
    if (existing) return res.json(existing);

    const newUser = new User({ uid, email, role });
    await newUser.save();

    res.json(newUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:uid", async (req, res) => {
  try {
    const user = await User.findOne({ uid: req.params.uid });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;