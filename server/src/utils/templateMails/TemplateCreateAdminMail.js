export const templateCreateAdminMail = (firstName, username, password) => {
  return `
      <p>Salut , ${firstName}! </p>
      <p>Contul tau a fost creat cu succes</p>
       <br />
       <p>Te rog sa accesezi aplicatia folosind link-ul de mai jos. Pentru autentificare foloseste credentialele de mai jos.</p>
       <p>Username: <b>${username}</b></p>
       <p>Password: <b>${password}</b></p>
      <div>
          <a  href="${process.env.APP_BASE_URL}">${process.env.APP_BASE_URL}</a>
      </div>
      <br />
      <p>Te rog sa schimbi parola dupa prima autentificare in aplicatie din setatile contului.</p>
      <br />
      <p>Numai bine,</p>
      <p>Echipa MANAGED ADMIN</p>
  `;
};
