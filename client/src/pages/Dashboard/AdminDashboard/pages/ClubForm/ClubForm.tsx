// src/components/ClubForm.tsx
import React, { useState, useEffect } from "react";
import { Container, Header, InputField, Button } from "./ClubForm.styles";
import { useDispatch, useSelector } from "react-redux";
import { Views } from "../../../../../constants/views";
import { useClubs } from "../../../../../hooks/useClubs";
import { setView } from "../../../../../redux/slices/viewSlice";
import { RootState } from "../../../../../redux/store";
import { IClub } from "../../../../../types/types";
import { clearEditClub } from "../../../../../redux/slices/clubSlice";

const ClubForm: React.FC = () => {
  const dispatch = useDispatch();
  const { addClub, editClub } = useClubs();
  const edit = useSelector((state: RootState) => state.clubs.edit);
  const [name, setName] = useState<string>("");
  const [location, setLocation] = useState<string>("");

  useEffect(() => {
    if (edit) {
      setName(edit.name);
      setLocation(edit.location);
    } else {
      setName("");
      setLocation("");
    }
  }, [edit]);

  const handleSubmit = async () => {
    const club: Partial<IClub> = { name, location };

    if (edit) {
      await editClub(edit._id!, club);
      dispatch(clearEditClub());
    } else {
      await addClub(club);
    }

    dispatch(setView(Views.CLUB_LIST));
  };

  return (
    <Container>
      <Header>{edit ? "Ažuriraj klub" : "Kreiraj klub"}</Header>

      <InputField
        placeholder="Ime kluba"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <InputField
        placeholder="Lokacija"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />

      <Button onClick={handleSubmit}>
        {edit ? "Ažuriraj klub" : "Snimi klub"}
      </Button>
      <Button
        style={{ marginTop: "1rem" }}
        onClick={() => {
          dispatch(clearEditClub());
          dispatch(setView(Views.CALENDAR));
        }}
      >
        Odustani
      </Button>
    </Container>
  );
};

export default ClubForm;
