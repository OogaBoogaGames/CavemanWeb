<script lang="ts">
  import Caveman from "$components/Caveman.svelte";
  import CavemanImage from "$components/CavemanImage.svelte";
  let packages: string[] = ["games.oogabooga.demobundle.cvmn"];
</script>

<h1>Welcome to your library project</h1>
<p>
  Create your package using @sveltejs/package and preview/showcase your work
  with SvelteKit
</p>
<p>
  Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation
</p>
<Caveman {packages} mirror={window.location.href}>
  <CavemanImage
    packageid="games.oogabooga.demobundle.cvmn"
    assetid="characters.tux"
    alt="Caveman"
    width="400"
    height="400"
  />
</Caveman>
