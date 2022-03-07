import { Request } from "express";
import { ICustomer } from "@interface/Customer.interface";
import { IGetText } from "@interface/Lang/GetText.interface";
import { IOrder } from "@interface/Orders.interface";

export = <IGetText>{
    txt_Uid_Description: "Unique ID for object, generated by the system.",
    txt_ApiError_default: (req: Request) => `The requested URL ${req.originalUrl} was not found on this server.`,
    txt_Api_Listing: `Server listing on port`,

    cron: {
        txt_Invoice_Checking: "Checking invoices..",
        txt_Invoice_Found_Notify: (amount: number) => `Found ${amount} invoices to notify`,
        txt_Invoice_Found_Sending_Email: (customer: ICustomer) => `Sending email to ${customer.personal.email}`,
        txt_Order_Checking: (id: IOrder["id"]) => `Checking order id ${id}`,
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
        txt_Resolver_Checking_Admin: (resolver: string) => `Checking if user is admin on resolver ${resolver}`,
        txt_Resolver_Checking_User: (resolver: string) => `Checking if user is user on resolver ${resolver}`,
        txt_Apollo_Starting: "Started GraphQL Server on",
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
    invoice: {
        txt_Invoice: "Invoice",
        txt_Date: "Date",
        txt_DueDate: "Due date",
        txt_Number: "Number",
        txt_Price: "Price",
        txt_ProductTotal: "Product total",
        txt_Products: "Products",
        txt_Quantity: "Quantity",
        txt_SubTotal: "Sub total",
        txt_Total: "Total",
    }
};