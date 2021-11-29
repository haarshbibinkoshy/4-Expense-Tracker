const Sequelize=require('sequelize')

const sequelize=new Sequelize(`expense_tracker_schema`,`root`,`Koshysugi18@`,{
    dialect:`mysql`,
    host:`localhost`
    
})

module.exports=sequelize;