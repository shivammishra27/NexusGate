const requests = new Map();

const WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS = 10;     // 10 requests per minute

function rateLimiter(req, res, next) {
    const key = req.headers.authorization || req.ip;
    const now = Date.now();

    let record = requests.get(key);

    // First request OR 1 minute completed
    if (!record || now - record.startTime >= WINDOW_MS) {
        record = {
            count: 0,
            startTime: now
        };
    }

    record.count++;

    requests.set(key, record);

    const remaining = Math.max(0, MAX_REQUESTS - record.count);

    // Rate limit headers
    res.setHeader("X-RateLimit-Limit", MAX_REQUESTS);
    res.setHeader("X-RateLimit-Remaining", remaining);

    if (record.count > MAX_REQUESTS) {
        return res.status(429).json({
            success: false,
            message: "Rate limit exceeded. Try again later."
        });
    }

    next();
}

module.exports = rateLimiter;