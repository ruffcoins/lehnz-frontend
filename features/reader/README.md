# Reader Feature Components

A collection of reusable components for the reader experience.

## Components

### GuideCard

Standard guide card for grid layouts.

```tsx
import { GuideCard } from "@/features/reader";

<GuideCard
  guide={guide}
  index={0}
  onBookmark={(guideId, bookmarked) => console.log(guideId, bookmarked)}
/>;
```

### FeaturedGuideCard

Enhanced card for featured guides with gradient background.

```tsx
import { FeaturedGuideCard } from "@/features/reader";

<FeaturedGuideCard guide={guide} index={0} />;
```

### GuideCardSkeleton

Loading placeholder for guide cards.

```tsx
import { GuideCardSkeleton } from "@/features/reader";

<GuideCardSkeleton />;
```

### FilterBar

Combined topic filters and sort controls.

```tsx
import { FilterBar } from "@/features/reader";

<FilterBar
  selectedTags={["All"]}
  onTagsChange={tags => setTags(tags)}
  sortBy="newest"
  onSortChange={sort => setSort(sort)}
/>;
```

### TopCreatorsSidebar

Displays top creators with follow functionality.

```tsx
import { TopCreatorsSidebar } from "@/features/reader";

<TopCreatorsSidebar />;
```

### RecentlyPublishedSidebar

Shows recently published guides.

```tsx
import { RecentlyPublishedSidebar } from "@/features/reader";

<RecentlyPublishedSidebar />;
```

### FloatingActions

Sticky action buttons for guide detail pages.

```tsx
import { FloatingActions } from "@/features/reader";

<FloatingActions
  guideId="guide-id"
  authorId="author-id"
  isBookmarked={false}
  isFollowing={false}
  isLiked={false}
  onBookmark={bookmarked => console.log(bookmarked)}
  onFollow={following => console.log(following)}
  onLike={liked => console.log(liked)}
/>;
```

### CommentsSection

Display and add comments on guides.

```tsx
import { CommentsSection } from "@/features/reader";

<CommentsSection guideId="guide-id" comments={comments} />;
```

### SuggestedGuides

Show related guides based on tags.

```tsx
import { SuggestedGuides } from "@/features/reader";

<SuggestedGuides currentGuideId="guide-id" tags={["LLMs", "RAG"]} />;
```

## Hooks

### useGuides

Fetch and filter guides.

```tsx
import { useGuides } from "@/features/reader";

const { data, isLoading } = useGuides({
  search: "RAG",
  tags: ["LLMs"],
  sort: "newest",
  page: 1,
  limit: 10,
});
```

### useFeaturedGuides

Get featured guides.

```tsx
import { useFeaturedGuides } from "@/features/reader";

const { data: featuredGuides, isLoading } = useFeaturedGuides();
```

### useGuideBySlug

Fetch a single guide.

```tsx
import { useGuideBySlug } from "@/features/reader";

const { data: guide, isLoading } = useGuideBySlug("guide-slug");
```

### useBookmarkGuide

Bookmark/unbookmark guides.

```tsx
import { useBookmarkGuide } from "@/features/reader";

const bookmarkMutation = useBookmarkGuide();

bookmarkMutation.mutate({
  guideId: "guide-id",
  bookmarked: true,
});
```

### useFollowAuthor

Follow/unfollow authors.

```tsx
import { useFollowAuthor } from "@/features/reader";

const followMutation = useFollowAuthor();

followMutation.mutate({
  authorId: "author-id",
  following: true,
});
```

### useSavedGuides

Get user's saved guides.

```tsx
import { useSavedGuides } from "@/features/reader";

const { data: savedGuides, isLoading } = useSavedGuides();
```

### useRemoveFromReadingList

Remove guide from reading list.

```tsx
import { useRemoveFromReadingList } from "@/features/reader";

const removeMutation = useRemoveFromReadingList();

removeMutation.mutate("guide-id");
```

### useTopCreators

Get top creators.

```tsx
import { useTopCreators } from "@/features/reader";

const { data: creators, isLoading } = useTopCreators(5);
```

## Types

All TypeScript types are exported from the main index:

```tsx
import type { Guide, Comment, TopCreator, SortOption, TagFilter } from "@/features/reader";
```

### Guide Interface

```typescript
interface Guide {
  id: string;
  slug: string;
  title: string;
  description: string;
  excerpt: string;
  content: {
    problemOverview: string;
    technicalSolution: string;
  };
  author: {
    id: string;
    name: string;
    avatar?: string;
    bio?: string;
  };
  tags: string[];
  category: string;
  readTime: string;
  publishedAt: string;
  updatedAt: string;
  stats: {
    views: number;
    likes: number;
    bookmarks: number;
    comments?: number;
  };
  isFeatured?: boolean;
  isBookmarked?: boolean;
}
```

## Styling

All components use:

- TailwindCSS utility classes
- CSS variables for theming
- Framer Motion for animations
- Responsive design patterns

## Animation

Components use Framer Motion with:

- Fade-in on mount
- Staggered list animations
- Smooth hover transitions
- Page transitions

Example animation pattern:

```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  {/* Content */}
</motion.div>
```
