class validator {
    static ValidateUser(user, usersList) {
        console.log("uuu", user, usersList)
        if (user.hasOwnProperty("email") && !this.validateUniqueUser(user.email, usersList)) {
            return {
                status: 400,
                "message": "User with the email already exists"
            };
        }
        if (user.hasOwnProperty("email") && user.hasOwnProperty("password") && this.validateUniqueUser(user.email, usersList)) {
            return {
                status: 201,
                "message": "User is successfully created"
            };
        }
    }

    static validateUniqueUser(email, usersList) {
        let userFound = usersList.some((user) => user.email === email);
        if (userFound) {
            return false;
        } else {
            return true;
        }
    }
}

module.exports = validator;