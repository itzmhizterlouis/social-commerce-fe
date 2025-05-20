<script>
    import { getUser } from "$lib";
    import { onMount } from "svelte";
    import Dropdown from "./Dropdown.svelte";
    import IconMenu2 from "@tabler/icons-svelte/icons/menu-2";

    let user = $state();
    let isVisible = $state(false);

    onMount(async function () {
        user = await getUser();
    });
</script>

<nav
    class="px-4 py-3 flex flex-col gap-12 justify-between border-b-1 border-slate-300 fixed w-full bg-white md:px-10 md:py-4 lg:px-20 xl:px-32 z-2 shadow-sm"
>
    <!-- Left image -->
    <div class="flex justify-between items-center">
        <div class="md:hidden"></div>
        <div class="hidden md:block">
            <div class="flex gap-12">
                <img src="" alt="logo" />

                <ul class="flex gap-6">
                    <li class="w-full">
                        <a class="nav-link" href="/">Home</a>
                    </li>
                    <li class="w-full">
                        <a class="nav-link" href="/browse">Browse</a>
                    </li>
                    <li class="w-full">
                        <a class="nav-link" href="/post">Post</a>
                    </li>
                    <li class="w-full">
                        <a class="nav-link" href="/product">Product</a>
                    </li>
                </ul>
            </div>
        </div>
        <!--Right stuff  -->
        <div>
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
                    <Dropdown />
                {:else}
                    <button class="btn"> Sign In </button>
                {/if}
                <button
                    onclick={() => {
                        isVisible = !isVisible;
                    }}
                    class="md:hidden"
                >
                    <IconMenu2 class="size-10 stroke-blue-700" />
                </button>
            </div>
        </div>
    </div>

    {#if isVisible}
        <div class="flex flex-col space-y-8 py-4">
            <img src="" alt="logo" />

            <ul class="flex flex-col space-y-6">
                <li class="w-full">
                    <a class="nav-link" href="/browse">Browse</a>
                </li>
                <li class="w-full"><a class="nav-link" href="/">Home</a></li>
                <li class="w-full">
                    <a class="nav-link" href="/post">Create Post</a>
                </li>
                <li class="w-full">
                    <a class="nav-link" href="/product">Create Product</a>
                </li>
            </ul>
        </div>
    {/if}
</nav>

<style>
    @reference "tailwindcss";

    .nav-link {
        @apply hover:bg-slate-100 focus:bg-slate-200 w-full focus:text-blue-800 transition p-2 rounded-sm;
    }
</style>
