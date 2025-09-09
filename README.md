# Mild Blue Recruitment Task

Welcome to the Mild Blue React Native programming assignment! In this document, you will find the specification for the assignment, and instructions on how to get started and hand your solution in. Please read the document carefully.

# Table of Contents

1. [Task Description](#task-description)
    1. [Functional Requirements](#functional-requirements)
    2. [Non-Functional Requirements](#non-functional-requirements)
2. [Useful information](#useful-information)
3. [Submission Process](#submission-process)


## Task Description

This is a React Native programming assignment we've created specifically for our recruitment process.

### Functional Requirements
We would like you to create a React Native application that consists of two screens covering the functionality listed below. The app should run in portrait mode on a phone. Landscape and tablet support is not required.

![Wireframe][wireframe-image]

#### Screen 1:

Screen 1 has the following two functionalities:

1. Displaying a random GIF:
    - Upon opening the app, it should fetch a random GIF from the Giphy API and display it as shown in **Fig 1**.
    - The random GIF displayed on this screen should be animated.
    - Every 10 seconds, a new random GIF should replace the previous loaded one. This should continue as long as the user has no search results displayed.
    - **Screen 1** should also display the GIF title, link and an age restriction badge.
2. Search Bar:
    - Upon clicking the search bar, we start a live search after characters have been entered. This means that once the user has typed two characters, the search API should be called and not wait until the user pressed search.
    - The returning results should be displayed as shown in **Fig 2**. The GIFs’ in the search results do not have to be animated, and the list doesn’t have to include infinite scrolling.
    - Tapping one of the list items should navigate the user to **Screen 2** [fig 3.].
    - This screen should be able to retain its state, in case the user navigates back to it from **Screen 2**.
    - On canceling the search, the screen should go back to displaying the random GIF.

#### Screen 2:

Screen 2 only has the following functionality:

1. Displaying the GIF that was tapped:
    - On **Screen 2** the tapped GIF should be displayed animated along with the title, link and age restriction badge as displayed in **Fig 3**.
    - Upon tapping the back button, the user should be taken back to **Screen 1**.


### Non-Functional Requirements

- Do not use the GIPHY SDK. Any other third-party libraries can be used.
- The app should be written in TypeScript
- Create a README with the following information (please be clear and concise):
    - A brief description of the overall app architecture and the reasoning behind picking it over any other possible alternatives.
    - A brief explanation of third-party libraries used and the justification for their inclusion.
    - Any design decisions or trade-offs that are worth mentioning.


#### What We Care About

- We value clean, readable, modern, and idiomatic TypeScript. Your code will be reviewed by other developers, so make sure it is easy to follow and well-structured.
- Don't feel the need to over-engineer your solution. It should be tailored to the problem statement. We prefer concise and simple solutions over lengthy ones. However, it should be straightforward to re-use the components and extend the app with new features.
- At Mild Blue, we care about security, but for the purpose of this assignment, the API key can be included via an environment file or used directly in the code.
- We use linting/formatting to ensure consistency at Mild Blue, but for this assignment linting/formatting is allowed but not required.
- There are no specific folder structure/naming convention requirements, but they should be consistent throughout the codebase. The assignment should contain unit tests, however 100% coverage is not expected. UI/Snapshot tests are not required.
- Thought should be given to how the code can fail and what that means for the end-user of the app. Feedback can be as simple as showing an alert or text on the screen.
- The style of the app will not be evaluated, but it should not contain any visual bugs (such as text going off-screen).


### Useful information:

- API Documentation: https://developers.giphy.com/docs/
- Use the following API Key: `PlTvthVMkqTk3ZueRiHpXa6uR1zDNanJ`

### Submission Process

You were given a link to GitHub, which when you visited that link, created a private fork of this repository. Only you and developers at Mild Blue can see the code you push to this repository.

High-level instructions:

1. Read and follow the task specified below.
2. Make a local clone of this repository on your machine, and do your work on a
   branch other than `master`. Do not make any changes to the `master` branch.
3. Push your changes as frequently as you like to `origin/your-branch-name`,
   and create a pull request to merge your changes back into the `master`
   branch. Don't merge your pull request. Once you're finished with the
   assignment, we will do a code review of your pull request.
4. When you're finished, email us that your code is ready to be
   reviewed. Please do **NOT** publish your solution on a publicly available
   location (such as a public GitHub repository, your personal website, _et
   cetera_).

This process closely mimics our actual development and review cycle. We hope
you enjoy it!

_Thanks in advance for your time and interest in Mild Blue!_

[wireframe-image]: https://imgur.com/Kja1rsy.png
