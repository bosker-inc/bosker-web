import Link from 'next/link';
import { Input } from './Input';
import { Button } from './Button';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-900 text-neutral-50">
      <div className="container py-12 md:py-16">
        {/* Newsletter Section */}
        <div className="mb-12 pb-12 border-b border-neutral-800">
          <div className="max-w-md">
            <h3 className="text-lg font-semibold mb-2">
              Subscribe to our newsletter
            </h3>
            <p className="text-neutral-400 mb-4">
              Get tips and updates delivered to your inbox
            </p>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-neutral-800 border-neutral-700 text-white placeholder:text-neutral-500"
              />
              <Button variant="primary" size="md">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-neutral-400">
              <li>
                <Link href="/about" className="hover:text-white transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-white transition">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white transition">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/press" className="hover:text-white transition">
                  Press
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-neutral-400">
              <li>
                <Link href="/services" className="hover:text-white transition">
                  Find Services
                </Link>
              </li>
              <li>
                <Link href="/technicians" className="hover:text-white transition">
                  Find Technicians
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="hover:text-white transition">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white transition">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-neutral-400">
              <li>
                <Link href="/privacy" className="hover:text-white transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="hover:text-white transition">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link href="/security" className="hover:text-white transition">
                  Security
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <ul className="space-y-2 text-neutral-400">
              <li>
                <a href="#" className="hover:text-white transition">
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Instagram
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Facebook
                </a>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-neutral-800 pt-8 flex flex-col md:flex-row items-center justify-between">
          <div className="text-neutral-400 text-sm mb-4 md:mb-0">
            © {currentYear} Bosker. All rights reserved.
          </div>
          <div className="text-neutral-400 text-sm">
            Made with 💜 for beauty professionals
          </div>
        </div>
      </div>
    </footer>
  );
}
