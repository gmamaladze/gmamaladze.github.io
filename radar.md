---
layout: cv
title: George Mamaladze - Technology Radar
permalink: /radar
---

# George Mamaladze
![George Mamaladze](picture.png){: .profile-image}

---

<div style="position: relative;left: 30%;width: 70%;" markdown="1">
[Classic View](./classic){: .download-link}
[Timeline View](./){: .download-link}
[Download PDF](George_Mamaladze_CV.pdf){: .download-link}
</div>

<link rel="stylesheet" href="{{ '/radar.css' | relative_url }}">

## Technology Radar
Technologies and Skills section in my callsic CV does not provide the full picture of my technical landscape which is constantly evolving.
This **Technology Radar**, inspired by the well-know [Thoughtworks Technology Radar](https://www.thoughtworks.com/en-us/radar/faq), is a *living map* of my technical landscape, showing what I rely on *today*, what I’m *experimenting* with, and what I may *revisit* in the future. This radar is evolving as I learn, adopt, or phase out technologies. I maintain it since 2017. See: [Medium Article (ge)](https://medium.com/@gmamaladze/%E1%83%A0%E1%83%9D%E1%83%9B%E1%83%94%E1%83%9A%E1%83%98-%E1%83%9E%E1%83%A0%E1%83%9D%E1%83%92%E1%83%A0%E1%83%90%E1%83%9B%E1%83%98%E1%83%A0%E1%83%94%E1%83%91%E1%83%98%E1%83%A1-%E1%83%94%E1%83%9C%E1%83%90-%E1%83%95%E1%83%98%E1%83%A1%E1%83%AC%E1%83%90%E1%83%95%E1%83%9A%E1%83%9D%E1%83%97-cce1a4974ce1)


## Quadrants and Rings

The radar uses the same four quadrants as Thoughtworks: *Techniques*, *Tools*, *Platforms*, and *Languages & Frameworks*,
although my rings are personalized to reflect my own usage patterns:

| Ring | Description |
|------|-------------|
| **Active** | Technologies I am actively using in my daily work in current projects.|
| **Archive** | Technologies I used for years but not recently. Knowledge may be partially outdated, but I still consider them for future work. |
| **Trial** | Technologies I’m evaluating in a few limited use cases. Not yet adopted, but promising. |
| **Access** | Early exploration stage: reading, experimenting, PoCs, discussions. Curiosity-driven discovery without commitments. |


<div id="radar-container">
    <svg id="radar" width="800" height="800"></svg>
</div>

<script src="https://d3js.org/d3.v7.min.js"></script>
<script src="{{ '/radar.js' | relative_url }}"></script>

<script>
// Initialize radar with data from Jekyll
var radarData = {{ site.data.radar | jsonify }};
initializeRadar(radarData);
</script>



<table>
<thead>
<tr>
<th>#</th>
<th>Technology</th>
<th>Ring</th>
<th>Description</th>
<th>Link</th>
</tr>
</thead>
<tbody>
{% assign quadrants = "Techniques,Tools,Platforms,Languages & Frameworks" | split: "," %}
{% for quadrant_name in quadrants %}
<tr>
<td colspan="5" style="background-color: #f0f0f0; font-weight: bold; text-align: center;">{{ quadrant_name }}</td>
</tr>
{% assign quadrant_techs = site.data.radar.technologies | where: "quadrant", quadrant_name | sort: "id" %}
{%- for tech in quadrant_techs -%}
<tr id="tech-{{ tech.id }}">
<td>{{ tech.id }}</td>
<td><strong>{{ tech.name }}</strong></td>
<td>{{ tech.ring }}</td>
<td>{{ tech.description }}</td>
<td>{% if tech.url %}<a href="{{ tech.url }}" target="_blank">🔗</a>{% else %}-{% endif %}</td>
</tr>
{% endfor %}
{% endfor %}
</tbody>
</table>