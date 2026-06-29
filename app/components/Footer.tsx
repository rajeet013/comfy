import Image from "next/image";
import Link from "next/link";
import { navLinks, socialIcons } from "../constants";

export default function Footer() {
  return (
    <footer className="bg-[#E7E2DD] pt-16 pb-8 px-4 md:px-8">
      <div className="text-center">
        <ul className="flex gap-x-6 gap-y-4 justify-center flex-wrap text-sm text-black">
          {navLinks.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className="hover:text-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-12">
          <h6 className="text-sm text-black">Stay connected with us:</h6>
          <ul className="flex justify-center flex-wrap gap-6 mt-8">
            {socialIcons.map((social) => (
              <li key={social.label}>
                <a
                  href="#"
                  className="flex items-center bg-[#333] w-8 h-8 p-2 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                  aria-label={social.label}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-full fill-slate-50"
                    viewBox={social.viewBox}
                    aria-hidden="true"
                  >
                    <path d={social.path} />
                  </svg>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <hr className="mb-8 mt-12" />
        <div className="flex items-center justify-center">
          <Image src="./logo.svg" alt="logo" width={200} height={200} />
        </div>
      </div>
    </footer>
  );
}
