"use client";

import Image from "next/image";
import type { GalleryImage } from "@/lib/gallery";

interface GalleryGridProps {
  images: GalleryImage[];
}

export function GalleryGrid({ images }: GalleryGridProps) {
  const total = images.length;

  const rotations = [-4, 2, -2, 5, -3, 1, -5, 3, -1, 4, -2, 2];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap');

        .gallery-root {
          min-height: 100vh;
          background: #2a2d22;
          background-image:
            radial-gradient(ellipse at 20% 10%, rgba(180,168,110,0.12) 0%, transparent 55%),
            radial-gradient(ellipse at 80% 80%, rgba(100,110,70,0.15) 0%, transparent 50%),
            url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
          font-family: 'DM Sans', sans-serif;
          color: #e8e0cc;
          padding: 64px 0 80px;
          position: relative;
          overflow: hidden;
        }

        .gallery-root::before {
          content: '';
          position: fixed;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px);
          background-size: 60px 60px;
          pointer-events: none;
          z-index: 0;
        }

        .gallery-inner {
          position: relative;
          z-index: 1;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 32px;
        }

        .gallery-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin-bottom: 52px;
          gap: 24px;
          flex-wrap: wrap;
        }

        .label-archives {
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: #b8a96e;
          margin-bottom: 6px;
          display: block;
        }

        .title-memory {
          font-family: 'Playfair Display', serif;
          font-size: clamp(52px, 8vw, 96px);
          font-weight: 700;
          color: #f0e8d0;
          line-height: 0.9;
          margin: 0;
          letter-spacing: -2px;
        }

        .title-memory span {
          font-style: italic;
          font-weight: 400;
          color: #c8b87a;
        }

        .header-right {
          text-align: right;
        }

        .counter {
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          color: #8a8070;
          margin-bottom: 8px;
        }

        .counter strong {
          color: #c8b87a;
          font-weight: 500;
        }

        .tagline {
          font-size: 12px;
          color: #6a6258;
          line-height: 1.6;
          max-width: 220px;
          font-style: italic;
        }

        .date-range {
          font-size: 11px;
          letter-spacing: 2px;
          color: #5a5448;
          text-transform: uppercase;
          margin-top: 20px;
          padding-top: 20px;
          border-top: 1px solid rgba(200,184,122,0.2);
        }

        .collage-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          grid-auto-rows: 180px;
          gap: 12px;
        }

        .photo-card {
          position: relative;
          overflow: hidden;
          cursor: pointer;
          transform-origin: center center;
          transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.35s ease, z-index 0s;
          border-radius: 4px;
          will-change: transform;
        }

        .photo-card::after {
          content: '';
          position: absolute;
          inset: 0;
          border: 6px solid rgba(255,255,255,0.06);
          border-radius: 4px;
          pointer-events: none;
          z-index: 2;
          transition: border-color 0.3s;
        }

        .photo-card:hover {
          z-index: 10;
          box-shadow: 0 24px 60px rgba(0,0,0,0.6), 0 0 0 2px rgba(200,184,122,0.4);
        }

        .photo-card:hover::after {
          border-color: rgba(255,255,255,0.14);
        }

        .photo-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            rgba(20,22,15,0.1) 0%,
            rgba(20,22,15,0.45) 100%
          );
          z-index: 1;
          transition: opacity 0.3s;
        }

        .photo-card:hover .photo-overlay {
          opacity: 0.5;
        }

        .photo-num {
          position: absolute;
          bottom: 8px;
          right: 10px;
          font-size: 10px;
          color: rgba(255,255,255,0.45);
          font-family: 'DM Sans', sans-serif;
          letter-spacing: 1px;
          z-index: 3;
          transition: color 0.3s;
        }

        .photo-card:hover .photo-num {
          color: rgba(255,255,255,0.8);
        }

        .size-tall   { grid-row: span 2; }
        .size-wide   { grid-column: span 2; }
        .size-big    { grid-column: span 2; grid-row: span 2; }
        .size-normal { grid-column: span 1; grid-row: span 1; }

        .empty-state {
          grid-column: 1 / -1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 300px;
          color: #5a5448;
          font-size: 14px;
          gap: 12px;
        }

        .empty-icon {
          font-size: 48px;
          opacity: 0.4;
        }

        .bottom-strip {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 40px;
          padding-top: 20px;
          border-top: 1px solid rgba(200,184,122,0.15);
        }

        .bottom-label {
          font-size: 11px;
          letter-spacing: 3px;
          color: #4a4840;
          text-transform: uppercase;
        }

        .bottom-dots {
          display: flex;
          gap: 6px;
        }

        .bottom-dots span {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: #b8a96e;
          opacity: 0.4;
        }

        .bottom-dots span:first-child {
          opacity: 1;
        }

        @media (max-width: 768px) {
          .collage-grid {
            grid-template-columns: repeat(2, 1fr);
            grid-auto-rows: 150px;
          }
          .gallery-header {
            flex-direction: column;
            align-items: flex-start;
          }
          .header-right {
            text-align: left;
          }
        }

        @media (max-width: 480px) {
          .collage-grid {
            grid-template-columns: repeat(2, 1fr);
            grid-auto-rows: 130px;
            gap: 8px;
          }
          .gallery-inner {
            padding: 0 16px;
          }
        }
      `}</style>

      <div className="gallery-root">
        <div className="gallery-inner">
          <div className="gallery-header">
            <div className="header-left">
              <span className="label-archives">Archives</span>
              <h1 className="title-memory">
                Mem<span>ory.</span>
              </h1>
            </div>
            <div className="header-right">
              <div className="counter">
                <strong>01/{String(total || 1).padStart(2, "0")}</strong>
              </div>
              <p className="tagline">
                Setiap foto bisa menyimpan<br />
                kenangan yang tak terhitung.<br />
                Each frame, a story told.
              </p>
              <div className="date-range">
                Januari – Desember 2025
              </div>
            </div>
          </div>

          <div className="collage-grid">
            {images.length ? (
              images.map((img, i) => {
                const rot = rotations[i % rotations.length];
                const sizeIndex = i % 6;
                let sizeClass = "size-normal";
                let spanStyle: React.CSSProperties = {};

                if (sizeIndex === 0) { sizeClass = "size-tall"; spanStyle = { gridRow: "span 2" }; }
                else if (sizeIndex === 2) { sizeClass = "size-wide"; spanStyle = { gridColumn: "span 2" }; }
                else if (sizeIndex === 4) { sizeClass = "size-tall"; spanStyle = { gridRow: "span 2" }; }

                return (
                  <div
                    key={img.src}
                    className={`photo-card ${sizeClass}`}
                    style={{
                      transform: `rotate(${rot}deg)`,
                      ...spanStyle,
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.transform = `rotate(${rot * 0.3}deg) scale(1.04)`;
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.transform = `rotate(${rot}deg)`;
                    }}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="(max-width: 480px) 50vw, (max-width: 768px) 40vw, 25vw"
                      className="object-cover"
                      style={{ display: "block" }}
                    />
                    <div className="photo-overlay" />
                    <span className="photo-num">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                );
              })
            ) : (
              <div className="empty-state">
                <span className="empty-icon">📷</span>
                <span>No images yet — drop files into <strong>public/gallery</strong> and refresh.</span>
              </div>
            )}
          </div>

          <div className="bottom-strip">
            <span className="bottom-label">Café Gallery · 2025</span>
            <div className="bottom-dots">
              <span /><span /><span /><span /><span />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}