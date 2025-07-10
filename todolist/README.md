# Overview

{As a software developer, I want to practice and learn more about full-stack applications that interact with cloud services and manage data efficiently}

{This project is a Notes or Task List application, developed with Next.js, that allows users to create, categorize, complete, and delete personal notes.}

{The application connects to a PostgreSQL database in the cloud using Neon, where the notes and their categories are stored, and is hosted on Vercel. Users can add new notes with a title and text, and can also select a category. Notes are displayed grouped by category and can be easily marked as completed or deleted.}

{The main objective in developing this software was to practice and deepen my knowledge and skills in server-side rendering, form handling, and learning more about data using SQL in the cloud.}

[Software Demo Video](https://youtu.be/96x5nYV1krk)

# Cloud Database

{I used Neon, a PostgreSQL provider.}

{Create two tables:
tasks:
id
title
text
state
category_id

categories:
id
name
tasks}

# Development Environment

{Framework: Next.js

Language: TypeScript

Database: PostgreSQL on Neon

Deployment: Vercel

Version Control: Git + GitHub

Code Editor: Visual Studio Code}

{PostgreSQL client for Node.js

@vercel/postgres – integration with Neon and Vercel

CSS Modules for styles
}   

# Useful Websites

{Make a list of websites that you found helpful in this project}

- [Next.js Docs](https://nextjs.org/docs)
- [Neon Docs](https://neon.com/docs/introduction)
- [Vercel Documentation](https://vercel.com/docs)

# Future Work

{Make a list of things that you need to fix, improve, and add in the future.}

- Add user authentication so that notes are private.
- Improve the design.
- Add a search engine.
- Integrate a calendar to set reminders or deadlines.