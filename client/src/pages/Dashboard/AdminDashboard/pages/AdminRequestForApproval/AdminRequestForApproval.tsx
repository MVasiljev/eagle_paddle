import React, { useState } from "react";
import { useUsers } from "../../../../../hooks/useUsers";
import { useRoles } from "../../../../../hooks/useRoles";
import SearchBar from "../../../../../components/SearchBar/SearchBar";
import {
  DashboardContainer,
  Table,
  Select,
  Button,
  ErrorMessage,
  LoadingMessage,
} from "./AdminRequestForApproval.styles";

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
  }>({});

  const handleRoleChange = (userId: string, roleId: string) => {
    setRoleAssignments((prev) => ({
      ...prev,
      [userId]: roleId,
    }));
  };

  const handleApprove = (userId: string) => {
    const assignedRole = roleAssignments[userId];
    if (!assignedRole) {
      alert("Please assign a role before approving.");
      return;
    }

    approveUserById(userId, true, assignedRole)
      .then(() => {
        alert("User approved successfully.");
      })
      .catch((error) => {
        alert("Failed to approve user: " + error);
      });
  };

  const handleReject = (userId: string) => {
    approveUserById(userId, false, "")
      .then(() => {
        alert("User rejected successfully.");
      })
      .catch((error) => {
        alert("Failed to reject user: " + error);
      });
  };

  if (userError || rolesError) {
    return <ErrorMessage>{userError || rolesError}</ErrorMessage>;
  }

  return (
    <DashboardContainer>
      <SearchBar onSearch={(query) => console.log(query)} />
      {isLoadingUsers || isLoadingRoles ? (
        <LoadingMessage>Loading...</LoadingMessage>
      ) : unapprovedUsers.length === 0 ? (
        <p style={{ color: "white" }}>Nema zahteva za dozvolom za odobrenje.</p>
      ) : (
        <Table>
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
                  <Select
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
                  </Select>
                </td>
                <td>
                  <Button
                    onClick={() => handleApprove(user._id)}
                    className="approve-btn"
                  >
                    Approve
                  </Button>
                  <Button
                    onClick={() => handleReject(user._id)}
                    className="reject-btn"
                  >
                    Reject
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </DashboardContainer>
  );
};

export default AdminRequestForApproval;
