import React from 'react';
import ServicePageLayout from '../../components/ServicePageLayout';

const SanadPdfEditor = () => {
    const features = [
        { title: 'Merge & Split', desc: 'Combine multiple PDFs into one or split a large document into specific pages.' },
        { title: 'Convert Format', desc: 'Convert PDFs to Word, Excel, JPG and vice-versa with high fidelity.' },
        { title: 'Secure & Offline', desc: 'Process files locally on your device. No data ever leaves your computer.' },
        { title: 'OCR Technology', desc: 'Make scanned documents searchable and editable with built-in OCR.' },
        { title: 'Annotate & Sign', desc: 'Add comments, highlights, and digital signatures to your documents.' },
        { title: 'Form Filling', desc: 'Easily fill out interactive PDF forms and save them.' }
    ];

    return (
        <ServicePageLayout
            title="Sanad PDF Editor"
            subtitle="The all-in-one PDF solution for Windows."
            description="Sanad makes handling PDF documents easy, fast, and secure. Whether you need to merge reports, sign contracts, or convert files, Sanad provides professional-grade tools in a simple, intuitive interface."
            features={features}
            image="https://images.unsplash.com/photo-1568205469440-205934423853?auto=format&fit=crop&q=80&w=1200"
            ctaText="Get for Windows"
            ctaLink="https://apps.microsoft.com/detail/9PP98R4WHT3V?hl=en-us&gl=PK&ocid=pdpshare"
            badgeText="Product"
            seoTitle="Sanad PDF Editor - Minderfly Store"
            seoDescription="Download Sanad PDF Editor for Windows. Merge, split, convert, and edit PDFs securely offline."
        />
    );
};

export default SanadPdfEditor;
