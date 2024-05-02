<!-- <script>
	import Ig from "$lib/components/Ig.svelte";
	import LinkedIn from "$lib/components/LinkedIn.svelte";
  import Tweet from "$lib/components/Tweet.svelte";
	import Test from "./test.svelte";
import * as Carousel from "$lib/components/ui/carousel/index";
</script>

<div class="flex justify-center">
  
  <Carousel.Root class="w-[400px]">
    <Carousel.Content>
      <Carousel.Item>
        <LinkedIn url=7179801244268457984 />
      </Carousel.Item>
      <Carousel.Item>
        <Ig/>
      </Carousel.Item>
    </Carousel.Content>
    <Carousel.Previous />
    <Carousel.Next />
  </Carousel.Root> 
</div> -->
<script>
function extractLinkedInPostId(url) {
    const regex = /urn:li:(ugcPost|share):(\d+)/;
    const match = url.match(regex);
    
    if (match) {
        return match[0];
    } else {
        return null;
    }
}



const postId = extractLinkedInPostId();
console.log(postId); 


</script>