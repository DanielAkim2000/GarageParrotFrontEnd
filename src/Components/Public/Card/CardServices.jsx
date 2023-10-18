import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import styled from 'styled-components';

const CustomCard = styled(Card)`
    margin: 10px;
    
`

const CardServices = (props) => {
    const width = props.width
    const data = props.data
    return (
        <CustomCard  style={{ width:  width+'px', textAlign:'center' }}>
            <CustomCard.Img height={'170px'} variant="top" src={data.image} />
            <CustomCard.Body height={'100px'}>
                <CustomCard.Title>{ data.nom }</CustomCard.Title>
                <Button>Découvrir</Button>
            </CustomCard.Body>
        </CustomCard>
  );
}

export { CardServices };