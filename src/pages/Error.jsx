import React from "react";

const Error = () => {
  return (
    <div className="err">
      <h1>ERREUR 404</h1>
      <p className="error">La page que vous recherchez est introuvable.</p>
      <p>Pour retourner à l'accueil : </p>
      <a href="/">ACCUEIL</a>
    </div>
  );
};

export default Error;
