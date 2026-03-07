import { useState } from "react";

interface ProductImageProps {
  src: string | null | undefined;
  alt: string;
  className?: string;
  placeholderClassName?: string;
  /** Placeholder cuando no hay src o falla la carga */
  placeholder?: React.ReactNode;
}

const defaultPlaceholder = (
  <span className="text-4xl text-muted-foreground" aria-hidden>👟</span>
);

export function ProductImage({
  src,
  alt,
  className = "w-full h-full object-cover",
  placeholderClassName = "flex items-center justify-center bg-muted text-muted-foreground",
  placeholder = defaultPlaceholder,
}: ProductImageProps) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div className={`w-full h-full min-h-0 ${placeholderClassName}`} role="img" aria-label={alt}>
        {placeholder}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setFailed(true)}
    />
  );
}
