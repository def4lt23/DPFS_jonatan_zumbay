//VOLVER A GENERAR TABLAS | node sync.js
// Este script borra todas las tablas existentes y las vuelve a crear con los modelos definidos en sequelize
const db = require('./database/models');

(async () => {
  try {
    console.log('⏳ Borrando todas las tablas...');
    await db.sequelize.drop(); // Borra todas las tablas existentes

    console.log('✅ Tablas borradas. Creando tablas desde los modelos...');
    await db.sequelize.sync({ force: true }); // Crea todas las tablas segun los modelos

    console.log('🎉 Tablas creadas correctamente!');
    process.exit();
  } catch (error) {
    console.error('❌ Error al crear las tablas:', error);
  }
})();
