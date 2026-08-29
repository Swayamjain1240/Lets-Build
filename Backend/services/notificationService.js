import Notification from "../model/notificationModel.js"
import { getIO } from "../sockets/socket.js"

export const createAndSendNotification = async ({ recipient, sender, type, project, request }) => {
  const notification = await Notification.create({
    recipient,
    sender,
    type,
    project,
    request,
  });

  const populatedNotif = await Notification.findById(notification._id)
    .populate('sender', 'name profilePicture')
    .populate('project', 'title');

  try {
    const io = getIO();
    io.to(recipient.toString()).emit('new_notification', populatedNotif);
  } catch (err) {
    console.warn('Socket emit skipped (Socket.io uninitialized or client offline):', err.message);
  }

  return populatedNotif;
};

export const getUserNotifications = async (userId) => {
  return await Notification.find({ recipient: userId })
    .populate('sender', 'name profilePicture')
    .populate('project', 'title')
    .populate('request', 'type status')
    .sort({ createdAt: -1 });
};

export const markAsRead = async (notificationId, userId) => {
  const notification = await Notification.findById(notificationId);

  if (!notification) {
    const error = new Error('Notification not found');
    error.statusCode = 404;
    throw error;
  }

  if (notification.recipient.toString() !== userId.toString()) {
    const error = new Error('Not authorized to update this notification');
    error.statusCode = 403;
    throw error;
  }

  notification.isRead = true;
  await notification.save();
  return notification;
};

export const markAllAsRead = async (userId) => {
  await Notification.updateMany(
    { recipient: userId, isRead: false },
    { $set: { isRead: true } }
  );
  return { message: 'All notifications marked as read' };
};