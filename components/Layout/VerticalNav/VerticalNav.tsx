import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import styles from "./VerticalNav.module.css";

let isMobile: boolean;

const SUBSTACK_URL =
  "https://cybertheory.substack.com/?utm_campaign=pub&utm_medium=web";

const NAV_ITEMS = [
  { href: "/", label: "home", match: (path: string) => path === "/" },
  { href: "/read-the-book", label: "read the book", match: (path: string) => path.startsWith("/read-the-book") },
  { href: "/versions", label: "versions", match: (path: string) => path.startsWith("/versions") },
  { href: SUBSTACK_URL, label: "subscribe", external: true as const },
];

const VerticalNav = ({
  isMenuOpen,
  setMenuOpen,
}: {
  isMenuOpen: boolean;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  useEffect(() => {
    isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile && isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMenuOpen]);

  return (
    <div className={`${styles.container} ${isMenuOpen ? styles.open : ""}`}>
      <div className="flex flex-col gap-y-4">
        {NAV_ITEMS.map((item) => (
          <StyledLink
            key={item.href}
            setMenuOpen={setMenuOpen}
            href={item.href}
            active={"match" in item ? item.match : undefined}
            external={"external" in item}
          >
            {item.label}
          </StyledLink>
        ))}
      </div>
    </div>
  );
};

export default VerticalNav;

const StyledLink = ({
  children,
  href,
  setMenuOpen,
  active,
  external,
}: {
  children: string;
  href: string;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  active?: (path: string) => boolean;
  external?: boolean;
}) => {
  const router = useRouter();
  const isActive = active?.(router.pathname) ?? false;
  const className = `${isActive ? "verticalNavActive" : ""} verticalNavLink text-2xl w-fit`;
  const closeMenu = () => {
    if (!isMobile) return;
    setMenuOpen(false);
  };

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={closeMenu}
        className={className}
      >
        {children}
        <span />
      </a>
    );
  }

  return (
    <Link href={href} onClick={closeMenu} className={className}>
      {children}
      <span />
    </Link>
  );
};
