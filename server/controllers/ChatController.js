import ChatModel from "../models/chatModel.js";
import ChatHistoryModel from "../models/chatHistoryModel.js";
import Messages from "../models/messages.js";

export const createChat = async (req, res) => {
  const newChat = new ChatModel({
    members: [req.body.senderId, req.body.receiverId],
  });
  try {
    const result = await newChat.save();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const userChats = async (req, res) => {
  try {
    const chat = await ChatModel.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const findChat = async (req, res) => {
  try {
    const chat = await ChatModel.findOne({
      members: { $all: [req.params.firstId, req.params.secondId] },
    });
    res.status(200).json(chat)
  } catch (error) {
    res.status(500).json(error)
  }
}












function getRandomArbitrary(min, max) {
  return (Math.trunc(Math.random() * (max - min) + min)).toString()
}


const checkUsersHaveChatHistory = async (me, partner) => {
  const result = await ChatHistoryModel.findOne({ id: me.id, partnerId: partner.id })
  return result
}


const getKeyAndConversations = async (me, partner) => {
  try {
    const cursor = await ChatHistoryModel.find({ id: me.id, partnerId: partner.id })
    const count = await ChatHistoryModel.countDocuments()
    console.log(`count : ${count}, type:${typeof (count)}`)

    var list = []
    if (count >= 1) { cursor.forEach((item) => { list.push(item) }) }

    return list
  } catch (ex) {
    console.log(`get key : error : ${ex}`)
    return { error: ex }
  }
}


const postKeyAndConversation = async (me, partner, chatRoomKey) => {
  console.log(`post key and convo `)
  try {
    await ChatHistoryModel.create({ id: me.id, partnerId: partner.id, name: partner.name, photo: partner.photo, chatRoomKey: chatRoomKey })
  } catch (ex) {
    console.log(`post key : error : ${ex}`)
  }
}

export const onInteractionForChat = async (req, res) => {


  if (!req.body.me) return res.status(400).send({ error: 'your own data is missing' })
  if (!req.body.partner) return res.status(400).send({ error: `your chat partner's data is missing` })

  var chatRoomKey = getRandomArbitrary(1, 1000000000)
  let me = req.body.me
  let partner = req.body.partner

  // check if a chatRoomKey exists

  var isConversationExisting = await checkUsersHaveChatHistory(me, partner)

  console.log(`conversation existing : ${isConversationExisting} `)


  // if no : genKey & POST default conversation
  if (isConversationExisting === null) postKeyAndConversation(me, partner, chatRoomKey)


  // GET all conversations of ME
  var conversations = await getKeyAndConversations(me, partner)
  console.log(`conversations : ${conversations} `)


  return res.status(201).send({ success: true, conversations: conversations })

}









