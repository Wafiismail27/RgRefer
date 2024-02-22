import { Context, NextFunction } from "grammy";
/**
 * This library is a middleware for the grammy bot library. It allows you to create a referral system for your bot.
 * Simple to use and easy to understand.
 * Straight to the point.
 */

/**
 * The main function that creates the middleware for the referral system
 * @param options The options for the referral system
 * @param options.referrerBonus The amount of money the referrer gets when someone uses their referral link
 * @param options.referreeBonus The amount of money the referree gets when they use a referral link
 * @param options.startupBonus The amount of money the user gets when they start the bot
 * @param options.userExists A function that checks if a user exists in the database
 * @param options.addBalance A function that adds balance to a user
 * @param options.onReferral A function that is called when a user uses a referral link
 * @param options.onStartUp A function that is called when a user starts the bot
 * @returns 
 */
function refer(options: {
    referrerBonus: number,
    referreeBonus: number,
    startupBonus: number,
    userExists: (id: number | undefined) => Promise<boolean> | boolean,
    addBalance: (id: number | undefined, amount: number) => Promise<void> | void,
    onReferral: (referrer: number, referree: Context) => Promise<void> | void,
    onStartUp: (ctx: Context) => Promise<void> | void,
}) {
    const middlewareFn = async (ctx: Context, next: NextFunction) => {
        if (!ctx.hasChatType("private")) return await next()
        if (!ctx.hasCommand("start")) return await next()
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

export { refer as default };