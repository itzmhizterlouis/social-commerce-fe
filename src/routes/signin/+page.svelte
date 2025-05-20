<script>
  import IconBrandGoogle from "@tabler/icons-svelte/icons/brand-google"

    function goToSignIn() {
    window.location.href = "https://social-commerce-be-production.up.railway.app/signin";
  }
</script>

<div class="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
  <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
    <h1 class="text-2xl font-bold mb-6 text-gray-800">Sign In</h1>
    <button class="btn w-full" onclick={() => {
      window.location.href = "https://social-commerce-be-production.up.railway.app/signin";
    }}>
        <IconBrandGoogle class="w-5 h-5" />
      <span>Sign in with Google</span>
    </button>
    <p class="mt-4 text-sm text-gray-600">
      By signing in, you agree to our terms and conditions.
    </p>
  </div>
</div>

<style lang="postcss">
  /* Component-specific styles can go here if needed */
</style>