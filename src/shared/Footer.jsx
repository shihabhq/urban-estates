import logo from "../assets/home/logo.png";

const Footer = () => {
  return (
    <footer className="footer bg-base-200 text-base-content text-base font-medium p-4 sm:p-10">
      <aside>
        <img className="mx-auto w-32" src={logo} alt="" />
        <p className="font-semibold text-sm">
          Urban EState Ltd.
          <br />
          Providing reliable tech since 1992
        </p>
      </aside>
      <nav>
        <h6 className="footer-title">Services</h6>
        <a className=" text-base hover:text-btncol cursor-pointer transition-all">
          Branding
        </a>
        <a className="text-base hover:text-btncol cursor-pointer transition-all">
          Design
        </a>
        <a className="text-base hover:text-btncol cursor-pointer transition-all">
          Marketing
        </a>
        <a className="text-base hover:text-btncol cursor-pointer transition-all">
          Advertisement
        </a>
      </nav>
      <nav>
        <h6 className="footer-title">Company</h6>
        <a className="text-base hover:text-btncol cursor-pointer transition-all">
          About us
        </a>
        <a className="text-base hover:text-btncol cursor-pointer transition-all">
          Contact
        </a>
        <a className="text-base hover:text-btncol cursor-pointer transition-all">
          Jobs
        </a>
        <a className="text-base hover:text-btncol cursor-pointer transition-all">
          Press kit
        </a>
      </nav>
      <div>
        <h6 className="footer-title">Newsletter</h6>
        <fieldset className="form-control">
          <label className="label">
            <span className="label-text">Enter your email address</span>
          </label>
          <div className="join">
            <input
              type="text"
              placeholder="username@site.com"
              className="input input-bordered join-item w-[80%]"
            />
            <button className="text-lg flex text-white items-center justify-center gap-3 font-poppins font-semibold bg-btncol hover:bg-btnhov px-2 rounded-l-none rounded-md transition-all duration-200">
              Subscribe
            </button>
          </div>
        </fieldset>
      </div>
    </footer>
  );
};

export default Footer;
