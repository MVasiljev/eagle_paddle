import React, { useEffect, useState } from "react";
import {
  Container,
  Header,
  InputField,
  SaveButton,
} from "./BoatCreator.styles";
import { useSelector, useDispatch } from "react-redux";
import { Views } from "../../../../../constants/views";
import { useBoats } from "../../../../../hooks/useBoats";
import { setView } from "../../../../../redux/slices/viewSlice";
import { RootState } from "../../../../../redux/store";
import { clearEditBoat } from "../../../../../redux/slices/boatSlice";

const BoatCreator: React.FC = () => {
  const { addBoat, editBoat } = useBoats();
  const editBoatData = useSelector((state: RootState) => state.boats.edit);

  const [name, setName] = useState<string>("");
  const [editId, setEditId] = useState<string | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (editBoatData) {
      setName(editBoatData.name);
      setEditId(editBoatData._id);
    }
  }, [editBoatData]);

  const handleSave = async () => {
    if (!name.trim()) {
      alert("Ime čamca je obavezno!");
      return;
    }

    const boat = { name };

    try {
      if (editId) {
        await editBoat(editId, boat);
      } else {
        await addBoat(boat);
      }
      setName("");
      setEditId(null);
      dispatch(clearEditBoat());
      alert("Čamac uspešno snimljen!");
      dispatch(setView(Views.BOAT_LIST));
    } catch (error) {
      console.error("Greška prilikom unosa čamca:", error);
    }
  };

  return (
    <Container>
      <Header>{editId ? "Ažuriraj čamac" : "Kreiraj čamac"}</Header>

      <InputField
        placeholder="Unesi naziv čamca..."
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <SaveButton onClick={handleSave}>
        {editId ? "Ažuriraj" : "Snimi"}
      </SaveButton>
      <SaveButton
        style={{ marginTop: "1rem" }}
        onClick={() => {
          setName("");
          setEditId(null);
          dispatch(clearEditBoat());
          dispatch(setView(Views.BOAT_LIST));
        }}
      >
        Odustani
      </SaveButton>
    </Container>
  );
};

export default BoatCreator;
