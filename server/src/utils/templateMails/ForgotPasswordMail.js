const forgotPasswordTemplate = (firstName, token) => {
  return `
    <p>Salut! ${firstName} Pentru resetarea parolei apasa pe acest buton</p>
    <div>
        <a href="http://localhost:3000/auth/reset-password?token=${token}">Reseteaza parola</a>
    </div>
    <p>Password reset token: ${token}</p>
`;
};

export default forgotPasswordTemplate;
