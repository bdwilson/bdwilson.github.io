---
---
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Image Index — bdwilson.github.io</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      background: #0d1117;
      color: #e6edf3;
      padding: 24px;
      max-width: 1600px;
      margin: 0 auto;
    }
    h1 { font-size: 20px; font-weight: 600; margin-bottom: 16px; color: #f0f6fc; }
    #search {
      width: 100%;
      padding: 10px 14px;
      font-size: 14px;
      background: #161b22;
      border: 1px solid #30363d;
      color: #e6edf3;
      border-radius: 6px;
      margin-bottom: 10px;
      outline: none;
    }
    #search:focus { border-color: #388bfd; }
    #count { color: #8b949e; font-size: 13px; margin-bottom: 18px; }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 16px;
    }
    .card {
      background: #161b22;
      border: 1px solid #30363d;
      border-radius: 8px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }
    .thumb-wrap {
      width: 100%;
      height: 180px;
      background: #21262d;
      overflow: hidden;
      flex-shrink: 0;
    }
    .thumb-wrap img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
    .card-body { padding: 12px; flex: 1; display: flex; flex-direction: column; gap: 10px; }
    .filename {
      font-size: 12px;
      color: #8b949e;
      word-break: break-all;
      line-height: 1.4;
    }
    .snippets { display: flex; flex-direction: column; gap: 5px; }
    .row { display: flex; align-items: stretch; gap: 5px; }
    .label {
      font-size: 10px;
      font-weight: 600;
      color: #6e7681;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      width: 40px;
      flex-shrink: 0;
      display: flex;
      align-items: center;
    }
    .copy-btn {
      flex: 1;
      background: #21262d;
      border: 1px solid #30363d;
      color: #79c0ff;
      padding: 5px 9px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 11px;
      font-family: "SFMono-Regular", Consolas, monospace;
      text-align: left;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      transition: background 0.1s, border-color 0.1s, color 0.1s;
      min-width: 0;
    }
    .copy-btn:hover { background: #1f3558; border-color: #388bfd; color: #a5c8ff; }
    .copy-btn.copied { color: #56d364; border-color: #2ea043; background: #12261e; }
    .hidden { display: none !important; }
  </style>
</head>
<body>
  <h1>Image Index</h1>
  <input id="search" type="text" placeholder="Filter by filename…" oninput="filter()">
  <div id="count"></div>
  <div class="grid" id="grid">

{% assign img_exts = ".jpg,.jpeg,.png,.gif,.webp,.heic,.tiff,.tif" | split: "," %}
{% assign sorted = site.static_files | sort: "name" | reverse %}
{% for f in sorted %}
  {% if f.path contains '/images/' %}
    {% assign ext = f.extname | downcase %}
    {% if img_exts contains ext %}
      {% assign full_url = "https://bdwilson.github.io" | append: f.path %}
      {% assign md_img   = "![" | append: f.basename | append: "](" | append: full_url | append: ")" %}
      {% assign html_img = "<img src=" | append: '"' | append: full_url | append: '"' | append: " width=400px>" %}
      {% assign html_lnk = "<a href=" | append: '"' | append: full_url | append: '"' | append: "><img src=" | append: '"' | append: full_url | append: '"' | append: " width=400px></a>" %}
    <div class="card" data-name="{{ f.name | downcase }}">
      <div class="thumb-wrap">
        <img src="{{ f.path }}" alt="{{ f.name }}" loading="lazy">
      </div>
      <div class="card-body">
        <div class="filename">{{ f.name }}</div>
        <div class="snippets">
          <div class="row">
            <span class="label">MD</span>
            <button class="copy-btn" data-copy="{{ md_img | xml_escape }}" onclick="copy(this)" title="{{ md_img }}">{{ md_img }}</button>
          </div>
          <div class="row">
            <span class="label">IMG</span>
            <button class="copy-btn" data-copy="{{ html_img | xml_escape }}" onclick="copy(this)" title="{{ html_img }}">{{ html_img | xml_escape }}</button>
          </div>
          <div class="row">
            <span class="label">LINK</span>
            <button class="copy-btn" data-copy="{{ html_lnk | xml_escape }}" onclick="copy(this)" title="{{ html_lnk }}">&lt;a href&gt;&lt;img&gt;&lt;/a&gt;</button>
          </div>
          <div class="row">
            <span class="label">URL</span>
            <button class="copy-btn" data-copy="{{ full_url }}" onclick="copy(this)" title="{{ full_url }}">{{ full_url }}</button>
          </div>
        </div>
      </div>
    </div>
    {% endif %}
  {% endif %}
{% endfor %}

  </div>

  <script>
    function copy(btn) {
      navigator.clipboard.writeText(btn.dataset.copy).then(() => {
        const prev = btn.textContent;
        btn.textContent = "Copied!";
        btn.classList.add("copied");
        setTimeout(() => { btn.textContent = prev; btn.classList.remove("copied"); }, 1400);
      });
    }

    function filter() {
      const q = document.getElementById("search").value.toLowerCase();
      let n = 0;
      document.querySelectorAll(".card").forEach(c => {
        const show = c.dataset.name.includes(q);
        c.classList.toggle("hidden", !show);
        if (show) n++;
      });
      document.getElementById("count").textContent = n + " image" + (n === 1 ? "" : "s");
    }

    filter();
  </script>
</body>
</html>
