using Microsoft.Data.SqlClient; // <--- use this
using System.Data;
using Chat_app.Class;

namespace Chat_app.Repository
{
    public class UserRepository
    {
        private readonly string connectionString =
            "Data Source=(localdb)\\MSSQLLocalDB;" +
            "Initial Catalog=ChatAppDB;" +
            "Integrated Security=True;" +     
            "Connect Timeout=30;" +
            "Encrypt=False;" +
            "TrustServerCertificate=False;" +
            "ApplicationIntent=ReadWrite;" +
            "MultiSubnetFailover=False";

        public bool Login(User user)
        {
            try
            {
                using (SqlConnection connection = new SqlConnection(connectionString))
                {
                    connection.Open();
                    string query = "SELECT Id, Username FROM [User] WHERE Username = @Username AND password = @password";
                    using (SqlCommand command = new SqlCommand(query, connection))
                    {
                        command.Parameters.AddWithValue("@Username", user.Username);
                        command.Parameters.AddWithValue("@Password", user.Password);

                        using (SqlDataReader reader = command.ExecuteReader())
                        {
                            if (reader.Read())
                            {
                                user.Id = reader.GetInt32(0);
                                user.Username = reader.GetString(1);
                                user.Password = null;
                                return true;
                            }
                            else
                            {
                                user.Id = 0;
                                user.Username = null;
                                user.Password = null;
                                return false;
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                // Handle error (logging, etc.)
                user.Id = 0;
                user.Username = null;
                user.Password = null;
                return false;
            }
        }

    }
}
