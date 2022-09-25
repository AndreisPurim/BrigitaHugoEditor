
# [ Brigita ] Editor 🖊️ 
> "The poor man's forestry.io' - Me, 2022.

[![Maintenance Status](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/ISARVIT/ISARVIT) [![Website Status](https://img.shields.io/website-up-down-green-red/https/andreispurim.github.io/Brigita)](https://andreispurim.github.io/Brigita) ![Version](https://img.shields.io/github/package-json/v/andreispurim/Brigita)

[![](https://img.shields.io/badge/Material%20UI-007FFF?style=for-the-badge&logo=mui&logoColor=white) ](https://mui.com/) [![](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/) [![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://pages.github.com/)

So, imagine you have created a nice [Hugo](https://gohugo.io/) or [Jekyll](https://jekyllrb.com/) static website for some personal project and hosted it on Github. Everything is fine and dandy until one of your non-tech friends wants to edit one small thing or maybe add a blog post.

_Oh no!_ you think: either you'll have to **teach him to do it by himself** (which, even thought seems obvious and easy, a lot of people have difficulty with), or you'll have to use some service like [forestry.io](forestry.io) (which, while very good, sometimes is an **overkill or can be an unexpected up in your budget of 0$**).

Well, friend, I do have the solution for you. It's this **static, 100% frontend, free and compact** and **simple editor** called **Brigita** (briGITa, get it? yes, I achieved comedy). Brigita fills the gap of trying to be very non-tech friendly, while still being flexible enough to help people achieve their means.

The best part is that the entire system is less than **600 lines of code in a single index.js**¹ coded in [React](https://reactjs.org/) using [MaterialUI](https://mui.com/) and hosted on [Github pages](https://pages.github.com/). This means that every person can fork/clone and make their own functioning version.

## How to use:
1. Create your github repository with your Hugo website.
2. Configure a workflow to regenerate the build every change in the repository
3. Create a Personal Access Token
4. Connect to **Brigita** and start editing
5. Push every time you change a file
6. Watch the website update!

So, meanwhile, creating the website and the webflow is still done manually. In future versions, I'd probably try to integrate both in Brigita, check the to-do and updates for that.

## Functioning Principle:

Since this is an static website hosted on github, every operation is done user-side. The github API OAuth authentication requires server, so I decided to skip that and use directly a Personal Access Token.

Basically, the program fetches the user repositories, and fetch every file/directory as the user clicks them (inefficient for the user, I know, but it's how the API works².

Then, when the user changes or creates a new file, the program simply makes a push in the repository. _Yes, Brigita is a glorified git pull-push, but your non-tech friend doesn't know that._

# Dev Notes and To Do

- **V 0.1.0:**  (25/10/2022)
    - Revived the old idea and started prototyping. Basically we just have the visuals, and the functioning but it still doesn't push to the repo.
    - Example button should show user what the main point is.

# FAQ
(No Questions so far!)

# Comments
¹ (I know the pitfalls of this practice, but I like to design these functional react websites in the more "direct" way possible, so whenever editing or taking a piece apart, it works on its own. Brigita is simple/direct enough this still makes sense.)

² The github API repo tree could be used, but in some cases it can fetch an infinitude of useless files, which is why they recommend just fetching content per content.

Criticism and new ideas are more than welcome.

