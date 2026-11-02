OUR MONTHSARY SURPRISE WEBSITE
===============================

CONTENTS
--------
index.html   Website structure (the eight screens)
style.css    Colors, layout, responsive design and animations
script.js    Personal settings, verification, photo upload and effects
assets/      Optional place for your own images and sound files

START HERE — PERSONALIZE IT
---------------------------
1. Open script.js in Notepad or Visual Studio Code.
2. At the very top, find the PERSONALIZE YOUR MONTHSARY WEBSITE section.
3. Replace these values:
   const girlfriendName = "HER FULL NAME";
   const boyfriendName = "BOYFRIEND FULL NAME";
   const monthsaryDate = "YYYY-MM-DD";
4. Use the exact names she should type. The name check ignores uppercase/lowercase
   and extra spaces, but spelling must otherwise match.
5. The date format is YYYY-MM-DD, for example "2026-11-02".
   She can also choose a date on the website.
6. The love letters are written in index.html. Search for "My dearest baby"
   or "My sweetest love" to edit the messages. The three message constants in
   script.js are customization placeholders for your own future use; the visible
   letter text is currently written directly in index.html.

HOW TO RUN
----------
Easiest method:
1. Extract the ZIP file.
2. Open the Monthsary_Website folder.
3. Double-click index.html to open it in a browser.

Recommended method with Visual Studio Code:
1. Install Visual Studio Code.
2. Open VS Code, choose File > Open Folder, and select Monthsary_Website.
3. Install the "Live Server" extension (by Ritwick Dey).
4. Right-click index.html and choose "Open with Live Server".
5. Your browser will open the website. Save edits and refresh to see changes.

TEST THE EIGHT SCREENS
----------------------
1. Welcome: click OPEN MY SURPRISE.
2. Girlfriend verification: enter the exact girlfriendName from script.js.
3. Boyfriend verification: enter the exact boyfriendName from script.js.
4. Date: choose the monthsary date and save it.
5. Photo: upload a JPG, PNG or WEBP image (maximum 10 MB).
6. Letter: tap the envelope, read the letter, then continue.
7. Celebration: check the names, date and uploaded photo; click the final surprise.
8. Ultimate surprise: enjoy the flower and falling-petal effects. Try Replay Flowers,
   Read My Message Again, and Start Our Surprise Again.

PUBLISH WITH GITHUB PAGES
-------------------------
1. Create or sign in to a GitHub account.
2. Create a new public repository, for example "monthsary-surprise".
3. Upload index.html, style.css, script.js, README.txt and the assets folder.
4. In the repository, open Settings > Pages.
5. Under Build and deployment, choose "Deploy from a branch".
6. Select the main branch and the root folder, then Save.
7. Wait for GitHub Pages to publish and open the URL shown in the Pages section.

PUBLISH WITH VERCEL
-------------------
1. Create or sign in to a Vercel account.
2. Import the GitHub repository containing this project, or use the Vercel
   dashboard to upload/deploy the project folder if that option is available.
3. Keep the framework preset as "Other" and the output/root directory as the
   project root.
4. Deploy, then open the generated Vercel URL.

IMPORTANT NOTES
---------------
- This is a front-end-only gift website. The name checks are playful and are NOT
  secure authentication. Anyone who can inspect script.js can see the names.
- Your uploaded photo is kept in browser memory while the page is open. It is
  not uploaded to a server. If the page is refreshed or closed, choose the photo
  again. This avoids sending a private couple photo to an external service.
- Internet is only needed for the optional Google Fonts. The website itself
  works locally without a framework.
- Sound effects are off by default. Use the Sound button to enable gentle tones.
- The website respects the device's reduced-motion accessibility preference.
- Keep the four main files together in the same folder. Do not move script.js
  or style.css away from index.html.
