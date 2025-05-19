<script>
    import IconShoppingCartHeart from "@tabler/icons-svelte/icons/shopping-cart-heart";
    import { getUser } from "$lib";
    import { onMount } from "svelte";

    let user = $state();

    onMount(async function () {
        user = await getUser();
    });
</script>

<nav class="px-4 py-3 flex justify-between border-b-1 border-slate-300 fixed w-full bg-white md:px-10 md:py-4 lg:px-20 xl:px-32 z-2">
    <!-- Left image -->
    <div></div>

    <!--Right stuff  -->
    <div class="flex gap-4 items-center md:gap-6 lg:gap-10">
        {#if user}
            <button>
                <img
                    src="https://ui-avatars.com/api/?name={encodeURIComponent(
                        user.firstName,
                    )}"
                    alt=""
                    class="size-8 rounded-full md:size-10 xl:size-12"
                />
            </button>

            <button>
                <IconShoppingCartHeart
                    class="size-6 text-blue-900 md:size-8 hover:scale-110 transform transition hover:text-blue-800 hover:cursor-pointer"
                    aria-hidden="true"
                />
            </button>
        {:else}
            <button class="btn"> Sign In </button>
        {/if}
    </div>
</nav>
