'use client';

import React, { useEffect, useState, useRef } from 'react';
import { Activity } from 'lucide-react';

export const LiveTelemetry = () => {
  const [points, setPoints] = useState<number[]>([]);
  const [noisePoints, setNoisePoints] = useState<number[]>([]);
  const requestRef = useRef<number | null>(null);
  const lastUpdateTimeRef = useRef<number>(0);

  useEffect(() => {
    // Initialize points
    const initialPoints = Array.from({ length: 41 }, (_, i) => {
      // Create a peak near the center (index 15-20)
      if (i >= 14 && i <= 18) {
        return 40 + Math.random() * 30; // High signal
      }
      return 150 + Math.random() * 20; // Background floor
    });
    setPoints(initialPoints);

    const initialNoise = Array.from({ length: 41 }, () => 180 + Math.random() * 10);
    setNoisePoints(initialNoise);
  }, []);

  useEffect(() => {
    const updateWave = (time: number) => {
      // Throttle update to roughly every 100ms for performance
      if (time - lastUpdateTimeRef.current > 100) {
        setPoints((prevPoints) => {
          return prevPoints.map((val, idx) => {
            // Keep the peak near center
            if (idx >= 14 && idx <= 18) {
              // Pulse around 30px to 80px (remember y=0 is top in SVG)
              const target = 30 + Math.sin(time / 200 + idx) * 15 + Math.random() * 20;
              return target;
            }
            // General signal fluctuation
            return 150 + Math.sin(time / 1000 + idx) * 5 + Math.random() * 12;
          });
        });

        setNoisePoints((prevNoise) => {
          return prevNoise.map(() => 180 + Math.random() * 8);
        });

        lastUpdateTimeRef.current = time;
      }
      requestRef.current = requestAnimationFrame(updateWave);
    };

    requestRef.current = requestAnimationFrame(updateWave);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  // Generate SVG path string from points
  const generatePathString = (data: number[]) => {
    if (data.length === 0) return '';
    const step = 1000 / (data.length - 1);
    return data.reduce((acc, val, idx) => {
      const x = idx * step;
      return acc + `${idx === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${val.toFixed(1)}`;
    }, '');
  };

  const signalPath = generatePathString(points);
  const noisePath = generatePathString(noisePoints);

  return (
    <div className="border border-outline-variant bg-surface-container-lowest p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h3 className="font-label-caps text-label-caps text-primary flex items-center gap-2 font-bold">
            <Activity className="w-4 h-4 text-secondary animate-pulse" />
            Live Telemetry Analysis
          </h3>
          <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
            Real-time spectrum occupancy and signal-to-noise ratio metrics.
          </p>
        </div>
        <div className="flex gap-4 shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-primary block"></span>
            <span className="font-label-caps text-label-caps text-[10px] font-semibold">
              PRIMARY SIGNAL
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-secondary-fixed-dim block"></span>
            <span className="font-label-caps text-label-caps text-[10px] font-semibold">
              NOISE FLOOR
            </span>
          </div>
        </div>
      </div>
      <div className="h-64 technical-grid relative border border-outline-variant flex items-end px-4 pb-4 overflow-hidden rounded-sm bg-[#fafbfc]">
        {/* SVG-based Mock Chart */}
        <svg
          className="w-full h-full"
          preserveAspectRatio="none"
          viewBox="0 0 1000 200"
        >
          {/* Signal path */}
          {signalPath && (
            <path
              className="transition-all duration-100 ease-out"
              d={signalPath}
              fill="none"
              stroke="#001e40"
              strokeWidth="2"
            />
          )}
          {/* Noise path */}
          {noisePath && (
            <path
              className="transition-all duration-100 ease-out"
              d={noisePath}
              fill="none"
              stroke="#76d6d5"
              strokeDasharray="4"
              strokeWidth="1.5"
            />
          )}
          {/* Locked Signal Highlight Band */}
          <rect
            fill="#008080"
            fillOpacity="0.08"
            height="190"
            width="120"
            x="340"
            y="5"
            rx="4"
          />
        </svg>
        {/* Axis Labels */}
        <div className="absolute left-3 top-3 h-[85%] flex flex-col justify-between font-label-caps text-[10px] text-outline pointer-events-none select-none font-semibold">
          <span>+10 dBm</span>
          <span>-20 dBm</span>
          <span>-50 dBm</span>
          <span>-80 dBm</span>
          <span>-110 dBm</span>
        </div>
        <div className="absolute bottom-1.5 left-0 w-full flex justify-around font-label-caps text-[10px] text-outline pointer-events-none select-none font-semibold">
          <span>26 GHz</span>
          <span>27 GHz</span>
          <span>28 GHz (Lock)</span>
          <span>29 GHz</span>
          <span>30 GHz</span>
        </div>
      </div>
      <p className="mt-4 font-body-sm text-body-sm text-on-surface-variant italic text-center">
        Graph 2.4: Signal telemetry showcasing peak gain performance and interference rejection at center frequency.
      </p>
    </div>
  );
};
