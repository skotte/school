using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SchoolCompass.Models;
using System.Web;
using Microsoft.AspNetCore.Cors;
using SchoolCompass.Data.Dapper;

//using System.Web.Http.Cors;
//using   Microsoft.AspNet.WebApi.Cors
namespace SchoolCompass.Controllers.api
{
  [Produces("application/json")]
  [Route("api/student")]
   
  public class StudentController : Controller
  {

    [HttpGet, Route("{id:guid}")]
    [ProducesResponseType(typeof(Student), (int) HttpStatusCode.OK)]
    public Student GetById(Guid id)
    {
      Response.Headers.Add("Access-Control-Allow-Origin", "*");

      var studentService = new StudentService();
      var student = studentService.GetById(id);
      return student;
      //return new Student
      //{
      //  StudentId = id,
      //  FirstName = "Tom",
      //  LastName = "Hanks"
      //};
    }
  }

}
