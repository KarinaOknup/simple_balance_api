# Simple balance app (Cron jobs included)

hi, my name Karina and i am Software Developer, there u can find 2 tasks from https://docs.google.com/document/d/17Ao_opzaQ-mjYdUYeCcfBU6BU6NK4TTe/edit?tab=t.0

This api can do only 3 things:

- Check balance GET `api/v1/balance/:userId`
- Change balance GET `api/v1/cron/task`
- Change balance POST `api/v1/balance` with BODY `{"userId": 1, "amount": 2}`

  **userId** - id of the user who loses or gets money;

  **amount** - amount that will be present (positive int) or stolen (negative int)

To start just run  `npm run infra` for DB and `npm run start` for server


P.S. I didn't prepare a UI part, so if it's needed, please let me know and I'll add it as soon as possible.