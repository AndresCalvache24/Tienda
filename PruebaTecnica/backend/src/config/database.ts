import sql from 'mssql';
import dotenv from 'dotenv';

dotenv.config();

const dbConfig = {
  user: 'sa',
  password: 'Laclavemaestra123',
  server: 'localhost\\SQLEXPRESS',
  database: 'ecommerce',
  options: {
    encrypt: false,
    trustServerCertificate: true,
    enableArithAbort: true,
    connectTimeout: 30000,
    requestTimeout: 30000
  }
};

export const pool = new sql.ConnectionPool(dbConfig);

export const connectDB = async () => {
  try {
    console.log('Intentando conectar a la base de datos...');
    console.log('Configuración:', {
      server: dbConfig.server,
      database: dbConfig.database,
      user: dbConfig.user,
      authentication: 'SQL Server Authentication'
    });

    await pool.connect();
    console.log('Conexión exitosa a la base de datos');
    
    // Verificar la estructura de las tablas
    console.log('\nVerificando estructura de las tablas...');
    const tablesResult = await pool.request().query(`
      SELECT 
        t.TABLE_NAME,
        c.COLUMN_NAME,
        c.DATA_TYPE,
        c.CHARACTER_MAXIMUM_LENGTH,
        c.IS_NULLABLE,
        c.COLUMN_DEFAULT,
        CASE WHEN pk.COLUMN_NAME IS NOT NULL THEN 'PRIMARY KEY' ELSE '' END as KEY_TYPE,
        CASE WHEN fk.COLUMN_NAME IS NOT NULL THEN 'FOREIGN KEY' ELSE '' END as FOREIGN_KEY
      FROM INFORMATION_SCHEMA.TABLES t
      JOIN INFORMATION_SCHEMA.COLUMNS c ON t.TABLE_NAME = c.TABLE_NAME
      LEFT JOIN (
        SELECT ku.TABLE_NAME, ku.COLUMN_NAME
        FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS tc
        JOIN INFORMATION_SCHEMA.KEY_COLUMN_USAGE ku
          ON tc.CONSTRAINT_NAME = ku.CONSTRAINT_NAME
        WHERE tc.CONSTRAINT_TYPE = 'PRIMARY KEY'
      ) pk ON c.TABLE_NAME = pk.TABLE_NAME AND c.COLUMN_NAME = pk.COLUMN_NAME
      LEFT JOIN (
        SELECT ku.TABLE_NAME, ku.COLUMN_NAME
        FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS tc
        JOIN INFORMATION_SCHEMA.KEY_COLUMN_USAGE ku
          ON tc.CONSTRAINT_NAME = ku.CONSTRAINT_NAME
        WHERE tc.CONSTRAINT_TYPE = 'FOREIGN KEY'
      ) fk ON c.TABLE_NAME = fk.TABLE_NAME AND c.COLUMN_NAME = fk.COLUMN_NAME
      WHERE t.TABLE_TYPE = 'BASE TABLE'
      AND t.TABLE_NAME NOT LIKE 'sys%'
      ORDER BY t.TABLE_NAME, c.ORDINAL_POSITION;
    `);
    
    console.log('\nEstructura de la base de datos:');
    console.log('===============================');
    let currentTable = '';
    tablesResult.recordset.forEach(row => {
      if (currentTable !== row.TABLE_NAME) {
        currentTable = row.TABLE_NAME;
        console.log(`\nTabla: ${currentTable}`);
        console.log('Columnas:');
      }
      console.log(`  - ${row.COLUMN_NAME} (${row.DATA_TYPE}${row.CHARACTER_MAXIMUM_LENGTH ? `(${row.CHARACTER_MAXIMUM_LENGTH})` : ''}) ${row.IS_NULLABLE === 'YES' ? 'NULL' : 'NOT NULL'} ${row.KEY_TYPE} ${row.FOREIGN_KEY} ${row.COLUMN_DEFAULT ? `DEFAULT ${row.COLUMN_DEFAULT}` : ''}`);
    });
    
  } catch (error) {
    console.error('Error detallado al conectar a la base de datos:', error);
    if (error instanceof Error) {
      console.error('Mensaje de error:', error.message);
      console.error('Stack trace:', error.stack);
    }
    process.exit(1);
  }
}; 