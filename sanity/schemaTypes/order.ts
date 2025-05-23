import { defineType } from "sanity";

export const order = defineType(
    {
        name: "order",
        type: "document",
        title: "Order",
        fields: [
            {
                name: "firstName",
                title: "First Name",
                type: "string"
            },
            {
                name: "lastName",
                title: "Last Name",
                type: "string"
            },
            {
                name: "address",
                title: "Address",
                type: "string"
            },
            {
                name: "city",
                title: "City",
                type: "string"
            },
            {
                name: "zipCode",
                title: "Zip Code",
                type: "string"
            },
            {
                name: "phone",
                title: "Phone Number",
                type: "string"
            },
            {
                name : "discount",
                title: "Discount",
                type: "number"
            },
            {
                name: "email",
                title: "Email",
                type: "string"
            },
            {
                name : "orderDate",
                title : "orderDate",
                type : "datetime",
                initialValue: () => new Date().toISOString(),
            },
            {
                name: "cartItems",
                title: "Cart Items",
                type: "array",
                of: [
                    {
                        type: "reference",
                        to: {
                            type: "product"
                        }
                    }
                ]
            },
            {
                name: "total",
                title: "Total",
                type: "number"
            },
            {
                name: "status",
                title: "Order Status",
                type: "string",
                options: {
                    list: [
                        { title: 'Pending', value: 'pending' },
                        { title: 'Success', value: 'success' },
                        { title: 'Dispatch', value: 'dispatch' },
                    ],
                    layout: 'radio'
                },
                initialValue: 'pending' // By Default show pending
            },
        ]
    },
)