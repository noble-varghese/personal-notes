import React from "react"

interface ImageWithCaptionProps {
  src: string
  alt: string
  caption: string
}

export default function ImageWithCaption({ src, alt, caption }: ImageWithCaptionProps) {
  return (
    <div style={{ textAlign: "center", marginBottom: "1em" }}>
      <img src={src} alt={alt} style={{ maxWidth: "100%" }} />
      <p style={{ fontStyle: "italic", fontSize: "0.9em", color: "#666" }}>{caption}</p>
    </div>
  )
}
