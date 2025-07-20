"use client"

import { useState, useEffect } from "react"
import { Clock } from "lucide-react"

interface ExamTimerProps {
  duration: number // Menerima durasi dalam MENIT
  onTimeUp: () => void
}

export function ExamTimer({ duration, onTimeUp }: ExamTimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration * 60); // Mengubah menit ke detik

  useEffect(() => {
    // Jika waktu habis, panggil onTimeUp dan hentikan interval
    if (timeLeft <= 0) {
      onTimeUp();
      return;
    }

    // Atur interval untuk mengurangi waktu setiap detik
    const timerId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    // Bersihkan interval saat komponen tidak lagi ditampilkan
    return () => clearInterval(timerId);
  }, [timeLeft, onTimeUp]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const isWarning = timeLeft <= 300; // Peringatan 5 menit
  const isCritical = timeLeft <= 60; // Kritis 1 menit

  return (
    <div
      className={`flex items-center space-x-3 px-6 py-3 rounded-lg font-mono text-2xl font-bold transition-colors ${
        isCritical
          ? "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
          : isWarning
            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
            : "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
      }`}
    >
      <Clock className="h-6 w-6" />
      <span>
        {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
      </span>
    </div>
  )
}