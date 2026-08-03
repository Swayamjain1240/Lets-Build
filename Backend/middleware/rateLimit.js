import {rateLimit} from "express-rate-limit"

const ratelimit =  rateLimit({
    windowMS: 15*60*1000,
    limit:50,
    standardHeaders: 'draft-7',
    legacyHeaders: '',
    message:"Too many requests from this IP, please try again later."
})

export default ratelimit;