<div class="container hero mt-5 py-5">
    <article class="container text-center">
        <h1>$Heading</h1>
        <img class="my-3" src="$ThemeDir/img/astronaut.png" width="36px" alt="">
        <div class="content">$HeroText</div>
    </article>
    <div class="slick-container my-5">
        <% loop $PhotoSlides %>
            <%-- 3 Default images --%>
            <img class="mx-4 my-4" src="$ThemeDir/img/work-1.jpg" alt="">
            <img class="mx-4 my-4" src="$ThemeDir/img/work-2.jpg" alt="">
            <img class="mx-4 my-4" src="$ThemeDir/img/work-3.jpg" alt="">
            <%-- Any other image add in --%>
            <img class="mx-4 my-4" src="$Photo.URL" alt="">
        <% end_loop %>
    </div>
</div>
