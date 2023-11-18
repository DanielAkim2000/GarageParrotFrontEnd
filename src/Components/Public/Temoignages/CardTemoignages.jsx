import Card from "react-bootstrap/Card";
import styled from "styled-components";
import { Etoiles } from "../../Admin";

const CustomCard = styled(Card)`
  margin: 10px;
`;

const CardTemoignages = (props) => {
  const width = props.width;
  const data = props.data;
  return (
    <CustomCard
      style={{
        width: width + "px",
        textAlign: "center",
        height: 250,
        margin: "20px",
        overflow: "hidden",
      }}
    >
      <CustomCard.Body height={"200px"}>
        <CustomCard.Title>
          <Etoiles note={data.note} />
        </CustomCard.Title>
        <CustomCard.Text className="text-center text-justify ">{data.commentaire}</CustomCard.Text>
        <CustomCard.Text>{data.nom}</CustomCard.Text>
      </CustomCard.Body>
    </CustomCard>
  );
};
export { CardTemoignages };
