import Card from "react-bootstrap/Card";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";
import { ModalContact } from "../ModalContact/ModalContact";

const CustomCard = styled(Card)`
  margin: 20px;
`;

const Carte = (props) => {
  // (donnees et etats)
  const width = props.width;
  const data = props.data;
  const navigate = useNavigate();
  const goDetails = () => {
    navigate("/VoituresDetails", { state: { voiture: data } });
  };

  return (
    <CustomCard style={{ width: width + "px", textAlign: "center" }}>
      <CustomCard.Img height={"170px"} variant="top" src={data.image} />
      <CustomCard.Body className="m-0 shadow" height={"100px"}>
        <CustomCard.Title>{data.marque + " " + data.modele}</CustomCard.Title>
        <CustomCard.Text>
          <p className="m-0">Année de mise en circulation:</p>
          {data.annee_mise_en_circulation}
        </CustomCard.Text>
        <CustomCard.Text>{data.kilometrage}Km</CustomCard.Text>
        <CustomCard.Text className="border border-primary m-1 p-0">
          Prix:{data.prix}€
        </CustomCard.Text>
      </CustomCard.Body>
      <Card.Body
        className="d-flex flex-row justify-content-center shadow align-items-center m-0 p-0"
        style={{}}
      >
        <Button
          onClick={() => {
            goDetails();
          }}
          className="m-1"
        >
          Details
        </Button>
        <ModalContact data={data} />
      </Card.Body>
    </CustomCard>
  );
};
export { Carte };
