import React, { useState } from "react";
import "./AdminRequestForApproval.css";
import { useUsers } from "../../../../../hooks/useUsers";
import { useRoles } from "../../../../../hooks/useRoles";
import SearchBar from "../../../../../components/SearchBar/SearchBar";

const AdminRequestForApproval: React.FC = () => {
  const {
    unapprovedUsers,
    approveUserById,
    isLoading: isLoadingUsers,
    error: userError,
  } = useUsers();

  const { roles, isLoading: isLoadingRoles, error: rolesError } = useRoles();

  const [roleAssignments, setRoleAssignments] = useState<{
    [userId: string]: string;
  }>({}); // Tracks role assignments for each user

  // Handle role assignment change
  const handleRoleChange = (userId: string, roleId: string) => {
    setRoleAssignments((prev) => ({
      ...prev,
      [userId]: roleId,
    }));
  };

  // Handle approving a user
  const handleApprove = (userId: string) => {
    const assignedRole = roleAssignments[userId];
    if (!assignedRole) {
      alert("Please assign a role before approving.");
      return;
    }

    approveUserById(userId, true, assignedRole) // Pass the roleId
      .then(() => {
        alert("User approved successfully.");
      })
      .catch((error) => {
        alert("Failed to approve user: " + error);
      });
  };

  // Handle rejecting a user
  const handleReject = (userId: string) => {
    approveUserById(userId, true, "") // Pass the roleId
      .then(() => {
        alert("User rejected successfully.");
      })
      .catch((error) => {
        alert("Failed to reject user: " + error);
      });
  };

  // If there's an error loading the users or roles, display it
  if (userError || rolesError) {
    return <p>Error loading data: {userError || rolesError}</p>;
  }

  return (
    <div className="dashboard-container">
      <SearchBar onSearch={(query) => console.log(query)} />
      {isLoadingUsers || isLoadingRoles ? (
        <p>Loading...</p>
      ) : unapprovedUsers.length === 0 ? (
        <p>No unapproved users available.</p>
      ) : (
        <table className="approval-table">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {unapprovedUsers.map((user) => (
              <tr key={user._id}>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>
                  <select
                    value={roleAssignments[user._id] || ""}
                    onChange={(e) => handleRoleChange(user._id, e.target.value)}
                  >
                    <option value="" disabled>
                      Select a role
                    </option>
                    {roles.map((role) => (
                      <option key={role._id} value={role._id}>
                        {role.name}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <button
                    onClick={() => handleApprove(user._id)} // Pass correct user id
                    className="approve-btn"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(user._id)} // Pass correct user id
                    className="reject-btn"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminRequestForApproval;
