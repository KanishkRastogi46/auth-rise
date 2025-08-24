import rateLimit from "express-rate-limit"


/**
 * @desc  Apply rate limiting to all requests
 * @note  Limits each IP to 15 requests per `window` (here, per 15 minutes)
 */
export const limiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	limit: 15,
	standardHeaders: 'draft-8',
	legacyHeaders: true,
	ipv6Subnet: 56, 
})