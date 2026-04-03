"use client";

import { useState } from "react";
import type { Lang } from "@/lib/i18n/config";
import LoginModal from "@/components/auth/login-modal";

type Props = {
  lang: Lang;
  next: string;
  label: string;
  className?: string;
};

export default function LoginRequiredButton({
  lang,
  next,
  label,
  className,
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => {
          console.log("LOGIN BUTTON CLICKED");
          setOpen(true);
        }}
        className={className}
      >
        {label}
      </button>

      <LoginModal
        lang={lang}
        next={next}
        isOpen={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
}