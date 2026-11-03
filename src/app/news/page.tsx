import { NewsLink, NewsViewer  } from "@/components/news";
import { PageHero, SectionHeading } from "@/components/layout";
import { NewsPost, NewsPosts, formatDate } from "@/lib/newsPosts";

export const metadata = {
  title: "News",
};

const NEW_POSTS_COUNT = 3;


function NewsCard({ item }: { item: NewsPost }) {
  return (
    <article className="rounded-xl border border-puffin-blue/10 bg-white p-6 shadow-sm">
      <time dateTime={item.date} className="text-sm font-bold text-puffin-orange">
        {formatDate(item.date)}
      </time>
      <h3 className="mt-1 text-lg font-semibold text-puffin-navy">{item.title}</h3>
      {item.content && (
        <p className="mt-2 text-sm text-puffin-gray leading-relaxed">{item.content}</p>
      )}
      {item.link && (
        <div className="mt-3">
          <NewsLink link={item.link} />
        </div>
      )}
    </article>
  );
}

export default function NewsPage() {
  const sortedPosts = [...NewsPosts].sort((a, b) => b.date.localeCompare(a.date));
  const newPosts = sortedPosts.slice(0, NEW_POSTS_COUNT); // newest, shown in the viewer
  const oldPosts = sortedPosts.slice(NEW_POSTS_COUNT); // oldest, shown below

  return (
    <>
      <PageHero
        title="News"
        subtitle="Updates, publications, and milestones from the Puffin Lab."
      />

      {/* News Posts */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading title="Posts" />
          <NewsViewer posts={newPosts} />
        </div>
      </section>

      {/* Old News */}
      <section className="py-16 md:py-20 bg-white">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading title="Previous Updates" />
          <div className="space-y-4">
            {oldPosts.map((item) => (
              <NewsCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
