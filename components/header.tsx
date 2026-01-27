"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Dialog, DialogPanel } from "@headlessui/react";
import {
  XMarkIcon,
  MoonIcon,
  SunIcon,
  ArrowDownTrayIcon,
  ShareIcon,
} from "@heroicons/react/24/outline";
import { Bars3Icon } from "@heroicons/react/24/solid";
import Link from "next/link";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [animateHeader, setAnimateHeader] = useState(false);
  const [animateSidenav, setAnimateSidenav] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);
  const [showResumeIcons, setShowResumeIcons] = useState(false);
  const [resumeIconsAnimatingOut, setResumeIconsAnimatingOut] = useState(false);
  const RESUME_ICON_ANIM_MS = 300;
  const [resumeIconsVisible, setResumeIconsVisible] = useState(false);
  const pathname = usePathname();
  const isResumePage = pathname === "/resume";
  const currentPage = (() => {
    if (!pathname || pathname === "/") return "home";
    const seg = pathname.split("/")[1];
    return seg || "home";
  })();

  const pages: string[] = ["home", "resume", "coding"];

  useEffect(() => {
    // Check localStorage first, then fallback to system preference
    let isDarkDefault = false;
    if (localStorage.theme === "dark") isDarkDefault = true;
    else if (localStorage.theme === "light") isDarkDefault = false;
    else {
      // Fallback to system preference
      isDarkDefault = window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    document.documentElement.classList.toggle("dark", isDarkDefault);
    setIsDarkMode(isDarkDefault);
  }, []);

  const toggleTheme = () => {
    const newDark = !isDarkMode;
    document.documentElement.classList.toggle("dark", newDark);
    setIsDarkMode(newDark);
  };

  const handleDownloadPDF = () => {
    // Dispatch custom event that resume page will listen to
    window.dispatchEvent(new CustomEvent("download-resume-pdf"));
  };

  const handleShare = async () => {
    const url = window?.location.href ?? "/resume";
    try {
      if ((navigator as any)?.share) {
        await (navigator as any).share({
          title: "Anthony Brignano — Resume",
          url,
        });
      } else if (navigator?.clipboard) {
        await navigator.clipboard.writeText(url);
        // small fallback feedback
        // eslint-disable-next-line no-alert
        alert("Resume link copied to clipboard");
      } else {
        // last resort
        // eslint-disable-next-line no-alert
        alert(url);
      }
    } catch (err) {
      // swallow share errors silently
      // eslint-disable-next-line no-console
      console.error("Share failed", err);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", isDarkMode ? "dark" : "light");
    }
  }, [isDarkMode]);

  useEffect(() => {
    // run header drop animation on mount
    requestAnimationFrame(() => setAnimateHeader(true));
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      // reset then trigger so CSS transition runs on open
      setAnimateSidenav(false);
      requestAnimationFrame(() => {
        setAnimateSidenav(true);
        // save focus and move to first focusable element in the panel
        try {
          previousActiveElement.current =
            document.activeElement as HTMLElement | null;
          const first = panelRef.current?.querySelector<HTMLElement>(
            'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          first?.focus();
        } catch (e) {
          // ignore focus errors
        }
      });
    } else {
      setAnimateSidenav(false);
      // restore focus when closing
      try {
        previousActiveElement.current?.focus?.();
      } catch (e) {
        // ignore
      }
    }
  }, [mobileMenuOpen]);

  useEffect(() => {
    if (isResumePage) {
      setResumeIconsAnimatingOut(false);
      setShowResumeIcons(true);
      setResumeIconsVisible(false);
      requestAnimationFrame(() => setResumeIconsVisible(true));
    } else if (showResumeIcons) {
      // animate out, then unmount
      setResumeIconsAnimatingOut(true);
      setResumeIconsVisible(false);
      const t = setTimeout(() => {
        setShowResumeIcons(false);
        setResumeIconsAnimatingOut(false);
      }, RESUME_ICON_ANIM_MS);
      return () => clearTimeout(t);
    }
  }, [isResumePage]);

  return (
    <header className="text-sm py-6 md:px-16 px-6 border-b dark:border-zinc-800 border-zinc-200 z-30 lg:mb-28 mb-10">
      <div
        className={`max-w-6xl mx-auto flex items-center justify-between relative transform transition-all duration-500 ease-out ${animateHeader ? "translate-y-0 opacity-100" : "-translate-y-3 opacity-0"}`}
      >
        <Link href="/" className="cursor-pointer">
          <span className="sr-only">Anthony Brignano</span>
          <Image
            alt="icon"
            src="favicon.svg"
            className="h-8 w-auto invert-0 dark:invert"
            width={35}
            height={35}
          />
        </Link>
        <nav className="hidden lg:block lg:absolute lg:left-1/2 lg:-translate-x-1/2 lg:transform">
          <ul className="flex items-center gap-x-8">
            {pages?.map((page) => {
              const isActive = currentPage === page;
              const label = page.charAt(0).toUpperCase() + page.slice(1);
              return (
                <li key={page}>
                  {isActive ? (
                    <span
                      className="text-zinc-400 dark:text-zinc-500 text-base cursor-default"
                      aria-current="page"
                    >
                      {label}
                    </span>
                  ) : (
                    <Link
                      href={page === "home" ? "/" : `/${page}`}
                      className="text-zinc-600 dark:text-white hover:text-zinc-900 dark:hover:text-white text-base cursor-pointer"
                    >
                      {label}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="flex items-center gap-x-4">
          {showResumeIcons && (
            <>
              <button
                aria-label="Share Resume"
                onClick={handleShare}
                aria-hidden={!isResumePage}
                className={`group print:hidden dark:bg-primary-bg bg-zinc-100 text-zinc-500 border dark:border-zinc-700 border-zinc-200 rounded-full p-2 transition transform duration-300 ease-out ${resumeIconsVisible && !resumeIconsAnimatingOut ? "translate-y-0 opacity-100 scale-100 cursor-pointer" : "translate-y-1 opacity-0 scale-95 pointer-events-none"}`}
              >
                <ShareIcon className="h-5 w-5 transition-colors duration-200 text-blue-600 dark:text-blue-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300" />
              </button>
              <button
                aria-label="Download PDF"
                onClick={handleDownloadPDF}
                aria-hidden={!resumeIconsVisible}
                className={`group dark:bg-primary-bg bg-zinc-100 text-zinc-500 border dark:border-zinc-700 border-zinc-200 rounded-full p-2 transition transform duration-300 ease-out ${resumeIconsVisible && !resumeIconsAnimatingOut ? "translate-y-0 opacity-100 scale-100 cursor-pointer" : "translate-y-1 opacity-0 scale-95 pointer-events-none"}`}
              >
                <ArrowDownTrayIcon className="h-5 w-5 transition-colors duration-200 text-zinc-600 dark:text-zinc-300 group-hover:text-[rgb(33,110,57)] dark:group-hover:text-zinc-300" />
              </button>
            </>
          )}
          <button
            aria-label="Toggle Theme"
            onClick={() => toggleTheme()}
            className="dark:bg-primary-bg hover:text-zinc-500 dark:text-primary-color bg-zinc-100 text-zinc-500 border dark:border-zinc-700 border-zinc-200 rounded-full p-2 transition-transform rotate-0"
          >
            {isDarkMode ? (
              <MoonIcon className="size-5 text-primary-color hover:text-white duration-400 cursor-pointer" />
            ) : (
              <SunIcon className="size-5 text-yellow-600 hover:text-zinc-500 duration-400 cursor-pointer" />
            )}
          </button>
          {pages.length > 0 && (
            <button
              aria-label="Toggle Menu"
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden dark:focus:text-primary-color dark:bg-primary-bg dark:hover:text-primary-color bg-zinc-100 border dark:border-zinc-700 border-zinc-200 rounded-md p-2 hover:text-zinc-900 duration-300 cursor-pointer"
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="size-5" />
            </button>
          )}
        </div>
      </div>
      {mobileMenuOpen && (
        <Dialog
          as="div"
          className="lg:hidden"
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
        >
          <div
            className={`fixed inset-0 z-40 bg-black/20 transition-opacity duration-300 ${animateSidenav ? "opacity-100" : "opacity-0 pointer-events-none"}`}
          />

          <div className="fixed inset-x-0 bottom-0 z-50 w-full lg:inset-auto lg:right-0 lg:w-full lg:max-w-sm">
            <DialogPanel
              ref={panelRef}
              className={`h-full overflow-y-auto dark:bg-zinc-900 bg-zinc-100 px-6 py-6 lg:ring-1 lg:ring-gray-900/10 transform transition-transform transition-opacity duration-300 ease-out ${animateSidenav ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}`}
            >
              <div className="flex items-center justify-between">
                <button
                  aria-label="Close menu"
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="ml-auto dark:bg-primary-bg dark:hover:text-primary-color bg-zinc-100 border dark:border-zinc-700 border-zinc-200 rounded-full p-2 hover:text-zinc-900"
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon aria-hidden="true" className="size-5" />
                </button>
              </div>
              <div className="mt-6 flow-root flex-grow flex items-center">
                <div className="-my-6 divide-y divide-gray-500/10 w-full">
                  <div className="space-y-6 w-full py-6 flex flex-col items-center">
                    {pages?.map((page) => {
                      const isActive = currentPage === page;
                      const label =
                        page.charAt(0).toUpperCase() + page.slice(1);
                      return isActive ? (
                        <div
                          key={page}
                          className="w-full text-center text-base font-medium text-zinc-400 dark:text-zinc-500 cursor-default"
                          aria-current="page"
                        >
                          {label}
                        </div>
                      ) : (
                        <Link
                          key={page}
                          href={page === "home" ? "/" : `/${page}`}
                          onClick={() => setMobileMenuOpen(false)}
                          className="w-full text-center px-3 py-2 text-base font-medium text-zinc-600 dark:text-white hover:text-zinc-900 dark:hover:text-white cursor-pointer"
                        >
                          {label}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            </DialogPanel>
          </div>
        </Dialog>
      )}
    </header>
  );
}
