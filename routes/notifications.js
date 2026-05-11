const express = require('express');
const Notification = require('../models/Notification');
const auth = require('../middleware/auth');
const router = express.Router();

// Get all notifications for authenticated user
router.get('/', auth, async (req, res) => {
  try {
    const notifications = await Notification.find({ userId: req.userId })
      .populate('candidateId', 'name role')
      .sort({ createdAt: -1 });

    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Mark notification as read
router.patch('/:id/read', auth, async (req, res) => {
  try {
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true }
    );

    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    res.json(notification);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Clear all notifications
router.delete('/', auth, async (req, res) => {
  try {
    await Notification.deleteMany({ userId: req.userId });
    res.json({ message: 'All notifications cleared' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
