# Victor website

Landing page for Victor, an iGaming solutions provider. Built from the accepted Figma design
("Option 1", Landing — Desktop 1440 neon) and works at desktop, tablet and mobile sizes,
in English and Korean.

## Run it locally

No build step. Serve the folder with any static server, for example:

```bash
python3 -m http.server 8090
```

Then open http://localhost:8090. Add `?lang=ko` for Korean.

## Where things are

| What | File |
| --- | --- |
| Page structure | `index.html` |
| Styles (desktop, tablet ≤1279px, mobile ≤767px) | `css/style.css` |
| All 56 features, English + Korean | `js/features.js` |
| Interface text, product cards, behaviour | `js/main.js` |
| Feature and product icons | `js/icons.js` |
| Images | `assets/img/` |
| Phone screens for each feature (`f<number>-<n>.jpg`) | `assets/screens/` (English), `assets/screens-ko/` (Korean) |

## Editing

- **Feature text:** edit `js/features.js`. Each feature has `en` and `ko` text, the category,
  and which phone screens to show.
- **Feature screens:** replace a file in `assets/screens/` with the same name (720 × 1600).
  A feature with one screen shows it twice; with two screens it shows both.
- **Product cards (E-sports, Slots, Promotions):** edit `products` in `js/main.js`.
- **Contact form:** set `CONTACT_EMAIL` at the top of `js/main.js`. The form opens the
  visitor's email app with the message filled in. A server-side form can replace this later.

## Still to do

- Sales email for the contact form, and real Telegram / WhatsApp / KakaoTalk links in the footer.
- Privacy and Terms pages.
- E-sports, Slots and Promotions card details.
- Korean text is a first translation and needs a review by a native speaker.
