/**
 * QRCamera
 * --------
 * Uses the browser's native getUserMedia API + a lightweight WASM QR decoder
 * (@zxing/browser) to read QR codes from the device camera.
 *
 * Install when ready for production:
 *   npm install @zxing/browser @zxing/library
 *
 * For the mock/dev environment it renders a simulated scanner.
 * Switch REAL_CAMERA = true to use the real camera.
 */

import { useEffect, useRef, useState } from "react";
import { ScanLine, CameraOff, Loader2 } from "lucide-react";
import { BrowserQRCodeReader } from "@zxing/browser";

const REAL_CAMERA = true; // ← flip to true + install @zxing/browser for production

interface Props {
  onScan: (qrCode: string) => void;
  active: boolean;
  disabled?: boolean;
}

export default function QRCamera({ onScan, active, disabled }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [camError, setCamError] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const lastScanRef = useRef<number>(0);
  const COOLDOWN_MS = 3000; // 3 segundos entre scans

  /* ── Real camera mode ── */
  useEffect(() => {
    if (!REAL_CAMERA || !active) return;

    let stopped = false;

    async function startCamera() {
      try {
        if (disabled) return;
        const devices = await navigator.mediaDevices.enumerateDevices();
        const droidcam = devices.find(
          (d) =>
            d.kind === "videoinput" &&
            d.label.toLowerCase().includes("droidcam"),
        );

        const stream = await navigator.mediaDevices.getUserMedia({
          video: droidcam
            ? { deviceId: { exact: droidcam.deviceId } }
            : { facingMode: "environment" },
        });
        if (stopped) {
          stream.getTracks().forEach((t) => t.stop());
          return;
        }
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
          setReady(true);
        }

        /**
         * Decode frames with @zxing/browser:
         */

        const reader = new BrowserQRCodeReader();
        if (videoRef.current) {
          reader.decodeFromVideoElement(videoRef.current, (result, err) => {
            if (disabled) return;
            if (result && !stopped) {
              const now = Date.now();
              if (now - lastScanRef.current < COOLDOWN_MS) return;
              lastScanRef.current = now;
              console.log("📷 QR decodificado:", result.getText());
              onScan(result.getText());
            }
            if (err) {
              console.warn("⚠️ Frame sin QR (normal):", err?.message);
            }
          });
        }
      } catch (err) {
        setCamError(
          "No se pudo acceder a la cámara. Verificá los permisos del navegador.",
        );
      }
    }

    startCamera();

    return () => {
      stopped = true;
      if (videoRef.current?.srcObject) {
        (videoRef.current.srcObject as MediaStream)
          .getTracks()
          .forEach((t) => t.stop());
      }
    };
  }, [active, onScan]);

  /* ── Error state ── */
  if (camError) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 h-full text-center px-4">
        <CameraOff size={28} className="text-slate-500" />
        <p className="text-xs text-slate-400 leading-relaxed">{camError}</p>
      </div>
    );
  }

  /* ── Mock scanner (REAL_CAMERA = false) ── */
  if (!REAL_CAMERA) {
    return (
      <div className="relative w-full h-full flex items-center justify-center bg-[#0a0a0a]">
        {/* Corner brackets */}
        <CornerBrackets />

        {/* Scan line animation */}
        <div
          className="absolute left-8 right-8 h-[2px] bg-blue-500/70 rounded-full"
          style={{
            animation: "scanline 2.4s ease-in-out infinite",
            top: "20%",
          }}
        />

        {/* Center text */}
        <div className="text-center z-10 pointer-events-none">
          <ScanLine size={22} className="text-slate-600 mx-auto mb-2" />
          <p className="text-[11px] text-slate-600">
            Apuntá el QR del invitado
          </p>
        </div>

        <style>{`
          @keyframes scanline {
            0%, 100% { top: 20%; }
            50%       { top: 75%; }
          }
        `}</style>
      </div>
    );
  }

  /* ── Real camera ── */
  return (
    <div className="relative w-full h-full bg-black overflow-hidden">
      <video
        ref={videoRef}
        muted
        playsInline
        className="w-full h-full object-cover"
      />
      {!ready && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Loader2 size={24} className="text-slate-500 animate-spin" />
        </div>
      )}
      <CornerBrackets />
      <div
        className="absolute left-8 right-8 h-[2px] bg-blue-500/70"
        style={{ animation: "scanline 2.4s ease-in-out infinite", top: "20%" }}
      />
      <style>{`
        @keyframes scanline { 0%, 100% { top: 20%; } 50% { top: 75%; } }
      `}</style>
    </div>
  );
}

/* ── Corner bracket decoration ── */
function CornerBrackets() {
  const base = "absolute w-5 h-5 border-blue-500";
  return (
    <>
      <span className={`${base} top-4 left-4 border-t-2 border-l-2`} />
      <span className={`${base} top-4 right-4 border-t-2 border-r-2`} />
      <span className={`${base} bottom-4 left-4 border-b-2 border-l-2`} />
      <span className={`${base} bottom-4 right-4 border-b-2 border-r-2`} />
    </>
  );
}
