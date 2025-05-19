<script>
  // Profile page logic will be added later
</script>

<div class="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8 content-center">
  <div class="mx-auto p-6 sm:p-8 rounded-lg shadow-xl md:max-w-sm lg:max-w-md xl:max-w-lg">
    <h1 class="text-lg font-bold text-gray-800 mb-8 text-center">Update Your Profile</h1>

    <form action="#" method="POST" class="space-y-6">
      <div>
        <label for="phone-number" class="block text-sm font-medium text-gray-700">Phone Number</label>
        <div class="mt-1">
          <input type="tel" name="phone-number" id="phone-number" autocomplete="tel" class="input" placeholder="(123) 456-7890">
        </div>
      </div>

      <div>
        <label for="street-name" class="block text-sm font-medium text-gray-700">Street Name</label>
        <div class="mt-1">
          <input type="text" name="street-name" id="street-name" autocomplete="street-address" class="input" placeholder="123 Main St">
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label for="state" class="block text-sm font-medium text-gray-700">State</label>
          <div class="mt-1">
            <input type="text" name="state" id="state" autocomplete="address-level1" class="input" placeholder="California">
          </div>
        </div>

        <div>
          <label for="country" class="block text-sm font-medium text-gray-700">Country</label>
          <div class="mt-1">
            <input type="text" name="country" id="country" autocomplete="country-name" class="input" placeholder="United States">
          </div>
        </div>
      </div>

      <div class="pt-4">
        <button type="submit" class="w-full btn">
          Save Profile
        </button>
      </div>
    </form>
  </div>
</div>

<style lang="postcss">
  /* Scoped styles can be added here if needed */
</style>