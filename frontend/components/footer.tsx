import { Linkedin, Mail } from 'lucide-react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="border-t py-4 md:px-4 flex flex-row justify-between items-center">
      <p className="font-semibold">Yuriy Haravetskyy, 2025</p>

      <div className="flex flex-row gap-2 items-center">
        <Link href="https://www.linkedin.com/in/yuriy-haravetskyy">
          <Linkedin />
        </Link>

        <Link href="mailto:yuriyharavetskyy@gmail.com">
          <Mail />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
