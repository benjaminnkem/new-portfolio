import { FaGithub } from "react-icons/fa";
import { HiOutlineDownload, HiOutlineMail } from "react-icons/hi";
import Link from "next/link";
import { higuen } from "@/lib/utils/fonts";
import React from "react";
import {
  RESUME_FILENAME,
  RESUME_PATH,
  SOCIAL_LINKS,
} from "@/lib/data/experience";

const socials: { link: string; icon: React.ReactNode; label: string }[] = [
  {
    link: SOCIAL_LINKS.github,
    icon: <FaGithub className="text-black-main" size={20} />,
    label: "GitHub",
  },
  {
    link: SOCIAL_LINKS.email,
    icon: <HiOutlineMail className="text-black-main" size={20} />,
    label: "Email",
  },
];

const Footer = () => {
  return (
    <footer>
      {/* <svg
        id="visual"
        viewBox="0 0 1920 300"
        width="1920"
        height="300"
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
      >
        <path
          d="M0 201L320 201L320 240L640 240L640 197L960 197L960 167L1280 167L1280 207L1600 207L1600 170L1920 170L1920 156L1920 301L1920 301L1600 301L1600 301L1280 301L1280 301L960 301L960 301L640 301L640 301L320 301L320 301L0 301Z"
          fill="#90ff03"
          stroke-linecap="square"
          stroke-linejoin="miter"
        ></path>
      </svg> */}

      <div className="min-h-[5rem] py-4 flex items-center bg-green text-black-main">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 container">
          <div className="flex items-center gap-3">
            <div className="size-9 rounded-full m-over bg-black-main text-green flex items-center justify-center font-semibold shrink-0">
              <p>BN.</p>
            </div>

            <div className="text-sm">
              <p className={higuen.className}>Benjamin Nkem (Tochison)</p>
              <p className="text-xs">benjaminnkemfrancis@gmail.com</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={RESUME_PATH}
              download={RESUME_FILENAME}
              className="m-over inline-flex items-center gap-1.5 text-sm font-semibold underline-offset-4 hover:underline"
            >
              <HiOutlineDownload size={16} />
              Resume
            </a>

            <ul className="flex items-center gap-3">
              {socials.map(({ icon, link, label }) => (
                <li key={label}>
                  <Link
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="text-green"
                  >
                    <div>{icon}</div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
