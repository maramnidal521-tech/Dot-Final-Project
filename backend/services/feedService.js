<<<<<<< HEAD
const Post = require('../models/postSchema');
const cache = require('../utils/cache');
const { getFallbackPosts } = require('./externalFallback');
const FEED_LIMIT_DEFAULT = 12;
const FEED_LIMIT_MAX = 30;
const encodeCursor = (rankScore, id) =>
  Buffer.from(`${rankScore}:${id}`).toString('base64url');

const decodeCursor = (cursor) => {
  try {
    const [rankScore, id] = Buffer.from(cursor, 'base64url').toString().split(':');
=======
const Post = require("../models/postSchema");
const cache = require("../utils/cache");
const { getFallbackPosts } = require("./externalFallback");
const FEED_LIMIT_DEFAULT = 12;
const FEED_LIMIT_MAX = 30;
const encodeCursor = (rankScore, id) =>
  Buffer.from(`${rankScore}:${id}`).toString("base64url");

const decodeCursor = (cursor) => {
  try {
    const [rankScore, id] = Buffer.from(cursor, "base64url")
      .toString()
      .split(":");
>>>>>>> cbe83063ac707c9ed114a8777998fc4fc83d01ba

    return {
      rankScore: parseFloat(rankScore),
      id,
    };
<<<<<<< HEAD

=======
>>>>>>> cbe83063ac707c9ed114a8777998fc4fc83d01ba
  } catch {
    return null;
  }
};
const buildFilter = ({ type, city, category, cursor }) => {
<<<<<<< HEAD
  const filter = { status: 'approved', isResolved: false };
  if (type && type !== 'all') filter.type = type;
  if (city && city !== 'all') filter.city = city;
  if (category && category !== 'all') filter.category = category;
=======
  const filter = { status: "approved", isResolved: false };
  if (type && type !== "all") filter.type = type;
  if (city && city !== "all") filter.city = city;
  if (category && category !== "all") filter.category = category;
>>>>>>> cbe83063ac707c9ed114a8777998fc4fc83d01ba
  if (cursor) {
    const decoded = decodeCursor(cursor);
    if (decoded) {
      filter.$or = [
        { rankScore: { $lt: decoded.rankScore } },
        { rankScore: decoded.rankScore, _id: { $lt: decoded.id } },
      ];
    }
  }

  return filter;
};
const POPULATE = [
<<<<<<< HEAD
  { path: 'user', select: 'name avatar _id' },
  { path: 'category', select: 'name icon' },
];

const PROJECTION = { type: 1, title: 1, description: 1, images: 1, city: 1, area: 1, location: 1, status: 1, isResolved: 1, itemDate: 1, reward: 1, likesCount: 1, commentsCount: 1, viewsCount: 1, rankScore: 1, createdAt: 1, lastActivityAt: 1, user: 1, category: 1 };

const feedService = {

  async getFeed({ type = 'all', city, category, cursor, limit: rawLimit }) {
    const limit = Math.min(parseInt(rawLimit) || FEED_LIMIT_DEFAULT, FEED_LIMIT_MAX);
    // key خاص بالكاش حسب الفلاتر
    const cacheKey = `feed:${type}:${city || 'all'}:${category || 'all'}:${cursor || 'start'}`;
=======
  { path: "user", select: "name avatar _id" },
  { path: "category", select: "name icon" },
];

const PROJECTION = {
  type: 1,
  title: 1,
  description: 1,
  images: 1,
  city: 1,
  area: 1,
  location: 1,
  status: 1,
  isResolved: 1,
  itemDate: 1,
  reward: 1,
  likesCount: 1,
  commentsCount: 1,
  viewsCount: 1,
  rankScore: 1,
  createdAt: 1,
  lastActivityAt: 1,
  user: 1,
  category: 1,
};

const feedService = {
  async getFeed({ type = "all", city, category, cursor, limit: rawLimit }) {
    const limit = Math.min(
      parseInt(rawLimit) || FEED_LIMIT_DEFAULT,
      FEED_LIMIT_MAX,
    );
    // key خاص بالكاش حسب الفلاتر
    const cacheKey = `feed:${type}:${city || "all"}:${category || "all"}:${cursor || "start"}`;
>>>>>>> cbe83063ac707c9ed114a8777998fc4fc83d01ba
    const cached = cache.get(cacheKey);
    // اذا موجود بالكاش رجعه مباشرة
    if (cached) {
      return {
        ...cached,
        fromCache: true,
      };
    }

    const filter = buildFilter({ type, city, category, cursor });
    const posts = await Post.find(filter, PROJECTION)
      .populate(POPULATE)
      .sort({ rankScore: -1, _id: -1 })
      .limit(limit)
      .lean();

    let usedFallback = false;
    let finalPosts = posts;

    // اذا البوستات قليلة نجيب بيانات خارجية
<<<<<<< HEAD
    if (posts.length < Math.ceil(limit * 0.5)) {
      const needed = limit - posts.length;
      const fallback = await getFallbackPosts({
        type,
        city: city || 'all',
=======
    if (
      process.env.ENABLE_EXTERNAL_FALLBACK === "true" &&
      posts.length < Math.ceil(limit * 0.5)
    ) {
      const needed = limit - posts.length;
      const fallback = await getFallbackPosts({
        type,
        city: city || "all",
>>>>>>> cbe83063ac707c9ed114a8777998fc4fc83d01ba
        page: 1,
        limit: needed + 5,
      });

      finalPosts = [...posts, ...fallback.posts]
        .sort((a, b) => {
          const aScore = a.rankScore || 0;
          const bScore = b.rankScore || 0;
          if (bScore !== aScore) return bScore - aScore;
          return b._id.toString().localeCompare(a._id.toString());
        })
        .slice(0, limit);

      usedFallback = true;
    }
    let nextCursor = null;
    if (finalPosts.length === limit) {
      const last = finalPosts[finalPosts.length - 1];
      if (!last.isFallback && last._id) {
        nextCursor = encodeCursor(last.rankScore || 0, last._id.toString());
      }
    }
    const hasMore = nextCursor !== null || usedFallback;
    const result = {
      posts: finalPosts,
      nextCursor,
      hasMore,
      count: finalPosts.length,
      usedFallback,
    };
    cache.set(cacheKey, result, cursor ? 60 : 30);

    return result;
  },
  // like / unlike
  async toggleLike(postId, postType, userId) {
    const post = await Post.findOne({ _id: postId, type: postType });
    if (!post) {
      throw {
        status: 404,
<<<<<<< HEAD
        message: 'Post not found',
      };
    }

    const alreadyLiked = post.likes.some(id =>
      id?.equals ? id.equals(userId) : id.toString() === userId.toString()
=======
        message: "Post not found",
      };
    }

    const alreadyLiked = post.likes.some((id) =>
      id?.equals ? id.equals(userId) : id.toString() === userId.toString(),
>>>>>>> cbe83063ac707c9ed114a8777998fc4fc83d01ba
    );

    if (alreadyLiked) {
      post.likes.pull(userId);
    } else {
      post.likes.addToSet(userId);
<<<<<<< HEAD
    } await post.save();
    cache.del('feed:*');
=======
    }
    await post.save();
    cache.del("feed:*");
>>>>>>> cbe83063ac707c9ed114a8777998fc4fc83d01ba
    return {
      liked: !alreadyLiked,
      likesCount: post.likesCount,
      rankScore: post.rankScore,
    };
  },
  async addComment(postId, postType, userId, text) {
    if (!text?.trim()) {
      throw {
        status: 400,
<<<<<<< HEAD
        message: 'Comment text required',
      };
    }const post = await Post.findOne({ _id: postId, type: postType });
    if (!post) {
      throw {
        status: 404,
        message: 'Post not found',
=======
        message: "Comment text required",
      };
    }
    const post = await Post.findOne({ _id: postId, type: postType });
    if (!post) {
      throw {
        status: 404,
        message: "Post not found",
>>>>>>> cbe83063ac707c9ed114a8777998fc4fc83d01ba
      };
    }
    const comment = {
      user: userId,
      text: text.trim(),
    };
    post.comments.push(comment);
    await post.save();
    const newComment = post.comments[post.comments.length - 1];
<<<<<<< HEAD
    cache.del('feed:*');
=======
    cache.del("feed:*");
>>>>>>> cbe83063ac707c9ed114a8777998fc4fc83d01ba
    return {
      comment: newComment,
      commentsCount: post.commentsCount,
    };
  },
  async getPostById(postId, postType, userId) {
    const post = await Post.findOneAndUpdate(
      { _id: postId, type: postType },
      { $inc: { viewsCount: 1 } },
<<<<<<< HEAD
      { new: true })
      .populate([
        { path: 'user', select: 'name avatar _id' },
        { path: 'category', select: 'name icon' },
        { path: 'comments.user', select: 'name avatar _id' },])
=======
      { new: true },
    )
      .populate([
        { path: "user", select: "name avatar _id" },
        { path: "category", select: "name icon" },
        { path: "comments.user", select: "name avatar _id" },
      ])
>>>>>>> cbe83063ac707c9ed114a8777998fc4fc83d01ba
      .lean();
    if (!post) {
      throw {
        status: 404,
<<<<<<< HEAD
        message: 'Post not found',
      };
    }
    const isLiked = userId
      ? post.likes?.some(id => id.toString() === userId.toString()): false;
=======
        message: "Post not found",
      };
    }
    const isLiked = userId
      ? post.likes?.some((id) => id.toString() === userId.toString())
      : false;
>>>>>>> cbe83063ac707c9ed114a8777998fc4fc83d01ba
    return {
      ...post,
      type: postType,
      isLiked,
    };
  },
  async recomputeAllRankScores() {
    const posts = await Post.find({
<<<<<<< HEAD
      status: 'approved',
      isResolved: false,
    });
    const bulk = posts.map(post => ({
=======
      status: "approved",
      isResolved: false,
    });
    const bulk = posts.map((post) => ({
>>>>>>> cbe83063ac707c9ed114a8777998fc4fc83d01ba
      updateOne: {
        filter: { _id: post._id },
        update: {
          $set: {
            rankScore: post.computeRankScore(),
          },
        },
      },
    }));
    if (bulk.length) {
      await Post.bulkWrite(bulk);
    }
<<<<<<< HEAD
    cache.del('feed:*');
    return {
      lostCount: posts.filter(post => post.type === 'lost').length,
      foundCount: posts.filter(post => post.type === 'found').length,
=======
    cache.del("feed:*");
    return {
      lostCount: posts.filter((post) => post.type === "lost").length,
      foundCount: posts.filter((post) => post.type === "found").length,
>>>>>>> cbe83063ac707c9ed114a8777998fc4fc83d01ba
    };
  },
};

module.exports = feedService;
