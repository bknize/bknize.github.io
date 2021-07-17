# ben knize dot com

This site is built with React and Tailwind - I wanted to see how well they play together. I was unimpressed with React's theme and style bindings compared to Angular or Vue and Tailwind promised to solve those problems and promised it was more fun and useful than it seems at first glance. Notably, here's Tailwind's creator, Adam Wathan, as published on the _front page_ of tailwindcss.com:
> I've written a few thousand words on why traditional "semantic class names" are the reason CSS is hard to maintain, but the truth is you're never going to believe me until you actually try it. If you can suppress the urge to retch long enough to give it a chance, I really think you'll wonder how you ever worked with CSS any other way.

Hilarious, of course I have to try.

Verdict: everything I'd heard about Tailwid is true. It's verbose, ugly, scalable, and surprisingly fun. Verbosity was a pain, but React can keep you DRY by slamming classes into a new component. There's definitely some opportunity cost to adding Tailwind to a team's toolbox, but there's a lot of value to distilling CSS into a non-infinite set of effects you could possibly apply to DOM. In a way, it's its own style guide and component library at the same time.

I won't make a case that Tailwind should replace CSS everywhere, but it solves a lot of problems BEM tries to, by trading peer-review-hours for the cost of adopting it. I will say React/Tailwind was delightful; I felt like a kid dumping Legos onto the carpet. The best part of React is writing everything in one place, and with Tailwind you can move style composition into the same file as the rest of it.