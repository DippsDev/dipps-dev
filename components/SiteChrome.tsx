"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "./ThemeProvider";
import { useWork } from "./WorkProvider";
import { usePageNav } from "./PageTransition";
import { type WorkFilter } from "@/lib/projects";
import "./FolderFloat.css";

const FolderFloat = dynamic(() => import("./FolderFloat"), { ssr: false });

const ease = "transition-opacity duration-500 [transition-timing-function:cubic-bezier(0.23,1,0.32,1)]";

const menuItems = [
  { label: "All", value: "all" },
  { label: "Sites", value: "site" },
  { label: "Tools", value: "tool" },
  { label: "About", value: "about" },
];

function BracketLabel({
  children,
  active = false,
}: {
  children: React.ReactNode;
  active?: boolean;
}) {
  return (
    <span className="relative inline-flex items-center">
      <span
        className={`${ease} pointer-events-none absolute top-0 -left-2.5 ${
          active ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        }`}
      >
        [
      </span>
      {children}
      <span
        className={`${ease} pointer-events-none absolute top-0 -right-2.5 ${
          active ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        }`}
      >
        ]
      </span>
    </span>
  );
}

export default function SiteChrome() {
  const { isLight } = useTheme();
  const { filters, setFilter } = useWork();
  const total = filters[0]?.count ?? 0;
  const pathname = usePathname();
  const nav = usePageNav();
  const onHome = pathname === "/";
  const onAbout = pathname === "/about";

  const openWork = (next?: WorkFilter) => {
    if (next) setFilter(next);
    if (!onHome) nav("/");
  };

  const onMenuSelect = (value: string) => {
    if (value === "about") {
      nav("/about");
      return;
    }
    openWork(value as WorkFilter);
  };

  const folderTheme = isLight
    ? {
        folderColor: "#1a1a1a",
        frontColor: "#2e2e2e",
        paperColor: "#f4f4f2",
        itemColor: "#ffffff",
        itemTextColor: "#0f0f0f",
        labelColor: "#f4f4f2",
      }
    : {
        folderColor: "#d8d8d6",
        frontColor: "#f4f4f2",
        paperColor: "#1a1a1a",
        itemColor: "#0f0f0f",
        itemTextColor: "#f4f4f2",
        labelColor: "#0f0f0f",
      };

  return (
    <header className="chrome site-chrome pointer-events-none fixed inset-x-0 top-0 z-30">
      <div className={`site-chrome__bar pointer-events-auto${onAbout ? " is-about" : ""}`}>
        <div className="site-chrome__leading">
          <Link
            href="/"
            className="site-chrome__brand group"
            onClick={(event) => {
              event.preventDefault();
              nav("/");
            }}
          >
            <BracketLabel active={onHome}>Dipps.dev</BracketLabel>
          </Link>
        </div>

        {!onAbout ? (
          <div className="site-chrome__folder">
            <FolderFloat
              items={filters.map((item) => ({ label: item.label, value: item.id }))}
              label="Work"
              sublabel={`${total} projects`}
              trigger="hover"
              closeOnSelect
              physics
              drift={0.32}
              bounce={0}
              openDown
              onSelect={(value) => openWork(value as WorkFilter)}
              width={96}
              height={68}
              radius={10}
              spread={240}
              lift={112}
              tilt={6}
              className="folder-float--compact"
              {...folderTheme}
            />
          </div>
        ) : null}

        {!onAbout ? (
          <nav className="site-chrome__links">
            <Link
              href="/about"
              className="group"
              onClick={(event) => {
                event.preventDefault();
                nav("/about");
              }}
            >
              <BracketLabel>About</BracketLabel>
            </Link>
          </nav>
        ) : null}

        {!onAbout ? (
          <div className="site-chrome__menu">
            <FolderFloat
              items={menuItems}
              label="Menu"
              sublabel="Links"
              trigger="click"
              closeOnSelect
              physics
              drift={0.28}
              openDown
              onSelect={onMenuSelect}
              width={76}
              height={54}
              radius={10}
            spread={160}
            lift={108}
            tilt={3}
            shiftX={-92}
              className="folder-float--compact"
              {...folderTheme}
            />
          </div>
        ) : null}
      </div>
    </header>
  );
}
