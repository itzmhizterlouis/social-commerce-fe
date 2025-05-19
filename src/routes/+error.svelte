<script lang="ts">
    import {page} from "$app/state"
</script>

<div class="min-h-screen py-24 w-full justify-items-center content-center">
    <div class="space-y-8 text-center">
        <p class="text-5xl font-bold text-blue-700">{page.status}: {page.error?.message}</p>
        <a href="/browse" class="btn">Discover nice products</a>
    </div>
</div>