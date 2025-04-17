import Image from 'next/image';
import Link from "next/link"; // Import the Link component

const Navbar: React.FC = () => {
  return (
    <nav className="navbar is-light" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <Image src="/images/general/logo.png" alt="Logo" width={100} height={28} className="navbar-item" />
        <span className="navbar-item has-text-weight-bold">Handcrafted Heaven</span>
      </div>

      <div className="navbar-menu">
        <div className="navbar-start">
          {[
            { name: "Home", href: "/" },
            { name: "Products", href: "/products" },
            { name: "Sellers", href: "/sellers" },
            { name: "Create Product", href: "/products/create" }
          ].map((link, index) => (
            <Link key={index} href={link.href} className="navbar-item">
              {link.name}
            </Link>
          ))}
        </div>
        <div className="navbar-end"></div>
      </div>
    </nav>
  );
};

export default Navbar;
