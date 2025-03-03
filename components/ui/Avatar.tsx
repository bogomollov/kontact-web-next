"use client";
import { useState } from "react";
import Image from "next/image";

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: number;
  className?: string;
  accountId: number;
  onUploadSuccess?: (url: string) => void;
}

export default function Avatar({src, alt = "avatar", size = 55, className = "", accountId, onUploadSuccess}: AvatarProps) {
  const [preview, setPreview] = useState<string>(src || `/avatars/${accountId}.svg`);
  const [loading, setLoading] = useState<boolean>(false);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("account_id", String(accountId));
    formData.append("file", file);

    try {
      const response = await fetch("/api/avatar", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Ошибка загрузки");

      const data = await response.json();
      setPreview(data.url);
      onUploadSuccess?.(data.url);
    } catch (error) {
      console.error("Ошибка загрузки аватара:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      <label className="cursor-pointer">
        <Image
          src={preview}
          alt={alt}
          width={size}
          height={size}
          className="rounded-full object-cover"
        />
        <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
      </label>
      {loading && <span className="absolute inset-0 flex items-center justify-center bg-white/50">Загрузка...</span>}
    </div>
  );
}