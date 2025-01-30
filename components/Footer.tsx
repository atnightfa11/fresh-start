export default function Footer() {
  return (
    <footer className="border-t border-gray-800 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Neural Signal</h3>
            <p className="text-gray-400 text-sm">
              Real-time AI marketing intelligence for data-driven decisions.
            </p>
          </div>
          <div>
            <h4 className="font-medium mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Features</li>
              <li>Integrations</li>
              <li>Pricing</li>
              <li>Roadmap</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Documentation</li>
              <li>API Reference</li>
              <li>Blog</li>
              <li>Support</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>About</li>
              <li>Careers</li>
              <li>Contact</li>
              <li>Legal</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} Neural Signal. All rights reserved.
        </div>
      </div>
    </footer>
  );
} 