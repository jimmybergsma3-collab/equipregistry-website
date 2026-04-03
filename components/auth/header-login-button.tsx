"use client";

import { useState } from "react";
import LoginModal from "@/components/auth/login-modal";
import type { Lang } from "@/lib/i18n/config";

type Props = {
  lang: string;
  label: string;
};

export default function HeaderLoginButton({ lang, label }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="text-sm text-zinc-900"
      >
        {label}
      </button>

      <LoginModal
        lang={lang as Lang}
        next={`/${lang}/dashboard`}
        isOpen={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
}
