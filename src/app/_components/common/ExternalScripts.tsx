import Script from 'next/script';
import React from 'react';

export default function ExternalScripts() {
  return (
    <>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/vs2015.min.css" />
      <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js"></script>
      <Script strategy="beforeInteractive">hljs.highlightAll();</Script>
    </>
  );
}
