<template>
    <div class="container">
        <div class="columns">
            <div class="column col-12">
                <div class="carousel">
                    <!-- carousel locator -->
                    <input class="carousel-locator" id="slide-1" type="radio" name="carousel-radio" hidden="" checked="">
                    <input class="carousel-locator" id="slide-2" type="radio" name="carousel-radio" hidden="">
                    
                    <!-- carousel container -->
                    <div class="carousel-container">
                        <!-- carousel item -->
                        <figure class="carousel-item">
                        <label class="item-prev btn btn-action btn-lg" for="slide-4"><i class="icon icon-arrow-left"></i></label>
                        <label class="item-next btn btn-action btn-lg" for="slide-2"><i class="icon icon-arrow-right"></i></label>
                        <img class="img-responsive rounded" src="@/assets/img/img1.jpg" alt="macOS Yosemite Wallpaper">
                        </figure>
                        <figure class="carousel-item">
                        <label class="item-prev btn btn-action btn-lg" for="slide-1"><i class="icon icon-arrow-left"></i></label>
                        <label class="item-next btn btn-action btn-lg" for="slide-3"><i class="icon icon-arrow-right"></i></label>
                        <img class="img-responsive rounded" src="@/assets/img/img2.jpg" alt="macOS Yosemite Wallpaper">
                        </figure>
                    </div>
                    <!-- carousel navigation -->
                    <div class="carousel-nav">
                        <label class="nav-item text-hide c-hand" for="slide-1">1</label>
                        <label class="nav-item text-hide c-hand" for="slide-2">2</label>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Carousel"
}
</script>

<style lang="scss" scoped>
  .carousel {
      background-color: #889988
  }
</style>