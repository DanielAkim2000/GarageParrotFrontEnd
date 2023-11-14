import React from "react";

const Etoiles = ({ note }) => {
  // Fonction pour générer les étoiles colorées
  const generateStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      // Vérifiez si l'indice est inférieur ou égal à la note, puis ajoutez une étoile jaune
      const starClass = i <= note ? "star yellow" : "star gray";
      stars.push(
        <span key={i} className={starClass}>
          &#9733;
        </span>
      );
    }
    return stars;
  };

  return <div className="star-rating center">{generateStars()}</div>;
};

export { Etoiles };
