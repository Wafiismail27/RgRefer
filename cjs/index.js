const { Context, NextFunction } = require("grammy");
/**
 * This library is a middleware for the grammy bot library. It allows you to create a referral system for your bot.
 * Simple to use and easy to understand.
 * Straight to the point.
 */

/**
 * The main function that creates the middleware for the referral system
 * @param options The options for the referral system
 * @returns 
 */
function refer(options) {
    const middlewareFn = async (ctx, next) => {
        if (!ctx.hasChatType("private")) await next()
        if (!ctx.hasCommand("start")) await next()
        if (await options.userExists(ctx.from?.id)) {
            await next()
            return;
        } else {
            await options.onStartUp(ctx);
        }

        const referrer = parseInt(ctx.msg?.text?.split(" ")[1] || "");

        if (isNaN(referrer) || !await options.userExists(referrer)) {
            await options.addBalance(ctx.from?.id, options.startupBonus);
        } else {
            await options.addBalance(referrer, options.referrerBonus);
            await options.onReferral(referrer, ctx);
            await options.addBalance(referrer, options.referreeBonus);
        }
        await next()

    }
    return middlewareFn;
}

module.exports = refer;