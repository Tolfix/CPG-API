import { Request } from "express";
import { ICustomer } from "../../Interfaces/Customer.interface";
import { IGetText } from "../../Interfaces/Lang/GetText.interface";
import { IOrder } from "../../Interfaces/Orders.interface";

export = <IGetText>{
    txt_Uid_Description: "Unique ID for object, generated by the system.",
    txt_ApiError_default: (req: Request) => `The requested URL ${req.originalUrl} was not found on this server.`,
    txt_Api_Listing: `Server listing on port`,

    cron: {
        txt_Invoice_Checking: "Checking invoices..",
        txt_Invoice_Found_Notify: (amount: number) => `Found ${amount} invoices to notify`,
        txt_Invoice_Found_Sending_Email: (customer: ICustomer) => `Sending email to ${customer.personal.email}`,
        txt_Order_Checking: (order: IOrder) => `Checking order ${order.uid}`,
        txt_Orders_Checking: "Checking orders..",
    },
    database: {
        txt_Database_Error_Lost_Connection: "Lost connection to database, shutting down.",
        txt_Database_Error_default: "An error occured while processing your request.",
        txt_Database_Opened: "Database opened",
        txt_Model_Created: (model: string, id: any) => `Created ${model} with id/uid ${id}`,
    },
    graphql: {
        txt_Schemas_Loading: "Loading schemas..",
        txt_Schemas_Adding: (schema: string) => `Adding schema ${schema}`,
        txt_Resolver_Checking_Admin: (resolver: string) => `Checking resolver ${resolver}`,
        txt_Apollo_Starting: "Starting Apollo server..",
    },
    plugins: {
        txt_Plugin_Loading: "Loading plugin..",
        txt_Plugin_Installed: (plugin: string) => `Installed plugin ${plugin}`,
        txt_Plugin_Loaded: (plugin: string) => `Loaded plugin ${plugin}`,
    },
    paypal: {
        txt_Paypal_Created_Transaction_From_Invoice: (t, i) => `Created transaction ${t.uid} from invoice ${i.uid}`,
        txt_Paypal_Creating_Payment_For_Invoice: (i) => `Creating payment for invoice ${i.uid}`,
    },
};