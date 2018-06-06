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
      return new Student
      {
        Id = id,
        FirstName = "Tom",
        LastName = "Hanks"
      };
    }
  }

}
