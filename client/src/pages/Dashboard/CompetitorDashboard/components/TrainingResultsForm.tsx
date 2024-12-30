import React, { useState } from "react";
import { FaClock, FaHeartbeat, FaRunning, FaChartLine } from "react-icons/fa";
import {
  FormWrapper,
  Heading,
  Form,
  InputGroup,
  Icon,
  Input,
  TextArea,
  ButtonGroup,
  Button,
  ErrorMessage,
  ZoneGroup,
  ZoneLabel,
  DescriptionText, // Za opise
} from "./TrainingResultsForm.styles";
import { TrainingResultsFormData } from "../../../../types/types";

interface TrainingResultsFormProps {
  onSubmit: (data: TrainingResultsFormData) => void;
  onBack: () => void;
}

const TrainingResultsForm: React.FC<TrainingResultsFormProps> = ({
  onSubmit,
  onBack,
}) => {
  const [results, setResults] = useState<TrainingResultsFormData>({
    HRodmor: 0, // Initialize with numbers
    trajanje: 0,
    razdaljina: 0,
    RPE: 0,
    HRprosek: 0,
    HRmax: 0,
    komentar: "",
    vremePoZonama: [0, 0, 0, 0, 0],
    zona1: 0,
    zona2: 0,
    zona3: 0,
    zona4: 0,
    zona5: 0,
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof TrainingResultsFormData, string>>
  >({});

  const validateForm = () => {
    const newErrors: Partial<Record<keyof TrainingResultsFormData, string>> =
      {};

    // Puls u mirovanju (HRodmor)
    if (!results.HRodmor || isNaN(results.HRodmor)) {
      newErrors.HRodmor = "Puls u mirovanju je obavezan";
    } else if (results.HRodmor < 30 || results.HRodmor > 200) {
      newErrors.HRodmor = "Unesite validan puls (30-200)";
    }

    // Trajanje (duration)
    if (!results.trajanje || isNaN(results.trajanje)) {
      newErrors.trajanje = "Trajanje je obavezno";
    }

    // Razdaljina (distance)
    if (!results.razdaljina || isNaN(results.razdaljina)) {
      newErrors.razdaljina = "Razdaljina je obavezna";
    }

    // RPE (Effort)
    if (!results.RPE || isNaN(results.RPE)) {
      newErrors.RPE = "RPE je obavezan";
    } else if (results.RPE < 1 || results.RPE > 10) {
      newErrors.RPE = "RPE mora biti između 1 i 10";
    }

    // Prosečan puls (HRavg)
    if (!results.HRprosek || isNaN(results.HRprosek)) {
      newErrors.HRprosek = "Prosečan puls je obavezan";
    } else if (results.HRprosek < 30 || results.HRprosek > 220) {
      newErrors.HRprosek = "Unesite validan puls (30-220)";
    }

    // Maksimalan puls (HRmax)
    if (!results.HRmax || isNaN(results.HRmax)) {
      newErrors.HRmax = "Maksimalan puls je obavezan";
    } else if (results.HRmax < 30 || results.HRmax > 220) {
      newErrors.HRmax = "Unesite validan puls (30-220)";
    }

    // Time in zones
    const totalZoneTime = results.vremePoZonama.reduce(
      (sum, time) => sum + (time || 0),
      0
    );
    if (totalZoneTime === 0) {
      newErrors.vremePoZonama = "Unesite vreme provedeno u zonama";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle Submit - Map only if valid
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const mappedResults = {
        HRrest: results.HRodmor ? Number(results.HRodmor) : undefined,
        duration: results.trajanje ? Number(results.trajanje) : undefined,
        distance: results.razdaljina ? Number(results.razdaljina) : undefined,
        HRavg: results.HRprosek ? Number(results.HRprosek) : undefined,
        HRmax: results.HRmax ? Number(results.HRmax) : undefined,
        RPE: results.RPE ? Number(results.RPE) : undefined,
        timeInZones: results.vremePoZonama.map((zone) =>
          zone ? Number(zone) : 0
        ),
        comments: results.komentar || "",
      };

      console.log("Mapped Results (Sent to Backend):", mappedResults);
      onSubmit(mappedResults as unknown as TrainingResultsFormData);
    }
  };

  const handleInputChange =
    (field: keyof TrainingResultsFormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = e.target.value;
      setResults((prev) => ({
        ...prev,
        [field]:
          e.target.type === "number" ? (value ? Number(value) : "") : value,
      }));
    };

  const handleZoneTimeChange =
    (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const newZoneTimes = [...results.vremePoZonama];
      newZoneTimes[index] = e.target.value === "" ? 0 : Number(e.target.value); // Convert string to number
      setResults((prev) => ({
        ...prev,
        vremePoZonama: newZoneTimes,
      }));
    };

  return (
    <FormWrapper>
      <Heading>Rezultati Treninga</Heading>
      <Form onSubmit={handleSubmit}>
        {/* HRodmor (Puls u mirovanju) */}
        <InputGroup>
          <Icon>
            <FaHeartbeat />
          </Icon>
          <Input
            type="number"
            placeholder="Puls u mirovanju (bpm)"
            value={results.HRodmor}
            onChange={handleInputChange("HRodmor")}
          />
        </InputGroup>
        {errors.HRodmor && <ErrorMessage>{errors.HRodmor}</ErrorMessage>}
        <DescriptionText>
          Puls u mirovanju, izmerite ga dok ste u mirovanju.
        </DescriptionText>

        {/* Trajanje */}
        <InputGroup>
          <Icon>
            <FaClock />
          </Icon>
          <Input
            type="text"
            placeholder="Trajanje (minuti)"
            value={results.trajanje}
            onChange={handleInputChange("trajanje")}
          />
        </InputGroup>
        {errors.trajanje && <ErrorMessage>{errors.trajanje}</ErrorMessage>}
        <DescriptionText>
          Ukupno vreme trajanja treninga u minutima.
        </DescriptionText>

        {/* Razdaljina */}
        <InputGroup>
          <Icon>
            <FaRunning />
          </Icon>
          <Input
            type="number"
            placeholder="Razdaljina (km)"
            value={results.razdaljina}
            onChange={handleInputChange("razdaljina")}
          />
        </InputGroup>
        {errors.razdaljina && <ErrorMessage>{errors.razdaljina}</ErrorMessage>}
        <DescriptionText>
          Pređena razdaljina tokom treninga u kilometrima.
        </DescriptionText>

        {/* RPE */}
        <InputGroup>
          <Icon>
            <FaChartLine />
          </Icon>
          <Input
            type="number"
            placeholder="RPE (1-10)"
            value={results.RPE}
            onChange={handleInputChange("RPE")}
            min="1"
            max="10"
          />
        </InputGroup>
        {errors.RPE && <ErrorMessage>{errors.RPE}</ErrorMessage>}
        <DescriptionText>
          RPE (Rating of Perceived Effort) između 1 i 10, kako ste se osećali
          tokom treninga.
        </DescriptionText>

        {/* HRprosek */}
        <InputGroup>
          <Icon>
            <FaHeartbeat />
          </Icon>
          <Input
            type="number"
            placeholder="Prosečan puls (bpm)"
            value={results.HRprosek}
            onChange={handleInputChange("HRprosek")}
          />
        </InputGroup>
        {errors.HRprosek && <ErrorMessage>{errors.HRprosek}</ErrorMessage>}
        <DescriptionText>Prosečan puls tokom treninga.</DescriptionText>

        {/* HRmax */}
        <InputGroup>
          <Icon>
            <FaHeartbeat />
          </Icon>
          <Input
            type="number"
            placeholder="Maksimalan puls (bpm)"
            value={results.HRmax}
            onChange={handleInputChange("HRmax")}
          />
        </InputGroup>
        {errors.HRmax && <ErrorMessage>{errors.HRmax}</ErrorMessage>}
        <DescriptionText>
          Maksimalni puls koji ste postigli tokom treninga.
        </DescriptionText>

        {/* Zona vremena */}
        <Heading>Vreme po zonama (minuti)</Heading>
        <DescriptionText>
          Unesite vreme provedeno u svakoj od 5 zona intenziteta (minuti).
        </DescriptionText>
        <ZoneGroup>
          {[1, 2, 3, 4, 5].map((zone, index) => (
            <div key={zone}>
              <ZoneLabel>Zona {zone}</ZoneLabel>
              <Input
                type="number"
                placeholder="Minuti"
                value={results.vremePoZonama[index]}
                onChange={handleZoneTimeChange(index)}
              />
              <DescriptionText>
                {zone === 1 && (
                  <>
                    <strong>Zona 1 (50-60% HRmax):</strong> <br />
                    <em>Svha:</em> Laka aktivnost, oporavak. <br />
                    <em>Opis:</em> Ovo je zona vrlo niskog intenziteta, koristi
                    se za zagrevanje i hlađenje. Najčešće se koristi za oporavak
                    i aerobnu kondiciju.
                  </>
                )}
                {zone === 2 && (
                  <>
                    <strong>Zona 2 (60-70% HRmax):</strong> <br />
                    <em>Svha:</em> Sagorevanje masti, izdržljivost. <br />
                    <em>Opis:</em> Umereni intenzitet, gde telo sagoreva
                    mešavinu masti i ugljenih hidrata. Tipično se koristi za
                    duge, stabilne endurance treninge.
                  </>
                )}
                {zone === 3 && (
                  <>
                    <strong>Zona 3 (70-80% HRmax):</strong> <br />
                    <em>Svha:</em> Aerobna, povećana izdržljivost. <br />
                    <em>Opis:</em> Ova zona je često smatrana "udobnom" zonom.
                    Pomaže u razvijanju kardiovaskularne izdržljivosti, a telo
                    koristi ugljene hidrate kao glavni izvor energije.
                  </>
                )}
                {zone === 4 && (
                  <>
                    <strong>Zona 4 (80-90% HRmax):</strong> <br />
                    <em>Svha:</em> Anaerobna, poboljšanje brzine i snage. <br />
                    <em>Opis:</em> Visok intenzitet, gde telo počinje da koristi
                    više glikogena nego masti. Trening u ovoj zoni poboljšava
                    VO2 max i prag mlečne kiseline.
                  </>
                )}
                {zone === 5 && (
                  <>
                    <strong>Zona 5 (90-100% HRmax):</strong> <br />
                    <em>Svha:</em> Maksimalni napor, sprintovi. <br />
                    <em>Opis:</em> Ovo je najviši intenzitet, obično se koristi
                    za kratke nalete kao što su sprintovi. Teško je održati ovu
                    zonu na duže staze i dizajnirana je da gura vaše telo do
                    svojih apsolutnih granica.
                  </>
                )}
              </DescriptionText>
            </div>
          ))}
        </ZoneGroup>
        {errors.vremePoZonama && (
          <ErrorMessage>{errors.vremePoZonama}</ErrorMessage>
        )}

        {/* Komentari */}
        <InputGroup>
          <TextArea
            placeholder="Dodatni komentari (opciono)"
            value={results.komentar}
            onChange={handleInputChange("komentar")}
          />
        </InputGroup>

        <ButtonGroup>
          <Button type="button" variant="secondary" onClick={onBack}>
            Nazad
          </Button>
          <Button type="submit" variant="primary">
            Završi Trening
          </Button>
        </ButtonGroup>
      </Form>
    </FormWrapper>
  );
};

export default TrainingResultsForm;
