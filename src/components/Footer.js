import '../Styles/Footer.css';

const Footer = () => (
  <footer className="footer">
    <p className="author">
      ©️ Shinn Thant Swam Ye
      {' '}
      <a href="https://github.com/Pi1998" target="_blank" className="link" rel="noreferrer">@Pi1998</a>
    </p>
    <p className="designCredit">
      Data provided by Marvel.
      {' '}
      <a href="http://marvel.com" target="_blank" className="link" rel="noreferrer">© 2014 Marvel</a>
      <br />
      Marvel Folio design inspired by
      {' '}
      <a href="https://www.behance.net/sakwadesignstudio" target="_blank" className="link" rel="noreferrer">Nelson Sakwa</a>
    </p>
  </footer>
);

export default Footer;
