import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import styled from "styled-components";

const CustomCard = styled(Card)`
  margin: 10px;
`;

const CardServices = (props) => {
  const width = props.width;
  const data = props.data;
  return (
    <CustomCard
      style={{
        maxWidth: width + "px",
        minWidth: width + "px",
        width: width + "px",
        textAlign: "center",
        margin: "20px",
      }}
    >
      <CustomCard.Img height={"170px"} variant="top" src={data.image} />
      <CustomCard.Body className="shadow" style={{ height: "150px" }}>
        <CustomCard.Title style={{ height: "50px" }}>
          {data.nom}
        </CustomCard.Title>
        <Button style={{ height: "50px" }}>Découvrir</Button>
      </CustomCard.Body>
    </CustomCard>
  );
};

export { CardServices };
