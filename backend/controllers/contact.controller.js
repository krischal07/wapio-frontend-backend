import Contact from '../models/Contact.model.js';

/**
 * @desc    Create a new contact submission
 * @route   POST /api/contact
 * @access  Public
 */
export const createContact = async (req, res, next) => {
  try {
    const { name, company, email, message } = req.body;

    // Get IP address and user agent for tracking
    const ipAddress = req.ip || req.connection.remoteAddress;
    const userAgent = req.get('user-agent');

    // Create contact
    const contact = await Contact.create({
      name,
      company,
      email,
      message,
      ipAddress,
      userAgent
    });

    res.status(201).json({
      success: true,
      message: 'Message sent successfully! We will get back to you soon.',
      data: {
        contact: {
          id: contact._id,
          name: contact.name,
          email: contact.email,
          createdAt: contact.createdAt
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all contacts
 * @route   GET /api/contact
 * @access  Private (Admin only)
 */
export const getAllContacts = async (req, res, next) => {
  try {
    const { status, page = 1, limit = 20, search } = req.query;

    // Build query
    const query = {};
    if (status) query.status = status;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { company: { $regex: search, $options: 'i' } }
      ];
    }

    // Pagination
    const skip = (page - 1) * limit;

    // Get contacts
    const contacts = await Contact.find(query)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip(skip);

    // Get total count
    const total = await Contact.countDocuments(query);

    res.status(200).json({
      success: true,
      data: {
        contacts,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get single contact by ID
 * @route   GET /api/contact/:id
 * @access  Private (Admin only)
 */
export const getContactById = async (req, res, next) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    res.status(200).json({
      success: true,
      data: { contact }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update contact status
 * @route   PUT /api/contact/:id/status
 * @access  Private (Admin only)
 */
export const updateContactStatus = async (req, res, next) => {
  try {
    const { status } = req.body;

    if (!['new', 'read', 'replied', 'archived'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status. Must be: new, read, replied, or archived'
      });
    }

    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Contact status updated successfully',
      data: { contact }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete contact
 * @route   DELETE /api/contact/:id
 * @access  Private (Admin only)
 */
export const deleteContact = async (req, res, next) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Contact deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get contact statistics
 * @route   GET /api/contact/stats
 * @access  Private (Admin only)
 */
export const getContactStats = async (req, res, next) => {
  try {
    const stats = await Contact.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    const total = await Contact.countDocuments();
    const today = await Contact.countDocuments({
      createdAt: {
        $gte: new Date(new Date().setHours(0, 0, 0, 0))
      }
    });

    const statusCounts = {};
    stats.forEach(stat => {
      statusCounts[stat._id] = stat.count;
    });

    res.status(200).json({
      success: true,
      data: {
        total,
        today,
        byStatus: statusCounts
      }
    });
  } catch (error) {
    next(error);
  }
};
