import React, { useEffect, useState } from "react";
import {
  FormWrapper,
  Heading,
  SubHeading,
  Form,
  InputGroup,
  Input,
  Button,
} from "./CreateTeam.styles";
import { useSelector, useDispatch } from "react-redux";
import { useTeams } from "../../../../hooks/useTeams";
import { RootState } from "../../../../redux/store";
import { setView } from "../../../../redux/slices/viewSlice";
import { clearEditTeam } from "../../../../redux/slices/teamSlice";
import { Views } from "../../../../constants/views";
import { useUsers } from "../../../../hooks/useUsers";
import { useRoles } from "../../../../hooks/useRoles";

const CreateTeam = () => {
  const dispatch = useDispatch();
  const { users } = useUsers();
  const { updateExistingTeam, addNewTeam } = useTeams();
  const { user } = useSelector((state: RootState) => state.auth);
  const { roles } = useRoles();

  const editTeam = useSelector((state: RootState) => state.teams.edit);

  const [teamName, setTeamName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  const competitors = users.filter((user) => {
    const role = roles.find((role) => role._id === user.role?._id);
    return role?.name === "competitor";
  });

  useEffect(() => {
    if (editTeam) {
      setTeamName(editTeam.name);
      setSelectedUsers(
        editTeam.members.map((member) =>
          typeof member === "string" ? member : member._id!
        )
      );
    }
  }, [editTeam]);

  const handleCheckboxChange = (id: string) => {
    setSelectedUsers((prev) =>
      prev.includes(id) ? prev.filter((u) => u !== id) : [...prev, id]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (teamName && selectedUsers.length) {
      if (editTeam) {
        updateExistingTeam({
          _id: editTeam._id,
          name: teamName,
          members: selectedUsers,
          coach: editTeam.coach,
        });
      } else {
        if (user)
          addNewTeam({
            name: teamName,
            members: selectedUsers,
            coach: user._id,
          });
      }
      resetForm();
      dispatch(setView(Views.MY_TEAM));
    }
  };

  const resetForm = () => {
    setTeamName("");
    setSelectedUsers([]);
    dispatch(clearEditTeam());
  };

  return (
    <FormWrapper>
      <Heading>{editTeam ? "Edit Team" : "Create a New Team"}</Heading>
      <SubHeading>
        {editTeam ? "Modify team details" : "Select members and name the team"}
      </SubHeading>
      <Form onSubmit={handleSubmit}>
        <InputGroup>
          <Input
            type="text"
            placeholder="Team Name"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
          />
        </InputGroup>

        {competitors.map((user) => (
          <div key={user._id}>
            <input
              type="checkbox"
              id={user._id}
              checked={selectedUsers.includes(user._id)}
              onChange={() => handleCheckboxChange(user._id)}
            />
            <label style={{ color: "#a8a8a8" }} htmlFor={user._id}>
              {user.firstName} {user.lastName}
            </label>
          </div>
        ))}

        <Button type="submit">
          {editTeam ? "Update Team" : "Create Team"}
        </Button>
        <Button
          onClick={() => {
            resetForm();
            dispatch(setView(Views.MY_TEAM));
          }}
        >
          Cancel
        </Button>
      </Form>
    </FormWrapper>
  );
};

export default CreateTeam;
