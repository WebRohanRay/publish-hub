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
    description: "In-depth app reviews, free vs paid breakdowns, match rates, and real user experiences.",
    count: 38,
  },
  {
    id: "cat-gambling",
    name: "Casino & Sports Betting",
    slug: "gambling-casino",
    description: "Regulated casinos, instant crypto payouts, sportsbook odds, and audited bonus codes.",
    count: 46,
  },
  {
    id: "cat-adult",
    name: "Adult Entertainment & Creators",
    slug: "adult-lifestyle",
    description: "Creator platforms, webcam networks, discreet billing analysis, and adult gaming tech.",
    count: 29,
  },
  {
    id: "cat-guides",
    name: "Privacy, Crypto & Guides",
    slug: "guides-security",
    description: "VPN recommendations, anonymous billing, crypto deposits, and safety best practices.",
    count: 21,
  },
];

export const INITIAL_POSTS: Post[] = [
  {
    id: "post-dating-1",
    title: "Best Dating Apps of 2026: The Definitive Free vs. VIP Breakdown",
    slug: "best-dating-apps-free-vs-paid-breakdown",
    excerpt: "We tested 18 top matchmaking and casual dating platforms to uncover which subscriptions actually deliver real connections versus paywalled vanity.",
    category: "Dating & Matchmaking",
    categorySlug: "dating",
    status: "published",
    readingTime: "7 min read",
    image: "/art/dating_comparison_guide.jpg",
    reads: 42890,
    likes: 1842,
    commentsCount: 38,
    publishedAt: "Sep 20, 2026",
    badge: "Editor's Top Pick",
    bonusText: "Free 7-Day Trial + Boosted Profile Visibility",
    affiliateUrl: "#dating-offer",
    author: {
      name: "Maya Patel",
      avatar: "/avatars/avatar_maya_patel.jpg",
      role: "Lead Lifestyle Editor",
    },
    content: `
Modern dating apps have split into two distinct tiers: mainstream algorithmic matchmakers that throttle free visibility, and high-converting platforms built for intentional adults.

### Free vs. Paid: What Are You Actually Buying?

In our 60-day hands-on evaluation of 18 leading platforms, we analyzed reply curves, bot filtering efficiency, and subscription cancellation transparency:

1. **Verification & Bot Suppression**: Platforms with mandatory selfie verification showed a 74% decrease in ghost profiles and automated spam bots.
2. **Reply Latency**: Premium tiers granting priority inbox placement delivered 3.2× faster mutual responses than unpaid standard accounts.
3. **Billing Clarity**: We strictly grade platforms based on one-click subscription cancellation and transparent renewal notifications.

### Top Tips for Maximizing Match Rates

- **Quality Photos Over Quantity**: Profiles with 3 high-contrast, candid photos received 58% more direct replies than those with 6+ staged selfies.
- **Direct Icebreakers**: Skip generic greetings; referencing shared lifestyle interests or favorite nightlife venues increases conversation longevity.
    `,
  },
  {
    id: "post-casino-1",
    title: "Top Regulated Casinos & Sportsbooks: Instant Payouts & 2026 Fair Odds",
    slug: "top-regulated-casinos-sportsbooks-instant-payouts",
    excerpt: "Complete evaluation of licensed iGaming operators, withdrawal speeds across crypto and wire rails, and transparent matched bonus rollover rules.",
    category: "Casino & Sports Betting",
    categorySlug: "gambling-casino",
    status: "published",
    readingTime: "8 min read",
    image: "/art/casino_betting_hero.jpg",
    reads: 51200,
    likes: 2410,
    commentsCount: 52,
    publishedAt: "Sep 19, 2026",
    badge: "Highest Payout Rate",
    bonusText: "100% Match up to $2,500 + 100 Free Spins",
    affiliateUrl: "#casino-offer",
    author: {
      name: "Maya Patel",
      avatar: "/avatars/avatar_maya_patel.jpg",
      role: "Lead Gaming Editor",
    },
    content: `
When selecting an online sportsbook or licensed digital casino, flashy promotional banners matter far less than withdrawal clearance speed and independently audited RTP percentages.

### Auditing Withdrawal Speeds Across Payment Rails

We tested real financial deposits and withdrawals across major operators:
- **Crypto Rails (USDT/BTC)**: Average settlement within 18 minutes of request approval.
- **E-Wallets**: Average clearance in 2 to 4 hours with minimal transaction overhead.
- **Traditional Cards/Wires**: 24 to 72 hours depending on bank verification.

### Understanding Bonus Rollover Requirements

A 200% match bonus is only valuable if the wagering requirement is achievable. We recommend operators with rollover thresholds below 35× and transparent contributions on table games and live dealers.
    `,
  },
  {
    id: "post-adult-1",
    title: "The Rise of Creator-Led Adult Platforms: Privacy, Billing & Top Networks",
    slug: "creator-adult-platforms-privacy-billing-review",
    excerpt: "An in-depth analysis of premium creator subscriptions, discreet billing descriptors, high-definition streaming performance, and consumer privacy controls.",
    category: "Adult Entertainment & Creators",
    categorySlug: "adult-lifestyle",
    status: "published",
    readingTime: "6 min read",
    image: "/art/adult_lifestyle_hero.jpg",
    reads: 36400,
    likes: 1290,
    commentsCount: 27,
    publishedAt: "Sep 18, 2026",
    badge: "Discreet Billing",
    bonusText: "Complimentary HD Preview Tokens",
    affiliateUrl: "#adult-offer",
    author: {
      name: "Maya Patel",
      avatar: "/avatars/avatar_maya_patel.jpg",
      role: "Digital Culture Editor",
    },
    content: `
Adult digital entertainment has migrated rapidly toward creator-owned networks and high-fidelity interactive platforms.

### Consumer Privacy & Payment Discretion

For consumers, privacy is the number one priority. Our review framework assesses:
1. **Billing Statement Discretion**: How charges appear on bank statements (neutral corporate descriptors vs. explicit naming).
2. **Anonymous Payment Support**: Integration of cryptocurrency, prepaid vouchers, and virtual cards.
3. **Data Retention & Account Purging**: Clear options to permanently delete account history, chat logs, and billing tokens.

### Platform Performance & Interaction Quality

Top-tier creator platforms stand out by offering ultra-low latency interactive streaming, tipping systems with transparent fee structures, and exclusive 4K on-demand content archives.
    `,
  },
  {
    id: "post-guides-1",
    title: "Cryptocurrency & Anonymous Payments: The Ultimate Guide to Discreet Subscriptions",
    slug: "cryptocurrency-anonymous-payments-discreet-subscriptions-guide",
    excerpt: "How to use USDT, Bitcoin, burner cards, and privacy-focused VPNs to protect your financial footprint across dating, gaming, and online memberships.",
    category: "Privacy, Crypto & Guides",
    categorySlug: "guides-security",
    status: "published",
    readingTime: "5 min read",
    image: "/art/dating_apps_hero.jpg",
    reads: 28950,
    likes: 950,
    commentsCount: 19,
    publishedAt: "Sep 16, 2026",
    badge: "Essential Guide",
    author: {
      name: "Maya Patel",
      avatar: "/avatars/avatar_maya_patel.jpg",
      role: "Security & Privacy Specialist",
    },
    content: `
Managing digital subscriptions across dating apps, regulated gaming sites, and entertainment platforms requires thoughtful financial hygiene.

### Recommended Privacy Stack for 2026

1. **Virtual Burner Cards**: Use single-merchant virtual debit cards with customized spending limits to prevent surprise auto-renewals.
2. **Stablecoins on Low-Fee Chains**: Depositing via USDT or USDC on fast networks guarantees instant settlement without sharing credit card numbers.
3. **Dedicated Email Aliases**: Maintain separate email accounts for entertainment services to prevent inbox clustering and credential exposure.
    `,
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
    createdAt: "25m ago",
    status: "approved",
  },
  {
    id: "comm-2",
    postId: "post-casino-1",
    postTitle: "Top Regulated Casinos & Sportsbooks",
    authorName: "Oliver Grant",
    authorEmail: "oliver.g@sportsbeat.uk",
    body: "Finally a review that transparently explains the rollover terms and payout speed instead of just headline bonuses.",
    createdAt: "1h ago",
    status: "approved",
  },
  {
    id: "comm-3",
    postId: "post-adult-1",
    postTitle: "The Rise of Creator-Led Adult Platforms",
    authorName: "Marcus Sterling",
    authorEmail: "marcus@example.com",
    body: "Appreciate the clear breakdown of discreet billing descriptors. Very helpful guide.",
    createdAt: "3h ago",
    status: "approved",
  },
];
