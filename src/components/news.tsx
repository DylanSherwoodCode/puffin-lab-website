"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { formatDate, type NewsPost } from "@/lib/newsPosts";


export function NewsLink({ link }: { link: NonNullable<NewsPost["link"]> }) {
  const className = "text-xs font-medium text-puffin-sky hover:underline";

  // External links open in a new tab; internal links use Next's <Link>
  if (link.href.startsWith("http")) {
    return (
      <a href={link.href} target="_blank" rel="noopener noreferrer" className={className}>
        {link.label} →
      </a>
    );
  }

  return (
    <Link href={link.href} className={className}>
      {link.label} →
    </Link>
  );
}

//Allows multiple images to be cycled through
function ImageCarousel({ images }: { images: string[] }) {
  const [index, setIndex] = useState(0);
  const count = images.length;

  // Wraps around: going "next" on the last image returns to the first
  const go = (step: number) => setIndex((i) => (i + step + count) % count);

  const arrowClass =
    "absolute top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-white/85 text-xl text-puffin-navy shadow hover:bg-white";

  return (
    <div className="relative aspect-video bg-puffin-navy/5">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={images[index]} alt="" className="h-full w-full object-cover" />

      {/* Only show controls when there's more than one image */}
      {count > 1 && (
        <>
          <button type="button" onClick={() => go(-1)} aria-label="Previous image" className={`${arrowClass} left-3`}>
            ‹
          </button>
          <button type="button" onClick={() => go(1)} aria-label="Next image" className={`${arrowClass} right-3`}>
            ›
          </button>
          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Show image ${i + 1} of ${count}`}
                aria-current={i === index ? "true" : undefined}
                className={`h-2 w-2 rounded-full ${i === index ? "bg-white" : "bg-white/50 hover:bg-white/80"}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export function NewsViewer({ posts }: { posts: NewsPost[] }) {
  const [selectedId, setSelectedId] = useState(posts[0]?.id);

  // Open the post named in the URL, e.g. /news#example-post, so a post can be shared by link
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (posts.some((p) => p.id === id)) setSelectedId(id);
  }, [posts]);

  function selectPost(id: string) {
    setSelectedId(id);
    window.history.replaceState(null, "", `#${id}`);
  }

  const selected = posts.find((p) => p.id === selectedId) ?? posts[0];

  if (!selected) {
    return <p className="text-puffin-gray">No posts yet. Check back soon!</p>;
  }

  return (
    <div className="grid gap-6 md:grid-cols-[16rem_1fr]">
      {/* Post list: a swipeable row on phones, a sticky column on desktop */}
      <nav aria-label="Posts" className="md:sticky md:top-24 md:self-start">
        <ul className="flex gap-2 overflow-x-auto pb-2 md:block md:space-y-2 md:overflow-visible md:pb-0">
          {posts.map((post) => {
            const isSelected = post.id === selected.id;
            return (
              <li key={post.id} className="w-56 shrink-0 md:w-auto">
                <button
                  type="button"
                  onClick={() => selectPost(post.id)}
                  aria-current={isSelected ? "true" : undefined}
                  className={`w-full rounded-lg border px-4 py-3 text-left transition-colors ${
                    isSelected
                      ? "border-puffin-navy bg-puffin-navy"
                      : "border-puffin-blue/10 bg-white hover:border-puffin-blue/30"
                  }`}
                >
                  <span
                    className={`block text-xs font-bold ${
                      isSelected ? "text-white/80" : "text-puffin-orange"
                    }`}
                  >
                    {formatDate(post.date)}
                  </span>
                  <span
                    className={`mt-0.5 block text-sm font-semibold ${
                      isSelected ? "text-white" : "text-puffin-navy"
                    }`}
                  >
                    {post.title}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Selected post */}
      <article className="overflow-hidden rounded-xl border border-puffin-blue/10 bg-white shadow-sm">
          {selected.images && selected.images.length > 0 && (
          <ImageCarousel key={selected.id} images={selected.images} />
        )}

        <div className="p-6 md:p-8">
          <time dateTime={selected.date} className="text-sm font-bold text-puffin-orange">
            {formatDate(selected.date)}
          </time>
          <h3 className="mt-1 text-2xl font-semibold text-puffin-navy">{selected.title}</h3>
          <div className="mt-4 space-y-4 text-puffin-gray leading-relaxed">
            {selected.content.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
            {selected.link && (
            <div className="mt-6">
              <NewsLink link={selected.link} />
            </div>
          )}
        </div>
      </article>
    </div>
  );
}
