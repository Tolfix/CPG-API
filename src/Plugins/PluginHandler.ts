import { Application } from "express";
import CategoryModel from "../Database/Models/Category";
import CustomerModel from "../Database/Models/Customers/Customer";
import ImageModel from "../Database/Models/Images";
import InvoiceModel from "../Database/Models/Invoices";
import OrderModel from "../Database/Models/Orders";
import ProductModel from "../Database/Models/Products";
import TransactionsModel from "../Database/Models/Transactions";
import ConfigurableOptionsModel from "../Database/Models/ConfigurableOptions";
import mainEvent from "../Events/Main";
import Logger from "../Lib/Logger";
import { Plugins } from "../Config";
import npm from "npm";
import fs from "fs";
import MainCache from "../Cache/MainCache";

// find installed npm packages in package.json and get plugins starting with cpg_plugin
// then require it and call the new 

export async function PluginHandler(server: Application)
{
    // get plugins from package.json
    Logger.info("Loading plugins...");
    const plugins = getPlugins();
    for await(const plugin of plugins)
    {
        if(!(await isPluginInstalled(plugin)))
        {
            await installPlugin(plugin);
            Logger.plugin(`Installed plugin ${plugin}`)
        }

        // @ts-ignore
        const pluginInstance = require(plugin);
        // @ts-ignore
        /**
         * 
         * @param {Events} mainEvent 
         * @param {Application} server 
         * @param {{
         *  CategoryModel: CategoryModel,
         *  CustomerModel: CustomerModel,
         *  ImageModel: ImageModel,
         *  InvoiceModel: InvoiceModel,
         *  OrderModel: OrderModel,
         *  ProductModel: ProductModel,
         *  TransactionsModel: TransactionsModel,
         *  ConfigurableOptionsModel: ConfigurableOptionsModel
         * }} models 
         * @param {Object} Logger
         * @param {{
         *  Admin: CacheAdmin,
         *  Customer: CacheCustomer,
         *  Product: CacheProduct,
         *  Transaction: CacheTransactions,
         *  Order: CacheOrder,
         *  Invoice: CacheInvoice,
         *  f_orders: ce_orders
         * }} MainCache
         */
        new pluginInstance(mainEvent, server, {
            // All database models
            CategoryModel: CategoryModel,
            CustomerModel: CustomerModel,
            ImageModel: ImageModel,
            InvoiceModel: InvoiceModel,
            OrderModel: OrderModel,
            ProductModel: ProductModel,
            TransactionsModel: TransactionsModel,
            ConfigurableOptionsModel: ConfigurableOptionsModel,           
        }, Logger, MainCache);

        Logger.plugin(`Loaded plugin ${plugin}`)
    }
}

export function installPlugin(plugin: string)
{
    return new Promise((resolve, reject) =>
    {
        npm.load(function(err)
        {
            if(err)
            {
                Logger.error(err);
                return reject(err);
            }
            npm.commands.install([plugin], function(err)
            {
                if(err)
                {
                    Logger.error(err);
                    return reject(err);
                }
                resolve(true);
            });
        });
    }) 
}

export function isPluginInstalled(plugin: string)
{
    return new Promise((resolve) =>
    {
        // Check node_modules for plugin
        const pluginPath = `${process.cwd()}/node_modules/${plugin}`;
        if(!fs.existsSync(pluginPath))
            return resolve(false);
        resolve(true);
    });
}

export function getPlugins()
{
    // get all installed npm packages
    const packages = Plugins;
    // get plugins starting with cpg-plugin
    const plugins = packages.filter(p => p.startsWith("cpg-plugin"));
    return plugins;
}