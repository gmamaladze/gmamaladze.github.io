---
layout: cv
title: George Mamaladze's CV
permalink: /
---

# George Mamaladze
![George Mamaladze](gmamaladze-profile.png){: .profile-image}

---

[Download PDF](George_Mamaladze_CV.pdf){: .download-link}
[Timeline View](./timeline){: .download-link}

[linkedin.com/in/gmamaladze](https://www.linkedin.com/in/gmamaladze)

### Currently

{% assign current_jobs = site.data.cv.experience | where_exp: "job", "job.period.end == nil"  %}
{% for job in current_jobs %}
**{{ job.title }}** at _{{ job.company }}{% if job.division %} – {{ job.division }}{% endif %}_ {{ job.location }}

{% endfor %}

### Specialized in

{{ site.data.cv.specializedIn }}

### Summary

{{ site.data.cv.summary }}

---

## Experience

{% assign jobs = site.data.cv.experience %}
{% for job in jobs %}
{% capture job_meta %}
{% if job.timeCommitment %}{{ job.timeCommitment }}{% endif %}{% if job.employmentType %}{% if job.timeCommitment %}, {% endif %}{{ job.employmentType }}{% endif %}
{% endcapture %}
{% assign job_meta = job_meta | strip %}
`{{ job.period.start | date: "%b %Y" }} - {% if job.period.end %}{{ job.period.end | date: "%b %Y" }}{% else %}Present{% endif %}`
__{{ job.title }}{% if job_meta != "" %} ({{ job_meta }}){% endif %}__, *{{ job.company }}{% if job.division %} – {{ job.division }}{% endif %}*, {{ job.location }}

{% if job.description %}{{ job.description }}{% endif %}{% if job.website %} [[{{ job.website | replace: "https://", "" | replace: "http://", "" }}]({{ job.website }})]{% endif %}

{% if job.responsibilities %}
**Responsibilities**
{% for item in job.responsibilities %}- {{ item }}
{% endfor %}
{% endif %}

{% if job.keyAchievements %}
{% assign achievementCount = job.keyAchievements | size %}
**Key Achievement{% if achievementCount > 1 %}s{% endif %}**
{% for achievement in job.keyAchievements %}- {{ achievement }}
{% endfor %}
{% endif %}

{% endfor %}

---

## Education

{% assign education_entries = site.data.cv.education %}
{% for edu in education_entries %}
`{{ edu.period.start | date: "%b %Y" }} - {{ edu.period.end | date: "%b %Y" }}`
__{{ edu.program }}__, *{{ edu.institution }}*, {{ edu.location }}

{% if edu.notes %}
{% for note in edu.notes %}- {{ note }}
{% endfor %}
{% endif %}
{% endfor %}

## Achievements

{% assign achievements = site.data.cv.achievements %}
{% for achievement in achievements %}
`{{ achievement.year }}`
{{ achievement.description }}

{% endfor %}

## Languages

{% assign languages = site.data.cv.languages %}
{% for language in languages %}
_{{ language.name }}_ - {{ language.fluency }}
{% endfor %}

## Technical Skills

<div class="skills" markdown="1">

{% assign skill_categories = site.data.cv.technicalSkills %}
{% for category in skill_categories %}
#### {{ category.category }}
{% for item in category.items %}`{{ item }}`{% unless forloop.last %} {% endunless %}{% endfor %}

{% endfor %}

</div>

