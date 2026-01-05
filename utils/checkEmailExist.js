import { User } from "../models/User.js";

/**
 * Check if a user exists with a given email
 * @param {string} email - Email to check
 * @param {string} [excludeUserId] - Optional: exclude this user (useful for updates)
 * @returns {Promise<boolean>} - true if user exists, false otherwise
 */
export const checkUserExists = async (email, excludeUserId = null) => {
  if (!email) return false;

  const query = { email: email.toLowerCase().trim() };

  // Exclude a specific user ID (for profile update)
  if (excludeUserId) {
    query._id = { $ne: excludeUserId };
  }

  const existingUser = await User.findOne(query);
  return !!existingUser;
};
