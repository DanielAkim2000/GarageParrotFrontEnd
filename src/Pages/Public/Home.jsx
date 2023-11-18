import { useNavigate } from "react-router-dom";
import {
  CardServices,
  CardTemoignages,
  CarrousellAkim,
  Carte,
  ModalAfficheAvis,
  ModalsAvis,
} from "../../Components/Public";
import "./style.css";
import Button from "react-bootstrap/esm/Button";

export function Home(props) {
  // (états/données)
  let services = [...props.services];
  let voitures = [...props.voitures];
  let temoignages = [...props.temoignages];
  const navigate = useNavigate();
  const goservices = () => {
    navigate("/Services");
  };
  return (
    <div className="bg-light w-100 ">
      <div className="w-100 h-50  d-flex flex-column justify-content-center m-auto align-items-center font-weight-bold">
        <h5 className="m-3  text-justify w-75 text-center">Moderne et parfaitement équipé, le Garage V.Parrot assure le diagnostic et la réparation toutes marques de vos véhicules.Nous proposons une gamme complète de services de garage aux propriétaires de véhicules. 
Le Garage V.Parrot vous propose une large gamme de services automobiles.</h5>
        <p className="m-3 text-uppercase text-center">Tous nos services sont délivrés par des mécaniciens hautement qualifiés.</p>
      </div>
      <div className="w-100 h-50 d-flex flex-row justify-content-center align-items-stretch bg-light">
        <div
          className=" container-fluid d-flex flex-column justify-content-around align-items-stretch"
          style={{ maxWidth: "1000px" }}
        >
          <CarrousellAkim services={services} />
          <p className="text-justify align-self-center w-50 text-center m-4">Nous intervenons sur tous types de travaux.De l’entretien classique à la mécanique lourde, comme le remplacement ou la réfection de votre moteur.</p>
        </div>
      </div>
      <div className="d-flex flex-column justify-content-center container-fluid align-items-center">
        <p className="text-justify align-self-center w-50 text-center">Financez et achetez au meilleur prix votre voiture d’occasion. Nous remboursons la différence si vous trouvez moins cher ailleurs.</p>
      </div>
      <div className="text-center justify-content-center align-items-center w-100">
        <div className="d-flex flex-row flex-wrap justify-content-center align-items-center">
          {voitures ? (
            voitures
              .reverse()
              .slice(0, 4)
              .map((voiture) => (
                <Carte key={voiture.id} data={voiture} width={250} />
              ))
          ) : (
            <>Error</>
          )}
        </div>
      </div>
      <div className="w-100" style={{ textAlign: "center" }}>
        <h2 className="mt-3">Les avis de nos client</h2>
        <p className="text-justify align-self-center text-center mt-4">Votre avis compte à nos yeux</p>
        <div className="d-flex flex-row flex-wrap justify-content-center align-items-center">
          {temoignages ? (
            temoignages
              .reverse()
              .slice(0, 5)
              .map((temoignage) => (
                <CardTemoignages
                  key={temoignage.id}
                  data={temoignage}
                  width={200}
                />
              ))
          ) : (
            <>Error</>
          )}
        </div>
        <ModalAfficheAvis data={temoignages} />
        <ModalsAvis />
      </div>
      <div className="w-100" style={{ textAlign: "center" }}>
        <h2 className="mt-3">Nos different services</h2>
        <p className="text-justify m-auto text-center w-75 mt-4">Chez Garage Vincent Parrot, nous sommes fiers de vous offrir bien plus qu'un simple entretien automobile. Forts de notre expertise, de notre dévouement et de notre engagement envers l'excellence, nous sommes votre partenaire de confiance pour tout ce qui concerne votre véhicule. Que ce soit pour des réparations minutieuses, des entretiens préventifs, des diagnostics pointus ou des conseils personnalisés, notre équipe hautement qualifiée met tout en œuvre pour garantir la performance optimale, la sécurité et la durabilité de votre voiture. Confiez-nous votre véhicule, et découvrez une expérience de service exceptionnelle où la passion pour l'automobile se conjugue avec un savoir-faire inégalé</p>
        <div className="d-flex flex-row flex-wrap justify-content-center align-items-center">
          {services ? (
            services
              .reverse()
              .slice(0, 10)
              .map((service) => (
                <CardServices key={service.id} data={service} width={200} />
              ))
          ) : (
            <>Error</>
          )}
        </div>
        <Button onClick={goservices}>Voir tous les services</Button>
      </div>
    </div>
  );
}
