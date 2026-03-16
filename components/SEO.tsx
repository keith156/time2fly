import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
    title?: string;
    description?: string;
    keywords?: string;
    image?: string;
    url?: string;
    type?: string;
    schema?: any;
}

const SEO: React.FC<SEOProps> = ({
    title = "Time2Fly | Tours & Travel Ltd — Uganda's Premier Travel Agency",
    description = "Time2Fly Tours & Travel Ltd is your premier partner for travel in Uganda and beyond. We specialize in affordable flight bookings, luxury safari adventures, gorilla tracking, personalized holiday packages, and comprehensive corporate travel solutions.",
    keywords = "travel agency Uganda, flights Uganda, safari tours Uganda, gorilla tracking, Kampala travel, holiday packages, Time2Fly, corporate travel management, luxury safari Africa, Entebbe flights, Uganda tours",
    image = "https://time2flytnt.com/assets/logo.png",
    url = "https://time2flytnt.com/",
    type = "website",
    schema
}) => {
    return (
        <Helmet>
            {/* Primary Meta Tags */}
            <title>{title}</title>
            <meta name="title" content={title} />
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <meta name="author" content="Time2Fly Tours & Travel Ltd" />
            <link rel="canonical" href={url} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:url" content={url} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />
            <meta property="og:site_name" content="Time2Fly Tours & Travel Ltd" />
            <meta property="og:locale" content="en_UG" />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:url" content={url} />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />

            {/* Structured Data (JSON-LD) */}
            {schema && (
                <script type="application/ld+json">
                    {JSON.stringify(schema)}
                </script>
            )}
        </Helmet>
    );
};

export default SEO;
