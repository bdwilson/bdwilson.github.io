---
---

<head>
  <title>Index of /images</title>
</head>

<body>
  <h1>Index of /images</h1>
  <ul>
        {% assign snapshot_files = (site.static_files | sort: 'modified_time') | reverse %}
        {% for url in snapshot_files %}
		{% if url.path contains '/images' %}
			<li><a href="{{ url.path | escape }}">{{ url.path | escape }}</a><pre><img src="https://bdwilson.github.io{{ url.path }}" width=400px></pre></li>
        	<img style="max-width: 200px; height: auto;" src="{{ url.path }}" alt="{{ url.name }}"><br>
        {% endif %}
        {% endfor %}
  </ul>
</body>

