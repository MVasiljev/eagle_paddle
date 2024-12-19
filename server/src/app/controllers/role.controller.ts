import { Request, Response } from "express";
import Role from "../models/role.model";
import logger from "../../config/logger";

/**
 * @route GET /roles
 * @description Fetches a list of all available roles.
 * @response {200} - List of roles.
 * @response {500} - Failed to fetch roles.
 */
export const listRoles = async (req: Request, res: Response): Promise<void> => {
  try {
    const roles = await Role.find();
    res.status(200).json(roles);
  } catch (error) {
    logger.error("Error fetching roles: %o", error);
    res.status(500).json({ error: "Failed to fetch roles." });
  }
};

/**
 * @route POST /roles
 * @description Adds a new role. Restricted to admins.
 * @bodyParam {string} name - The name of the role.
 * @bodyParam {string[]} [permissions] - Optional list of permissions for the role.
 * @response {201} - Role created successfully.
 * @response {400} - Role with the same name already exists.
 * @response {500} - Failed to create role.
 */
export const createRole = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, permissions } = req.body;

    const existingRole = await Role.findOne({ name });
    if (existingRole) {
      res.status(400).json({ error: "Role with this name already exists." });
      return;
    }

    const role = await Role.create({ name, permissions });
    res.status(201).json({ message: "Role created successfully.", role });
  } catch (error) {
    logger.error("Error creating role: %o", error);
    res.status(500).json({ error: "Failed to create role." });
  }
};

/**
 * @route PUT /roles/:id
 * @description Updates an existing role. Restricted to admins.
 * @param {string} id - Role ID as a route parameter.
 * @bodyParam {string} [name] - Updated name of the role.
 * @bodyParam {string[]} [permissions] - Updated list of permissions for the role.
 * @response {200} - Role updated successfully.
 * @response {404} - Role not found.
 * @response {500} - Failed to update role.
 */
export const updateRole = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const roleId = req.params.id;
    const { name, permissions } = req.body;

    const updatedRole = await Role.findByIdAndUpdate(
      roleId,
      { name, permissions },
      { new: true }
    );

    if (!updatedRole) {
      res.status(404).json({ error: "Role not found." });
      return;
    }

    res
      .status(200)
      .json({ message: "Role updated successfully.", updatedRole });
  } catch (error) {
    logger.error("Error updating role: %o", error);
    res.status(500).json({ error: "Failed to update role." });
  }
};

/**
 * @route DELETE /roles/:id
 * @description Deletes a role. Restricted to admins.
 * @param {string} id - Role ID as a route parameter.
 * @response {200} - Role deleted successfully.
 * @response {404} - Role not found.
 * @response {500} - Failed to delete role.
 */
export const deleteRole = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const roleId = req.params.id;

    const deletedRole = await Role.findByIdAndDelete(roleId);

    if (!deletedRole) {
      res.status(404).json({ error: "Role not found." });
      return;
    }

    res
      .status(200)
      .json({ message: "Role deleted successfully.", deletedRole });
  } catch (error) {
    logger.error("Error deleting role: %o", error);
    res.status(500).json({ error: "Failed to delete role." });
  }
};
