import { Helmet } from 'react-helmet-async';
import PropTypes from 'prop-types';

/**
 * Reusable SEO Head component for consistent meta tags across pages
 * @param {Object} props - Component props
 * @param {string} props.title - Page title
 * @param {string} props.description - Page description
 * @param {string} props.keywords - SEO keywords
 * @param {string} props.canonical - Canonical URL
 * @param {string} props.ogImage - Open Graph image URL
 * @param {Object} props.schema - JSON-LD structured data
 */
const SEOHead = ({
    title,
    description,
    keywords = '',
    canonical,
    ogImage = 'https://minderfly.com/og-image.png',
    schema = null,
}) => {
    const fullTitle = title.includes('Minderfly') ? title : `${title} | Minderfly`;
    const url = canonical || `https://minderfly.com${window.location.pathname}`;

    return (
        <Helmet>
            {/* Primary Meta Tags */}
            <title>{fullTitle}</title>
            <meta name="title" content={fullTitle} />
            <meta name="description" content={description} />
            {keywords && <meta name="keywords" content={keywords} />}

            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={url} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={ogImage} />
            <meta property="og:site_name" content="Minderfly" />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={url} />
            <meta property="twitter:title" content={fullTitle} />
            <meta property="twitter:description" content={description} />
            <meta property="twitter:image" content={ogImage} />

            {/* Canonical URL */}
            <link rel="canonical" href={url} />

            {/* Structured Data */}
            {schema && (
                <script type="application/ld+json">
                    {JSON.stringify(schema)}
                </script>
            )}
        </Helmet>
    );
};

SEOHead.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    keywords: PropTypes.string,
    canonical: PropTypes.string,
    ogImage: PropTypes.string,
    schema: PropTypes.object,
};

export default SEOHead;
