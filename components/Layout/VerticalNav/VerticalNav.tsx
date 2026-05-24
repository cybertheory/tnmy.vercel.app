import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import styles from "./VerticalNav.module.css";

let isMobile: boolean;

const NAV_ITEMS = [
  { href: "/", label: "home", match: (path: string) => path === "/" },
  { href: "/read-the-book", label: "read the book", match: (path: string) => path.startsWith("/read-the-book") },
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
        {NAV_ITEMS.map(({ href, label, match }) => (
          <StyledLink key={href} setMenuOpen={setMenuOpen} href={href} active={match}>
            {label}
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
}: {
  children: string;
  href: string;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  active: (path: string) => boolean;
}) => {
  const router = useRouter();
  const isActive = active(router.pathname);

  return (
    <Link
      href={href}
      onClick={() => {
        if (!isMobile) return;
        setMenuOpen(false);
      }}
      className={`${isActive ? "verticalNavActive" : ""} verticalNavLink text-2xl w-fit`}
    >
      {children}
      <span />
    </Link>
  );
};
