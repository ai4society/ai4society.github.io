---
layout: archive
title: <span style="color:maroon">Members</span> 
permalink: /members/
author_profile: true
---


{% assign excerpts = "Faculty, Ph.D. graduate student, Masters student, Undergraduate student, Intern, Indirect Study, External" | split: ", " %}
{% assign headers = "Faculty, Ph.D. students, Masters student, Undergraduate students, Interns, Affiliated / Independent Study, External" | split: ", " %}

{% for excerpt in excerpts %}
	{% assign isEmpty = true %}
	{% for post in site.members reversed %}
	    {% if post.excerpt == excerpt %}
			{% if isEmpty %}
<h2> {{ headers[forloop.parentloop.index0] }} </h2>
				{% assign isEmpty = false %}
			{% endif %}
			{% include archive-member.html %}
		{% endif %}
	{% endfor %}
{% endfor %}



