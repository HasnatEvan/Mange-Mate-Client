import logo from '../../src/assets/logo/logo.png';
import { FaBehance, FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-white text-gray-700 py-5 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        {/* TOP SECTION */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">

          {/* LOGO + TEXT */}
          <div className="flex flex-col">
            <img src={logo} alt="Logo" className="w-40 mb-6" />
            <p className="text-sm leading-relaxed text-gray-600">
              7X Theme is a modern template for interior and architecture purposes.  
              Thanks to your passion, we keep designing the best.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-4 mt-6">
              {[FaBehance, FaFacebookF, FaTwitter, FaInstagram].map((Icon, idx) => (
                <div
                  key={idx}
                  className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition"
                >
                  <Icon className="text-black" />
                </div>
              ))}
            </div>
          </div>

          {/* Recent Posts (shifted slightly right) */}
          <div className="flex flex-col md:pl-6 lg:pl-12">
            <h2 className="font-semibold text-lg text-black mb-6">Recent Posts</h2>
            {[ 
              { date: "15 OCT 2019", title: "On these beams, we’re.", comments: 28 },
              { date: "17 OCT 2019", title: "We’ll be a sensation for", comments: 29 },
              { date: "18 OCT 2019", title: "We’ll be a sensation for", comments: 29 },
            ].map((post, idx) => (
              <div key={idx} className="mb-6">
                <p className="text-2xl font-bold text-black">{post.date.split(' ')[0]}</p>
                <p className="text-xs mb-1">{post.date}</p>
                <p className="font-medium">{post.title}</p>
                <p className="text-sm text-gray-500">By Admin • {post.comments}</p>
              </div>
            ))}
          </div>

          {/* Useful Links + Newsletter (shifted right) */}
          <div className="flex flex-col justify-between md:pl-6 lg:pl-12">
            <div>
              <h2 className="font-semibold text-lg text-black mb-6">Useful Links</h2>
              <ul className="space-y-3">
                {["About", "Services", "Projects", "Blog", "Contact Us"].map((link, idx) => (
                  <li key={idx} className="hover:text-black cursor-pointer transition">
                    {link}
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter Section */}
            <div className="mt-10 sm:mt-6 p-4 sm:p-6 rounded-xl flex flex-col sm:flex-row sm:items-center sm:justify-center gap-4 w-full">
              <input 
                type="email" 
                placeholder="ENTER YOUR EMAIL" 
                className="flex-1 bg-white px-4 py-3 outline-none text-sm text-black rounded-md shadow-sm w-full sm:w-auto"
              />
              <button className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-800 transition w-full sm:w-auto">
                Subscribe
              </button>
            </div>
          </div>

          {/* Contact Us (kept right aligned as before) */}
          <div className="flex flex-col md:pl-8 lg:pl-16 xl:pl-24">
            <h2 className="font-semibold text-lg text-black mb-6">Contact Us</h2>
            <p className="text-sm mb-2">756 Livingston Street, Brooklyn, NY</p>
            <p className="text-sm mb-4">11201, United States</p>
            <p className="text-sm mb-4">7xthemedemo@gmail.com</p>
            <p className="text-sm mb-2">(+298) 012–3456–789</p>
            <p className="text-sm mb-2">(+298) 146–6543–480</p>
          </div>
        </div>

        {/* Copyright */}
        <p className="text-center text-sm text-gray-500 py-5 mt-5">
          © 2019 Your Company. Designed by 7X Theme.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
