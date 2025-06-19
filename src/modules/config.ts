const links = {
    github:
        "https://github.com/mpresecan/payloadstack",
    twitter: "https://twitter.com/michaelpresecan",
    linkedin: "https://www.linkedin.com/in/michaelpresecan",
    discord: "",
    authorsWebsite: "https://michaelpresecan.com",
    authorsGitHub: "https://github.com/mpresecan",
    openGraphImage: "", // TODO: change this
    email: 'info@payloadstack.com'
}

const companyLegals = {
    name: 'Payload Stack Inc',
    address: '123 Main St, Anytown, USA',
}

const logo = {
    png: "https://forgotten-pillar.s3.us-east-2.amazonaws.com/Group+9.jpg",
    svg: "/images/logo.svg",
}

export const siteConfig = {
    name: "Payload Stack",
    description:
        "Building your next generation SaaS",
    links,
    logo,
    url: "https://payloadstack.com",
    supportEmail: "info@payloadstack.com",
    ogImage: links.openGraphImage,
    author: "mpresecan",
    hostingRegion: "fra1",
    keywords: ["Payload", "Stack", "SaaS", "Boilerplate"],
    companyLegals
}
