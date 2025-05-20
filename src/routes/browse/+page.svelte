<script lang="ts">
    import { onMount } from "svelte";
    import { getPosts, type Post } from "$lib";
    import { addItemToCart } from "$lib/utils/fetch";

    let posts: Post[] = $state([]);
    let loading: boolean = $state(true);

    onMount(async () => {
        try {
            const response = await getPosts(100);
            posts = response;
        } catch (error) {
            console.error("Error fetching posts:", error);
            // Optionally set an error state to display an error message
        } finally {
            loading = false; // Set loading to false after the API call completes
        }
    });

    function addToCart(productId: number ) {
        const cart = addItemToCart(productId);
    }
    
</script>

<div class="p-4 justify-items-center py-24">
    {#if loading}
        <p class="text-center text-slate-500 animate-pulse">fetching posts...</p>
    {:else}
        <div class="w-full md:w-sm space-y-36 lg:w-md lg:space-y-10 xl:w-lg border-b border-gray-500">
            {#each posts as post}
                <div class="space-y-24 lg:space-y-36 border-b border-gray-500">
                    <div class="aspect-[14/16] bg-gray-200 rounded-md mb-4">
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
                        {#if post.products?.length > 0}
                            <h3
                                class="text-md font-semibold text-slate-700 mb-2 text-lg"
                            >
                                Products:
                            </h3>
                            <div
                                class="space-y-1 bg-slate-100 border-0.2 border-slate-200 p-0.2 rounded-md shadow-sm divide-y-0.2 divide-slate-200"
                            >
                                {#each post.products as product}
                                <div>
                                    <p class="text-slate-700 font-semibold mb-0.2">{product.name}</p>
                                    <p class="text-slate-500 mb-2">${product.amount}</p>
                                    <button
                                    type="button"
                                    class="btn w-full mb-4"
                                            onclick={() => {
                                                addToCart(Number(product.productId));
                                            }}>Add to Cart</button
                                        >
                                    </div>
                                {/each}
                            </div>
                        {/if}
                    </div>
                </div>
            {/each}
        </div>
    {/if}
</div>
