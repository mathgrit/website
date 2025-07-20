"use client"

interface YouTubePlayerProps {
  playlistId?: string
  title: string
}

export default function YouTubePlayer({ playlistId, title }: YouTubePlayerProps) {
  // URL embed untuk playlist YouTube
  const embedUrl = `https://www.youtube.com/embed/videoseries?list=${playlistId}`

  return (
    <div className="bg-black rounded-lg overflow-hidden shadow-lg">
      <div className="relative aspect-video">
        <iframe
          src={embedUrl}
          title={title}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  )
}