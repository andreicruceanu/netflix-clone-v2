const forgotPasswordTemplate = (firstName, token) => {
  return `
    <p>Salut , ${firstName}! </p>
    <p> Pentru resetarea parolei apasa pe acest buton</p>
     <br />
     <p>Pentru resetarea parolei în contul din aplicația Managed Admin, te rugăm să apeși linkul de mai jos generat automat de  ManagedAdmin pentru tine. </p>
    <div>
        <a  href="http://localhost:3000/auth/reset-password?token=${token}">Reseteaza parola</a>
    </div>
    <br />
    <p>Dacă nu ai solicitat tu acest link, poți ignora mesajul.</p>
    <br />
    <p>Numai bine,</p>
    <p>Numai bine, Echipa MANAGED ADMIN</p>
`;
};

export default forgotPasswordTemplate;
