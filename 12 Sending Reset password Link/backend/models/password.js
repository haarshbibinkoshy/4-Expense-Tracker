const {Sequelize}=require(`sequelize`)
const sequelize=require('../utils/database')

const Password = sequelize.define(`password`,{
    id:{
        type:Sequelize.UUID,
        allowNull:false,
        primaryKey:true
    },
    active:Sequelize.BOOLEAN,
    expiresby:Sequelize.DATE
})

module.exports = Password