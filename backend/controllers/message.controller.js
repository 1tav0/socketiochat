import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId  = req.user._id;

    // find a conversation between this two users
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] }
    })

    // if there is no conversation then make a new one
    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId]
      })
    }
    //we create a new message 
    const newMessage = await Message.create({
      senderId,
      receiverId,
      message
    })
    // if new message is created we push it to the messages array
    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    await conversation.save();
    // will run in parallel
    // await Promise.all([conversation.save(), newMessage.save()]);

    // SOCKETIO functionality will go here 
    // now that the data is stored in the database we send it to the other connected socket aka user
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      // only want to send the event "to" that user
      // io.to(<socket_id>).emit() used to send events to specific clients
      io.to(receiverSocketId).emit("newMessage", newMessage); 
    }

    // respond with the new message created
    res.status(201).json(newMessage);

  } catch (error) {
    console.log("Error in sendMessage controller: ", error.message);
    res.status(500).json({ error: "Internal server error in message controller" });
  }
}

export const getMessages = async (req, res) => {
  try {
    // user wwe are chatting with
    const { id: chattingWithId } = req.params;
    const senderId = req.user._id;

    // populate the messages so we can have them populated in the conversation object
    // NOT REFERENCE BUT ACTUAL MESSAGES
    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, chattingWithId] }
    }).populate("messages");

    if (!conversation) {
      return res.status(200).json([]);
    }

    const messages = conversation.messages;

    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessages controller: ", error.message);
    res.status(500).json({ error: "Internal server error in message controller" });
  }
}