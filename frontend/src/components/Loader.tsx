"use client";

export default function Loader() {
  return (
    <div role="status" className="flex w-full items-center justify-center" aria-label="Loading">
      <span
        className="border-primary h-12 w-12 animate-spin rounded-full border-4 border-t-transparent"
        aria-label="Loading"
      />
    </div>
  );
}
