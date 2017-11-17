using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReactCRUDScratch.Models;
using System.Linq;

namespace ReactCRUDScratch.Controllers
{
    public class HomeController : Controller
    {

        private readonly ReactCRUDModels db;

        public HomeController(ReactCRUDModels context) { db = context; }

        public IActionResult Index()
        {
            return View();
        }

        [Produces("application/json")]
        [HttpPost]
        public JsonResult SaveUser([FromBody] Users u)
        {
            if (u.UserId > 0)
            {
                db.Users.Attach(u);
                db.Entry(u).State = EntityState.Modified;
            }
            else
            {
                db.Users.Add(u);
            }

            db.SaveChanges();
            return Json(u);
        }

        
        [Route("GetUsers")]        
        public ActionResult GetData()
        {
           return Json(db.Users.ToList<Users>());
        }

        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
