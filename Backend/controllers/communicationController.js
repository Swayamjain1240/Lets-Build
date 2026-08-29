import * as communicationService from "../services/communicationService.js"

export const getOrCreateConversation = async (req, res, next) => {
  try {
    const { receiverId } = req.body;
    const conversation = await communicationService.getOrCreateConversation(
      req.user._id,
      receiverId
    );

    res.status(200).json({
      success: true,
      data: conversation,
    });
  } catch (error) {
    next(error);
  }
};

export const getUserConversations = async (req, res, next) => {
  try {
    const conversations = await communicationService.getUserConversations(req.user._id);

    res.status(200).json({
      success: true,
      count: conversations.length,
      data: conversations,
    });
  } catch (error) {
    next(error);
  }
};

export const sendMessage = async (req, res, next) => {
  try {
    const { conversationId, text } = req.body;
    const message = await communicationService.sendMessage(
      conversationId,
      req.user._id,
      text
    );

    res.status(201).json({
      success: true,
      data: message,
    });
  } catch (error) {
    next(error);
  }
};

export const getConversationMessages = async (req, res, next) => {
  try {
    const { conversationId } = req.params;
    const messages = await communicationService.getConversationMessages(
      conversationId,
      req.user._id
    );

    res.status(200).json({
      success: true,
      count: messages.length,
      data: messages,
    });
  } catch (error) {
    next(error);
  }
};