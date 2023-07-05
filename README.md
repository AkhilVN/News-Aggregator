# Airtribe News Aggregator
(In-Progress)

The News Aggregator Project is a Node.js Express-based web application that helps users fetch news with respect to their preferences efficiently. It provides a user-friendly interface to create and update their preferences and fetch the news. It allows user to search for topics. 
This *README* provides an overview of the project, installation instructions, usage guidelines, and other relevant details.



## Table of Contents

- [Installation](#installation)
- [Features](#features)
- [Usage](#usage)
- [Dependencies](#dependencies)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/AkhilVN/News-Aggregator.git

2. Navigate to the project directory:
   ```bash
    cd News-Aggregator/

3. Install the dependencies:
   ```bash
    npm install / yarn install

4. Start the application:
   ```bash
    npm run start / yarn start

## Features
**Register**: Allows users to create an account with this application using email and password.

**Login:** Users can login to this app using email and password;

**Fetch News:** Users can fetch the news with respect to their preferences.

**Fetch Preferences:** Users can fetch their preferences that has added.

**Update Preferences:** Users can update the preferences.


## Usage

1. Create an account with your email, password and fullname
2. Login to the application using email and password.
3. Update the preference with PUT /preferences api.
4. Get the preferences using GET/preferences api.
5. Fetch the news using GET/news api which inturn uses the preferences.
6. 

## Dependencies
**-   Node.js**

**-   Express.js**

**-   uuid**

**-   jsonwebtoken**

**-   uuid**

**-   dotenv**

**-   axios**

**-   bcrypt**




## Contributing
Contributions to the Task Management Project are welcome. To contribute, follow these steps:

   - Fork the repository.
   - Create a new branch for your feature or bug fix.
   - Make your modifications and commit them.
   - Push your branch to your forked repository.
   - Submit a pull request to the main repository.
   
   Please follow the project's code style guidelines and ensure your contributions are well-documented and thoroughly tested.

## License
Airtribe Assignment License



*Feel free to customize the structure and content of the `README.md` file based on the specific details of your Node.js Express project. Add sections or information that you think are important and relevant for users or contributors to understand and use your project effectively.*