import Link from "next/link";
import Logo from "./Logo";
import { SearchIcon, CartIcon } from "./icons";
import styles from "./Navbar.module.css";

export type NavItem = { label: string; href: string };

export const NAV_ITEMS: NavItem[] = [
  { label: "Shop", href: "/collections/all" },
  { label: "What is Mate?", href: "/what-is-mate" },
  { label: "About", href: "/about" },
];

export type NavbarProps = {
  /** Ruta activa — normalmente `usePathname()` desde el layout. */
  currentPath?: string;
  /** Unidades en el carrito. En headless sale del cart de Shopify. */
  itemCount?: number;
  /** Abre el panel de búsqueda. Sin handler, cae a la página /search. */
  onSearchClick?: () => void;
  /** Abre el carrito lateral. Sin handler, cae a la página /cart. */
  onCartClick?: () => void;
  items?: NavItem[];
};

export default function Navbar({
  currentPath,
  itemCount = 0,
  onSearchClick,
  onCartClick,
  items = NAV_ITEMS,
}: NavbarProps) {
  return (
    <header className={styles.header}>
      <nav className={styles.nav} aria-label="Principal">
        {/* Izquierda */}
        <div className={styles.links}>
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={styles.link}
              aria-current={currentPath === item.href ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Centro — cae en el centro del contenedor, no del espacio libre */}
        <Link href="/" className={styles.logo} aria-label="Mate Coast — inicio">
          <Logo />
        </Link>

        {/* Derecha */}
        <div className={styles.actions}>
          {onSearchClick ? (
            <button type="button" className={styles.action} onClick={onSearchClick}>
              <span>Search</span>
              <SearchIcon />
            </button>
          ) : (
            <Link href="/search" className={styles.action}>
              <span>Search</span>
              <SearchIcon />
            </Link>
          )}

          {onCartClick ? (
            <button
              type="button"
              className={styles.action}
              onClick={onCartClick}
              aria-label={`Carrito, ${itemCount} ${itemCount === 1 ? "artículo" : "artículos"}`}
            >
              <span>
                Cart
                {itemCount > 0 && <span className={styles.count}> ({itemCount})</span>}
              </span>
              <CartIcon />
            </button>
          ) : (
            <Link
              href="/cart"
              className={styles.action}
              aria-label={`Carrito, ${itemCount} ${itemCount === 1 ? "artículo" : "artículos"}`}
            >
              <span>
                Cart
                {itemCount > 0 && <span className={styles.count}> ({itemCount})</span>}
              </span>
              <CartIcon />
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
