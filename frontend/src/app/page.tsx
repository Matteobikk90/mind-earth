export default function Home() {
  return (
    <main className="bg-background text-foreground flex min-h-[calc(100vh-4rem)] items-center justify-center">
      <article className="bg-foreground/5 max-w-lg rounded-2xl p-8 text-center shadow-lg">
        <h1 className="font-sans text-3xl font-bold">Welcome to MindEarth</h1>
        <p className="mt-4 text-base opacity-80">
          {`You’re not logged in yet. Please log in to explore the interactive map
          and population data.`}
        </p>
        <button className="bg-primary hover:bg-primary/90 mt-6 rounded-full px-6 py-3 font-semibold text-white transition">
          Log In
        </button>
      </article>
    </main>
  );
}
