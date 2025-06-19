import { CollectionConfig } from "payload";

export const LegalDocuments: CollectionConfig = {
    slug: "legal-documents",
    admin: {
        useAsTitle: "title",
        group: 'Legal',
    },
    access: {
        read: () => true,
        create: () => false, // TODO: superadmin only
        update: () => false, // TODO: superadmin only
        delete: () => false, // TODO: superadmin only
    },
    fields: [
        {
            name: "title",
            type: "text",
            required: true,
        },
    ]
}