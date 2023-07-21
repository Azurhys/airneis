import React from 'react';
import { Link } from 'react-router-dom';

const Page404 = () => {
  return (
      <div className="text-center">
        <h1>Page non trouvée</h1>
        <iframe src="https://giphy.com/embed/14uQ3cOFteDaU" width="480" height="360"></iframe>
        <p>La page que vous recherchez n'existe pas.</p>
        <Link to="/">Retourner à l'accueil</Link>
      </div>
  );
};

export default Page404;
