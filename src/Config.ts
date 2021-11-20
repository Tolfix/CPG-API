import ConfigModel from "./Database/Schemas/Configs";
import { IConfigs } from "./Interfaces/Admin/Configs";

/**
 * @description
 * Used if this service is running in debug mode.
 */
export const DebugMode = process.env.DEBUG === "true" ? true : false;
export const HomeDir = ((__dirname.replace("\\build", "")).replace("/build", ""));
export const JWT_Access_Token = process.env.JWT_ACCESS_TOKEN ?? "";
export const d_Days = parseInt(process.env.D_DAYS ?? "30");
export const Domain = process.env.DOMAIN ?? "localhost";
export const Http_Schema = process.env.HTTP_SCHEMA ?? "http";
export const PORT = process.env.PORT ?? 8080;
export const Full_Domain = `${Http_Schema}://${Domain === "localhost" ? `localhost:${PORT}` : Domain}`;


export const Express_Session_Secret = process.env.SESSION_SECRET ?? require("crypto").randomBytes(20).toString("hex");

export const MongoDB_URI = process.env.MONGO_URI ?? "mongodb://localhost/cpg";

// osTicket configs
export const osticket_url = process.env.OSTICKET_URL ?? "";
export const osticket_api_key = process.env.OSTICKET_API_KEY ?? "";
 
// Stripe
export const Stripe_SK_Test = process.env.STRIPE_SK_TEST ?? "";
export const Stripe_SK_Live = process.env.STRIPE_SK_LIVE ?? "";
export const Stripe_PK_Public_Test = process.env.STRIPE_SK_PUBLIC_TEST ?? "";
export const Stripe_PK_Public = process.env.STRIPE_SK_PUBLIC ?? "";
export const Stripe_Webhook_Secret = process.env.STRIPE_WEBHOOK_SECRET ?? "";

// Swish
export const Swish_Payee_Number = process.env.SWISH_PAYEE_NUMBER ?? "";

// Paypal
export const Paypal_Client_Id = process.env.PAYPAL_CLIENT_ID ?? "";
export const Paypal_Client_Secret = process.env.PAYPAL_CLIENT_SECRET ?? "";

export const GetSMTPConfig: () => Promise<IConfigs["smtp"]> = () => {
    return ConfigModel.find().then(config => {
        //@ts-ignore
        return config[0].smtp;
    });
}