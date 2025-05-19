// Make functions from fetch.ts available in the global scope: getUser
import { getUser, createProduct, createPost, getProducts, getProductById, getPosts	} from "./utils/fetch";
import type {Product, Post} from "./types";
import Navbar from "./shared/Navbar.svelte"
import Loader from "./shared/Loader.svelte"

export { getUser, Navbar, createProduct, Loader, createPost, getProducts, getProductById, getPosts, type Product, type Post };