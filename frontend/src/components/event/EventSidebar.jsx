import React from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  Clock,
  MapPin,
  Tag,
  Share2,
  Navigation,
  MessageCircle,
  Info,
  User,
} from 'lucide-react';

function EventMetaRow({ icon: Icon, label, value }) {
  if (!value) return null;
  return (
    <div className="flex items-start gap-3">
      <Icon size={16} className="text-brand-primary shrink-0 mt-0.5" />
      <div>
        <div className="text-xs text-text-muted font-medium">{label}</div>
        <div className="font-semibold text-text-primary mt-0.5">{value}</div>
      </div>
    </div>
  );
}

function EventOrganizerRow({ contactPerson, contactPhone }) {
  if (!contactPerson && !contactPhone) return null;
  return (
    <div className="flex items-start gap-3 pt-1 border-t border-border-subtle">
      <User size={16} className="text-brand-primary shrink-0 mt-0.5" />
      <div>
        <div className="text-xs text-text-muted font-medium">Narahubung Acara</div>
        <div className="font-semibold text-text-primary mt-0.5">{contactPerson || 'Panitia Informasi'}</div>
        {contactPhone && (
          <div className="text-xs text-text-secondary mt-0.5 font-mono">{contactPhone}</div>
        )}
      </div>
    </div>
  );
}

export function EventSidebar({
  eventItem,
  dateRange,
  termsText,
  contactWaLink,
  copied,
  onShare,
  calloutTitle,
  calloutDesc,
  calloutCta,
}) {
  return (
    <aside className="space-y-6">
      <div className="p-6 bg-surface-subtle border border-border-subtle rounded-md space-y-5">
        <h3 className="font-bold text-base text-text-primary border-b border-border-subtle pb-3">
          Ringkasan Pelaksanaan
        </h3>

        <div className="space-y-4 text-xs sm:text-sm">
          <EventMetaRow icon={Calendar} label="Jadwal Tanggal" value={dateRange} />
          <EventMetaRow icon={Clock} label="Waktu Operasional" value={eventItem.time || '10.00 – 18.00 WITA'} />
          <EventMetaRow icon={MapPin} label="Lokasi di Mall" value={eventItem.location || 'Plaza Kebun Sayur Balikpapan'} />
          <EventMetaRow icon={Tag} label="Ketentuan / HTM" value={termsText} />
          <EventOrganizerRow contactPerson={eventItem.contact_person} contactPhone={eventItem.contact_phone} />
        </div>

        <div className="space-y-3 pt-3 border-t border-border-subtle">
          <a
            href={contactWaLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-sm bg-brand-primary hover:bg-brand-primary-hover active:bg-brand-primary-pressed text-white text-xs font-semibold transition-colors min-h-[44px] text-center"
          >
            <MessageCircle size={15} />
            <span>Tanya Narahubung via WhatsApp</span>
          </a>

          <Link
            to="/panduan-kunjungan"
            className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-sm border border-border-subtle hover:border-border-hover bg-canvas text-text-primary text-xs font-semibold transition-colors min-h-[44px] text-center"
          >
            <Navigation size={14} />
            <span>Panduan Rute & Akses Mall</span>
          </Link>

          <button
            type="button"
            onClick={onShare}
            className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-sm border border-border-subtle hover:border-border-hover bg-canvas text-text-secondary hover:text-text-primary text-xs font-semibold transition-colors min-h-[44px] text-center cursor-pointer"
          >
            <Share2 size={14} />
            <span>{copied ? 'Tautan Berhasil Disalin!' : 'Bagikan Informasi Ini'}</span>
          </button>
        </div>
      </div>

      <div className="p-5 bg-surface-muted border border-border-subtle rounded-md space-y-2">
        <div className="flex items-center gap-2 text-text-primary font-semibold text-xs">
          <Info size={14} className="text-brand-primary" />
          <span>{calloutTitle}</span>
        </div>
        <p className="text-xs text-text-secondary leading-relaxed">
          {calloutDesc}
        </p>
        <Link
          to="/kontak"
          className="inline-block text-xs font-semibold text-brand-primary hover:underline pt-1"
        >
          {calloutCta}
        </Link>
      </div>
    </aside>
  );
}
