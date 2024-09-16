# Anime-Voyager

## 1. Problem Statement
> It can be tough to keep track of all the anime you’re watching or have already finished, especially when there are so many shows out there with tons of episodes. You might forget where you left off or what you’ve already seen.
> 
> Plus, if you want to test your knowledge on a specific anime, there’s no easy way to do it, making it harder to really remember all the cool details and characters that make each show special.
> 

## 2. Technical Solution

> Create an application that allows users to easily track the anime they’ve watched, are currently watching, or plan to watch. Users can also access flashcards to test their knowledge on each show, helping them remember important details, characters, and storylines.
> 
> ### Scenario 1
> Joseph loves watching anime, but with so many series on his list, he often forgets which episodes he's already seen. Using the app, he organizes his anime into “Watched,” “Currently Watching,” and “Plan to Watch” lists. The app helps him track his progress, so he always knows where he left off. He can also look at some flashcards to refresh his memory on his favorite anime.
> 
> ### Scenario 2
> Matt is a die-hard anime fan and loves learning about the intricate details of every show he watches. After finishing a series, he uses the app’s flashcards to test his knowledge on the story, characters, and key moments. The interactive learning helps him deepen his appreciation for the show and remember what made it special.

## 3. Glossary

> ### Anime
> A style of animation originating from Japan, typically characterized by colorful artwork, fantastical themes, and vibrant characters. Users can track anime they’ve watched, are currently watching, or plan to watch.
> ### User
> Anyone who uses the application to track their anime or take quizzes. Users can organize anime lists and test their knowledge with quizzes and flashcards.
> ### Watched List
> A collection of anime the user has already completed. Users can view their history and revisit details about the anime they’ve watched.
> ### Currently Watching List
> A list where users track anime they are actively watching. This list helps them keep track of what episode or season they are on.
> ### Plan to Watch List
> A list where users store anime they are interested in watching in the future. It serves as a reminder and helps users manage their anime-watching goals.
> ### Flashcards
> A study tool where users can review facts, trivia, or character details about a specific anime. Flashcards help users retain information and strengthen their understanding of what made the show unique.
> ### Episode
> An individual segment of an anime series, often part of a larger season. Users can track which episodes they’ve watched or need to watch next.
> ### Character
> A fictional individual within an anime. Characters are often the focus of quizzes and flashcards, with users testing their knowledge on names, traits, and roles in the story.
> ### Genre
> The thematic category of an anime, such as action, romance, fantasy, or horror. Users may filter or organize their lists based on genre preferences.

## 4. High Level Requirement

> - Create an anime list (USER).
> - Edit anime progress (USER).
> - Delete an anime from your lists (USER).
> - Browse anime details (anyone).
> - Create flashcards for an anime (USER).
> - Rate an anime (USER).
> - Add anime to favorite list (USER).

## 5. User Stories/Scenarios

> ### Create an Anime List
> 
> Create a list that users can add anime to, categorized by "Watched," "Currently Watching," and "Plan to Watch."
> 
> Suggested data:
> - Anime title
> - Status (Watched, Currently Watching, Plan to Watch)
> - Episode number/season (if applicable)
> - Rating (optional)
> - Review/comment (optional)
> 
> **Precondition**: User must be logged in to create and manage their anime lists.
> 
> **Post-condition**: The anime is added to the appropriate list, and the user can track their progress or mark it as completed.
> 
> ### Update Anime Progress
> 
> Update the episode or season progress of an anime in the "Currently Watching" list.
> 
> **Precondition**: User must be logged in and have an anime in the "Currently Watching" list.
> 
> **Post-condition**: The episode/season progress is updated, and the app reflects the latest watched point for that anime.
> 
> ### Delete Anime from Any List
> 
> Allow users to remove anime from their "Watched," "Currently Watching," or "Plan to Watch" lists if they no longer want it tracked.
> 
> **Precondition**: User must be logged in and have anime in at least one of their lists (Watched, Currently Watching, or Plan to Watch).
> 
> **Post-condition**: The selected anime is removed from the chosen list, and the list is updated accordingly. The user can re-add the anime later if desired.
> 
> ### Create Flashcards for an Anime
> 
> Users can create custom flashcards to study key characters, plot points, or trivia about an anime.
> 
> Suggested data:
> - Anime title
> - Front of the flashcard (question or prompt)
> - Back of the flashcard (answer or explanation)
> 
> **Precondition**: User must be logged in to create flashcards. The anime must be on their "Watched" list.
> 
> **Post-condition**: The flashcards are saved and can be used in a study session at any time.
> 
> ### Rate and Review an Anime
> 
> Allow users to rate and write a review for anime they have completed.
> 
> Suggested data:
> - Anime title
> - Rating (1-5 stars)
> - Review/comment (optional)
> 
> **Precondition**: User must be logged in and have the anime in their "Watched" list.
> 
> **Post-condition**: The rating and review are saved, and the user can view or edit their review later.
> 
> ### Browse Anime Database
> 
> Allow anyone to search for and view details about anime, including synopsis, genre, and average user ratings.
>
> Suggested data:
> - Anime title
> - Synopsis
> - Genre
> 
> **Precondition**: No login required. Anyone can search and browse anime details.
> 
> **Post-condition**: The user can view anime details and decide to log in to add it to their list.
> 
