Build a minimal, polished chat application frontend using React, TypeScript, React Router DOM, and CSS.

IMPORTANT:
Do NOT invent features or concepts that are not specified below.
There are NO public rooms and NO private/public room distinction.
A room is simply a room with members.
Do not add channels, groups, communities, stories, posts, voice/video calls, reactions, or other social-media features.

PROJECT PURPOSE:
This is a real-time room-based chat application.

AUTHENTICATION:
- The user has a login page.
- After login, store the JWT/token on the client.
- The frontend establishes a WebSocket connection using the authenticated token.
- The authenticated user's ID should NOT be manually supplied in WebSocket messages. The backend already knows the user from the authenticated WebSocket connection.
- The frontend should treat the server as the source of truth for authentication and room membership.

ROUTES:

/login
- Login form
- Email/username field as appropriate
- Password field
- Login button
- Loading state
- Error state
- After successful login, navigate to the main application.

/app
- Main authenticated application.

/app/room/:roomId
- Chat room screen.

MAIN APP LAYOUT:

Desktop:
- Left sidebar containing:
  - Application name/logo
  - Current user
  - List of rooms the user belongs to
  - Join Room button
  - Create Room button
  - Logout button
- Main area containing either:
  - Empty state when no room is selected
  - Chat interface when a room is selected

ROOM CREATION:
There IS a create-room feature.
When creating a room:
- Ask for room name.
- The creator automatically becomes an admin.
- Do not ask the user to choose a role.
- Do not expose public/private room options.

JOIN ROOM:
- Provide a Join Room UI.
- User enters a room ID/code as appropriate.
- Send the JOIN_ROOM WebSocket request.
- Show loading/success/error states.
- Once successfully joined, the room should appear in the user's room list.

LEAVE ROOM:
- Provide a Leave Room action inside the room UI or room menu.
- Ask for confirmation.
- Send LEAVE_ROOM.
- After success, remove the room from the local room list and navigate back to the empty state.

CHAT SCREEN:

Header:
- Room name
- Room ID if useful
- Member/admin information if available
- Room actions menu
- Leave room option

Message area:
- Scrollable message list
- Messages grouped naturally by sender/time
- Own messages aligned to the right
- Other users' messages aligned to the left
- Sender name for other users
- Message timestamp
- Auto-scroll to the newest message when appropriate
- Empty-room state when there are no messages

Message composer:
- Text input / textarea
- Send button
- Enter to send
- Shift+Enter for newline
- Disable send when message is empty
- Show a sending/pending state if appropriate

MESSAGE FEATURES:
- Send message
- Edit message
- Delete message
- Editing should only be available to the sender.
- The backend will enforce the actual authorization and edit time limit.
- The frontend should visually disable/hide edit after the allowed period.
- Deleted messages should have a clear deleted-message appearance.
- Edited messages should show an "edited" indicator.

ADMIN FEATURES:
The creator is the default admin.
Admins can:
- Promote a member to admin
- Remove a member
- Delete messages

The frontend should show admin controls only when the current user is an admin.

Do NOT add:
- Public/private room types
- Multiple room visibility modes
- User roles other than MEMBER and ADMIN
- Room invitations unless explicitly needed
- Super-admins
- Permissions that aren't specified

WEBSOCKET PROTOCOL:

Incoming/outgoing messages should follow this structure:

{
  "type": "MESSAGE_TYPE",
  "data": {}
}

Current client operations:

JOIN_ROOM
{
  "type": "JOIN_ROOM",
  "data": {
    "roomId": number
  }
}

LEAVE_ROOM
{
  "type": "LEAVE_ROOM",
  "data": {
    "roomId": number
  }
}

SEND_MESSAGE
{
  "type": "SEND_MESSAGE",
  "data": {
    "roomId": number,
    "content": string
  }
}

EDIT_MESSAGE
{
  "type": "EDIT_MESSAGE",
  "data": {
    "messageId": number,
    "content": string
  }
}

DELETE_MESSAGE
{
  "type": "DELETE_MESSAGE",
  "data": {
    "messageId": number
  }
}

The frontend must NOT send:
- userId
- senderId
- admin status
- authentication information inside every message

The WebSocket connection already identifies the user.

REAL-TIME EVENTS:

The UI should be designed to handle events such as:

NEW_MESSAGE
MESSAGE_EDITED
MESSAGE_DELETED
JOIN_SUCCESS
LEAVE_SUCCESS
ERROR

When NEW_MESSAGE is received:
- Add it to the appropriate room's message state immediately.

When MESSAGE_EDITED is received:
- Update the corresponding message in local state.

When MESSAGE_DELETED is received:
- Mark/remove the corresponding message in local state.

When an operation fails:
- Show a useful error to the user.
- Do not pretend the operation succeeded.

STATE MANAGEMENT:

Keep the implementation simple.
Do not introduce Redux unless absolutely necessary.

Use React state/context/hooks where appropriate.

Maintain:
- authenticated user
- JWT/token
- rooms
- currently selected room
- messages for the selected room
- WebSocket connection state
- pending message state
- errors

WEBSOCKET LIFECYCLE:

After successful authentication:
1. Establish WebSocket connection.
2. Keep the connection alive while the authenticated application is open.
3. Listen for server events.
4. Route events according to their type.
5. Clean up the WebSocket when logging out/unmounting.
6. Handle connection errors and disconnection gracefully.

IMPORTANT:
Do not open a new WebSocket connection for every message.
There should be one persistent WebSocket connection for the authenticated session.

DATABASE / API ASSUMPTIONS:

The backend is responsible for:
- authentication
- room membership
- room creation
- message persistence
- authorization
- admin permissions
- message edit/delete rules

The frontend should consume the backend API and WebSocket rather than duplicating business rules.

DESIGN:

Create a modern but restrained developer-focused UI.

Style:
- Clean
- Minimal
- Professional
- Dark-mode-first
- Good spacing
- Rounded cards/buttons
- Clear typography
- Subtle borders
- No excessive gradients
- No flashy animations

The application should feel like a real production chat application rather than a demo dashboard.

RESPONSIVE DESIGN:
- Desktop: sidebar + chat
- Tablet: collapsible sidebar
- Mobile: room list and chat should work naturally with navigation/back behavior

COMPONENT STRUCTURE:

Prefer reusable components such as:

App
├── LoginPage
├── ProtectedRoute
├── ChatLayout
│   ├── Sidebar
│   │   ├── UserProfile
│   │   ├── RoomList
│   │   ├── JoinRoomModal
│   │   └── CreateRoomModal
│   └── ChatPage
│       ├── ChatHeader
│       ├── MessageList
│       │   └── MessageBubble
│       └── MessageComposer
└── AdminPanel / RoomMembers

Create reusable WebSocket utilities/hooks rather than putting all WebSocket logic inside UI components.

IMPORTANT IMPLEMENTATION RULE:
Do not invent backend endpoints or WebSocket message types beyond what is specified.
If an endpoint is needed but its exact URL is unknown, isolate it in an API service file so it can easily be changed later.

The frontend should be structured so that connecting it to the existing Node.js/TypeScript WebSocket backend is straightforward.