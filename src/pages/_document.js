import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en" className="dark scroll-smooth">
      <Head>
        {/* Preconnect to Google Fonts for Fast LCP */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Outfit:wght@400;600;700;800;900&display=swap"
          rel="stylesheet"
        />

        {/* Favicon & Web App Manifest Metadata */}
        <link rel="icon" href="/favicon.ico" />
        <meta name="author" content="Knowledge Institute of Technology (CSE Department)" />
        <meta property="og:site_name" content="KIOT Fest 2026" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="KIOT FEST 2026 - Innovation, Code, Robotics & Culture" />
        <meta
          property="og:description"
          content="Register now for Web Hackathons, AI Masterclasses, Robo Wars & Technical events with ₹1.5L+ prizes."
        />
        <meta property="og:image" content="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200" />
      </Head>
      <body className="bg-slate-950 text-slate-100 antialiased min-h-screen">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
