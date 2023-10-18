import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import styled from 'styled-components';

const CustomCard = styled(Card)`
    margin: 10px;
    
`

export default function CardTemoignages(props){
    const width = props.width
    const data = props.data
    return (
        <CustomCard  style={{ width:  width+'px', textAlign:'center',height:200 }}>
            <CustomCard.Body height={'100px'}>
                <CustomCard.Title>{ data.note }</CustomCard.Title>
                <CustomCard.Text>{ data.commentaire }</CustomCard.Text>
                <CustomCard.Text>{ data.nom }</CustomCard.Text>
            </CustomCard.Body>
        </CustomCard>
    );
    
}