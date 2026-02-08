import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
        <meta name="description" content="Viktor Hurtig - Unity Programmer Character Sheet Resume" />
        <meta name="theme-color" content="#1a1614" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
