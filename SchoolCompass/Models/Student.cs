using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SchoolCompass.Models
{
    public class Student
    {
      public Guid StudentId { get; set; }
      public string FirstName { get; set; }
      public string LastName { get; set; }
      public string GenderType { get; set; }
      public DateTime DateOfBirth { get; set; }

    }
}
