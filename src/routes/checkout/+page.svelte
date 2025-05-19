<script lang="ts">
  // No Svelte logic for now, only design
  import IconShieldCheckFilled from "@tabler/icons-svelte/icons/shield-check-filled";
  import { onMount } from "svelte";
  import { getProductById } from "$lib";

  let carts: number[] = $state([]);

  onMount(() => {
    const storedCarts = localStorage.getItem("carts")!;
    carts = JSON.parse(storedCarts) || [];
  });

  let productItems = $derived.by(async function () {
    return Promise.all(
      carts.map((cartItem) => getProductById(cartItem.toString())),
    );
  });

  $inspect(carts).with((_, value) => console.log(`carts: ${value}`));
  $inspect(productItems).with((_, value) => console.log(`items: ${value}`));
</script>

<div class="min-h-screen py-30 px-4 sm:px-6 lg:px-8">
  <div class="md:w-[480px] lg:w-[900px] xl:w-[1024px] mx-auto">
    <h1 class="text-xl font-bold text-slate-800 mb-10 text-center xl:text-2xl">
      Checkout
    </h1>

    <div class="grid lg:grid-cols-3 xl:gap-36 space-y-36">
      <!-- Left Column: Shipping Details & Payment -->
      <div class="lg:col-span-2 space-y-24 lg:w-[520px] xl:w-[700px]">
        <!-- Shipping Information -->
        <section
          class="bg-slate-100 border-1 border-slate-200 p-6 sm:p-8 rounded-lg shadow-lg space-y-16 divide-slate-300 divide-y-1"
        >
          <h2 class="text-xl font-semibold text-slate-700 mb-6 pb-6">
            Shipping Information
          </h2>
          <form class="space-y-8">
            <div class="grid grid-cols-1 xl:grid-cols-2 gap-4">
              <div class="space-y-1">
                <label
                  for="first-name"
                  class="block text-sm font-medium text-slate-700"
                  >First Name</label
                >
                <input
                  type="text"
                  id="first-name"
                  name="first-name"
                  autocomplete="given-name"
                  class="input"
                />
              </div>
              <div class="space-y-1">
                <label
                  for="last-name"
                  class="block text-sm font-medium text-slate-700"
                  >Last Name</label
                >
                <input
                  type="text"
                  id="last-name"
                  name="last-name"
                  autocomplete="family-name"
                  class="input"
                />
              </div>
            </div>
            <div class="grid xl:grid-cols-2 gap-4">
              <div class="space-y-1">
                <label
                  for="email"
                  class="block text-sm font-medium text-slate-700"
                  >Email Address</label
                >
                <input
                  type="email"
                  id="email"
                  name="email"
                  autocomplete="email"
                  class="input"
                />
              </div>
              <div class="space-y-1">
                <label
                  for="street-address"
                  class="block text-sm font-medium text-slate-700"
                  >Street Address</label
                >
                <input
                  type="text"
                  id="street-address"
                  name="street-address"
                  autocomplete="street-address"
                  class="input"
                />
              </div>
            </div>
            <div class="grid grid-cols-1 xl:grid-cols-3 gap-6">
              <div class="space-y-1">
                <label
                  for="city"
                  class="block text-sm font-medium text-slate-700">City</label
                >
                <input
                  type="text"
                  id="city"
                  name="city"
                  autocomplete="address-level2"
                  class="input"
                />
              </div>
              <div class="space-y-1">
                <label
                  for="state"
                  class="block text-sm font-medium text-slate-700"
                  >State / Province</label
                >
                <input
                  type="text"
                  id="state"
                  name="state"
                  autocomplete="address-level1"
                  class="input"
                />
              </div>
              <div class="space-y-1">
                <label
                  for="postal-code"
                  class="block text-sm font-medium text-slate-700"
                  >Postal Code</label
                >
                <input
                  type="text"
                  id="postal-code"
                  name="postal-code"
                  autocomplete="postal-code"
                  class="input"
                />
              </div>
            </div>
            <div class="grid gap-4 xl:grid-cols-2">
              <div class="space-y-1">
                <label
                  for="country"
                  class="block text-sm font-medium text-slate-700"
                  >Country</label
                >
                <select
                  id="country"
                  name="country"
                  autocomplete="country-name"
                  class="mt-1 block w-full input"
                >
                  <option>United States</option>
                  <option>Canada</option>
                  <option>Mexico</option>
                  <option>United Kingdom</option>
                </select>
              </div>
              <div class="space-y-1">
                <label
                  for="phone"
                  class="block text-sm font-medium text-slate-700"
                  >Phone Number</label
                >
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  autocomplete="tel"
                  class="input"
                />
              </div>
            </div>
          </form>
        </section>

        <!-- Payment Gateway Section -->
        <section
          class="bg-slate-100 border-1 border-slate-200 p-6 sm:p-8 rounded-lg shadow-lg divide-slate-300 divide-y-1"
        >
          <h2 class="text-xl font-semibold text-slate-700 mb-6 pb-3">
            Payment Details
          </h2>
          <div class="space-y-4">
            <p class="text-slate-600 text-sm">
              You will be redirected to our secure payment gateway to complete
              your purchase.
            </p>
            <!-- Placeholder for payment gateway logos or a button -->
            <div
              class="flex items-center justify-center p-6 bg-slate-50 rounded-md border border-dashed border-slate-300"
            >
              <p class="text-slate-500">
                Secure Payment Gateway Integration Area
              </p>
            </div>
            <div class="mt-2 text-xs text-slate-500 text-center">
              <span class="inline-flex items-center">
                <IconShieldCheckFilled class="h-4 w-4 text-green-500 mr-1" />
                SSL Secure Transaction
              </span>
            </div>
          </div>
        </section>
      </div>

      <!-- Right Column: Order Summary -->
      <div class="lg:w-[350px] xl:w-sm">
        <section
          class="bg-slate-100 border-1 border-slate-200 p-6 sm:p-8 rounded-lg shadow-lg space-y-16 sticky top-10"
        >
          <h2
            class="text-xl font-semibold text-slate-700 mb-6 border-b pb-3 border-slate-300"
          >
            Order Summary
          </h2>

          <div class="space-y-8 mb-6 pr-2">
            {#await productItems then items}
              {#each items as item, index (index)}
                <div class="flex items-center justify-between">
                  <div class="flex gap-2 items-center">
                    <div class="space-y-1">
                      <p class="text-sm font-medium text-slate-800">
                        {item.name}
                      </p>
                      <p class="text-xs text-slate-500">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <p class="text-lg font-semibold text-slate-600">
                    ${item.amount}
                  </p>
                </div>
              {/each}
            {/await}
          </div>

          <!-- <div class="space-y-4 border-t pt-6 border-slate-300">
            <div class="flex justify-between text-sm text-slate-600">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div class="flex justify-between text-sm text-slate-600">
              <span>Shipping</span> 
              <span>${shipping.toFixed(2)}</span>
            </div>
            <div class="flex justify-between text-sm text-slate-600">
              <span>Taxes (8%)</span>
              <span>${taxes.toFixed(2)}</span>
            </div>
            <div class="flex justify-between text-lg font-semibold text-slate-900 border-t pt-3 mt-3 border-slate-300">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div> -->

          <div class="space-y-4">
            <button type="submit" class="w-full btn">
              Proceed to Payment
            </button>
            <p class=" text-xs text-slate-500 text-center">
              By clicking "Proceed to Payment", you agree to our Terms of
              Service and Privacy Policy.
            </p>
          </div>
        </section>
      </div>
    </div>
  </div>
</div>
