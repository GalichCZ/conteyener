First aims:
  I get a big experience from Second Foundation tech. about how to develop the project. After researching the architecture of FE and BE I understood that the project needs BIG refactor.
  
  1. For example I need to start using react portals, to not render filter window inside the table tag.
  2. Also the table need the refactor - for example use some nice UI kit/library.
  3. Need to fix components dependencies, now some logicaly closed components can be called/imported to other part of application 
  4. Need to refactor some funcs, like avoid code duplicates.
  5. Add linter to check all small bugs
  6. Make types more understandable
  7. Add feature flags (I think)
  8. In conclusion, the app needs restart and 2. version 

Conteyener 

System created to follow containers, arrive date, goods, declarations etc.
The application is a table with users system and roles. 
Depends on user's role, user can create items in table, update and delete. 
Moderator and admin can add roles or delete users.

Exists function ```onLoad info```, which means that user can add data to the table with uploading an ```excel``` file
(requierment: columns must be named properly).

Users can find items by their key values: order number, container number... Table can be filtred by all column properties
