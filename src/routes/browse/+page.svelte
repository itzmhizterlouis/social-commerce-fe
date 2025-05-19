<script lang="ts">
    import { onMount } from "svelte";
    import { getPosts, type Post } from "$lib";

    let posts: Post[] = $state([]);

    onMount(async () => {
        const response = await getPosts(100);
        posts = response;
    });

    function addToCart(productId: string) {
        //Add product to cart which is in localStorage location carts
        const cart = JSON.parse(localStorage.getItem("carts") || "[]");
        cart.push(productId);
        localStorage.setItem("carts", JSON.stringify(cart));
    }
    
</script>

<div class="p-4 justify-items-center py-24">
    <div class="w-full md:w-sm space-y-36 lg:w-md lg:space-y-48 xl:w-lg">
        {#each posts as post}
            <div class="space-y-24 lg:space-y-36">
                <div class="aspect-[9/16] bg-gray-200 rounded-md mb-4">
                    <img
                        src={post.contentUrl}
                        alt="Video preview"
                        class="w-full h-full object-contain rounded-md"
                    />
                </div>
                <p class="text text-slate-600 mb-4 leading-relaxed lg:text-lg">
                    {post.caption}
                </p>
                <div class="space-y-16">
                    <h3
                        class="text-md font-semibold text-slate-700 mb-2 text-lg"
                    >
                        Products:
                    </h3>
                    <div
                        class="space-y-8 bg-slate-100 border-1 border-slate-200 p-4 rounded-md shadow-sm divide-y-1 divide-slate-200"
                    >
                        {#each post.products as product}
                            <div class="space-y-2">
                                <p class="text-slate-700 font-semibold">
                                    {product.name}
                                </p>
                                <p class="text-slate-500">${product.amount}</p>
                                <button
                                    type="button"
                                    class="btn w-full mb-8"
                                    onclick={() => {
                                        addToCart(product.productId);
                                    }}>Add to Cart</button
                                >
                            </div>
                        {/each}
                    </div>
                </div>
            </div>
        {/each}
    </div>
</div>
