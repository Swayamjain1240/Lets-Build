import {rateLimit} from "express-rate-limit"

const RateLimit =  rateLimit({
    windowMS: 15*60*1000,
    limit:50,
    standardHeaders: 'true',
    legacyHeaders: 'false',
    message:"Too many requests from this IP, please try again later."
})

export default RateLimit;