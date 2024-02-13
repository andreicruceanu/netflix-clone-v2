const forgotPasswordTemplate = (firstName, token) => {
  return `
    <p>Salut! ${firstName} Pentru resetarea parolei apasa pe acest buton</p>
    <div>
        <a href="http://localhost:5600/resetPassword.html?data=${token}">Reseteaza parola</a>
    </div>
    <p>Password reset token: ${token}</p>
`;
};

export default forgotPasswordTemplate;
