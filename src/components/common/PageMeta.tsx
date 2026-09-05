import React from 'react';
import { HelmetProvider, Helmet } from "react-helmet-async";

interface PageMetaProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  keywords?: string;
  structuredData?: object | object[];
}

const PageMeta = ({
  title,
  description,
  canonical,
  ogImage,
  keywords,
  structuredData,
}: PageMetaProps) => {
  const siteUrl = 'https://vedtechservices.in';
  const url = canonical ? `${siteUrl}${canonical}` : siteUrl;
  const image = ogImage || `${siteUrl}/og-image.png`;

  const schemas = structuredData
    ? Array.isArray(structuredData) ? structuredData : [structuredData]
    : [];

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={url} />
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="VedTech Services" />
      <meta property="og:locale" content="en_IN" />
      {/* Twitter / X */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      {/* Robots */}
      <meta name="robots" content="index, follow" />
      {/* Geo tags */}
      <meta name="geo.region" content="IN" />
      <meta name="geo.country" content="India" />
      {/* Structured Data */}
      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
};

export const AppWrapper = ({ children }: { children: React.ReactNode }) => (
  <HelmetProvider>{children}</HelmetProvider>
);

export default PageMeta;
