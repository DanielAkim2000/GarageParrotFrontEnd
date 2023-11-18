import Card from "react-bootstrap/Card";
import styled from "styled-components";

const CustomCard = styled(Card)`
  margin: 20px;
`;

const CarteInfo = (props) => {
  // (donnees et etats)
  const data = props.data;
  return (
    <CustomCard style={{ width: "100%", textAlign: "center" }}>
      <CustomCard.Img
        className="w-sm-50 h-sm-50"
        height={"170px"}
        variant="top"
        src={data.image}
      />
      <CustomCard.Body className="border-light shadow" height={"100px"}>
        <CustomCard.Title>{data.marque + " " + data.modele}</CustomCard.Title>
        <CustomCard.Text>
          <p className="m-1">Année de mise en circulation:</p>
          {data.annee_mise_en_circulation}
        </CustomCard.Text>
        <CustomCard.Text>{data.kilometrage}Km</CustomCard.Text>
        <CustomCard.Text className="border border-primary">
          Prix:{data.prix}€
        </CustomCard.Text>
      </CustomCard.Body>
    </CustomCard>
  );
};
export { CarteInfo };
