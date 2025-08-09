using System.Data;
using Npgsql;
using Microsoft.Extensions.Configuration;

namespace Api.EscolaIdiomas.Infra.Data.DatabaseConfiguration
{
    public class DatabaseContext
    {
        private readonly IConfiguration _configuration;
        private readonly string _connectionString;

        public DatabaseContext(IConfiguration configuration)
        {
            _configuration = configuration;
            _connectionString = configuration.GetConnectionString("DefaultConnection");
        }


        public IDbConnection CreateConnection()
               => new NpgsqlConnection(_connectionString);
    }
}
