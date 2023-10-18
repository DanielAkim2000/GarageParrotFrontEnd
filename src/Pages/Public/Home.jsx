import { ScrollBar } from '../../Components';

export function Home(props){
    // (états/données)
    let services = [...props.services];
    let voitures = [...props.voitures];
    let temoignages = [...props.temoignages];

    return (
            <>
                <ScrollBar element='image' auto={true} centerMode={false} data={services.reverse().slice(0,2)}/>
                    <div className='d-flex flex-column justify-content-center container-fluid'>
                        <button className='btn btn-primary m-3'>Acheter une voiture</button>
                        <button className='btn btn-primary m-3'>Vendre votre voiture</button>
                    </div>
                    <div className='text-center'>
                        <p>Title</p>
                        <p>Phrase reference</p>
                        <ScrollBar element='card' auto={true} centerMode={true} data={voitures.reverse().slice(0,10)} />
                    </div>
                    <div style={{textAlign:'center'}} >
                        <h2>Les avis de nos client</h2>
                        <ScrollBar element='cardTemoignages' auto={false} centerMode={true} data={temoignages.reverse().slice(0,10)} />
                        <button>Voir tous les avis</button>
                        <button>Laisser votre avis</button>
                    </div>
                    <div style={{textAlign:'center'}} >
                        <h2>Nos different Services</h2>
                        <ScrollBar element='cardServices' auto={false} centerMode={true} data={services.slice(0,3)} />
                        <button><a  href="/Services">Voir tous les services</a></button>
                    </div>
                    <div className='text-center'>
                        Presentation
                    </div>
            </>
    )
  }