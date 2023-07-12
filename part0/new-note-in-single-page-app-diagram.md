
```mermaid
sequenceDiagram
    participant browser
    participant server

    Note right of browser: The browser rerenders the note list on the page and sends the new note

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>browser: HTTP reponse : 201 created
    deactivate server

    
```
