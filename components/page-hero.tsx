type Props = {
  title: string;
  subtitle: string;
};

export default function PageHero({ title, subtitle }: Props) {
  return (
    <section className="py-16 border-b bg-white">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-5">{title}</h1>
        <p className="text-lg text-slate-600">{subtitle}</p>
      </div>
    </section>
  );
}