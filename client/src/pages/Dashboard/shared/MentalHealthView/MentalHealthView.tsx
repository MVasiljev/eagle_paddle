import React from "react";
import {
  ViewContainer,
  ViewHeader,
  DetailGroup,
  DetailItem,
  DetailLabel,
  BackButton,
} from "./MentalHealthView.styles";
import { useDispatch, useSelector } from "react-redux";
import { Views } from "../../../../constants/views";
import { setView } from "../../../../redux/slices/viewSlice";
import { RootState } from "../../../../redux/store";

const MentalHealthView: React.FC = () => {
  const dispatch = useDispatch();
  const selectedEntry = useSelector(
    (state: RootState) => state.mentalHealth.edit
  );

  if (!selectedEntry) {
    return <p>Nema podataka za prikaz.</p>;
  }

  return (
    <ViewContainer>
      <ViewHeader>Pregled Mentalnog Zdravlja</ViewHeader>

      <DetailGroup>
        <DetailItem>
          <DetailLabel>Ime i prezime:</DetailLabel>
          {typeof selectedEntry.user === "object"
            ? `${selectedEntry.user.firstName} ${selectedEntry.user.lastName}`
            : "Nepoznat korisnik"}
        </DetailItem>

        <DetailItem>
          <DetailLabel>Raspoloženje:</DetailLabel>
          {selectedEntry.moodRating}{" "}
          {selectedEntry.moodRating === 1
            ? "😡"
            : selectedEntry.moodRating === 2
            ? "😟"
            : selectedEntry.moodRating === 3
            ? "😐"
            : selectedEntry.moodRating === 4
            ? "😊"
            : "😁"}
        </DetailItem>

        <DetailItem>
          <DetailLabel>Kvalitet sna:</DetailLabel>
          {selectedEntry.sleepQuality || "Nije unešeno"}
        </DetailItem>

        <DetailItem>
          <DetailLabel>Puls:</DetailLabel>
          {selectedEntry.pulse || "Nije unešeno"}
        </DetailItem>

        <DetailItem>
          <DetailLabel>Komentar:</DetailLabel>
          {selectedEntry.comment || "Nema dodatnih komentara"}
        </DetailItem>

        <DetailItem>
          <DetailLabel>Datum unosa:</DetailLabel>
          {new Date(selectedEntry.createdAt!).toLocaleDateString()}
        </DetailItem>
      </DetailGroup>

      <BackButton
        onClick={() => dispatch(setView(Views.MENTAL_HEALTH_HISTORY))}
      >
        Nazad
      </BackButton>
    </ViewContainer>
  );
};

export default MentalHealthView;
