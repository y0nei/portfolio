declare module "*/user.yml" {
    const data: {
        socials: {
            [key: string]: string;
        };
        handles: {
            service: string;
            value: string;
        }[];
        donations: {
            service: string;
            link: string;
        }[];
        web_badges: {
            name: string;
            path: string;
            src?: string;
        }[];
    };
    export default data;
}
