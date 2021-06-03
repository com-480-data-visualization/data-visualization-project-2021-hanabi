# Project of Data Visualization (COM-480)

| Student's name | SCIPER |
| -------------- | ------ |
| Po-Jui Chang| 321337|
| Yi-Hsin Jen| 321468|
| Sabrina Laneve| 331185|

[Milestone 1](#milestone-1) • [Milestone 2](#milestone-2) • [Milestone 3](#milestone-3)

## Milestone 1 (23rd April, 5pm)

**10% of the final grade**

This is a preliminary milestone to let you set up goals for your final project and assess the feasibility of your ideas.
Please, fill the following sections about your project.

*(max. 2000 characters per section)*

### Dataset

> Find a dataset (or multiple) that you will explore. Assess the quality of the data it contains and how much preprocessing / data-cleaning it will require before tackling visualization. We recommend using a standard dataset as this course is not about scraping nor data processing.
>
> Hint: some good pointers for finding quality publicly available datasets ([Google dataset search](https://datasetsearch.research.google.com/), [Kaggle](https://www.kaggle.com/datasets), [OpenSwissData](https://opendata.swiss/en/), [SNAP](https://snap.stanford.edu/data/) and [FiveThirtyEight](https://data.fivethirtyeight.com/)), you could use also the DataSets proposed by the ENAC (see the Announcements section on Zulip).

The dataset we are going to use is the **Overall Global Gender Gap Index Dataset** downloaded from [THE WORLD BANK](https://tcdata360.worldbank.org/indicators/af52ebe9?country=BRA&indicator=27959&viz=line_chart&years=2006,2020).

The dataset contains **The Overall Global Gender Gap Index**, which examines the gap between men and women. The highest possible score is 1, which means men and women are equal in this country. On the contrary, the lowest possible score is 0, which means men and women are unfair in this country. Besides, the dataset contains subindexes of four different categories. The subindexes are **Economic Participation and Opportunity**, **Educational Attainment**, **Health and Survival**, and **Political Empowerment**. Similarly, the highest possible score is 1, and the lowest possible score is 0. In addition, this dataset also provides the rank information of the gender equality.

About the range of the dataset, this dataset contains Gender Gap Index from 2006 to 2020, and covers 157 countries. However, some entries are lost for certain countries, we will filter it out in the later section.

### Problematic

> Frame the general topic of your visualization and the main axis that you want to develop.
> - What am I trying to show with my visualization?
> - Think of an overview for the project, your motivation, and the target audience.

Our motivation for this project is to let the public understand the gender gap among different countries and different times. Since gender gap is a really abstract concept, people can only tell the difference between different genders, but can not quantify this value. With our visualization, people can get a deeper insight into the gender gaps rather than just feelings.

Basically, we plan to create a map with timeline, which can help people feel the gender gap at a glance. Then, we will provide the subindexes visualization to help people get the deeper insight. Besides, we also want to do the comparison between countries. With the comparison, people can understand how well their countries perform on gender equality in different categories.

To sum up, we will have visualization on:

- Gender gap index and subindexes along time
- Gender gap index and subindexes on different countries
- Comparison between different countries

This visualization will benefit anyone who wants to have a quick glimpse on global gender gap.

### Exploratory Data Analysis

> Pre-processing of the data set you chose
>
> - Show some basic statistics and get insights about the data

In this dataset, we first did some data preprocessing. We removed NaN in the dataset and split the dataset into two csv files: one with the exact value(index) and one with rankings. 
Then, we did some simple statistics on our data which is available in this [Jupyter Notebook](https://github.com/com-480-data-visualization/data-visualization-project-2021-hanabi/blob/master/notebooks/EDA.ipynb).

### Related work


> - What others have already done with the data?
> - Why is your approach original?
> - What source of inspiration do you take? Visualizations that you found on other websites or magazines (might be unrelated to your data).
> - In case you are using a dataset that you have already explored in another context (ML or ADA course, semester project...), you are required to share the report of that work to outline the differences with the submission for this class.

[The Global Gender Gap Report](http://reports.weforum.org/global-gender-gap-report-2020/?doing_wp_cron=1618850345.0148279666900634765625), introduced by the World Economic Forum in 2006, provides an annual detailed analysis of the breadth and extent of the gender gap around the world. Besides the extended textual description of the study findings, it dispenses rankings, shareable static infographics and a simple data explorer which shows the overall situation of the different countries in the examinated year. It is one of the main surveys for stakeholders within each country to set priorities relevant in each specific economic, political and cultural context. 

The data visualization agency Two-n gathered the data of the WEF reports from 2006 to 2016 and built an [interactive story](https://projects.two-n.com/world-gender/) to explore it. They represented different countries according to colors, using histograms and scatterplots to show the countries across the different aspects of the index and using an interactive sliding bar to show the countries progress over time. Furthermore, they added a textual description that highlights the main findings and guides the user in observing the visualization.

Our project aims at conveing the information through minimal and intuitive visualizations, supported by slightly less abstract graphics which will help the user to interpret the displayed content. To directly involve the user, we will exploit an interactive approach and also make use of textual content based on impactful sentences and keywords, more than on descriptions. 

A good example of this approach can be found in [this work](http://www.noceilings.org/family-planning/), which we find relevant also for its use of animation to show time progress. [Here](https://www.unwomen.org/-/media/headquarters/images/sections/multimedia/2020/visualizing-the-data-politics.gif?la=en&vs=1150) and [here](https://www.unwomen.org/-/media/headquarters/images/sections/multimedia/2020/visualizing-the-data-michelin.gif?la=en&vs=1323) there are examples of simple infographics which take advantage of less abstract shapes. Other visualizations that can ispire us in visualize the difference between countries and the distribution of the gap among the 4 sub-indexes are [this one](https://www.behance.net/gallery/26590887/LaLettura-Gender-Gap) and [this one](https://www.behance.net/gallery/99598391/Storms-Hurricanes-Dataviz?tracking_source=project_owner_other_projects). Finally, a [reference](https://gabriellelamarrlemee.github.io/thesis-simulation/) containing a meaningful combination of interactivity and storytelling.

## Milestone 2 (7th May, 5pm)

**10% of the final grade**

Milestone2 Report: [milestone2](./doc/milestone2.pdf)

Please find our prototype at [Prototype](https://github.com/com-480-data-visualization/data-visualization-project-2021-hanabi/tree/master/hanabi-gendergap/gendergap/index.html).


## Milestone 3 (4th June, 5pm)

**80% of the final grade**


## Late policy

- < 24h: 80% of the grade for the milestone
- < 48h: 70% of the grade for the milestone

