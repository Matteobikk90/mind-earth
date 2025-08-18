"use client";

export default function Loader() {
  return (
    <div
      role="status"
      className="-translate-1/2 absolute left-1/2 top-1/2 flex w-full items-center justify-center"
      aria-label="Loading"
    >
      <span
        className="border-accent h-12 w-12 animate-spin rounded-full border-4 border-t-transparent"
        aria-label="Loading"
      />
    </div>
  );
}
