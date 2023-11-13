import Card from 'react-bootstrap/Card';
import styled from 'styled-components';
import { Etoiles } from '../../Admin';

const CustomCard = styled(Card)`
    margin: 10px;
    
`

const CardTemoignages = (props) => {
    const width = props.width
    const data = props.data
    return (
        <CustomCard  style={{ width:  width+'px', textAlign:'center',height:200,margin:'20px' }}>
            <CustomCard.Body height={'100px'}>
                <CustomCard.Title><Etoiles note={data.note} /></CustomCard.Title>
                <CustomCard.Text>{ data.commentaire }</CustomCard.Text>
                <CustomCard.Text>{ data.nom }</CustomCard.Text>
            </CustomCard.Body>
        </CustomCard>
    );
    
}
export { CardTemoignages };