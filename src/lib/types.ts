export interface Product {
    name: string;
    productId: string;
    amount: number;
    userId: string;
}


export interface Post {
    caption: string;
    contentUrl: string;
    postId: number;
    products: Product[];
    userId: string | null;
}