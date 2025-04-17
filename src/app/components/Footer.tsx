import Image from 'next/image';
const Footer: React.FC = () => {
    return (
      <footer className="footer has-background-dark has-text-white">
        <div className="content has-text-centered">
          <div className="columns is-centered">
            <div className="column is-4">
              <Image src="/images/general/logo.png" alt="Logo" width={100} height={28} className="mb-4" />
              <p className="has-text-grey-light">123 Main Street, City, State</p>
            </div>
            <div className="column is-4">
              <h3 className="title is-5 has-text-white">Contact us</h3>
              <dl>
                <dt><a href="tel:+12849302938" className="has-text-grey-light">Call Us: +1 675-837-974</a></dt>
                <dt><a href="mailto:doesnot@exist.com" className="has-text-grey-light">Email Us: doesnot@exist.com</a></dt>
              </dl>
            </div>
            <div className="column is-4">
              <h3 className="title is-5 has-text-white">Navigate</h3>
              <dl>
                <dt><a href="#" className="has-text-grey-light">Home</a></dt>
                <dt><a href="#" className="has-text-grey-light">Account</a></dt>
              </dl>
            </div>
          </div>
          <p className="has-text-grey-light">
            © 2024 HandCrafted. All rights reserved. | <a href="#" className="has-text-grey-light">Privacy Policy</a> | <a href="#" className="has-text-grey-light">Terms of Service</a>
          </p>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  