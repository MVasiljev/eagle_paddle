import React, { useEffect } from "react";
import {
  Container,
  Header,
  CategoryList,
  CategoryItem,
  ActionButton,
} from "./BoatList.styles";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { Views } from "../../../../../constants/views";
import { useBoats } from "../../../../../hooks/useBoats";
import { setView } from "../../../../../redux/slices/viewSlice";
import { Boat } from "../../../../../types/types";

const BoatList: React.FC = () => {
  const { boats, isLoading, getBoats, removeBoat } = useBoats();
  const dispatch = useDispatch();

  useEffect(() => {
    getBoats();
  }, []);

  const handleEdit = (boat: Boat) => {
    dispatch(setView(Views.BOAT_CREATE));
    dispatch({ type: "boats/setEditBoat", payload: boat });
  };

  const handleDelete = async (id: string) => {
    if (confirm("Da li ste sigurni?")) {
      await removeBoat(id);
      getBoats(); // Refresh the list after deletion
    }
  };

  return (
    <Container>
      <Header>Čamci</Header>
      {isLoading && <p>Učitavanje...</p>}
      <CategoryList>
        {boats.map((boat) => (
          <CategoryItem key={boat._id}>
            {boat.name}
            <div>
              <ActionButton onClick={() => handleEdit(boat)}>
                <AiOutlineEdit />
              </ActionButton>
              <ActionButton onClick={() => boat._id && handleDelete(boat._id)}>
                <AiOutlineDelete />
              </ActionButton>
            </div>
          </CategoryItem>
        ))}
      </CategoryList>
    </Container>
  );
};

export default BoatList;
