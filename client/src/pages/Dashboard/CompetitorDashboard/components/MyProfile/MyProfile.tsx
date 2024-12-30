/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  ProfileContainer,
  ProfileHeader,
  ProfileAvatar,
  ProfileDetails,
  DetailRow,
  Label,
  Value,
  EditButton,
  SaveButton,
  UploadInput,
} from "./MyProfile.styles";
import { useUsers } from "../../../../../hooks/useUsers";
import { useBoats } from "../../../../../hooks/useBoats";
import { useClubs } from "../../../../../hooks/useClubs";
import { RootState } from "../../../../../redux/store";
import {
  User,
  UpdateUserData,
  CompetitionResult,
} from "../../../../../types/types";
import { fetchCurrentUser } from "../../../../../redux/slices/userSlice";

const MyProfile: React.FC = () => {
  const { updateUser } = useUsers();
  const { boats } = useBoats();
  const { clubs } = useClubs();
  const user = useSelector((state: RootState) => state.auth.user);

  const [editMode, setEditMode] = useState(false);
  const [editedData, setEditedData] = useState<Partial<User>>(user || {});
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleEditToggle = () => {
    setEditMode(!editMode);
  };

  const handleInputChange = (field: keyof User, value: unknown) => {
    setEditedData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    if (user) {
      const dataToSend: UpdateUserData = {
        ...editedData,
        club:
          typeof editedData.club === "object"
            ? editedData.club._id
            : editedData.club,
        boat:
          typeof editedData.boat === "object"
            ? editedData.boat._id
            : editedData.boat,
      };

      delete dataToSend._id;
      delete dataToSend.approved;
      delete dataToSend.role;

      try {
        const updatedUser = await updateUser(user._id, dataToSend);
        alert("Profil uspešno ažuriran!");

        // Refresh local state with updated user data
        setEditedData(updatedUser); // Fix to show height immediately
        setEditMode(false);
        await fetchCurrentUser();
      } catch (error) {
        alert(`Greška prilikom ažuriranja. ${error}`);
      }
    }
  };

  useEffect(() => {
    if (user) {
      setEditedData(user); // Sync state when user changes
    }
  }, [user]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  if (!user) {
    return <p>Učitavanje profila...</p>;
  }

  const profileFields: [keyof User, string][] = [
    ["email", "Email"],
    ["firstName", "Ime"],
    ["lastName", "Prezime"],
    ["birth", "Datum rođenja"],
    ["club", "Klub"],
    ["boat", "Čamac"],
    ["gender", "Pol"],
    ["height", "Visina"],
    ["weight", "Težina"],
  ];

  const getDisplayValue = (
    value:
      | string
      | number
      | boolean
      | { name: string }
      | CompetitionResult[]
      | undefined
  ): string => {
    if (Array.isArray(value)) {
      return "Više rezultata";
    }
    if (typeof value === "object") {
      return (value as { name: string })?.name || "N/A";
    }
    if (typeof value === "boolean") {
      return value ? "Da" : "Ne";
    }
    return value !== undefined ? String(value) : "N/A";
  };

  return (
    <ProfileContainer>
      <ProfileHeader>
        <label htmlFor="avatar-upload">
          <ProfileAvatar
            src={
              selectedFile
                ? URL.createObjectURL(selectedFile)
                : user.avatar ||
                  "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
            }
            alt="Avatar"
          />
        </label>
        <UploadInput
          id="avatar-upload"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />
        <h1>{`${user.firstName} ${user.lastName}`}</h1>
      </ProfileHeader>

      <ProfileDetails>
        {profileFields.map(([key, label]) => (
          <DetailRow key={key}>
            <Label>{label}:</Label>
            {editMode ? (
              key === "birth" ? (
                <input
                  type="date"
                  value={
                    (editedData.birth &&
                      new Date(editedData.birth).toISOString().split("T")[0]) ||
                    ""
                  }
                  onChange={(e) => handleInputChange(key, e.target.value)}
                />
              ) : key === "gender" ? (
                <select
                  value={editedData.gender || ""}
                  onChange={(e) => handleInputChange(key, e.target.value)}
                >
                  <option value="male">Muški</option>
                  <option value="female">Ženski</option>
                  <option value="other">Drugo</option>
                </select>
              ) : key === "height" || key === "weight" ? (
                <input
                  type="number"
                  value={
                    typeof editedData[key] === "string" ||
                    typeof editedData[key] === "number"
                      ? editedData[key]
                      : ""
                  }
                  onChange={(e) =>
                    handleInputChange(key, parseInt(e.target.value, 10))
                  }
                />
              ) : key === "boat" ? (
                <select
                  value={
                    typeof editedData.boat === "object"
                      ? editedData.boat._id
                      : editedData.boat || ""
                  }
                  onChange={(e) => handleInputChange(key, e.target.value)}
                >
                  <option value="">Izaberite čamac</option>
                  {boats.map((boat) => (
                    <option key={boat._id} value={boat._id}>
                      {boat.name}
                    </option>
                  ))}
                </select>
              ) : key === "club" ? (
                <select
                  value={
                    typeof editedData.club === "object"
                      ? editedData.club._id
                      : editedData.club || ""
                  }
                  onChange={(e) => handleInputChange(key, e.target.value)}
                >
                  <option value="">Izaberite klub</option>
                  {clubs.map((club) => (
                    <option key={club._id} value={club._id}>
                      {club.name}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  value={
                    typeof editedData[key] === "string" ||
                    typeof editedData[key] === "number"
                      ? editedData[key]
                      : ""
                  }
                  onChange={(e) => handleInputChange(key, e.target.value)}
                />
              )
            ) : (
              <Value>
                {getDisplayValue(
                  key === "club"
                    ? user.club
                    : key === "boat"
                    ? user.boat
                    : user[key]
                )}
              </Value>
            )}
          </DetailRow>
        ))}
      </ProfileDetails>

      {editMode ? (
        <SaveButton onClick={handleSave}>Sačuvaj izmene</SaveButton>
      ) : (
        <EditButton onClick={handleEditToggle}>Izmeni profil</EditButton>
      )}
    </ProfileContainer>
  );
};

export default MyProfile;
