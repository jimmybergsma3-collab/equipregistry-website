type Props = {
  title: string;
  subtitle: string;
  extra?: string; // ✅ NIEUW (optioneel)
};

export default function PageHero({ title, subtitle, extra }: Props) {
  return (
    <section className="py-16 border-b bg-white">
      <div className="max-w-4xl mx-auto px-6 text-center">
        
        <h1 className="text-4xl md:text-5xl font-bold mb-5">
          {title}
        </h1>

        <p className="text-lg text-slate-600 mb-4">
          {subtitle}
        </p>

        {/* ✅ NIEUW: alleen zichtbaar als gebruikt */}
        {extra && (
          <p className="text-sm text-slate-500">
            {extra}
          </p>
        )}

      </div>
    </section>
  );
}