export default function rateLimit({ interval, uniqueTokenPerInterval }) {
  const tokenMap = new Map();

  return {
    async check(res, limit, token) {
      const current = tokenMap.get(token) || [];
      const now = Date.now();
      const window = current.filter((t) => now - t < interval);

      if (window.length >= limit) throw new Error("Rate limit exceeded");

      window.push(now);
      tokenMap.set(token, window);
      return true;
    },
  };
}
