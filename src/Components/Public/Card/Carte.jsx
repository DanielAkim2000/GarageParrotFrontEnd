import Card from 'react-bootstrap/Card';
import styled from 'styled-components';
import { Link } from 'react-router-dom';


const CustomCard = styled(Card)`
    margin: 10px
    
`

const Carte = (props) => {
    // (donnees et etats)
    const width = props.width
    const data = props.data

    return (
        <CustomCard  style={{ width:  width+'px', textAlign:'center' }}>
            <CustomCard.Img height={'170px'} variant="top" src={data.image} />
            <CustomCard.Body height={'100px'}>
                <CustomCard.Title>{ data.marque+' '+data.modele }</CustomCard.Title>
                <CustomCard.Text>{data.annee_mise_en_cirulation}</CustomCard.Text>
                <CustomCard.Text>{data.kilometrage}</CustomCard.Text>
                <CustomCard.Text>{data.prix}</CustomCard.Text>
            </CustomCard.Body>
            <Card.Body style={{ margin: 'auto'}}>
                <Card.Link href="#">Détails</Card.Link>
                <Link to="/NousContacter/" state={data.id} data={data}>contact</Link>
            </Card.Body>
        </CustomCard>
  );
}
export { Carte };