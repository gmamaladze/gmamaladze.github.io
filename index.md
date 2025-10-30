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

**Senior Software Architect at Siemens AG** – Factory Automation, Human Machine Interface in Munich, Germany


**Chief Technical Advisor at Syniotec** (part-time, freelance), Bremen, Germany (remote)

### Specialized in

Technology strategy, cloud-native architectures, microservices, team leadership, industrial automation software

### Summary

Rare combination of deep **conceptual technical knowledge** and **hands-on expertise**. Technology leader with over 25 years of experience designing, building, and delivering software products and solutions. Ability to build and lead high-performing teams, organize processes, and drive innovation. Experience in interfacing with customers, understanding requirements, collaborating with executive leadership, developing and implementing strategies.

---

## Experience

{% assign jobs = site.data.cv.experience | sort: "period.start" | reverse %}
{% for job in jobs %}
{% capture job_meta %}
{% if job.timeCommitment %}{{ job.timeCommitment | capitalize }}{% endif %}{% if job.employmentType %}{% if job.timeCommitment %}, {% endif %}{{ job.employmentType | replace: "-", " " | capitalize }}{% endif %}
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
**Key Achievement{% if job.keyAchievements | size > 1 %}s{% endif %}**
{% for achievement in job.keyAchievements %}- {{ achievement }}
{% endfor %}
{% endif %}

{% endfor %}

---

## Education

`Sep 2003 - Aug 2004`
__Post-graduate Studies in Computer Science__, *FernUni Hagen*, Hagen, Germany

- Free student (Gasthörer), completed 4 semesters

`Sep 1993 - Jun 1999`
__Diploma in Computer Science__, *Tbilisi State University*, Tbilisi, Georgia

- Faculty of Applied Mathematics and Computer Science
- Scholarship holder of the George Soros Foundation

`Sep 1989 - May 1993`
__Specialized School for Physics and Mathematics__, *High School*, Tbilisi, Georgia

- Graduated with honors
- Winner (1st Place), International Young Physicists' Tournament

## Achievements

`2018`
Certified AWS Solution Architect

`2015`
CodeProject MVP

`2014`
Certified Senior Software Architect

`2013`
Member of Agile Alliance

Agile Manifesto Translator

Co-author of several patents

Open Source Enthusiast

## Languages

**Fluent:** English, German  
**Basic:** Chinese  
**Native:** Russian, Georgian

## Technical Skills

<div class="skills" markdown="1">

#### Languages & Frameworks
`C#` `Java` `Python` `TypeScript` `Node.js` `ASP.NET Core` `Angular`

#### Architecture
`OO-Patterns (GoF)` `Microservice Patterns` `Architecture Evaluation` `Requirements Engineering` `Domain Driven Design` `Testing Strategies` `Guidance & Governance` `Continuous Delivery` `AWS Well-Architected Framework` `Cloud Cost Management` `Event-Driven Architecture`

#### Platforms & Products
`Cloud Platforms` `Kubernetes` `Kafka` `Flink` `PostgreSQL` `DynamoDB` `Terraform` `Prometheus` `Grafana` `OpenTelemetry`

#### Tools
`Git` `Azure DevOps` `Visual Studio Code` `IntelliJ IDEA` `Docker` `GitHub Actions` `GitLab CI` `SonarQube` `JFrog`

#### Practices
`Agile` `Scrum` `Lean Management` `Clean Code` `TDD` `CI/CD` `Management 3.0`

</div>

