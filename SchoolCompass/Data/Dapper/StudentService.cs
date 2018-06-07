using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using SchoolCompass.Models;

namespace SchoolCompass.Data.Dapper
{
  public class StudentService
  {
    private string ConnectionString = "Data Source=localhost;Initial Catalog=School;Integrated Security=True;";

    public List<Student> GetAll()
    {
      // ConnectionString = ConfigurationManager.ConnectionStrings["SchoolDb"].ConnectionString;

      using (IDbConnection db = new SqlConnection(ConnectionString))
      {
        return db.Query<Student>("Select * from Student").ToList();
      }
    }

    public Student GetById(Guid id)
    {
      using (IDbConnection db = new SqlConnection(ConnectionString))
      {
        return db.Query<Student>("Select * from Student WHERE StudentId = @Id", new {id}).SingleOrDefault();
      }
    }

    public List<Student> GetAllUsingSp()
    {
      using (IDbConnection db = new SqlConnection(ConnectionString))
      {
        var readSp = "Sp_GetAllStudents";
        return db.Query<Student>(readSp, commandType: CommandType.StoredProcedure).ToList();
      }
    }
  }
}
