import Carousel from "react-bootstrap/Carousel";
import styled from "styled-components";

const IMG = styled.img`
  max-height: 500px;
  min-height: 500px;
  @media (max-width: 500px) {
    max-height: 250px; 
    min-height: 250px; 
  }
  @media (max-width: 800px) {
    max-height: 350px; 
    min-height: 350px; 
  }
`;
function CarrousellAkim(props) {
  const datas = props.services;
  return (
    <Carousel className="border border-dark w-100 shadow">
      {datas &&
        datas.map((data) => (
          <Carousel.Item className="shadow" interval={1000}>
            <IMG
              className="d-block w-100 h-50 h-sm-25"
              src={data.image}
              alt="First slide"
            />
            <Carousel.Caption>
              <h3>{data.nom}</h3>
              <p>{data.description}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
    </Carousel>
  );
}

export { CarrousellAkim };
