import React, { useEffect, useState } from "react";
import {
  FormWrapper,
  Heading,
  Form,
  Input,
  ButtonGroup,
  Button,
  ZoneGroup,
  ZoneLabel,
  TextArea,
  EmojiGroup,
} from "./MentalHealtForm.styles";
import { MentalHealthEntry } from "../../../../types/types";
import { useMentalHealth } from "../../../../hooks/useMentalHealth";
import { setView } from "../../../../redux/slices/viewSlice";
import { Views } from "../../../../constants/views";
import { useDispatch } from "react-redux";

const MentalHealthForm = () => {
  const { addMentalHealthEntry, editMentalHealthEntry, edit, cancelEditing } =
    useMentalHealth();
  const dispatch = useDispatch();
  const [mentalHealthData, setMentalHealthData] = useState<
    Partial<MentalHealthEntry>
  >({
    moodRating: 0,
    sleepQuality: 0,
    pulse: 0,
    date: "",
    comment: "",
  });

  // Populate form when editing an entry
  useEffect(() => {
    if (edit) {
      setMentalHealthData({
        moodRating: edit.moodRating,
        sleepQuality: edit.sleepQuality,
        pulse: edit.pulse,
        date: edit.date ? edit.date.split("T")[0] : "",
        comment: edit.comment || "",
      });
    }
  }, [edit]);

  // Handle Mood Rating Selection
  const handleMoodSelect = (mood: number) => {
    setMentalHealthData((prev) => ({ ...prev, moodRating: mood }));
  };

  // Handle Sleep Quality Selection
  const handleSleepQualitySelect = (quality: number) => {
    setMentalHealthData((prev) => ({ ...prev, sleepQuality: quality }));
  };

  // Handle Form Submission
  const handleMentalHealthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!mentalHealthData.moodRating) {
      alert("Molimo unesite raspoloženje.");
      return;
    }

    const entry = {
      moodRating: mentalHealthData.moodRating,
      sleepQuality: mentalHealthData.sleepQuality,
      pulse: mentalHealthData.pulse,
      adminOverride: false,
    };

    try {
      if (edit?._id) {
        await editMentalHealthEntry(edit._id, entry);
      } else {
        await addMentalHealthEntry(entry);
      }
      alert("Unos mentalnog zdravlja sačuvan!");
      cancelEditing();
      dispatch(setView(Views.CALENDAR));
    } catch (error) {
      console.error("Failed to save entry:", error);
      alert("Greška prilikom čuvanja unosa.");
    }
  };

  return (
    <FormWrapper>
      <Heading>{edit ? "Ažuriraj Unos" : "Zdravo Ana"}</Heading>
      <Form onSubmit={handleMentalHealthSubmit}>
        <ZoneGroup>
          <div>
            <ZoneLabel>Kako se danas osećaš?</ZoneLabel>
            <EmojiGroup>
              {[1, 2, 3, 4, 5].map((mood) => (
                <Button
                  key={mood}
                  variant={
                    mentalHealthData.moodRating === mood
                      ? "primary"
                      : "secondary"
                  }
                  type="button"
                  onClick={() => handleMoodSelect(mood)}
                >
                  {mood === 1
                    ? "😡"
                    : mood === 2
                    ? "😟"
                    : mood === 3
                    ? "😐"
                    : mood === 4
                    ? "😊"
                    : "😁"}
                </Button>
              ))}
            </EmojiGroup>
          </div>

          <div>
            <ZoneLabel>Kvalitet sna (1-5)</ZoneLabel>
            <EmojiGroup>
              {[1, 2, 3, 4, 5].map((level) => (
                <Button
                  key={level}
                  variant={
                    mentalHealthData.sleepQuality === level
                      ? "primary"
                      : "secondary"
                  }
                  type="button"
                  onClick={() => handleSleepQualitySelect(level)}
                >
                  {level === 1
                    ? "😴"
                    : level === 2
                    ? "😌"
                    : level === 3
                    ? "😐"
                    : level === 4
                    ? "😊"
                    : "😁"}
                </Button>
              ))}
            </EmojiGroup>
          </div>

          <div>
            <ZoneLabel>Puls</ZoneLabel>
            <Input
              type="number"
              value={mentalHealthData.pulse ?? ""}
              onChange={(e) =>
                setMentalHealthData((prev) => ({
                  ...prev,
                  pulse: Number(e.target.value) || 0,
                }))
              }
              placeholder="Puls"
            />
          </div>

          {/* <div>
            <ZoneLabel>Datum</ZoneLabel>
            <Input
              type="date"
              value={mentalHealthData.date}
              onChange={(e) =>
                setMentalHealthData((prev) => ({
                  ...prev,
                  date: e.target.value,
                }))
              }
            />
          </div> */}

          <div>
            <ZoneLabel>Komentar (opciono)</ZoneLabel>
            <TextArea
              value={mentalHealthData.comment}
              onChange={(e) =>
                setMentalHealthData((prev) => ({
                  ...prev,
                  comment: e.target.value,
                }))
              }
            />
          </div>
        </ZoneGroup>

        <ButtonGroup>
          <Button variant="primary" type="submit">
            {edit ? "Ažuriraj" : "Sačuvaj"}
          </Button>
          <Button
            variant="secondary"
            type="button"
            onClick={() => {
              cancelEditing();
              dispatch(setView(Views.CALENDAR));
            }}
          >
            Otkaži
          </Button>
        </ButtonGroup>
      </Form>
    </FormWrapper>
  );
};

export default MentalHealthForm;
