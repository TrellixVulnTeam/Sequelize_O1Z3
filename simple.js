const { Sequelize, DataTypes } = require('sequelize')

const db = new Sequelize({
    dialect: 'sqlite',
    storage: './data.sqlite'
})

// defines the content of the table (the table still does not exist yet!!!)
const Tweet = db.define('Tweet', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{ 
     // validate - allows you to write custom functions
            checkLength(val){
                if(val.length>140) 
                throw new Error ('Max Tweet characters: 140!')
            }
        } 
    },
    author: {
        type: DataTypes.STRING,
        allowNull: false,
        set(val){
            this.setDataValue('author', val.toUpperCase())
            // changes authors names to upper case
        }
    },
    likes: {
        type: DataTypes.INTEGER,
        defaultValue: 1
    }

})

async function main(){

    // creates the table
    await Tweet.sync({ force: true })
    // force: true - prevents data duplication when running the table by deleting it before the next run.

    // creates a new tweet within the table
    await Tweet.create({
        content: 'STOP THE COUNT',
        author: 'Tonald Drump'
    })

    await Tweet.create({
        content: 'i forgor',
        author: 'Wanye Kest'
    })

    await Tweet.create({
        content: 'Hello World!',
        author: 'jbkad'
    })
    
}

main()