<script lang="ts">
  // No Svelte logic for now, only design
  import IconPhotoVideo from "@tabler/icons-svelte/icons/photo-video";
  import { createPost, getProducts, type Product, Loader } from "$lib";
  import { onMount } from "svelte";
  import {goto} from "$app/navigation";

  let caption = $state("");
  let photoFiles: FileList | null = $state(null);

  let availableProducts: Product[] = $state([]);
  let chosenProducts: string[] = $state([]);

  let isLoading = $state(false);
  let productLoading = $state(true);

  onMount(async () => {
    const response = await getProducts();
    availableProducts = response;
    productLoading = false;
  });

  const validate = () => {
    let error = { caption: "", photoFiles: "", exists: false };

    if (!caption) {
      error.caption = "Caption is required";
      error.exists = true;
    }
    if (!photoFiles || photoFiles.length === 0) {
      error.photoFiles = "Photo is required";
      error.exists = true;
    }
    return error;
  };

  let error: { caption: string; photoFiles: string; exists: boolean } =
    $derived(validate());

  async function onclick() {
    if (error.exists) {
      // Handle validation errors
      return;
    }

    isLoading = true;
    // Proceed with post creation
    const response = await createPost(
      caption,
      photoFiles![0],
      `[${chosenProducts.join(",")}]`,
    );
    console.log(response);

    goto("/browse");
  }

  async function goToProducts() {
    goto("/product");
  }
</script>

<div class="min-h-screen bg-slate-50 items-center py-30 justify-items-center">
  <div
    class="w-full max-w-xl bg-slate-100 shadow-sm rounded-md border-1 border-slate-200 p-6 sm:p-10"
  >
    <h1 class="text-lg font-bold text-slate-800 mb-8 text-center">
      Create New Post
    </h1>

    <!-- Video Upload Section -->
    <div class="mb-8">
      <label
        for="video-upload"
        class="block text-sm font-medium text-slate-700 mb-2"
        >Upload Video</label
      >
      <div
        class="mt-1 flex justify-center px-6 pt-10 pb-12 border-2 border-slate-300 border-dashed rounded-md hover:border-blue-400 transition-colors"
      >
        <div class="space-y-1 text-center">
          <IconPhotoVideo
            class="mx-auto h-12 w-12 text-slate-400"
            aria-hidden="true"
          />
          <div class="flex justify-center text-sm text-slate-600">
            <label
              for="video-file-upload"
              class="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
            >
              {#if photoFiles && photoFiles.length > 0}
                <p class="text-sm text-slate-600">File: {photoFiles[0].name}</p>
              {:else}
                <span>Upload a file</span>
              {/if}
              <input
                id="video-file-upload"
                name="video-file-upload"
                type="file"
                class="sr-only"
                accept="image/*"
                bind:files={photoFiles}
              />
            </label>
          </div>
          <p class="text-xs text-slate-500">JPG, PNG, WEBP up to 5MB</p>
        </div>
      </div>
    </div>

    <!-- Video Preview Placeholder (shown after upload) -->
    <!-- <div class="mb-8">
      <label class="block text-sm font-medium text-slate-700 mb-2">Video Preview</label>
      <div class="w-full aspect-[9/16] bg-slate-200 rounded-md flex items-center justify-center">
        <p class="text-slate-500">Video preview will appear here</p>
      </div>
    </div> -->

    <!-- Caption/Description Section -->
    <div class="mb-8">
      <label for="caption" class="block text-sm font-medium text-slate-700"
        >Caption / Description</label
      >
      <div class="mt-1">
        <textarea
          id="caption"
          name="caption"
          rows="4"
          class="input resize-none"
          placeholder="Write a caption..."
          bind:value={caption}
        ></textarea>
      </div>
    </div>

    <!-- Add Product to Post Section -->
    <div class="mb-8">
      <h2 class="text-lg font-semibold text-slate-700 mb-3">
        Add Products to Post
      </h2>
      <div class="space-y-4">
        <!-- Placeholder for product 1 -->
        {#if productLoading}
          <p class="text-center text-slate-500 animate-pulse">loading user products...</p>
        {:else if availableProducts && availableProducts.length > 0}
          {#each availableProducts as product}
            <div
              class="flex items-center justify-between p-3 bg-slate-100 rounded-md border-1 border-slate-400 hover:bg-slate-200 transition"
            >
              <input
                type="checkbox"
                name="chosenproduct"
                class="text-sm text-slate-600"
                value={product.productId}
                bind:group={chosenProducts}
              />
              <div class="flex-1 ml-3">
                <h3 class="text-sm font-semibold text-slate-800">
                  {product.name}
                </h3>
                <p class="text-sm text-slate-500">${product.amount}</p>
              </div>
            </div>
          {/each}
        {/if}

        <button
          type="button"
          class="w-full mt-2 flex items-center justify-center px-4 py-2 border border-dashed border-slate-300 rounded-md text-sm font-medium text-blue-600 hover:text-blue-500 hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition"
          onclick={() => {
            goToProducts();
          }}
        >
          <svg
            class="w-5 h-5 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M10 3a1 1 0 011 1v4h4a1 1 0 110 2h-4v4a1 1 0 11-2 0v-4H5a1 1 0 110-2h4V4a1 1 0 011-1z"
              clip-rule="evenodd"
            />
          </svg>
          Add Product
        </button>
      </div>
    </div>

    <!-- Submit Button -->
    <div class="pt-6">
      <button class="btn w-full" {onclick} disabled={error.exists || isLoading}>
        {#if isLoading}
          <Loader />
        {:else}
          Create Post
        {/if}
      </button>
    </div>
  </div>
</div>
