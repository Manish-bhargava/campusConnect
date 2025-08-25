const { userAuth } = require("../utils/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");
// const sendEmail = require("../utils/sendEmail");

// send request controller
async function userRequest(req, res) {
  try {
    console.log(req.user);
    const fromUserId = req.user._id;
    console.log(fromUserId);
    const toUserId = req.params.toUserId;
    const status = req.params.status;

    const allowedStatus = ["ignored", "interested"];
    if (!allowedStatus.includes(status)) {
      return res.status(400).json({ message: "Invalid status type: " + status });
    }

    const toUser = await User.findById(toUserId);
    if (!toUser) {
      return res.status(404).json({ message: "User not found!" });
    }

    const existingConnectionRequest = await ConnectionRequest.findOne({
      $or: [
        { fromUserId, toUserId },
        { fromUserId: toUserId, toUserId: fromUserId },
      ],
    });

    if (existingConnectionRequest) {
      return res.status(400).json({ message: "Connection Request Already Exists!!" });
    }

    const connectionRequest = new ConnectionRequest({
      fromUserId,
      toUserId,
      status,
    });

    const data = await connectionRequest.save();

    res.json({
      message: `${req.user.firstName} is ${status} in ${toUser.firstName}`,
      data,
    });
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
}

// review request controller
async function RequestHandler(req, res) {
  try {
    const loggedInUser = req.user;
    const { status, requestId } = req.params;

    const allowedStatus = ["accepted", "rejected"];
    if (!allowedStatus.includes(status)) {
      return res.status(400).json({ message: "Status not allowed!" });
    }

    const connectionRequest = await ConnectionRequest.findOne({
      _id: requestId,
      toUserId: loggedInUser._id,
      status: "interested",
    });

    if (!connectionRequest) {
      return res.status(404).json({ message: "Connection request not found" });
    }

    connectionRequest.status = status;

    const data = await connectionRequest.save();

    res.json({ message: `Connection request ${status}`, data });
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
}

module.exports = { userRequest, RequestHandler };