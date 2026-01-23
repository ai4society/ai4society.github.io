## How to Add a New Publication with a Poster

To ensure the website loads quickly, we use a system where a small thumbnail is loaded on the page, which links to the full-resolution poster.

### 1. Add the Images
1.  Full-Size Poster: Place the original, high-resolution image in the `posters/` directory.
2.  Thumbnail: If the poster size is too large, generate a resized version (width ~500px) and place it in the `posters/thumbnails/` directory.

**Command to generate thumbnail (macOS):**
```bash
sips --resampleWidth 500 posters/YOUR_POSTER_NAME.png --out posters/thumbnails/YOUR_POSTER_NAME.png
```

### 2. Update `publications/index.html`
Use the following template for your list item. Note the paths for the `href` (original) and the `src` (thumbnail).

```html
<li class="paper-has-poster">
  <div class="paper-item-layout">
    <div class="paper-details">
      <!-- Paper Details (Title, Authors, Links, Tags) go here -->
      <b>Paper Title</b><br />
      <i>Conference Details</i><br />
      Authors List
      <br />
      <a href="URL_TO_PAPER" target="_blank">[Paper]</a>
      <a href="URL_TO_FULL_POSTER" target="_blank">[Poster]</a>
      <span class="tag tag-type">Conference</span>
      <br />
    </div>
    
    <!-- Poster Thumbnail Section -->
    <div class="paper-poster">
      <a
        href="../posters/YOUR_POSTER_NAME.png"
        target="_blank"
        title="Click to view full poster"
        aria-label="View poster for [Paper Title]"
      >
        <img
          loading="lazy"
          src="../posters/thumbnails/YOUR_POSTER_NAME.png"
          alt="Poster thumbnail for [Paper Title]"
        />
      </a>
    </div>
  </div>
</li>
```
