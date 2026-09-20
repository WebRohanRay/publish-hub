export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  categorySlug: string;
  status: "published" | "draft" | "scheduled" | "archived" | "trash";
  readingTime: string;
  image: string;
  reads: number;
  likes: number;
  commentsCount: number;
  publishedAt: string;
  rating?: number;
  badge?: string;
  bonusText?: string;
  affiliateUrl?: string;
  pros?: string[];
  cons?: string[];
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  content?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  count: number;
}

export interface CommentItem {
  id: string;
  postId: string;
  postTitle: string;
  authorName: string;
  authorEmail: string; // private, never shown publicly
  body: string;
  createdAt: string;
  status: "pending" | "approved" | "spam" | "trash";
}

export const INITIAL_CATEGORIES: Category[] = [
  {
    id: "cat-dating",
    name: "Dating & Matchmaking",
    slug: "dating",
    description: "In-depth comparisons, verified app reviews, and free vs. paid breakdowns.",
    count: 38,
  },
  {
    id: "cat-betting",
    name: "Casino & Sports Betting",
    slug: "igaming-betting",
    description: "Regulated casino reviews, real odds breakdowns, and exclusive bonus offers.",
    count: 46,
  },
  {
    id: "cat-ideas",
    name: "Ideas & Culture",
    slug: "ideas-culture",
    description: "Systems thinking, tech evolution, and shifts in digital society.",
    count: 24,
  },
  {
    id: "cat-design",
    name: "Design & Product",
    slug: "design-practice",
    description: "High-converting UI, interface psychology, and digital craftsmanship.",
    count: 31,
  },
];

export const INITIAL_POSTS: Post[] = [
  {
    id: "post-dating-1",
    title: "Best Dating Apps of 2026: The Definitive Free vs. VIP Breakdown",
    slug: "best-dating-apps-free-vs-paid-breakdown",
    excerpt: "We tested 18 top dating platforms to reveal which subscriptions actually deliver real matches and which are paywalled vanity.",
    category: "Dating & Matchmaking",
    categorySlug: "dating",
    status: "published",
    readingTime: "7 min read",
    image: "/art/dating_comparison_guide.jpg",
    reads: 42190,
    likes: 1420,
    commentsCount: 34,
    publishedAt: "Sep 20, 2026",
    rating: 4.9,
    badge: "Editor's Top Pick",
    bonusText: "Free 7-Day VIP Trial + Unlimited Swipes",
    affiliateUrl: "#claim-dating-offer",
    pros: [
      "Rigorous photo & ID verification eliminates bots",
      "Algorithmic compatibility scoring based on real behavior",
      "Free tier includes 5 free direct messages daily",
    ],
    cons: [
      "Travel mode requires premium tier",
      "Higher subscription price on iOS App Store than web",
    ],
    author: {
      name: "Maya Patel",
      avatar: "/avatars/avatar_maya_patel.jpg",
      role: "Lead Tech & Lifestyle Editor",
    },
    content: `
Dating apps have undergone a radical transformation. The era of mindless swiping is winding down, replaced by intentional matchmaking platforms that leverage behavior-driven compatibility.

### Free vs. Paid: What Are You Really Paying For?

In our 60-day rigorous testing across 18 major platforms, we found that 72% of free tiers throttle message visibility once match queues exceed 15 connections. The top-performing platforms, however, give free users genuine access while reserving priority spotlights and read receipts for VIP tiers.

### Our Top Evaluation Metrics
1. **Verification Accuracy**: How effectively the platform weeds out scammers and fake profiles.
2. **Active Response Rate**: Average time between initial greeting and meaningful conversation.
3. **Cancellation Transparency**: Ease of pausing or terminating recurring subscriptions.
    `,
  },
  {
    id: "post-casino-1",
    title: "Top Regulated Casinos & Sportsbooks: 2026 Bonus Roundups & Fair Odds",
    slug: "top-regulated-casinos-sportsbooks-bonus-roundups",
    excerpt: "Comprehensive evaluation of payout speeds, licensing transparency, and exclusive matched deposit bonus vouchers up to €5,000.",
    category: "Casino & Sports Betting",
    categorySlug: "igaming-betting",
    status: "published",
    readingTime: "9 min read",
    image: "/art/casino_betting_hero.jpg",
    reads: 38840,
    likes: 980,
    commentsCount: 22,
    publishedAt: "Sep 19, 2026",
    rating: 4.8,
    badge: "Highest Payout Rate",
    bonusText: "100% Match up to €5,000 + 150 Free Spins",
    affiliateUrl: "#claim-casino-bonus",
    pros: [
      "Instant crypto and wire withdrawals within 15 minutes",
      "Official licensing with independently audited RNG fair play",
      "Live dealer games with 4K multi-angle streaming",
    ],
    cons: [
      "30x wagering requirement on welcome bonus",
      "Certain regional restrictions apply",
    ],
    author: {
      name: "Maya Patel",
      avatar: "/avatars/avatar_maya_patel.jpg",
      role: "Lead Tech & Lifestyle Editor",
    },
    content: `
Navigating online sportsbooks and licensed digital casinos requires discernment. Our editorial team reviewed dozens of platforms to pinpoint operators with stellar regulatory compliance, fast withdrawal pipelines, and fair wagering rules.

### Understanding Bonus Wagering Terms

A 200% match bonus is only as good as its rollover clause. We strictly prioritize operators offering 25x-35x wagering requirements over predatory 60x lockouts. Always ensure that table games and live roulette contribute meaningfully toward your clearance requirements.
    `,
  },
  {
    id: "post-bonuses-1",
    title: "VIP Betting Vouchers: How to Claim €5,000 in Matched Free Bets",
    slug: "vip-betting-vouchers-free-bets-guide",
    excerpt: "Step-by-step guide to unlocking tier-one loyalty rewards, odds boosts, and risk-free accumulator tokens.",
    category: "Casino & Sports Betting",
    categorySlug: "igaming-betting",
    status: "published",
    readingTime: "5 min read",
    image: "/art/free_bet_bonuses.jpg",
    reads: 27150,
    likes: 814,
    commentsCount: 16,
    publishedAt: "Sep 17, 2026",
    rating: 4.7,
    badge: "Exclusive Promo",
    bonusText: "Risk-Free €50 Bet on Premier League / Champions League",
    affiliateUrl: "#claim-vip-vouchers",
    pros: [
      "No deposit required for the first €20 free bet token",
      "Valid on both live in-play and pre-match odds",
    ],
    cons: [
      "Free bet stake is not returned in winnings",
    ],
    author: {
      name: "Maya Patel",
      avatar: "/avatars/avatar_maya_patel.jpg",
      role: "Lead Tech & Lifestyle Editor",
    },
  },
  {
    id: "post-dating-2",
    title: "The Best Dating Apps for Busy Professionals Seeking Real Intent",
    slug: "best-dating-apps-for-busy-professionals",
    excerpt: "Curated matchmaking networks with verified LinkedIn/career screening and scheduled video dates for focused daters.",
    category: "Dating & Matchmaking",
    categorySlug: "dating",
    status: "published",
    readingTime: "6 min read",
    image: "/art/dating_apps_hero.jpg",
    reads: 31400,
    likes: 920,
    commentsCount: 19,
    publishedAt: "Sep 16, 2026",
    rating: 4.8,
    badge: "Best for Relationships",
    bonusText: "Complimentary Profile Audit & 10 Priority Introductions",
    affiliateUrl: "#claim-dating-match",
    author: {
      name: "Maya Patel",
      avatar: "/avatars/avatar_maya_patel.jpg",
      role: "Lead Tech & Lifestyle Editor",
    },
  },
  {
    id: "post-ideas-1",
    title: "A Field Guide to Thinking in Systems",
    slug: "a-field-guide-to-thinking-in-systems",
    excerpt: "The simple mental models that help us see feedback loops, leverage points, and structural incentives.",
    category: "Ideas & Culture",
    categorySlug: "ideas-culture",
    status: "published",
    readingTime: "6 min read",
    image: "/art/story_systems_thinking.jpg",
    reads: 14208,
    likes: 521,
    commentsCount: 9,
    publishedAt: "Sep 14, 2026",
    author: {
      name: "Maya Patel",
      avatar: "/avatars/avatar_maya_patel.jpg",
      role: "Lead Tech & Lifestyle Editor",
    },
  },
  {
    id: "post-design-1",
    title: "Why the Best Products Feel Inevitable",
    slug: "why-the-best-products-feel-inevitable",
    excerpt: "Behind every timeless digital interface and high-converting funnel is a thousand quiet subtractions.",
    category: "Design & Product",
    categorySlug: "design-practice",
    status: "scheduled",
    readingTime: "5 min read",
    image: "/art/story_inevitable_design.jpg",
    reads: 9140,
    likes: 318,
    commentsCount: 6,
    publishedAt: "Scheduled for Sep 24",
    author: {
      name: "Maya Patel",
      avatar: "/avatars/avatar_maya_patel.jpg",
      role: "Lead Tech & Lifestyle Editor",
    },
  },
];

export const INITIAL_COMMENTS: CommentItem[] = [
  {
    id: "comm-1",
    postId: "post-dating-1",
    postTitle: "Best Dating Apps of 2026",
    authorName: "Liam Sterling",
    authorEmail: "liam.s@example.com",
    body: "The breakdown between active response rates versus cosmetic perks was eye-opening. Saved me $60 on a useless subscription.",
    createdAt: "15m ago",
    status: "pending",
  },
  {
    id: "comm-2",
    postId: "post-casino-1",
    postTitle: "Top Regulated Casinos & Sportsbooks",
    authorName: "Oliver Grant",
    authorEmail: "oliver.g@sportsbeat.uk",
    body: "Finally a review that transparently explains the 30x rollover terms instead of just hyping the headline bonus number.",
    createdAt: "42m ago",
    status: "pending",
  },
  {
    id: "comm-3",
    postId: "post-dating-2",
    postTitle: "Best Dating Apps for Busy Professionals",
    authorName: "Sophia Martinez",
    authorEmail: "sophia.m@venture.co",
    body: "Appreciate the focus on privacy and profile verification. Great comparison table.",
    createdAt: "2h ago",
    status: "pending",
  },
];
