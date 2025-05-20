<script lang="ts">
  // Logic will be added later
  import IconPhotoPlus from "@tabler/icons-svelte/icons/photo-plus";
  import { createProduct } from "$lib";
  import {goto} from "$app/navigation";
  import {Loader} from "$lib"

  let productName = $state("");
  let productPrice = $state(0);
  let isLoading = $state(false);
  let error: {productName: string, productPrice: string, exists: boolean} = $derived(validate())

  function validate() {
    let error = {productName: "", productPrice: "", exists: false};
    if (!productName) {
      error.productName = "Product name is required";
      error.exists = true;
    }
    if (!productPrice || productPrice <= 200) {
      error.productPrice = "Product price must be greater than $200";
      error.exists = true;
    }
    return error;
  }

  async function onclick() {
    isLoading = true;
    const response = await createProduct(productName, productPrice)  
    console.log(response);
    goto("/")
  }
</script>

<div class="min-h-screen px-2 py-24">
  <div class="sm:mx-auto sm:w-full md:w-sm">
    <h2 class="mt-6 text-center text-lg font-bold text-slate-900 lg:text-xl">
      Create a New Product
    </h2>
  </div>

  <div
    class="mt-8 sm:mx-auto sm:w-full sm:max-w-2xl bg-slate-100 shadow-sm border-1 border-slate-200 rounded-md"
  >
  <div class="bg-white py-8 px-4 sm:rounded-lg sm:px-10 space-y-12">
    {#if error.exists}
      <div class="w-full bg-rose-100 px-4 py-3 rounded-sm border-rose-200 border-1 text-rose-900 font-semibold">
        {error.productName}
        {#if error.productName && error.productPrice}<hr class="border-0.5 border-rose-300 my-2">{/if}
        {error.productPrice}
      </div>
      {/if}
      <div class="space-y-8">
        <div>
          <label
            for="productName"
            class="block text-sm font-medium text-slate-700"
          >
            Product Name
          </label>
          <div class="mt-1">
            <input
              id="productName"
              name="productName"
              type="text"
              required
              class="input"
              placeholder="e.g. Awesome T-Shirt"
              bind:value={productName}
            />
          </div>
        </div>

        <div>
          <label
            for="productPrice"
            class="block text-sm font-medium text-slate-700"
          >
            Price
          </label>
          <div class="mt-1 relative rounded-md shadow-sm">
            <input
              type="number"
              name="productPrice"
              id="productPrice"
              class="input appearance-none"
              placeholder="0.00"
              aria-describedby="price-currency"
              min="0.01"
              step="0.01"
              required
              bind:value={productPrice}
            />
            <div
              class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"
            >
              <span class="text-slate-500 sm:text-sm" id="price-currency">
                USD
              </span>
            </div>
          </div>
        </div>

        <div>
          <label
            for="productDescription"
            class="block text-sm font-medium text-slate-700"
          >
            Description
          </label>
          <div class="mt-1">
            <textarea
              id="productDescription"
              name="productDescription"
              rows="4"
              class="input resize-none"
              placeholder="Brief description of the product..."
              required
            ></textarea>
          </div>
        </div>

        <!-- <div>
          <label class="block text-sm font-medium text-slate-700">
            Product Images
          </label>
          <div
            class="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 border-dashed rounded-md"
          >
            <div class="space-y-1 text-center">
              <IconPhotoPlus
                class="mx-auto h-12 w-12 text-slate-400"
                aria-hidden="true"
              />
              <div class="flex text-sm text-slate-600">
                <label
                  for="file-upload"
                  class="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                >
                  <span>Upload files</span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    class="sr-only"
                    multiple
                    accept="image/*"
                  />
                </label>
                <p class="pl-1">or drag and drop</p>
              </div>
              <p class="text-xs text-slate-500">PNG, JPG, GIF up to 10MB</p>
            </div>
          </div>
        </div> -->

        <div class="pt-2">
          <button class="btn w-full" disabled={error.exists || isLoading} {onclick}> 
            {#if isLoading}
              <Loader/>
            {:else}
            Create Product
            {/if}
             </button>
        </div>
      </div>
    </div>
  </div>
</div>
