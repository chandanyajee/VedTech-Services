import React from 'react';
import { HelmetProvider, Helmet } from "react-helmet-async";

const PageMeta = ({
  title,
  description,
  canonical,
  ogImage,
}: {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
}) => {
  const siteUrl = 'https://vedtechservices.in';
  const url = canonical ? `${siteUrl}${canonical}` : siteUrl;
  const image = ogImage || `${siteUrl}/og-image.png`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="VedTech Services" />
      {/* Twitter / X */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      {/* Robots */}
      <meta name="robots" content="index, follow" />
    </Helmet>
  );
};

export const AppWrapper = ({ children }: { children: React.ReactNode }) => (
  <HelmetProvider>{children}</HelmetProvider>
);

export default PageMeta;
