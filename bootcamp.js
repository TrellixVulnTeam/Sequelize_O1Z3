// Task:

// Import Sequelize and DataTypes from sequelize and connect a new database instance called db to data.sqlite 

//  Define a User table with properties of id, username, andpassword

// id should be an auto-incrementing integer primary key

// username and password cannot be null and the username of two users cannot be the same (see here for help on requiring uniqueness)

// Ensure that the password is 8 or more characters, otherwise throw new Error(‘Password too short’)

// Create the table with .sync({ force: true )

// Create two users with your choice of username and password


const { Sequelize, DataTypes } = require('sequelize')

const db = new Sequelize({
    dialect: 'sqlite',
    storage: './data.sqlite'
})

const User = db.define('User', {
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            checkLength(val){
            if(val.length>8)
            throw new Error('Password too short')
            }
        }
    }
})


async function main(){

    await User.sync({force:true})

    await User.create({
        username: 'Joyce',
        password: 'helloworld123'
    })
    
    await User.create({
        username: 'Kadibu',
        password: '123helloworld'
    })    
}


main()