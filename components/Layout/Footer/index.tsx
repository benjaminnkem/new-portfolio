import { FaFacebook } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import Link from "next/link";
import { higuen } from "@/lib/utils/fonts";

const socials: { link: string; icon: JSX.Element }[] = [
  {
    link: "https://www.github.com/",
    icon: <FaGithub className="text-black-main" size={20} />,
  },
  {
    link: "https://www.facebook.com/",
    icon: <FaFacebook className="text-black-main" size={20} />,
  },
  {
    link: "https://www.instagram.com/",
    icon: <AiFillInstagram className="text-black-main" size={20} />,
  },
  {
    link: "https://www.twitter.com/",
    icon: <FaSquareXTwitter className="text-black-main" size={20} />,
  },
  {
    link: "https://www.linkedin.com/",
    icon: <FaLinkedin className="text-black-main" size={20} />,
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

      <div className="h-[5rem] flex items-center bg-green text-black-main">
        <div className="flex items-center justify-between container">
          <div className="flex items-center gap-3">
            <div className="size-9 rounded-full m-over bg-black-main text-green flex items-center justify-center font-semibold">
              <p>BN.</p>
            </div>

            <div className="text-sm">
              <p className={higuen.className}>Benjamin Nkem</p>
              <p className="text-xs">benjaminnkemfrancis@gmail.com</p>
            </div>
          </div>

          <ul className="flex items-center gap-3">
            {socials.map(({ icon, link }, index) => (
              <li key={index}>
                <Link
                  href={link}
                  target="_blank"
                  rel="noreferrer"
                  className="text-green"
                >
                  <div>{icon}</div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
