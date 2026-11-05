import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Container } from '../components/layout/Container';
import { fetchWhatsOnBySlug } from '../services/api';
import { formatDateRange } from '../utils/date';
import { useContent, useSiteSettings } from '../hooks/useContent';
import { EventSidebar } from '../components/event/EventSidebar';
import { buildContactWaLink } from '../utils/whatsapp';
import {
  FALLBACK_BANNERS,
  parseHighlights,
  resolveTermsText,
} from '../utils/eventUtils';
import {
  EventNotFound,
  EventBreadcrumb,
  EventMainContent,
} from '../components/event/EventDetailComponents';

function useEventDetail(slug) {
  const [eventItem, setEventItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bannerSrc, setBannerSrc] = useState(null);

  useEffect(() => {
    let isCancelled = false;
    async function loadItem() {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchWhatsOnBySlug(slug);
        if (isCancelled) return;
        setEventItem(data);
        const fallback = FALLBACK_BANNERS[data?.type] || FALLBACK_BANNERS.event;
        setBannerSrc(data?.banner_url || fallback);
      } catch (err) {
        if (isCancelled) return;
        const msg = err.message === 'NOT_FOUND' ? 'Informasi tidak ditemukan' : 'Gagal memuat informasi';
        setError(msg);
      } finally {
        if (!isCancelled) setLoading(false);
      }
    }
    loadItem();
    return () => {
      isCancelled = true;
    };
  }, [slug]);

  return { eventItem, loading, error, bannerSrc, setBannerSrc };
}

export function EventDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const siteSettings = useSiteSettings();

  const calloutTitle = useContent('event.callout.title', 'Ingin Menggelar Event di Bunsay?');
  const calloutDesc = useContent(
    'event.callout.description',
    'Area Atrium dan Koridor Plaza Kebun Sayur terbuka untuk pameran batu mulia, pentas seni, maupun bazar UMKM.'
  );
  const calloutCta = useContent('event.callout.cta_label', 'Hubungi Manajemen Pengelola →');

  const [copied, setCopied] = useState(false);
  const { eventItem, loading, error, bannerSrc, setBannerSrc } = useEventDetail(slug);

  const handleShare = () => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="py-20 text-center text-text-muted">
        Memuat detail informasi...
      </div>
    );
  }

  if (error || !eventItem) {
    return <EventNotFound onBack={() => navigate('/informasi')} />;
  }

  const fallbackBanner = FALLBACK_BANNERS[eventItem.type] || FALLBACK_BANNERS.event;
  const contactWaLink = buildContactWaLink(
    eventItem.contact_phone,
    eventItem.contact_person,
    eventItem.title,
    siteSettings?.management_whatsapp
  );

  const highlightsList = parseHighlights(eventItem.highlights);
  const dateRange = formatDateRange(eventItem.start_date, eventItem.end_date);
  const termsText = resolveTermsText(eventItem);

  return (
    <div className="py-8 sm:py-12 bg-canvas min-h-screen">
      <Container>
        <EventBreadcrumb title={eventItem.title} />

        <div className="mb-6">
          <Link
            to="/informasi"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-text-secondary hover:text-brand-primary transition-colors min-h-[44px] py-2"
          >
            <ArrowLeft size={16} />
            <span>Kembali ke Semua Informasi & Promo</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-12 items-start">
          <EventMainContent
            eventItem={eventItem}
            bannerSrc={bannerSrc}
            fallbackBanner={fallbackBanner}
            dateRange={dateRange}
            highlightsList={highlightsList}
            onImageError={() => setBannerSrc(fallbackBanner)}
          />

          <EventSidebar
            eventItem={eventItem}
            dateRange={dateRange}
            termsText={termsText}
            contactWaLink={contactWaLink}
            copied={copied}
            onShare={handleShare}
            calloutTitle={calloutTitle}
            calloutDesc={calloutDesc}
            calloutCta={calloutCta}
          />
        </div>
      </Container>
    </div>
  );
}

export default EventDetail;
