import "./footer.scss"

type FooterProps = {
  text: string;
};

export function Footer({ text }: FooterProps) {
  return (
    <footer className="footer-container">
      <p>{text}</p>
    </footer>
  );
}
