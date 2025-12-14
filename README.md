CricVoice is a platform where users can register complaints regarding local problems such as potholes, street lights and other problems related to local problems in their zone. Following this, admin can view these complaints and assign officers based on the zone of complaints. Officers then have responsibility to update the status of the user complaints.
Users can see the status of their complaints along with managing their user profile.

The project uses React.js for frontend, Node.js Express.js for backend and PostgreSQL for databases. The whole implementation such that CRUD(Create, Read, Update, Delete) operations are performed in order to achieve the functionalities of the project.
This project has roles divided for users, admins and officers. Residents can view and add complaints along with managing their profile.Admin and officers are part of admin side, where admin can see all users,zones,officers and complaints and hence thereforth assign officers based on the zone of the resident’s complaint. Officer can see all the complaints which are assigned to them and hence has the privilege to update the complaint’s status.

JWT has been used for authentication and is stored in LocalStorage of the browser to manage role based requirements.

AI has been used in assisting the project and relevant links are provided for the reference:

Protected route in frontend/App.jsx : https://claude.ai/chat/00a756c6-a628-4c17-967f-924ce9e3a1b7 Used this for creating the Protected Routes.

Protected route modification in frontend/App.jsx : https://chatgpt.com/c/6931cfba-f680-8327-b5eb-b00b5c9b5b01 Used this for modifying the previous Protected Routes.

User Complains and User Profile page in frontend/UserComplaints.jsx and frontend/UserProfile.jsx : https://claude.ai/chat/c21bd398-1fa0-4c1b-95bd-17e5c07f7e96 Used for User Complaints UI and User Profile UI

Add Complaints Page in frontend/AddComplain.css : https://claude.ai/chat/c21bd398-1fa0-4c1b-95bd-17e5c07f7e96 Used for CSS generation of Adding Complaints for User.

Zone Add Page in frontend/ZoneAdd.jsx : https://chatgpt.com/c/69284639-aeec-832e-a521-27e5af4374e4 Used for Zone Add page creation of forms and inputs along with CSS

Admin,User,Officer Pages in frontend respective pages : https://chatgpt.com/c/6926e5f3-0e3c-832e-80c2-d7cf07f9e6e8 Used in all role based UI for implementing CSS along with structure
