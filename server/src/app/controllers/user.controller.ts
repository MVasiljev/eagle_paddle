import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import User, { IUser } from "../models/user.model";
import logger from "../../config/logger";
import Role from "../models/role.model";

const JWT_SECRET = process.env.JWT_SECRET || "defaultSecret";

/**
 * @route GET /users
 * @description Fetches a paginated list of approved users. Optionally filters users by role if the 'role' query parameter is provided.
 * @queryParam {string} [role] - Optional role to filter users by (e.g., "admin", "coach").
 * @queryParam {number} [page=1] - The page number for pagination (default is 1).
 * @queryParam {number} [limit=10] - The number of users per page for pagination (default is 10).
 * @response {200} - Paginated list of approved users, including total users and total pages.
 * @response {500} - Failed to fetch approved users.
 */
export const listApprovedUsers = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { role, page = 1, limit = 10 } = req.query;

    const query: Record<string, any> = { approved: true };

    if (role) {
      // Fetch the ObjectId for the role string
      const roleDoc = await Role.findOne({ name: role as string });
      if (!roleDoc) {
        res.status(400).json({ error: "Invalid role provided." });
        return;
      }
      query.role = roleDoc._id; // Use the ObjectId
    }

    const users = await User.find(query)
      .populate("role", "name") // Populate 'role' and select only the 'name' field
      .skip((+page - 1) * +limit)
      .limit(+limit)
      .select("-password");

    console.log(`All users: ${JSON.stringify(users)}`);

    const totalUsers = await User.countDocuments(query);

    res.status(200).json({
      data: users,
      totalUsers,
      page: +page,
      totalPages: Math.ceil(totalUsers / +limit),
    });
  } catch (error) {
    logger.error("Error fetching approved users: %o", error);
    res.status(500).json({ error: "Failed to fetch approved users." });
  }
};

/**
 * @route GET /users/unapproved
 * @description Fetches all unapproved users. Restricted to admins.
 * @response {200} - List of unapproved users.
 * @response {500} - Failed to fetch users.
 */
export const listUnapprovedUsers = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const users = await User.find({ approved: false }).select("-password");
    console.log(`Called unaproved with ${users}`);
    res.status(200).json(users);
  } catch (error) {
    logger.error("Error fetching unapproved users: %o", error);
    res.status(500).json({ error: "Failed to fetch unapproved users." });
  }
};

/**
 * @route GET /users/me
 * @description Extracts the user information from the JWT token in the Authorization header.
 * @header {string} Authorization - Bearer token.
 * @response {200} - User details without the password field.
 * @response {401} - No token provided.
 * @response {404} - User not found.
 * @response {500} - Failed to extract user from token.
 */
export const getUserFromToken = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      res.status(401).json({ error: "No token provided." });
      return;
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      res.status(404).json({ error: "User not found." });
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    logger.error("Error extracting user from token: %o", error);
    res.status(500).json({ error: "Failed to extract user from token." });
  }
};

/**
 * @route GET /users/:id
 * @description Fetches a specific user by their ID. Only returns approved users unless the requester is an admin.
 * @param {string} id - User ID as a route parameter.
 * @response {200} - User details without the password field.
 * @response {404} - User not found.
 * @response {403} - Access denied for unapproved user.
 * @response {500} - Failed to fetch user.
 */
export const getUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.params.id;

    // Use role as a string from JWT
    const requesterRole = req.user?.role;

    const user = await User.findById(userId).select("-password");

    if (!user) {
      res.status(404).json({ error: "User not found." });
      return;
    }

    // Check if the requester is not an admin and the user is not approved
    if (requesterRole !== "admin" && !user.approved) {
      res.status(403).json({ error: "Access denied. User is not approved." });
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    logger.error("Error fetching user: %o", error);
    res.status(500).json({ error: "Failed to fetch user." });
  }
};

/**
 * @route PUT /users/:id
 * @description Updates the first name and last name of a user. Only admins can update the `role` field.
 * Non-admin users can only update their own profiles.
 * @param {string} id - User ID as a route parameter.
 * @header {string} Authorization - Bearer token with user ID and role.
 * @bodyParam {string} [firstName] - Updated first name (optional).
 * @bodyParam {string} [lastName] - Updated last name (optional).
 * @bodyParam {string} [role] - Role to be updated (only for admins).
 * @response {200} - Updated user details without the password field.
 * @response {401} - Authorization token is missing or invalid.
 * @response {403} - User is not authorized to perform the update.
 * @response {404} - User not found.
 * @response {500} - Failed to update user profile.
 */

export const updateUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.params.id;
    const {
      firstName,
      lastName,
      email,
      avatar,
      birth,
      club,
      boat,
      gender,
      height,
      weight,
    } = req.body;

    // Extract and verify token
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      res.status(401).json({ error: "Authorization token is required." });
      return;
    }

    const decoded = jwt.verify(token, JWT_SECRET) as {
      userId: string;
      role: string;
    };
    const requesterId = decoded.userId;
    const requesterRole = decoded.role;

    // Prevent users from updating other profiles unless they are admins
    if (requesterRole !== "admin" && requesterId !== userId) {
      res
        .status(403)
        .json({ error: "You are not authorized to update this user." });
      return;
    }

    // Prevent regular users from updating sensitive fields
    if (req.body.role || req.body.approved || req.body._id) {
      if (requesterRole !== "admin") {
        res.status(403).json({
          error: "Only admins can update role, approval, or ID fields.",
        });
        return;
      }
    }

    // Construct allowed updates dynamically
    const updates: Partial<IUser> = {};

    if (firstName !== undefined) updates.firstName = firstName;
    if (lastName !== undefined) updates.lastName = lastName;
    if (email !== undefined) updates.email = email;
    if (avatar !== undefined) updates.avatar = avatar;
    if (birth !== undefined) updates.birth = birth;
    if (club !== undefined) updates.club = club;
    if (boat !== undefined) updates.boat = boat;
    if (gender !== undefined) updates.gender = gender;
    if (height !== undefined) updates.height = height;
    if (weight !== undefined) updates.weight = weight;

    const updatedUser = await User.findByIdAndUpdate(userId, updates, {
      new: true,
    }).select("-password");

    if (!updatedUser) {
      res.status(404).json({ error: "User not found." });
      return;
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating user profile:", error);
    res.status(500).json({ error: "Failed to update user profile." });
  }
};

/**
 * @route PUT /users/:id/approve
 * @description Updates the approval status of a user. Restricted to admins.
 * @param {string} id - User ID as a route parameter.
 * @bodyParam {boolean} approved - Approval status.
 * @response {200} - Updated user details with approval status.
 * @response {400} - Invalid approval value provided.
 * @response {404} - User not found.
 * @response {500} - Failed to update user approval status.
 */
export const approveUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.params.id;
    const { approved, roleId } = req.body;

    console.log(`approveUser called with ${approved} ${roleId} ${userId}`);

    // Validate input
    if (typeof approved !== "boolean") {
      res.status(400).json({ error: "Invalid 'approved' value." });
      return;
    }

    if (!roleId) {
      res.status(400).json({ error: "Role ID is required." });
      return;
    }

    // Find the role by ID
    const role = await Role.findById(roleId);

    if (!role) {
      res.status(404).json({ error: "Role not found." });
      return;
    }

    // Update the user with the approved status and role
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { approved, role: role._id },
      { new: true }
    ).populate("role"); // Populate the role field for better response

    if (!updatedUser) {
      res.status(404).json({ error: "User not found." });
      return;
    }

    res.status(200).json({
      message: "User approval status and role updated.",
      updatedUser,
    });
  } catch (error) {
    logger.error("Error updating user approval status: %o", error);
    res.status(500).json({ error: "Failed to update user approval status." });
  }
};

/**
 * @route DELETE /users/:id
 * @description Soft deletes a user account by marking the `deletedAt` field.
 * @param {string} id - User ID as a route parameter.
 * @response {200} - User successfully soft deleted.
 * @response {404} - User not found.
 * @response {500} - Failed to soft delete user.
 */
export const deleteUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.params.id;

    const user = await User.findByIdAndUpdate(
      userId,
      { deletedAt: new Date() },
      { new: true }
    ).select("-password");

    if (!user) {
      res.status(404).json({ error: "User not found." });
      return;
    }

    res.status(200).json({ message: "User successfully soft deleted.", user });
  } catch (error) {
    logger.error("Error soft deleting user: %o", error);
    res.status(500).json({ error: "Failed to soft delete user." });
  }
};
