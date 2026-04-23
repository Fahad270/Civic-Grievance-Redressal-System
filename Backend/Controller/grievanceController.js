//importing the model to be used!!!!

const Grievance = require("../Model/Grievance");

//Creating a grievance form/report!!
exports.createGrievance = async (req, res) => {
    try {
        const grievance = new Grievance(req.body);
        await grievance.save();
        res.status(200).json({ "Message": "Grievance Added!!!" });
    }
    catch (err) {
        res.status(500).json({ "Message": err.message });
  }  
};

//Fetching the Grievance!!

exports.getGrievances = async (req, res) => {
    try {
        //why sort method!!1?????
        const listofgrievances = await Grievance.find().sort({ date: -1 });
        res.status(200).json(listofgrievances);
    } catch (err) {
        res.status(500).json({ "Message": err.message });
    }
}

//Updating the status (admin side!!)
exports.updateStatus = async (req, res) => {
    try {
                const { status } = req.body;
        const updates = await Grievance.findByIdAndUpdate(req.params.id, { status });
        if (!updates) {
        return res.status(404).json({ message: "Grievance not found" });
        }   
        res.status(200).json({ "Message": "Status Updated!!!" });
    } catch (err) {
        res.status(500).json({ "Message": err.message });
    }
}
//Updating the upvotes!!!
exports.upvoteGrievance = async (req, res) => {
    try {
    const updated = await Grievance.findByIdAndUpdate(
      req.params.id,
      { $inc: { upvotes: 1 } },
      { new: true }
    );
        res.status(200).json({"Message":"Upvoted!!!"})
    } catch (err) {
        res.status(500).json({ "Message": err.message });
    }
}


exports.deleteGrievance = async (req, res) => {
    try { 
        const deleted = await Grievance.findByIdAndDelete(req.params.id);
        if (!deleted) {
            res.status(404).json({ "Message":"No Such Grievance!!Some Error Occured!!"});
        }
        res.status(200).json({"Message":"Deleted!~~"});
    }
    catch (err) {
        res.status(500).json({ "Message": err.message });
    }
}