"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Menu, X, Home } from "lucide-react";
import logo from "../../public/logo.svg";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black/80 backdrop-blur-xl border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo + Name */}
          <a href="#" className="flex items-center gap-2.5">
            <Image
              src={logo}
              alt="iAteneo"
              width={28}
              height={28}
            />
            <span className="text-lg font-bold tracking-tight text-foreground">
              iAteneo
            </span>
          </a>

          {/* Center nav — desktop */}
          <div className="hidden md:flex items-center">
            <a
              href="#"
              className="group inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-muted-foreground rounded-full border border-transparent hover:border-border hover:text-foreground hover:bg-accent/50 transition-all duration-200"
            >
              <Home size={14} strokeWidth={2} className="opacity-60 group-hover:opacity-100 transition-opacity" />
              Home
            </a>
          </div>

          {/* Right — desktop */}
          <div className="hidden md:flex items-center gap-3">
            <button className="px-4 py-2 text-sm font-medium text-foreground border border-border rounded-lg hover:bg-accent transition-colors">
              Login
            </button>
            <button className="px-4 py-2 text-sm font-medium text-primary-foreground bg-primary rounded-lg hover:bg-primary/90 transition-colors">
              Sign Up
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-foreground p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-xl border-b border-border">
          <div className="px-6 py-4 flex flex-col gap-3">
            <a
              href="#"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
            >
              <Home size={14} strokeWidth={2} />
              Home
            </a>
            <div className="flex flex-col gap-2 pt-2 border-t border-border">
              <button className="w-full px-4 py-2.5 text-sm font-medium text-foreground border border-border rounded-lg hover:bg-accent transition-colors">
                Login
              </button>
              <button className="w-full px-4 py-2.5 text-sm font-medium text-primary-foreground bg-primary rounded-lg hover:bg-primary/90 transition-colors">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
