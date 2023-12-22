## TutorLinkUp
-  A TutorLinkUp App that allows students and tutors to communicate through files
## Setting up Locally

- Create a .env file from .env.example
- Do npm install to install all the dependencies
- Go To Postgres Database and create a new Database with name tutorlinkup
- Take the tutorlinkup_db_schema.sql and run on the database tutorlinkup using QueryTool.

#### Attachment
- SQL File for Database -> tutorlinkup_db_schema.sql
- ER Diagram -> er-diagram.png
- Postman Collection -> tutorLinkup-Postman.json

#### To run
```
$ npm run start
```


## Environment Variable
| Variable                      | Purpose                                                                         |
|-------------------------------|---------------------------------------------------------------------------------|
| PORT                          | Port on which the server runs requests                                          |
| SECRETKEY                     | To encrypt the jwt payload                                                      |        
| DB_PORT                       | DB Port                                                                         |
| DB_HOST                       | DB Host                                                                         |
| DB_DATABASE                   | DB Database name                                                                |
| DB_USERNAME                   | DB Username                                                                     |
| DB_PASSWORD                   | DB Password                                                                     |

## Requirement

### API Details:

1. #### Authentication endpoint:

- This will be a public endpoint.
- The request body will contain an arbitrary username/password pair. Note: Treat it as a mock authentication service and accept any username/password.
- Return a signed JSON Web Token (JWT, https://jwt.io/) which can be used for validation in future requests.

2. #### Class Files REST API endpoints:

The following endpoints should be protected. The JWT obtained in the “Authentication” endpoint will be attached to each request. If the JWT is missing or invalid, these endpoints should reject the request.

Class Files refers to an online system that allows students and tutors to communicate through files.

#### Class files will have the following features:

- There are two types of users in the system
  - Tutor
  - Student
- Tutors can create classrooms and add students to the classroom.
- Tutors can share files to a classroom. Files should be visible to only those students who are part of the classroom.
- Files can only be created, updated, and deleted by the tutor.
- Each file must consist of a name, description, uploaded at, uploaded by and file details field ( You are free to design a system to store files). File type can be Image, Audio, Video or URL.
- Students must be able to view files.

#### Create protected REST endpoints for the following:

- Create/Update/Delete and add students to a classroom as a tutor.
- Upload/Rename/Delete a file in a classroom as a tutor.

#### Classes feed.

- If the API is called by a student, then only the student’s classes should be returned
- If the API is called by a tutor then all the classes created by the tutor should be returned

#### Files feed

- Given a class, all the files which are not deleted in the class should be returned.
- The feed will have following filters:
- fileType (Type of the file): Applicable for student and tutor feed, which can have values
  - AUDIO
  - VIDEO
  - IMAGE
  - URL
- search (Search by filename): Applicable for student and tutor feed.

____________________________________________________________________________________________________________________________