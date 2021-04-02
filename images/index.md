---
---

<head>
  <title>Index of /images</title>
</head>

<body>
  <h1>Index of /images</h1>
  <ul>
    {% for url in site.static_files %}
	{% if url.path contains '/images' %}
    	<li><a href="{{ url.path | escape }}">{{ url.path | escape }}</a> </li>
		<img style="max-width: 200px; height: auto;" src="{{ url.path }}" alt="{{ url.name }}"><br>
<pre>
&lt;a href="https://bdwilson.github.io{{ url.path }}"&gt;&lt;img src="https://bdwilson.github.io{{ url.path }}" width=400px&gt;&lt;/a&gt;<
&lt;img src="https://bdwilson.github.io{{ url.path }}" width=400px&gt;
</pre>
	{% endif %}
    {% endfor %}
  </ul>
</body>

