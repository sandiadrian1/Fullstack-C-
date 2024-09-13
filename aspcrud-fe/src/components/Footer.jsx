const Footer = () => {
  return (
    <footer className="bg-gray-100 p-8">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-4 md:mb-0">
            <h2 className="text-xl font-bold">PARKING PUB CORE</h2>
            <p>lets use my site to run parking properly and correctly</p>
          </div>
          <div className="mb-4 md:mb-0">
            <h3 className="text-lg font-bold">Products</h3>
            <ul>
              <li>ASP.NET CORE WEB API</li>
              <li>React</li>
              <li>VITE</li>
              <li>SQL SERVER</li>
            </ul>
          </div>
          <div className="mb-4 md:mb-0">
            <h3 className="text-lg font-bold">Useful Links</h3>
            <ul>
              <li>Type Transportation</li>
              <li>Parkir Fitur</li>
              <li>CRUD</li>
              <li>LOGIN</li>
            </ul>
          </div>
          <div className="mb-4 md:mb-0">
            <h3 className="text-lg font-bold">Contact</h3>
            <ul>
              <li><i className="fa fa-home"></i> Indonesian, P 50018, +62</li>
              <li><i className="fa fa-envelope"></i>sandiadrian1</li>
              <li><i className="fa fa-phone"></i> +62 896 - 9999 - 2708</li>
              <li><i className="fa fa-print"></i> @pub PASIM</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;