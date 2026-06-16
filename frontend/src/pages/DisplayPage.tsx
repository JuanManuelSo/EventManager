import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { io, type Socket } from "socket.io-client";
import { Monitor, ArrowLeft } from "lucide-react";

const API_BASE = import.meta.env.VITE_API_URL ?? "http://localhost:3000/api";
const SOCKET_URL = API_BASE.replace(/\/api\/?$/, "");

interface PlayVideoPayload {
  videoUrl: string;
  guest: {
    id: number;
    nombre: string;
    apellido: string;
    mesa: string | null;
  };
}

export default function DisplayPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const eventId = id ? Number(id) : NaN;

  const [connected, setConnected] = useState(false);
  const [currentVideo, setCurrentVideo] = useState<PlayVideoPayload | null>(
    null,
  );
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [playError, setPlayError] = useState<string | null>(null);
  const [prevGuests, setPrevGuests] = useState<PlayVideoPayload["guest"][]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!eventId) return;

    // Display público: abrir /display/:eventId en la pantalla que reproduce videos.
    // El backend emite "display:play_video" cuando ScanTab registra un check-in con video asignado.

    const socket: Socket = io(SOCKET_URL, { transports: ["websocket"] });

    socket.on("connect", () => {
      setConnected(true);
      socket.emit("display:join", { eventId });
    });

    socket.on("disconnect", () => {
      console.warn("[Display] Socket disconnected", { eventId });
      setConnected(false);
    });

    socket.on("connect_error", (error) => {
      console.error("[Display] Socket connection error", error);
      setConnected(false);
    });

    socket.on("display:play_video", (payload: PlayVideoPayload) => {
      if (!payload?.videoUrl) {
        console.warn("[Display] Ignored payload without videoUrl", payload);
        return;
      }

      setPrevGuests((prev) => [payload.guest, ...prev].slice(0, 10));

      setPlayError(null);
      setCurrentVideo(payload);
      setPlaying(true);
    });

    return () => {
      socket.emit("display:leave", { eventId });
      socket.disconnect();
    };
  }, [eventId]);

  useEffect(() => {
    if (!playing || !currentVideo || !videoRef.current) return;

    videoRef.current.play().catch((error) => {
      console.error("[Display] Browser blocked video playback", error);
      setPlayError(
        "El navegador bloqueó la reproducción automática. Tocá Reintentar reproducción o mantené el display en silencio.",
      );
    });
  }, [playing, currentVideo]);

  function handleVideoEnd() {
    setPlaying(false);
    setCurrentVideo(null);
    setPlayError(null);
    if (videoRef.current) {
      videoRef.current.load();
    }
  }

  function retryPlayback() {
    setPlayError(null);
    videoRef.current?.play().catch(() => {
      setPlayError(
        "No se pudo iniciar el video. Revisá permisos de autoplay del navegador.",
      );
    });
  }

  if (!eventId) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-950 text-white">
        <p>ID de evento inválido</p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-slate-950 overflow-hidden flex flex-col">
      {/* Navigation bar */}
      <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 py-4">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft size={13} />
          Salir de pantalla
        </button>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setMuted((value) => !value)}
            className="px-2 py-1 rounded-lg text-[10px] text-slate-400 border border-white/10 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
          >
            {muted ? "Audio off" : "Audio on"}
          </button>
          <span
            className={`w-2 h-2 rounded-full ${connected ? "bg-emerald-400 animate-pulse" : "bg-red-500"}`}
          />
          <span className="text-[10px] text-slate-500">
            {connected ? "Conectado" : "Desconectado"}
          </span>
        </div>
      </div>

      {/* Video area */}
      <div className="flex-1 flex items-center justify-center relative">
        {playing && currentVideo ? (
          <>
            <video
              ref={videoRef}
              src={currentVideo.videoUrl}
              className="w-full h-full object-contain"
              autoPlay
              muted={muted}
              onEnded={handleVideoEnd}
              onError={() => {
                console.error(
                  "[Display] Video element error",
                  videoRef.current?.error,
                );
                setPlayError("No se pudo cargar el video recibido.");
              }}
              playsInline
            />
            {playError && (
              <div className="absolute top-24 left-1/2 -translate-x-1/2 z-20 w-[min(90vw,520px)] rounded-xl border border-red-400/30 bg-red-950/80 px-4 py-3 text-center backdrop-blur">
                <p className="text-xs font-medium text-red-100">{playError}</p>
                <button
                  onClick={retryPlayback}
                  className="mt-2 rounded-lg bg-white/10 px-3 py-1.5 text-[11px] font-medium text-white hover:bg-white/20 cursor-pointer"
                >
                  Reintentar reproducción
                </button>
              </div>
            )}
            {/* Guest info overlay at bottom */}
            <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/80 to-transparent p-8 pb-10">
              <div className="text-center">
                <p className="text-white/60 text-sm font-medium tracking-widest uppercase">
                  Bienvenido
                </p>
                <p className="text-white text-3xl font-bold mt-1">
                  {currentVideo.guest.nombre} {currentVideo.guest.apellido}
                </p>
                {currentVideo.guest.mesa && (
                  <p className="text-white/50 text-lg mt-1">
                    Mesa {currentVideo.guest.mesa}
                  </p>
                )}
              </div>
            </div>
          </>
        ) : (
          /* Idle state */
          <div className="flex flex-col items-center justify-center text-center px-8">
            <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6">
              <Monitor size={36} className="text-white/30" />
            </div>
            <h1 className="text-white/60 text-xl font-light tracking-wider">
              Esperando invitados...
            </h1>
            <p className="text-white/20 text-sm mt-3 max-w-md">
              Cuando se escanee un QR, el video se reproducirá automáticamente
              en esta pantalla.
            </p>
          </div>
        )}
      </div>

      {/* Recent guests sidebar */}
      {prevGuests.length > 0 && !playing && (
        <div className="absolute right-6 top-24 z-10 w-64">
          <div className="bg-white/5 backdrop-blur border border-white/10 rounded-xl p-4">
            <p className="text-[10px] text-white/40 font-semibold tracking-widest uppercase mb-3">
              Últimos ingresos
            </p>
            <div className="space-y-2">
              {prevGuests.map((g, i) => (
                <div
                  key={`${g.id}-${i}`}
                  className="flex items-center gap-2.5 text-white/70"
                >
                  <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-[9px] font-bold text-white/50">
                    {g.nombre[0]}
                    {g.apellido[0]}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-medium truncate">
                      {g.nombre} {g.apellido}
                    </p>
                    {g.mesa && (
                      <p className="text-[10px] text-white/30">Mesa {g.mesa}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
