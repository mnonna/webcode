export interface I_ArticleTop {
    category?: string;
    title: string;
    excerpt: string;
    date: string;
    author: string;
    readTime: string;
    image?: string;
    imageAlt?: string;
}

export interface I_Article {
    id: number;
    category?: string;
    title: string;
    excerpt: string;
    date: string;
    dateModified: string;
    author: I_ArticleAuthor;
    readTime: string;
    image?: string;
    imageAlt?: string;
    hint: string;
    contentSections: I_ArticleContentSection[];
}

export interface I_ArticleResponse extends I_Article {
    slug: string;
}

export interface I_ArticleAuthor {
    name: string;
    bio: string;
    avatar: string;
}

export interface I_ArticleContentSection {
    id: string;
    content: string;
}
