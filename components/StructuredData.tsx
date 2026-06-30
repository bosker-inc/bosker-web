/**
 * Structured Data Components for SEO
 * Implements Schema.org markup for rich snippets
 */

interface SchemaProps {
  data: Record<string, any>;
}

/**
 * Generic JSON-LD schema markup component
 */
export function JsonLd({ data }: SchemaProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/**
 * Organization schema
 */
export function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Bosker',
    url: 'https://bosker.app',
    logo: 'https://bosker.app/logo.png',
    description: 'Discover and book professional beauty services',
    sameAs: [
      'https://www.facebook.com/bosker',
      'https://www.instagram.com/bosker',
      'https://twitter.com/bosker',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      email: 'support@bosker.app',
    },
  };

  return <JsonLd data={schema} />;
}

/**
 * Local Business schema
 */
export function LocalBusinessSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Bosker',
    url: 'https://bosker.app',
    logo: 'https://bosker.app/logo.png',
    description: 'Beauty services marketplace',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '123 Main St',
      addressLocality: 'San Francisco',
      addressRegion: 'CA',
      postalCode: '94105',
      addressCountry: 'US',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      ratingCount: '50000',
    },
  };

  return <JsonLd data={schema} />;
}

/**
 * Service schema
 */
export function ServiceSchema({
  name,
  description,
  provider,
}: {
  name: string;
  description: string;
  provider: string;
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    provider: {
      '@type': 'LocalBusiness',
      name: provider,
    },
    areaServed: {
      '@type': 'Country',
      name: 'US',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Beauty Services',
    },
  };

  return <JsonLd data={schema} />;
}

/**
 * Person (Technician) schema
 */
export function PersonSchema({
  name,
  jobTitle,
  image,
  rating,
  reviewCount,
}: {
  name: string;
  jobTitle: string;
  image: string;
  rating: number;
  reviewCount: number;
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name,
    jobTitle,
    image,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: rating.toString(),
      ratingCount: reviewCount.toString(),
    },
  };

  return <JsonLd data={schema} />;
}

/**
 * Review/Rating schema
 */
export function ReviewSchema({
  itemReviewed,
  reviewRating,
  reviewBody,
  author,
  datePublished,
}: {
  itemReviewed: string;
  reviewRating: number;
  reviewBody: string;
  author: string;
  datePublished: string;
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Review',
    itemReviewed: {
      '@type': 'Thing',
      name: itemReviewed,
    },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: reviewRating.toString(),
      bestRating: '5',
      worstRating: '1',
    },
    reviewBody,
    author: {
      '@type': 'Person',
      name: author,
    },
    datePublished,
  };

  return <JsonLd data={schema} />;
}

/**
 * Breadcrumb schema
 */
export function BreadcrumbSchema({
  items,
}: {
  items: Array<{ name: string; url: string }>;
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return <JsonLd data={schema} />;
}

/**
 * FAQ schema
 */
export function FAQSchema({
  faqs,
}: {
  faqs: Array<{ question: string; answer: string }>;
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return <JsonLd data={schema} />;
}

/**
 * Aggregate rating schema
 */
export function AggregateRatingSchema({
  name,
  ratingValue,
  ratingCount,
}: {
  name: string;
  ratingValue: number;
  ratingCount: number;
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'AggregateOffer',
    name,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: ratingValue.toString(),
      ratingCount: ratingCount.toString(),
    },
  };

  return <JsonLd data={schema} />;
}
