<script lang="ts">
    import IconShoppingCart from "@tabler/icons-svelte/icons/shopping-cart";
    import { onMount } from "svelte";
    import { getProductById, type Product } from "$lib";

    let carts: number[] = $state(
        JSON.parse(localStorage.getItem("carts") || "[]"),
    );
    let products: Product[] = $state([]);
    let isVisible: boolean = $state(false);

    $inspect(products);

    onMount(async function () {
        products = await Promise.all(
            carts.map((cart) => getProductById(cart.toString())),
        );
    });
</script>

<button class="transform hover:scale-120 transition relative" onclick={() => {isVisible = !isVisible}}>
    <IconShoppingCart class="stroke-blue-700 size-8 hover:stroke-blue-500 " />
</button>

<div class="absolute right-10 md:right-16 top-10 md:top-14 bg-slate-100 border-1 border-slate-200 shadow-lg rounded-lg p-4 w-64 {isVisible ? 'visible' : 'hidden'}">	
    {#if products.length > 0}
        <h2 class="text-lg font-semibold mb-2">Shopping Cart</h2>
        <ul class="divide-y divide-gray-200">
            {#each products as product}
                <li class="flex items-center justify-between mb-2">
                    <div class="flex items-center">
                        <span>{product.name}</span>
                    </div>
                    <span class="font-semibold">{product.amount}</span>
                </li>
            {/each}
        </ul>
    {:else}
        <p>No items in cart</p>
    {/if}
</div>

<style>
    .hidden {
        display: none;
    }

    .visible {
        display: block;
    }
</style>
